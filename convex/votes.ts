import { ConvexError, v } from 'convex/values';
import { type MutationCtx, mutation, query } from './_generated/server';
import { validLocationIds } from './locations';

const rateLimitWindowMs = 60_000;
const maxAttemptsPerWindow = 5;

export const submit = mutation({
  args: {
    clientId: v.optional(v.string()),
    consentCopyVersion: v.string(),
    email: v.string(),
    honeypot: v.optional(v.string()),
    locationId: v.string(),
    userAgentHash: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const normalizedEmail = normalizeEmail(args.email);
    const clientKey = clientKeyFor(args.clientId, normalizedEmail);

    assertValidLocation(args.locationId);
    assertValidEmail(normalizedEmail);

    if (args.honeypot?.trim()) {
      await ctx.db.insert('voteAttempts', {
        blockedReason: 'honeypot',
        clientKey,
        createdAt: now,
        normalizedEmail,
      });
      return { locationId: args.locationId, status: 'protected' as const };
    }

    await assertWithinRateLimit(ctx, clientKey, now);
    await ctx.db.insert('voteAttempts', {
      clientKey,
      createdAt: now,
      normalizedEmail,
    });

    const existingVote = await ctx.db
      .query('votes')
      .withIndex('by_normalized_email', (q) => q.eq('normalizedEmail', normalizedEmail))
      .first();

    if (existingVote) {
      return { locationId: existingVote.locationId, status: 'already_counted' as const };
    }

    await ctx.db.insert('votes', {
      clientId: normalizeOptionalString(args.clientId),
      consentCopyVersion: args.consentCopyVersion,
      createdAt: now,
      email: args.email.trim(),
      locationId: args.locationId,
      normalizedEmail,
      userAgentHash: normalizeOptionalString(args.userAgentHash),
    });

    return { locationId: args.locationId, status: 'counted' as const };
  },
});

export const totals = query({
  args: {},
  handler: async (ctx) => {
    const votes = await ctx.db.query('votes').collect();
    const counts = new Map<string, number>();

    for (const vote of votes) {
      counts.set(vote.locationId, (counts.get(vote.locationId) ?? 0) + 1);
    }

    return {
      byLocation: Array.from(counts, ([locationId, count]) => ({ count, locationId })).sort((a, b) =>
        a.locationId.localeCompare(b.locationId),
      ),
      total: votes.length,
    };
  },
});

async function assertWithinRateLimit(ctx: MutationCtx, clientKey: string, now: number) {
  const recentAttempts = await ctx.db
    .query('voteAttempts')
    .withIndex('by_client_key_created_at', (q) =>
      q.eq('clientKey', clientKey).gte('createdAt', now - rateLimitWindowMs),
    )
    .take(maxAttemptsPerWindow);

  if (recentAttempts.length >= maxAttemptsPerWindow) {
    throw new ConvexError({
      code: 'RATE_LIMITED',
      message: 'Previše pokušaja u kratkom periodu. Pokušaj ponovo za minut.',
    });
  }
}

function assertValidLocation(locationId: string) {
  if (!validLocationIds.has(locationId)) {
    throw new ConvexError({
      code: 'INVALID_LOCATION',
      message: 'Izabrano mesto nije podržano.',
    });
  }
}

function assertValidEmail(normalizedEmail: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new ConvexError({
      code: 'INVALID_EMAIL',
      message: 'Unesi ispravnu email adresu.',
    });
  }
}

function clientKeyFor(clientId: string | undefined, normalizedEmail: string) {
  return normalizeOptionalString(clientId)?.slice(0, 128) ?? `email:${normalizedEmail}`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeOptionalString(value: string | undefined) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : undefined;
}

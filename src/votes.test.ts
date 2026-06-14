import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from '../convex/_generated/api';
import schema from '../convex/schema';

const modules = import.meta.glob('../convex/**/*.ts');

describe('votes', () => {
  it('deduplicates normalized email-backed votes and exposes aggregate counts only', async () => {
    const t = convexTest(schema, modules);

    const firstVote = await t.mutation(api.votes.submit, {
      clientId: 'client-a',
      consentCopyVersion: 'vote-consent-v1',
      email: ' Test@Example.COM ',
      honeypot: '',
      locationId: 'beograd',
      userAgentHash: 'ua-a',
    });
    const duplicateVote = await t.mutation(api.votes.submit, {
      clientId: 'client-a',
      consentCopyVersion: 'vote-consent-v1',
      email: 'test@example.com',
      honeypot: '',
      locationId: 'novi-sad',
      userAgentHash: 'ua-a',
    });
    const totals = await t.query(api.votes.totals);

    expect(firstVote).toEqual({ locationId: 'beograd', status: 'counted' });
    expect(duplicateVote).toEqual({ locationId: 'beograd', status: 'already_counted' });
    expect(totals).toEqual({
      byLocation: [{ count: 1, locationId: 'beograd' }],
      total: 1,
    });
    expect(totals.byLocation[0]).not.toHaveProperty('email');
    expect(totals.byLocation[0]).not.toHaveProperty('normalizedEmail');
  });

  it('does not count honeypot submissions', async () => {
    const t = convexTest(schema, modules);

    const result = await t.mutation(api.votes.submit, {
      clientId: 'bot-client',
      consentCopyVersion: 'vote-consent-v1',
      email: 'bot@example.com',
      honeypot: 'https://spam.example',
      locationId: 'beograd',
      userAgentHash: 'ua-bot',
    });
    const totals = await t.query(api.votes.totals);

    expect(result).toEqual({ locationId: 'beograd', status: 'protected' });
    expect(totals).toEqual({ byLocation: [], total: 0 });
  });

  it('accepts Kosovo municipalities from the complete controlled location list', async () => {
    const t = convexTest(schema, modules);

    const result = await t.mutation(api.votes.submit, {
      clientId: 'kosovo-client',
      consentCopyVersion: 'vote-consent-v1',
      email: 'zvecan@example.com',
      honeypot: '',
      locationId: 'zvecan',
      userAgentHash: 'ua-kosovo',
    });
    const totals = await t.query(api.votes.totals);

    expect(result).toEqual({ locationId: 'zvecan', status: 'counted' });
    expect(totals).toEqual({
      byLocation: [{ count: 1, locationId: 'zvecan' }],
      total: 1,
    });
  });

  it('rate-limits repeated attempts from the same client', async () => {
    const t = convexTest(schema, modules);

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await t.mutation(api.votes.submit, {
        clientId: 'busy-client',
        consentCopyVersion: 'vote-consent-v1',
        email: 'busy@example.com',
        honeypot: '',
        locationId: 'beograd',
        userAgentHash: 'ua-busy',
      });
    }

    await expect(
      t.mutation(api.votes.submit, {
        clientId: 'busy-client',
        consentCopyVersion: 'vote-consent-v1',
        email: 'busy@example.com',
        honeypot: '',
        locationId: 'beograd',
        userAgentHash: 'ua-busy',
      }),
    ).rejects.toThrow(/Previše pokušaja/i);
  });
});

import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  votes: defineTable({
    clientId: v.optional(v.string()),
    consentCopyVersion: v.string(),
    createdAt: v.number(),
    email: v.string(),
    locationId: v.string(),
    normalizedEmail: v.string(),
    userAgentHash: v.optional(v.string()),
  })
    .index('by_normalized_email', ['normalizedEmail'])
    .index('by_location', ['locationId']),

  voteAttempts: defineTable({
    blockedReason: v.optional(v.string()),
    clientKey: v.string(),
    createdAt: v.number(),
    normalizedEmail: v.optional(v.string()),
  }).index('by_client_key_created_at', ['clientKey', 'createdAt']),
});

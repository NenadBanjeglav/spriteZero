import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export type SubmitVoteArgs = {
  email: string;
  locationId: string;
  consentCopyVersion: string;
  honeypot: string;
  clientId?: string;
  userAgentHash?: string;
};

export type SubmitVoteResult = {
  status: 'counted' | 'already_counted' | 'protected';
  locationId: string;
};

export type VoteTotals = {
  total: number;
  byLocation: Array<{
    locationId: string;
    count: number;
  }>;
};

export function useSubmitVote() {
  return useMutation(api.votes.submit) as (args: SubmitVoteArgs) => Promise<SubmitVoteResult>;
}

export function useVoteTotals(): VoteTotals {
  return useQuery(api.votes.totals) ?? { byLocation: [], total: 0 };
}

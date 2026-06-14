import { track } from '@vercel/analytics';

type CampaignEventSource = 'final_ask' | 'hero' | 'vote_modal';
type ShareMethod = 'copy_link' | 'native_share';

export function trackPrimaryCtaClicked(source: CampaignEventSource) {
  track('primary_cta_clicked', { source });
}

export function trackVoteEntryOpened(source: CampaignEventSource) {
  track('vote_entry_opened', { source });
}

export function trackVoteSubmitted(source: CampaignEventSource) {
  track('vote_submitted', { source });
}

export function trackVoteCounted() {
  track('vote_counted', { status: 'counted' });
}

export function trackVoteAlreadyCounted() {
  track('vote_already_counted', { status: 'already_counted' });
}

export function trackShareClicked(method: ShareMethod) {
  track('share_clicked', { method });
}

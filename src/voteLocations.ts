export { validLocationIds, voteLocations, type VoteLocation } from '../convex/locations';
import { voteLocations, type VoteLocation } from '../convex/locations';

export function searchVoteLocations(query: string): VoteLocation[] {
  const normalizedQuery = normalizeVoteLocationText(query);

  if (!normalizedQuery) {
    return [...voteLocations];
  }

  return voteLocations.filter((location) =>
    normalizeVoteLocationText(location.label).includes(normalizedQuery),
  );
}

function normalizeVoteLocationText(value: string) {
  return value
    .trim()
    .replaceAll('đ', 'dj')
    .replaceAll('Đ', 'dj')
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/\p{Diacritic}/gu, '');
}

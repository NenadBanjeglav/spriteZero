import { describe, expect, it } from 'vitest';
import { searchVoteLocations, validLocationIds, voteLocations } from './voteLocations';

describe('Serbian Location List', () => {
  it('covers all official Serbian cities and municipalities with stable ids and coordinates', () => {
    expect(voteLocations).toHaveLength(174);

    const ids = new Set(voteLocations.map((location) => location.id));
    expect(ids.size).toBe(voteLocations.length);
    expect(validLocationIds.size).toBe(voteLocations.length);

    for (const location of voteLocations) {
      expect(location.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(validLocationIds.has(location.id)).toBe(true);
      expect(location.label).toBeTruthy();
      expect(location.latitude).toBeGreaterThanOrEqual(41);
      expect(location.latitude).toBeLessThanOrEqual(47);
      expect(location.longitude).toBeGreaterThanOrEqual(18);
      expect(location.longitude).toBeLessThanOrEqual(23);
    }

    expect(voteLocations.filter((location) => location.type === 'city')).toHaveLength(29);
    expect(voteLocations.filter((location) => location.type === 'municipality')).toHaveLength(
      145,
    );

    expect(Array.from(ids)).toEqual(
      expect.arrayContaining([
        'beograd',
        'novi-sad',
        'nis',
        'kragujevac',
        'subotica',
        'zrenjanin',
        'cacak',
        'kraljevo',
        'novi-pazar',
        'pristina',
        'prizren',
        'zvecan',
        'strpce',
        'gnjilane',
        'djakovica',
        'kosovska-mitrovica',
      ]),
    );
  });

  it('searches Serbian Latin names with or without diacritics', () => {
    expect(searchVoteLocations('zvec').map((location) => location.id)).toContain('zvecan');
    expect(searchVoteLocations('cacak').map((location) => location.id)).toContain('cacak');
    expect(searchVoteLocations('pristina').map((location) => location.id)).toContain(
      'pristina',
    );
  });
});

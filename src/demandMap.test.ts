import { describe, expect, it } from 'vitest';
import { getDemandMapPins, getMapPinPosition } from './demandMap';
import { voteLocations } from './voteLocations';

describe('Serbia Demand Map data', () => {
  it('places pins from Serbian Location List coordinates', () => {
    const beograd = voteLocations.find((location) => location.id === 'beograd');
    const zvecan = voteLocations.find((location) => location.id === 'zvecan');

    expect(beograd).toBeDefined();
    expect(zvecan).toBeDefined();

    const beogradPosition = getMapPinPosition(beograd!);
    const zvecanPosition = getMapPinPosition(zvecan!);

    expect(beogradPosition.left).toBeGreaterThan(35);
    expect(beogradPosition.left).toBeLessThan(45);
    expect(beogradPosition.top).toBeGreaterThan(25);
    expect(beogradPosition.top).toBeLessThan(40);
    expect(zvecanPosition.top).toBeGreaterThan(beogradPosition.top);
  });

  it('builds visible pins from aggregate counts only', () => {
    const pins = getDemandMapPins([
      { count: 2, locationId: 'beograd' },
      { count: 0, locationId: 'nis' },
      { count: 1, locationId: 'zvecan' },
      { count: 4, locationId: 'unknown-location' },
    ]);

    expect(pins.map((pin) => ({ count: pin.count, id: pin.location.id }))).toEqual([
      { count: 2, id: 'beograd' },
      { count: 1, id: 'zvecan' },
    ]);
    expect(pins[0]).not.toHaveProperty('email');
    expect(pins[0]).not.toHaveProperty('normalizedEmail');
  });
});

import { type VoteLocation, voteLocations } from './voteLocations';

type AggregateLocationCount = {
  locationId: string;
  count: number;
};

export type DemandMapPin = {
  count: number;
  location: VoteLocation;
  position: {
    left: number;
    top: number;
  };
};

const serbiaMapBounds = {
  maxLatitude: 46.25,
  maxLongitude: 23.05,
  minLatitude: 41.85,
  minLongitude: 18.75,
};

const locationById: ReadonlyMap<string, VoteLocation> = new Map(
  voteLocations.map((location) => [location.id, location]),
);

export function getMapPinPosition(location: Pick<VoteLocation, 'latitude' | 'longitude'>) {
  const left =
    ((location.longitude - serbiaMapBounds.minLongitude) /
      (serbiaMapBounds.maxLongitude - serbiaMapBounds.minLongitude)) *
    100;
  const top =
    ((serbiaMapBounds.maxLatitude - location.latitude) /
      (serbiaMapBounds.maxLatitude - serbiaMapBounds.minLatitude)) *
    100;

  return {
    left: clamp(left, 4, 96),
    top: clamp(top, 4, 96),
  };
}

export function getDemandMapPins(counts: AggregateLocationCount[]): DemandMapPin[] {
  return counts
    .flatMap((count) => {
      const location = locationById.get(count.locationId);

      if (!location || count.count <= 0) {
        return [];
      }

      return [
        {
          count: count.count,
          location,
          position: getMapPinPosition(location),
        },
      ];
    })
    .sort(
      (leftPin, rightPin) =>
        rightPin.count - leftPin.count ||
        leftPin.location.label.localeCompare(rightPin.location.label, 'sr-Latn'),
    );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

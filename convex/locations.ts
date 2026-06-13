const locationIds = [
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
] as const;

export const validLocationIds = new Set<string>(locationIds);

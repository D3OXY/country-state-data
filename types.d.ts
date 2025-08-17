export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface Translations {
  kr?: string;
  "pt-BR"?: string;
  pt?: string;
  nl?: string;
  hr?: string;
  fa?: string;
  de?: string;
  es?: string;
  fr?: string;
  ja?: string;
  it?: string;
  cn?: string;
  tr?: string;
  [key: string]: string | undefined;
}

export interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Timezone[];
  translations: Translations;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

export interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string | null;
  latitude: string;
  longitude: string;
}

export interface City {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export interface StateWithCities {
  id: number;
  cities: City[];
}

export interface CountryWithCities {
  id: number;
  states: StateWithCities[];
}

export interface Region {
  id: string;
  name: string;
  hasCountries: boolean;
}

export interface Language {
  code: string;
  name: string;
  native: string;
}

// Type declarations for JSON imports
declare module "*/countries.json" {
  const countries: Country[];
  export default countries;
}

declare module "*/states.json" {
  const states: State[];
  export default states;
}

declare module "*/cities.json" {
  const cities: CountryWithCities[];
  export default cities;
}

declare module "*/regions.json" {
  const regions: Region[];
  export default regions;
}

declare module "*/languages.json" {
  const languages: Language[];
  export default languages;
}

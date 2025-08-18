import { Country, State, City, Region, Language } from "./types";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface CountryInfo extends Country {
  stateCount: number;
  cityCount: number;
}

export interface Statistics {
  totalCountries: number;
  totalStates: number;
  totalLanguages: number;
  totalRegions: number;
  totalCurrencies: number;
  totalTimezones: number;
}

export interface RawData {
  countries: Country[];
  states: State[];
  cities: Array<{ id: number; states: Array<{ id: number; cities: City[] }> }>;
  regions: Region[];
  languages: Language[];
}

declare class CountryStateData {
  constructor();

  // Country methods
  getAllCountries(): Country[];
  getCountryByCode(code: string): Country | undefined;
  getCountryById(id: number): Country | undefined;
  getCountriesByRegion(regionName: string): Country[];
  getCountriesBySubregion(subregionName: string): Country[];
  searchCountries(query: string): Country[];
  getCountriesByCurrency(currencyCode: string): Country[];
  getCountriesByPhoneCode(phoneCode: string | number): Country[];

  // State methods
  getAllStates(): State[];
  getStatesByCountry(countryCode: string): State[];
  getStatesByCountryId(countryId: number): State[];
  getStateByCode(stateCode: string, countryCode: string): State | null;
  searchStates(query: string, countryCode?: string | null): State[];

  // City methods
  getCitiesByState(stateId: number): City[];
  getCitiesByCountry(countryCode: string): City[];
  searchCities(
    query: string,
    countryCode?: string | null,
    stateId?: number | null,
  ): City[];

  // Region methods
  getAllRegions(): Region[];
  getRegionById(regionId: string): Region | undefined;
  getUniqueRegions(): string[];
  getUniqueSubregions(): string[];

  // Language methods
  getAllLanguages(): Language[];
  getLanguageByCode(code: string): Language | undefined;
  searchLanguages(query: string): Language[];

  // Currency methods
  getAllCurrencies(): Currency[];
  getCurrencyByCode(currencyCode: string): Currency | null;

  // Timezone methods
  getAllTimezones(): Timezone[];
  getCountriesByTimezone(zoneName: string): Country[];

  // Validation methods
  isValidCountryCode(code: string): boolean;
  isValidStateCode(stateCode: string, countryCode: string): boolean;
  isValidLanguageCode(code: string): boolean;
  isValidCurrencyCode(code: string): boolean;

  // Utility methods
  getCountryFlag(countryCode: string): string | null;
  getCountryPhoneFormat(countryCode: string): string | null;
  getCountryInfo(countryCode: string): CountryInfo | null;

  // Statistics methods
  getStatistics(): Statistics;
}

declare const instance: CountryStateData;

export default instance;
export { CountryStateData };
export const rawData: RawData;

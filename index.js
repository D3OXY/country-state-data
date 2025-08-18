const countries = require('./countries.json');
const states = require('./states.json');
const cities = require('./cities.json');
const regions = require('./regions.json');
const languages = require('./languages.json');

class CountryStateData {
  constructor() {
    this.countries = countries;
    this.states = states;
    this.cities = cities;
    this.regions = regions;
    this.languages = languages;
  }

  // Country methods
  getAllCountries() {
    return this.countries;
  }

  getCountryByCode(code) {
    const upperCode = code.toUpperCase();
    return this.countries.find(
      country => country.iso2 === upperCode || country.iso3 === upperCode
    );
  }

  getCountryById(id) {
    return this.countries.find(country => country.id === id);
  }

  getCountriesByRegion(regionName) {
    return this.countries.filter(country => country.region === regionName);
  }

  getCountriesBySubregion(subregionName) {
    return this.countries.filter(country => country.subregion === subregionName);
  }

  searchCountries(query) {
    const lowerQuery = query.toLowerCase();
    return this.countries.filter(country =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.native.toLowerCase().includes(lowerQuery) ||
      country.capital.toLowerCase().includes(lowerQuery) ||
      country.nationality.toLowerCase().includes(lowerQuery)
    );
  }

  getCountriesByCurrency(currencyCode) {
    return this.countries.filter(country => country.currency === currencyCode);
  }

  getCountriesByPhoneCode(phoneCode) {
    const code = phoneCode.toString().replace('+', '');
    return this.countries.filter(country => country.phone_code === code);
  }

  // State methods
  getAllStates() {
    return this.states;
  }

  getStatesByCountry(countryCode) {
    const country = this.getCountryByCode(countryCode);
    if (!country) return [];
    return this.states.filter(state => state.country_id === country.id);
  }

  getStatesByCountryId(countryId) {
    return this.states.filter(state => state.country_id === countryId);
  }

  getStateByCode(stateCode, countryCode) {
    const country = this.getCountryByCode(countryCode);
    if (!country) return null;
    return this.states.find(
      state => state.state_code === stateCode && state.country_id === country.id
    );
  }

  searchStates(query, countryCode = null) {
    const lowerQuery = query.toLowerCase();
    let searchPool = this.states;
    
    if (countryCode) {
      const country = this.getCountryByCode(countryCode);
      if (country) {
        searchPool = this.states.filter(state => state.country_id === country.id);
      }
    }
    
    return searchPool.filter(state =>
      state.name.toLowerCase().includes(lowerQuery)
    );
  }

  // City methods
  getCitiesByState(stateId) {
    for (const country of this.cities) {
      for (const state of country.states) {
        if (state.id === stateId) {
          return state.cities || [];
        }
      }
    }
    return [];
  }

  getCitiesByCountry(countryCode) {
    const country = this.getCountryByCode(countryCode);
    if (!country) return [];
    
    const countryData = this.cities.find(c => c.id === country.id);
    if (!countryData) return [];
    
    const allCities = [];
    for (const state of countryData.states) {
      if (state.cities) {
        allCities.push(...state.cities);
      }
    }
    return allCities;
  }

  searchCities(query, countryCode = null, stateId = null) {
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    for (const country of this.cities) {
      if (countryCode) {
        const targetCountry = this.getCountryByCode(countryCode);
        if (!targetCountry || country.id !== targetCountry.id) continue;
      }
      
      for (const state of country.states) {
        if (stateId && state.id !== stateId) continue;
        
        if (state.cities) {
          const matchingCities = state.cities.filter(city =>
            city.name.toLowerCase().includes(lowerQuery)
          );
          results.push(...matchingCities);
        }
      }
    }
    
    return results;
  }

  // Region methods
  getAllRegions() {
    return this.regions;
  }

  getRegionById(regionId) {
    return this.regions.find(region => region.id === regionId);
  }

  getUniqueRegions() {
    return [...new Set(this.countries.map(country => country.region))];
  }

  getUniqueSubregions() {
    return [...new Set(this.countries.map(country => country.subregion))];
  }

  // Language methods
  getAllLanguages() {
    return this.languages;
  }

  getLanguageByCode(code) {
    return this.languages.find(lang => lang.code === code.toLowerCase());
  }

  searchLanguages(query) {
    const lowerQuery = query.toLowerCase();
    return this.languages.filter(lang =>
      lang.name.toLowerCase().includes(lowerQuery) ||
      lang.native.toLowerCase().includes(lowerQuery) ||
      lang.code.toLowerCase().includes(lowerQuery)
    );
  }

  // Currency methods
  getAllCurrencies() {
    const currencies = new Map();
    this.countries.forEach(country => {
      if (!currencies.has(country.currency)) {
        currencies.set(country.currency, {
          code: country.currency,
          name: country.currency_name,
          symbol: country.currency_symbol
        });
      }
    });
    return Array.from(currencies.values());
  }

  getCurrencyByCode(currencyCode) {
    const country = this.countries.find(c => c.currency === currencyCode);
    if (!country) return null;
    return {
      code: country.currency,
      name: country.currency_name,
      symbol: country.currency_symbol
    };
  }

  // Timezone methods
  getAllTimezones() {
    const timezones = new Map();
    this.countries.forEach(country => {
      if (country.timezones) {
        country.timezones.forEach(tz => {
          if (!timezones.has(tz.zoneName)) {
            timezones.set(tz.zoneName, tz);
          }
        });
      }
    });
    return Array.from(timezones.values());
  }

  getCountriesByTimezone(zoneName) {
    return this.countries.filter(country =>
      country.timezones && country.timezones.some(tz => tz.zoneName === zoneName)
    );
  }

  // Validation methods
  isValidCountryCode(code) {
    return !!this.getCountryByCode(code);
  }

  isValidStateCode(stateCode, countryCode) {
    return !!this.getStateByCode(stateCode, countryCode);
  }

  isValidLanguageCode(code) {
    return !!this.getLanguageByCode(code);
  }

  isValidCurrencyCode(code) {
    return this.countries.some(country => country.currency === code);
  }

  // Utility methods
  getCountryFlag(countryCode) {
    const country = this.getCountryByCode(countryCode);
    return country ? country.emoji : null;
  }

  getCountryPhoneFormat(countryCode) {
    const country = this.getCountryByCode(countryCode);
    return country ? `+${country.phone_code}` : null;
  }

  getCountryInfo(countryCode) {
    const country = this.getCountryByCode(countryCode);
    if (!country) return null;
    
    const stateCount = this.states.filter(s => s.country_id === country.id).length;
    const countryData = this.cities.find(c => c.id === country.id);
    let cityCount = 0;
    
    if (countryData && countryData.states) {
      countryData.states.forEach(state => {
        if (state.cities) {
          cityCount += state.cities.length;
        }
      });
    }
    
    return {
      ...country,
      stateCount,
      cityCount
    };
  }

  // Statistics methods
  getStatistics() {
    return {
      totalCountries: this.countries.length,
      totalStates: this.states.length,
      totalLanguages: this.languages.length,
      totalRegions: this.regions.length,
      totalCurrencies: this.getAllCurrencies().length,
      totalTimezones: this.getAllTimezones().length
    };
  }
}

// Create singleton instance
const instance = new CountryStateData();

// Export both the instance and the class
module.exports = instance;
module.exports.CountryStateData = CountryStateData;

// Also export raw data for direct access
module.exports.rawData = {
  countries,
  states,
  cities,
  regions,
  languages
};
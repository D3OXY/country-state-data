# Country State Data

A comprehensive JSON dataset containing a hierarchical list of countries, states, cities, regions, and languages. This repository provides structured geographical and linguistic data that can be easily integrated into applications requiring location-based functionality.

## Features

- Complete list of countries with ISO codes, currencies, timezones, and translations
- States/provinces/regions for each country
- Cities data organized by states and countries
- Regional classifications
- Language data with native names
- TypeScript definitions included
- Multiple file formats (full and minified versions)
- Well-structured JSON format
- Easy to integrate
- Regularly maintained and verified data

## Installation

### PNPM (Recommended)
```bash
pnpm add country-state-data
```

### NPM
```bash
npm install country-state-data
```

### Direct Download
Download the JSON files directly from this repository for local use.

## Quick Start

### Using the main API (Recommended)
```javascript
// Install the package
pnpm add country-state-data

// Import the main API
import countryStateData from 'country-state-data';

// Get all countries
const countries = countryStateData.getAllCountries();
console.log(countries.length); // 250 countries

// Find USA by code
const usa = countryStateData.getCountryByCode('US');
console.log(usa.name); // "United States"

// Get US states
const usStates = countryStateData.getStatesByCountry('US');
console.log(usStates.length); // 50+ states/territories

// Search for countries
const searchResults = countryStateData.searchCountries('united');
console.log(searchResults); // Returns USA, UAE, UK

// Validate country code
const isValid = countryStateData.isValidCountryCode('US'); // true

// Get country flag emoji
const flag = countryStateData.getCountryFlag('JP'); // 🇯🇵
```

### Direct JSON import (Alternative)
```javascript
import countries from 'country-state-data/countries';
import states from 'country-state-data/states';

// Direct access to raw data
const usa = countries.find(c => c.iso2 === 'US');
const usStates = states.filter(s => s.country_code === 'US');
```

## Available Data Files

| File | Description | Size |
|------|-------------|------|
| `countries.json` | Complete country data | ~119KB |
| `states.json` | Complete state/province data | ~605KB |
| `cities.json` | Cities organized by country and state | ~35MB |
| `regions.json` | World regions data | ~419B |
| `languages.json` | World languages with native names | ~15KB |
| `types.d.ts` | TypeScript definitions | Included |

## Data Structure

### Countries (`countries.json`)
```json
{
  "id": 1,
  "name": "Afghanistan",
  "iso3": "AFG",
  "iso2": "AF",
  "phone_code": "93",
  "capital": "Kabul",
  "currency": "AFN",
  "currency_symbol": "؋",
  "native": "افغانستان",
  "region": "Asia",
  "subregion": "Southern Asia",
  "latitude": "33.00000000",
  "longitude": "65.00000000",
  "emoji": "🇦🇫"
}
```

### States (`states.json`)
```json
{
  "id": 3901,
  "name": "Badakhshan",
  "country_id": 1,
  "country_code": "AF",
  "country_name": "Afghanistan",
  "state_code": "BDS",
  "latitude": "36.73477250",
  "longitude": "70.81199530"
}
```

### Cities (`cities.json`)
```json
{
  "id": 1,
  "states": [
    {
      "id": 3901,
      "cities": [
        {
          "id": 52,
          "name": "Ashkāsham",
          "latitude": "36.68333000",
          "longitude": "71.53333000"
        }
      ]
    }
  ]
}
```

### Regions (`regions.json`)
```json
{
  "id": "111",
  "name": "Asia",
  "hasCountries": true
}
```

### Languages (`languages.json`)
```json
{
  "code": "en",
  "name": "English",
  "native": "English"
}
```

## API Documentation

### Main API Methods

The package provides a comprehensive API through the main export:

```javascript
const countryStateData = require('country-state-data');
// or
import countryStateData from 'country-state-data';
```

#### Country Methods
- `getAllCountries()` - Returns all countries
- `getCountryByCode(code)` - Get country by ISO2 or ISO3 code
- `getCountryById(id)` - Get country by numeric ID
- `getCountriesByRegion(regionName)` - Get countries in a region
- `getCountriesBySubregion(subregionName)` - Get countries in a subregion
- `searchCountries(query)` - Search countries by name, native name, capital, or nationality
- `getCountriesByCurrency(currencyCode)` - Get countries using a currency
- `getCountriesByPhoneCode(phoneCode)` - Get countries by phone code

#### State/Province Methods
- `getAllStates()` - Returns all states/provinces
- `getStatesByCountry(countryCode)` - Get states by country ISO code
- `getStatesByCountryId(countryId)` - Get states by country ID
- `getStateByCode(stateCode, countryCode)` - Get specific state
- `searchStates(query, countryCode?)` - Search states, optionally within a country

#### City Methods
- `getCitiesByState(stateId)` - Get cities in a state
- `getCitiesByCountry(countryCode)` - Get all cities in a country
- `searchCities(query, countryCode?, stateId?)` - Search cities

#### Region Methods
- `getAllRegions()` - Get all regions
- `getRegionById(regionId)` - Get region by ID
- `getUniqueRegions()` - Get unique region names
- `getUniqueSubregions()` - Get unique subregion names

#### Language Methods
- `getAllLanguages()` - Get all languages
- `getLanguageByCode(code)` - Get language by ISO code
- `searchLanguages(query)` - Search languages

#### Currency Methods
- `getAllCurrencies()` - Get all unique currencies
- `getCurrencyByCode(currencyCode)` - Get currency details

#### Timezone Methods
- `getAllTimezones()` - Get all unique timezones
- `getCountriesByTimezone(zoneName)` - Get countries in a timezone

#### Validation Methods
- `isValidCountryCode(code)` - Validate country code
- `isValidStateCode(stateCode, countryCode)` - Validate state code
- `isValidLanguageCode(code)` - Validate language code
- `isValidCurrencyCode(code)` - Validate currency code

#### Utility Methods
- `getCountryFlag(countryCode)` - Get country flag emoji
- `getCountryPhoneFormat(countryCode)` - Get phone format with country code
- `getCountryInfo(countryCode)` - Get extended country info with state/city counts
- `getStatistics()` - Get data statistics

## Usage Examples

### Using the Main API (Recommended)
```javascript
const countryStateData = require('country-state-data');
// or ES6: import countryStateData from 'country-state-data';

// Get all countries
const allCountries = countryStateData.getAllCountries();
console.log(`Total countries: ${allCountries.length}`);

// Find USA
const usa = countryStateData.getCountryByCode('US');
console.log(usa.name); // "United States"
console.log(usa.capital); // "Washington"
console.log(usa.emoji); // "🇺🇸"

// Get US states
const usStates = countryStateData.getStatesByCountry('US');
console.log(`US has ${usStates.length} states/territories`);

// Search for cities
const newYorkCities = countryStateData.searchCities('New York', 'US');
console.log(newYorkCities);

// Get countries by region
const asianCountries = countryStateData.getCountriesByRegion('Asia');
console.log(`Asia has ${asianCountries.length} countries`);

// Currency operations
const usdCountries = countryStateData.getCountriesByCurrency('USD');
console.log('Countries using USD:', usdCountries.map(c => c.name));

// Validation
console.log(countryStateData.isValidCountryCode('US')); // true
console.log(countryStateData.isValidCountryCode('XX')); // false

// Get statistics
const stats = countryStateData.getStatistics();
console.log(stats);
// {
//   totalCountries: 250,
//   totalStates: 5000+,
//   totalLanguages: 180+,
//   totalRegions: 7,
//   totalCurrencies: 160+,
//   totalTimezones: 400+
// }
```

### Direct JSON Import (Alternative)
```javascript
const countries = require('country-state-data/countries');
const states = require('country-state-data/states');
const cities = require('country-state-data/cities');

// Direct access to raw JSON data
const usa = countries.find(country => country.iso2 === 'US');
const usStates = states.filter(state => state.country_code === 'US');
```

### JavaScript (ES6 Modules)
```javascript
import countries from 'country-state-data/countries';
import states from 'country-state-data/states';
import cities from 'country-state-data/cities';

// Get all countries
console.log(countries);

// Create a country dropdown
function createCountryDropdown() {
  const select = document.createElement('select');
  
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.iso2;
    option.textContent = `${country.emoji} ${country.name}`;
    select.appendChild(option);
  });
  
  return select;
}

// Handle country selection change
function onCountryChange(countryCode) {
  const country = countries.find(c => c.iso2 === countryCode);
  const countryStates = states.filter(s => s.country_code === countryCode);
  
  console.log(`Selected: ${country.name}`);
  console.log(`States: ${countryStates.length}`);
}
```

### TypeScript
```typescript
import { Country, State, Region, Language } from 'country-state-data/types';
import countries from 'country-state-data/countries';
import states from 'country-state-data/states';
import regions from 'country-state-data/regions';
import languages from 'country-state-data/languages';

// Type-safe country operations
const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country: Country) => country.iso2 === code);
};

// Type-safe state operations
const getStatesByCountry = (countryId: number): State[] => {
  return states.filter((state: State) => state.country_id === countryId);
};

// Get countries by region with type safety
const getCountriesByRegion = (regionName: string): Country[] => {
  return countries.filter((country: Country) => country.region === regionName);
};

// React component example
interface CountrySelectorProps {
  onSelect: (country: Country) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  return (
    <select onChange={(e) => {
      const country = getCountryByCode(e.target.value);
      if (country) onSelect(country);
    }}>
      <option value="">Select a country</option>
      {countries.map((country: Country) => (
        <option key={country.id} value={country.iso2}>
          {country.emoji} {country.name}
        </option>
      ))}
    </select>
  );
};

// Language selector component
const LanguageSelector: React.FC = () => {
  return (
    <select>
      {languages.map((language: Language) => (
        <option key={language.code} value={language.code}>
          {language.native} ({language.name})
        </option>
      ))}
    </select>
  );
};
```

### Advanced Usage Examples

#### Real-World Example: E-commerce Address Form
```typescript
import { Country, State } from 'country-state-data/types';
import countries from 'country-state-data/countries';
import states from 'country-state-data/states';

class AddressForm {
  private countries: Country[] = countries;
  private states: State[] = states;

  // Create cascading country/state dropdowns
  createCountryDropdown(onCountryChange: (countryCode: string) => void) {
    const select = document.createElement('select');
    select.innerHTML = '<option value="">Select Country</option>';
    
    this.countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.iso2;
      option.textContent = `${country.emoji} ${country.name}`;
      select.appendChild(option);
    });
    
    select.onchange = (e) => onCountryChange((e.target as HTMLSelectElement).value);
    return select;
  }

  createStateDropdown(countryCode: string) {
    const select = document.createElement('select');
    select.innerHTML = '<option value="">Select State</option>';
    
    const country = this.countries.find(c => c.iso2 === countryCode);
    if (!country) return select;
    
    const countryStates = this.states.filter(state => state.country_id === country.id);
    
    countryStates.forEach(state => {
      const option = document.createElement('option');
      option.value = state.state_code;
      option.textContent = state.name;
      select.appendChild(option);
    });
    
    return select;
  }

  // Validate address data
  validateAddress(countryCode: string, stateCode?: string): boolean {
    const country = this.countries.find(c => c.iso2 === countryCode);
    if (!country) return false;

    if (stateCode) {
      return this.states.some(state => 
        state.state_code === stateCode && 
        state.country_id === country.id
      );
    }
    
    return true;
  }

  // Get phone format for country
  getPhoneFormat(countryCode: string): string {
    const country = this.countries.find(c => c.iso2 === countryCode);
    return country ? `+${country.phone_code}` : '';
  }

  // Get currency info for pricing
  getCurrencyInfo(countryCode: string) {
    const country = this.countries.find(c => c.iso2 === countryCode);
    return country ? {
      currency: country.currency,
      symbol: country.currency_symbol,
      name: country.currency_name
    } : null;
  }
}

// Usage example
const addressForm = new AddressForm();
const countryDropdown = addressForm.createCountryDropdown((countryCode) => {
  const stateDropdown = addressForm.createStateDropdown(countryCode);
  document.getElementById('state-container')?.appendChild(stateDropdown);
  
  // Update phone format
  const phoneInput = document.getElementById('phone') as HTMLInputElement;
  phoneInput.placeholder = addressForm.getPhoneFormat(countryCode) + ' XXX XXXX';
  
  // Update currency display
  const currency = addressForm.getCurrencyInfo(countryCode);
  const priceDisplay = document.getElementById('price');
  if (priceDisplay && currency) {
    priceDisplay.textContent = `Price: ${currency.symbol}99.99 ${currency.currency}`;
  }
});
```

#### Search and Filter Functionality
```typescript
import { Country, State, Language } from 'country-state-data/types';
import countries from 'country-state-data/countries';
import states from 'country-state-data/states';
import languages from 'country-state-data/languages';

class LocationSearchService {
  // Search countries by name or native name
  searchCountries(query: string): Country[] {
    const lowercaseQuery = query.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.native.toLowerCase().includes(lowercaseQuery) ||
      country.iso2.toLowerCase() === lowercaseQuery ||
      country.iso3.toLowerCase() === lowercaseQuery
    );
  }

  // Get countries by region
  getCountriesByRegion(region: string): Country[] {
    return countries.filter(country => country.region === region);
  }

  // Get countries by currency
  getCountriesByCurrency(currencyCode: string): Country[] {
    return countries.filter(country => country.currency === currencyCode);
  }

  // Get states by country
  getStatesByCountry(countryCode: string): State[] {
    const country = countries.find(c => c.iso2 === countryCode);
    if (!country) return [];
    return states.filter(state => state.country_id === country.id);
  }

  // Search languages
  searchLanguages(query: string): Language[] {
    const lowercaseQuery = query.toLowerCase();
    return languages.filter(lang =>
      lang.name.toLowerCase().includes(lowercaseQuery) ||
      lang.native.toLowerCase().includes(lowercaseQuery) ||
      lang.code.toLowerCase() === lowercaseQuery
    );
  }

  // Get unique regions
  getRegions(): string[] {
    return [...new Set(countries.map(country => country.region))];
  }

  // Get unique currencies
  getCurrencies(): Array<{code: string, name: string, symbol: string}> {
    const currencies = new Map();
    countries.forEach(country => {
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
}

// Usage examples
const searchService = new LocationSearchService();

// Search for countries
const usaResults = searchService.searchCountries('united');
const japanResults = searchService.searchCountries('JP');

// Filter by region
const europeanCountries = searchService.getCountriesByRegion('Europe');

// Get USD countries
const usdCountries = searchService.getCountriesByCurrency('USD');

// Get all regions for a dropdown
const regions = searchService.getRegions();

// Get all currencies
const currencies = searchService.getCurrencies();
```

## Use Cases

- **E-commerce**: Country/state selection for shipping addresses
- **Forms**: Address validation and auto-completion
- **Analytics**: Geographical data analysis and reporting
- **Internationalization**: Multi-language country names
- **Travel Apps**: Location-based services and booking
- **Educational**: Geography learning applications
- **Government**: Administrative division management
- **Real Estate**: Location-based property listings

## File Size Considerations

- Use minified versions for production to reduce bundle size
- Consider loading data dynamically based on user interaction
- Implement lazy loading for large datasets like cities
- Use compression (gzip) when serving files

## TypeScript Support

This package includes comprehensive TypeScript definitions. All imports are automatically typed:

```typescript
import { Country, State, Language } from 'country-state-data/types';
import countries from 'country-state-data/countries'; // Country[]
import states from 'country-state-data/states';       // State[]
import languages from 'country-state-data/languages'; // Language[]

// Full type safety
const usa: Country = countries.find(c => c.iso2 === 'US')!;
const californiaStates: State[] = states.filter(s => s.country_code === 'US');
```

### Available Types
- `Country` - Complete country information with ISO codes, currency, timezone, etc.
- `State` - State/province information with coordinates
- `City` - City data organized by country and state
- `Region` - World regions
- `Language` - Language codes with native names
- `Timezone` - Timezone information with GMT offsets
- `Translations` - Country name translations

## Contributing

Contributions to keep the data accurate and up-to-date are welcome. Please submit a pull request with any corrections or updates.

### Data Sources
- ISO country codes
- Official government sources
- United Nations data
- Currency and timezone databases

## License

This project is open source and available under the MIT License.

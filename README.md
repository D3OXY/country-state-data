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

### NPM
```bash
npm install country-state-data
```

### Direct Download
Download the JSON files directly from this repository.

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

## Usage Examples

### JavaScript (Node.js)
```javascript
const countries = require('./countries.json');
const states = require('./states.json');

// Get all countries
console.log(countries);

// Find a specific country
const usa = countries.find(country => country.iso2 === 'US');
console.log(usa);

// Get states for a specific country
const usStates = states.filter(state => state.country_code === 'US');
console.log(usStates);

// Get countries by region
const asianCountries = countries.filter(country => country.region === 'Asia');
console.log(asianCountries);
```

### JavaScript (Browser)
```javascript
// Using fetch API
async function loadCountries() {
  const response = await fetch('./countries.json');
  const countries = await response.json();
  return countries;
}

// Using in a dropdown
async function populateCountryDropdown() {
  const countries = await loadCountries();
  const select = document.getElementById('countrySelect');
  
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.iso2;
    option.textContent = country.name;
    select.appendChild(option);
  });
}
```

### TypeScript
```typescript
import { Country, State, City } from './types';
import countries from './countries.json';
import states from './states.json';

// Type-safe country operations
const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country: Country) => country.iso2 === code);
};

// Type-safe state operations
const getStatesByCountry = (countryId: number): State[] => {
  return states.filter((state: State) => state.country_id === countryId);
};

// Create a country selector component
interface CountrySelectorProps {
  onSelect: (country: Country) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  return (
    <select onChange={(e) => {
      const country = getCountryByCode(e.target.value);
      if (country) onSelect(country);
    }}>
      {countries.map((country: Country) => (
        <option key={country.id} value={country.iso2}>
          {country.emoji} {country.name}
        </option>
      ))}
    </select>
  );
};
```

### Advanced Usage Examples

#### Creating Cascading Dropdowns
```typescript
import { Country, State } from './types';
import countries from './countries.json';
import states from './states.json';

class LocationSelector {
  private countries: Country[] = countries;
  private states: State[] = states;

  getCountries(): Country[] {
    return this.countries;
  }

  getStatesByCountryCode(countryCode: string): State[] {
    const country = this.countries.find(c => c.iso2 === countryCode);
    if (!country) return [];
    
    return this.states.filter(state => state.country_id === country.id);
  }

  getCountriesByRegion(region: string): Country[] {
    return this.countries.filter(country => country.region === region);
  }

  searchCountries(query: string): Country[] {
    const lowercaseQuery = query.toLowerCase();
    return this.countries.filter(country => 
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.native.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Usage
const locationSelector = new LocationSelector();
const usStates = locationSelector.getStatesByCountryCode('US');
const asianCountries = locationSelector.getCountriesByRegion('Asia');
```

#### Form Validation
```typescript
import { Country, State } from './types';
import countries from './countries.json';
import states from './states.json';

interface AddressForm {
  country: string;
  state: string;
  city: string;
}

class AddressValidator {
  validateCountry(countryCode: string): boolean {
    return countries.some(country => country.iso2 === countryCode);
  }

  validateState(stateCode: string, countryCode: string): boolean {
    const country = countries.find(c => c.iso2 === countryCode);
    if (!country) return false;

    return states.some(state => 
      state.state_code === stateCode && 
      state.country_id === country.id
    );
  }

  getPhoneFormat(countryCode: string): string {
    const country = countries.find(c => c.iso2 === countryCode);
    return country ? `+${country.phone_code}` : '';
  }

  getCurrencyInfo(countryCode: string): { currency: string; symbol: string } | null {
    const country = countries.find(c => c.iso2 === countryCode);
    return country ? {
      currency: country.currency,
      symbol: country.currency_symbol
    } : null;
  }
}
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

This package includes TypeScript definitions in `types.d.ts`. The types are automatically recognized when importing JSON files:

```typescript
import countries from './countries.json'; // Automatically typed as Country[]
import states from './states.json';       // Automatically typed as State[]
```

## Contributing

Contributions to keep the data accurate and up-to-date are welcome. Please submit a pull request with any corrections or updates.

### Data Sources
- ISO country codes
- Official government sources
- United Nations data
- Currency and timezone databases

## License

This project is open source and available under the MIT License.

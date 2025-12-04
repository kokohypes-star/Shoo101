import { Currency } from '@/contexts/CurrencyContext';

const countryCodeToCurrencyMap: Record<string, Currency> = {
  // Nigeria
  '234': 'NGN',
  
  // United States
  '1': 'USD',
  '1-242': 'USD', // Bahamas
  '1-246': 'USD', // Barbados
  '1-264': 'USD', // Anguilla
  '1-268': 'USD', // Antigua and Barbuda
  '1-284': 'USD', // British Virgin Islands
  '1-340': 'USD', // US Virgin Islands
  '1-345': 'USD', // Cayman Islands
  '1-441': 'USD', // Bermuda
  '1-473': 'USD', // Grenada
  '1-649': 'USD', // Turks and Caicos
  '1-664': 'USD', // Montserrat
  '1-721': 'USD', // Sint Maarten
  '1-758': 'USD', // Saint Lucia
  '1-767': 'USD', // Dominica
  '1-784': 'USD', // Saint Vincent and the Grenadines
  '1-787': 'USD', // Puerto Rico
  '1-809': 'USD', // Dominican Republic
  '1-829': 'USD', // Dominican Republic
  '1-868': 'USD', // Trinidad and Tobago
  '1-876': 'USD', // Jamaica
  '1-939': 'USD', // Puerto Rico
  
  // Canada
  '1-204': 'CAD',
  '1-226': 'CAD',
  '1-236': 'CAD',
  '1-249': 'CAD',
  '1-250': 'CAD',
  '1-289': 'CAD',
  '1-306': 'CAD',
  '1-343': 'CAD',
  '1-365': 'CAD',
  '1-403': 'CAD',
  '1-416': 'CAD',
  '1-418': 'CAD',
  '1-438': 'CAD',
  '1-506': 'CAD',
  '1-514': 'CAD',
  '1-519': 'CAD',
  '1-579': 'CAD',
  '1-581': 'CAD',
  '1-587': 'CAD',
  '1-604': 'CAD',
  '1-613': 'CAD',
  '1-647': 'CAD',
  '1-705': 'CAD',
  '1-778': 'CAD',
  '1-780': 'CAD',
  '1-807': 'CAD',
  '1-819': 'CAD',
  '1-867': 'CAD',
  '1-902': 'CAD',
  '1-905': 'CAD',
  
  // Europe - UK
  '44': 'GBP',
  
  // Europe - Germany, Austria, etc. (Euro)
  '43': 'EUR', // Austria
  '32': 'EUR', // Belgium
  '33': 'EUR', // France
  '49': 'EUR', // Germany
  '30': 'EUR', // Greece
  '353': 'EUR', // Ireland
  '39': 'EUR', // Italy
  '352': 'EUR', // Luxembourg
  '31': 'EUR', // Netherlands
  '34': 'EUR', // Spain
  '358': 'EUR', // Finland
  '385': 'EUR', // Croatia
  '420': 'EUR', // Czech Republic
  
  // India
  '91': 'INR',
};

export function detectCountryCodeFromPhone(phoneNumber: string): string | null {
  if (!phoneNumber) return null;

  // Remove common formatting characters
  const cleaned = phoneNumber.replace(/[\s\-().+]/g, '');

  // Check for country codes with area codes first (longest matches)
  for (const code of Object.keys(countryCodeToCurrencyMap).sort((a, b) => b.length - a.length)) {
    if (cleaned.startsWith(code)) {
      return code;
    }
  }

  return null;
}

export function getCurrencyFromCountryCode(countryCode: string | null): Currency {
  if (!countryCode) return 'NGN'; // Default to Naira

  const currency = countryCodeToCurrencyMap[countryCode];
  return currency || 'NGN'; // Default to Naira if not found
}

export function detectCurrencyFromPhone(phoneNumber: string): Currency {
  const countryCode = detectCountryCodeFromPhone(phoneNumber);
  return getCurrencyFromCountryCode(countryCode);
}

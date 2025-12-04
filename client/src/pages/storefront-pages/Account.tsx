import { useCurrency, type Currency } from '../../contexts/CurrencyContext';

interface AccountProps {
  customer: {
    id: number;
    email: string;
    phone: string;
  };
  onLogout: () => void;
}

const currencies: Currency[] = ['NGN', 'USD', 'EUR', 'GBP', 'INR', 'CAD'];
const currencyLabels: Record<string, string> = {
  'NGN': 'Naira',
  'USD': 'Dollar',
  'EUR': 'Euro',
  'GBP': 'Pound Sterling',
  'INR': 'Rupee',
  'CAD': 'Canadian Dollar',
};

export default function Account({ customer, onLogout }: AccountProps) {
  const { currency, setCurrency } = useCurrency();

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">My Account</h1>

      <div className="border rounded p-6 bg-card text-card-foreground space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Email</p>
          <p className="font-medium">{customer.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Phone</p>
          <p className="font-medium">{customer.phone}</p>
        </div>

        <div>
          <label className="text-sm text-muted-foreground block mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            data-testid="select-currency"
            className="px-4 py-2 border rounded bg-white text-foreground font-medium"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {currencyLabels[curr]}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onLogout}
          data-testid="button-logout"
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

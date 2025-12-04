import { useState, useRef, useEffect } from 'react';
import { useCurrency, type Currency } from '../../contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Camera, User, Mail, Phone, Edit2, Check, X, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem('sf_profile_image');
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: localStorage.getItem('sf_profile_name') || 'Customer',
    email: customer?.email || '',
    phone: customer?.phone || '',
  });
  const [savedProfile, setSavedProfile] = useState({
    name: localStorage.getItem('sf_profile_name') || 'Customer',
    email: customer?.email || '',
    phone: customer?.phone || '',
  });

  useEffect(() => {
    if (customer) {
      const storedName = localStorage.getItem('sf_profile_name') || 'Customer';
      const storedEmail = localStorage.getItem('sf_profile_email') || customer.email;
      const storedPhone = localStorage.getItem('sf_profile_phone') || customer.phone;
      
      setEditForm({ name: storedName, email: storedEmail, phone: storedPhone });
      setSavedProfile({ name: storedName, email: storedEmail, phone: storedPhone });
    }
  }, [customer]);

  if (!customer) return <p>Loading...</p>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('sf_profile_image', base64String);
        toast.success('Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem('sf_profile_name', editForm.name);
    localStorage.setItem('sf_profile_email', editForm.email);
    localStorage.setItem('sf_profile_phone', editForm.phone);
    setSavedProfile({ ...editForm });
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancelEdit = () => {
    setEditForm({ ...savedProfile });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>My Account</h1>

      <div className="space-y-6">
        {/* Profile Picture Section */}
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center border-4 border-purple-200">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-purple-700 transition"
                data-testid="button-upload-photo"
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="input-profile-image"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{savedProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{savedProfile.email}</p>
            </div>
          </div>
        </Card>

        {/* Personal Details Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Personal Details
            </h3>
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                data-testid="button-edit-profile"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleSaveProfile}
                  data-testid="button-save-profile"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancelEdit}
                  data-testid="button-cancel-edit"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              {isEditing ? (
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Enter your name"
                  data-testid="input-name"
                />
              ) : (
                <p className="font-medium py-2 px-3 bg-muted/50 rounded-md">{savedProfile.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="Enter your email"
                  data-testid="input-email"
                />
              ) : (
                <p className="font-medium py-2 px-3 bg-muted/50 rounded-md">{savedProfile.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  data-testid="input-phone"
                />
              ) : (
                <p className="font-medium py-2 px-3 bg-muted/50 rounded-md">{savedProfile.phone}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Currency Preference */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Currency Preference</h3>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            data-testid="select-currency"
            className="w-full px-4 py-3 border rounded-md bg-white text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {currencyLabels[curr]} ({curr})
              </option>
            ))}
          </select>
        </Card>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full h-12"
          onClick={onLogout}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}

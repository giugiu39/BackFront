import React, { useState, useEffect } from 'react';
import { customerApi } from '../../services/ApiService';
import { useAuth } from '../../contexts/AuthContext';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await customerApi.getUserProfile();
        setUserData(data);
        setFormData(data);
      } catch (err) {
        console.error('Errore nel caricamento del profilo:', err);
        setError('Impossibile caricare i dati del profilo. Riprova più tardi.');
        
        // Dati di fallback basati sull'utente autenticato
        if (user) {
          const fallbackData = {
            id: '1',
            email: user.email || 'user@example.com',
            firstName: '',
            lastName: '',
            phone: '',
            address: {
              street: '',
              city: '',
              postalCode: '',
              country: 'Italia'
            }
          };
          setUserData(fallbackData);
          setFormData(fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await customerApi.updateUserProfile(formData);
      setUserData(formData as UserData);
      setIsEditing(false);
      alert('Profilo aggiornato con successo!');
    } catch (err) {
      console.error('Errore nell\'aggiornamento del profilo:', err);
      alert('Impossibile aggiornare il profilo. Riprova più tardi.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Caricamento profilo...</div>;
  }

  if (error && !userData) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Il mio profilo</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Modifica profilo
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cognome</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
              <input
                type="text"
                name="address.street"
                value={formData.address?.street || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
              <input
                type="text"
                name="address.city"
                value={formData.address?.city || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address?.postalCode || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paese</label>
              <input
                type="text"
                name="address.country"
                value={formData.address?.country || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Salva modifiche
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(userData || {});
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Annulla
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nome completo</h3>
                <p className="mt-1">{userData?.firstName} {userData?.lastName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{userData?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Telefono</h3>
                <p className="mt-1">{userData?.phone || 'Non specificato'}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Indirizzo di spedizione</h3>
                <p className="mt-1">
                  {userData?.address?.street ? (
                    <>
                      {userData.address.street}<br />
                      {userData.address.postalCode} {userData.address.city}<br />
                      {userData.address.country}
                    </>
                  ) : (
                    'Indirizzo non specificato'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
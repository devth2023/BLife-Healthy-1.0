import React from 'react';
import CustomerView from './views/CustomerView';
import SellerView from './views/SellerView';
import AdminView from './views/AdminView';
import AffiliateView from './views/AffiliateView';
import LoginPage from './pages/LoginPage';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (user.role === 'admin') {
    return <AdminView />;
  }

  if (user.role === 'seller') {
    return <SellerView />;
  }
  
  if (user.role === 'affiliate') {
    return <AffiliateView />;
  }

  return <CustomerView />;
};

export default App;
import React, { useMemo } from 'react';
import { Commission } from '../../types';
import CommissionStatusBadge from '../../components/affiliate/CommissionStatusBadge';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const CommissionsTable: React.FC<{ commissions: Commission[] }> = ({ commissions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Amount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {commissions.map(commission => (
            <tr key={commission.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-green">{commission.orderId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{commission.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{commission.productName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{commission.saleAmount.toLocaleString()} ฿</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{commission.commissionEarned.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ฿</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <CommissionStatusBadge status={commission.status} />
              </td>
            </tr>
          ))}
           {commissions.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No commissions recorded yet.
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};


const CommissionsPage: React.FC = () => {
    const { commissions } = useData();
    const { user } = useAuth();

    const userCommissions = useMemo(() => {
        if (!user) return [];
        return commissions.filter(c => c.affiliateId === user.id);
    }, [commissions, user]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Commissions</h2>
            <CommissionsTable commissions={userCommissions} />
        </div>
    );
};

export default CommissionsPage;
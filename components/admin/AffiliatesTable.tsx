import React from 'react';
import { Affiliate } from '../../types';

interface AffiliatesTableProps {
  affiliates: Affiliate[];
  onCommissionChange: (affiliateId: string, newRate: number) => void;
}

const AffiliatesTable: React.FC<AffiliatesTableProps> = ({ affiliates, onCommissionChange }) => {

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Rate</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales (30d)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earnings (30d)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {affiliates.map(affiliate => (
            <tr key={affiliate.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://picsum.photos/seed/${affiliate.id}/100`} alt={`${affiliate.name}'s avatar`} />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                    </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative rounded-md shadow-sm">
                   <input
                      type="number"
                      value={(affiliate.commissionRate * 100).toFixed(2)}
                      onChange={(e) => onCommissionChange(affiliate.id, parseFloat(e.target.value))}
                      className="w-24 border-gray-300 focus:ring-brand-green-light focus:border-brand-green-light text-sm rounded-md"
                      aria-label={`Commission rate for ${affiliate.name}`}
                      step="0.01"
                      min="0"
                      max="100"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">฿ {(Math.random() * 50000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">฿ {(Math.random() * 5000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => alert('View Details functionality not yet implemented.')} className="text-brand-green hover:text-brand-green-dark">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AffiliatesTable;

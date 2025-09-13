import React from 'react';
import { Order } from '../../types';
import OrderStatusBadge from '../OrderStatusBadge';

interface RecentSalesTableProps {
  orders: Order[];
}

const RecentSalesTable: React.FC<RecentSalesTableProps> = ({ orders }) => {

  const getProductDisplay = (items: Order['items']) => {
    if (!items || items.length === 0) return 'N/A';
    const firstItem = items[0];
    const remainingItems = items.length - 1;
    if (remainingItems > 0) {
      return `${firstItem.productName} + ${remainingItems} more`;
    }
    return firstItem.productName;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Sales</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product(s)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{getProductDisplay(order.items)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{order.total.toLocaleString()} ฿</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">No recent sales found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSalesTable;
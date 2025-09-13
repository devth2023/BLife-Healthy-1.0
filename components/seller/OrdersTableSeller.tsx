import React from 'react';
import { Order } from '../../types';
import OrderStatusBadge from '../OrderStatusBadge';

interface OrdersTableSellerProps {
  orders: Order[];
}

const OrdersTableSeller: React.FC<OrdersTableSellerProps> = ({ orders }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-brand-green">{order.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                <div className="text-sm text-gray-500">{order.customerEmail}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{order.items.length}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{order.total.toLocaleString()} ฿</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <OrderStatusBadge status={order.status} />
              </td>
            </tr>
          ))}
           {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No orders found for this filter.
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTableSeller;
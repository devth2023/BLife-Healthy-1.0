import React from 'react';
import { Order } from '../../types';
import OrderStatusBadge from '../OrderStatusBadge';

interface OrderHistoryTableProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
}

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({ orders, onViewOrder }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Orders</h2>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total PV</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
                orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-brand-green">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{order.total.toLocaleString()} ฿</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{order.totalPV} PV</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => onViewOrder(order.id)} className="text-brand-green hover:text-brand-green-dark">
                            View Details
                        </button>
                    </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">You have no past orders.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryTable;
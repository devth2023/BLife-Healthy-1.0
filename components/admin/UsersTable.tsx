import React from 'react';
import { User, UserRole, UserStatus } from '../../types';
import UserStatusBadge from './UserStatusBadge';

interface UsersTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: UserRole) => void;
  onStatusChange: (userId: string, newStatus: UserStatus) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onRoleChange, onStatusChange }) => {

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'Active' ? 'Banned' : 'Active';
    onStatusChange(user.id, newStatus);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500 font-mono">{user.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://picsum.photos/seed/${user.id}/100`} alt={`${user.name}'s avatar`} />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user.id, e.target.value as UserRole)}
                  className="block w-full py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light rounded-md"
                  aria-label={`Update role for ${user.name}`}
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.joinDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <UserStatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => handleToggleStatus(user)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    user.status === 'Active' 
                    ? 'text-red-700 bg-red-100 hover:bg-red-200' 
                    : 'text-green-700 bg-green-100 hover:bg-green-200'
                  }`}
                >
                  {user.status === 'Active' ? 'Ban' : 'Unban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
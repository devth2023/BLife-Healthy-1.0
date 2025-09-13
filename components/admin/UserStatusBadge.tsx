import React from 'react';
import { UserStatus } from '../../types';

interface UserStatusBadgeProps {
  status: UserStatus;
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Banned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export default UserStatusBadge;
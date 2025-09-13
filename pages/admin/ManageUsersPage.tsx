import React, { useState } from 'react';
import { MOCK_ALL_USERS } from '../../constants';
import { User, UserRole, UserStatus } from '../../types';
import UsersTable from '../../components/admin/UsersTable';

const ManageUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_ALL_USERS);

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    const handleStatusChange = (userId: string, newStatus: UserStatus) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
                 <button className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow transition-colors">
                    + Add New User
                </button>
            </div>
            
            <UsersTable 
                users={users}
                onRoleChange={handleRoleChange}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default ManageUsersPage;
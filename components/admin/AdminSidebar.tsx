import React from 'react';
import Logo from '../Logo';

export type AdminPage = 'dashboard' | 'integrations' | 'users' | 'products' | 'orders' | 'reports' | 'affiliates' | 'settings';

const SidebarIcon = ({ d }: { d: string }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
  </svg>
);

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    page: AdminPage;
    currentPage: AdminPage;
    setCurrentPage: (page: AdminPage) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, setCurrentPage }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`flex items-center w-full px-4 py-3 text-gray-100 hover:bg-brand-green-dark rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-brand-green-dark font-semibold' : 'hover:bg-opacity-75'
            }`}
        >
            {icon}
            <span className="mx-4">{label}</span>
        </button>
    );
};


interface AdminSidebarProps {
    currentPage: AdminPage;
    setCurrentPage: (page: AdminPage) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-brand-green text-white">
      <div className="flex items-center justify-center h-20 border-b border-brand-green-dark px-4">
        <Logo className="h-10" />
        <h1 className="text-xl font-bold ml-2">Admin</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavItem icon={<SidebarIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />} label="Dashboard" page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" />} label="Manage Users" page="users" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />} label="Manage All Products" page="products" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />} label="Manage Orders" page="orders" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />} label="Manage Affiliates" page="affiliates" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />} label="Integrations" page="integrations" currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <NavItem icon={<SidebarIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />} label="System Settings" page="settings" currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;

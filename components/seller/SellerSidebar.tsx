import React from 'react';
import { SellerPage } from '../../views/SellerView';

const SidebarIcon = ({ d }: { d: string }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
  </svg>
);

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    page: SellerPage;
    currentPage: SellerPage;
    setCurrentPage: (page: SellerPage) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, setCurrentPage }) => {
    const isActive = currentPage === page || (page === 'products' && currentPage === 'addProduct');
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


interface SellerSidebarProps {
    currentPage: SellerPage;
    setCurrentPage: (page: SellerPage) => void;
}

const SellerSidebar: React.FC<SellerSidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-brand-green text-white">
      <div className="flex items-center justify-center h-20 border-b border-brand-green-dark">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavItem icon={<SidebarIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />} label="Dashboard" page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />} label="My Shop" page="shop" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />} label="Manage Products" page="products" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />} label="Manage Orders" page="orders" currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          <NavItem icon={<SidebarIcon d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />} label="Analytics" page="analytics" currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </nav>
      </div>
    </div>
  );
};

export default SellerSidebar;
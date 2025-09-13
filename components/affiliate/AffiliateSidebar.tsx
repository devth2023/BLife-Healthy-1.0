import React from 'react';
import { AffiliatePage } from '../../views/AffiliateView';

const SidebarIcon = ({ d }: { d: string }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path>
  </svg>
);

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    page: AffiliatePage;
    currentPage: AffiliatePage;
    setCurrentPage: (page: AffiliatePage) => void;
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


interface AffiliateSidebarProps {
    currentPage: AffiliatePage;
    setCurrentPage: (page: AffiliatePage) => void;
}

const AffiliateSidebar: React.FC<AffiliateSidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-brand-green text-white">
      <div className="flex items-center justify-center h-20 border-b border-brand-green-dark">
        <h1 className="text-2xl font-bold">Affiliate Area</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavItem icon={<SidebarIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />} label="Dashboard" page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />} label="My Links" page="links" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<SidebarIcon d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />} label="Commissions" page="commissions" currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </nav>
      </div>
    </div>
  );
};

export default AffiliateSidebar;
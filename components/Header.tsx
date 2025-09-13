
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Integration Management</h2>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
            <img className="object-cover w-full h-full" src="https://picsum.photos/100/100" alt="Your avatar" />
          </button>
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-700">Admin User</p>
          <p className="text-sm text-gray-500">admin@blivehealthy.co.th</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

interface CustomerHeaderProps {
    onNavigate: (page: 'home' | 'products' | 'cart' | 'account') => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const profileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsProfileMenuOpen(false);
        logout();
    };
    
    const handleProfileNav = () => {
        setIsProfileMenuOpen(false);
        onNavigate('account');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate('home')} className="focus:outline-none" aria-label="Go to homepage">
                            <Logo />
                        </button>
                    </div>

                    {/* Desktop Search Bar & Nav */}
                    <div className="hidden md:flex flex-1 items-center justify-center px-8">
                         <nav className="flex items-center space-x-6 mr-6">
                            <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-brand-green">Home</button>
                            <button onClick={() => onNavigate('products')} className="text-gray-600 hover:text-brand-green">Products</button>
                         </nav>
                        <div className="relative w-full max-w-lg">
                            <input
                                type="search"
                                placeholder="Search for products..."
                                className="w-full pl-4 pr-10 py-2 border rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Icons & Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="relative">
                            <button className="flex items-center text-sm text-gray-600 hover:text-brand-green">
                                TH
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        </div>
                        {user && (
                            <div ref={profileMenuRef} className="relative">
                                <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center space-x-2">
                                    <img className="h-8 w-8 rounded-full object-cover" src={`https://picsum.photos/seed/${user.id}/100`} alt="user avatar" />
                                    <span className="text-sm font-medium text-gray-700">Hello, {user.name}</span>
                                     <svg className={`w-4 h-4 text-gray-600 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                                        <button onClick={handleProfileNav} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            My Account
                                        </button>
                                        <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <button onClick={() => onNavigate('cart')} className="relative text-gray-600 hover:text-brand-green">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => onNavigate('cart')} className="relative text-gray-600 hover:text-brand-green mr-4">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-brand-green focus:outline-none" aria-label="Open menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <nav className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4`}>
                    <div className="relative mb-4">
                        <input type="search" placeholder="Search..." className="w-full pl-4 pr-10 py-2 border rounded-full text-sm text-gray-700 focus:outline-none"/>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                           <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                    <button onClick={() => onNavigate('home')} className="block w-full text-left py-2 px-1 text-gray-600 hover:bg-gray-100 rounded">Home</button>
                    <button onClick={() => onNavigate('products')} className="block w-full text-left py-2 px-1 text-gray-600 hover:bg-gray-100 rounded">Products</button>
                     {user && (
                         <>
                            <button onClick={() => onNavigate('account')} className="flex items-center w-full text-left py-2 px-1 text-gray-600 hover:bg-gray-100 rounded">
                               <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                               My Account
                           </button>
                           <button onClick={logout} className="flex items-center w-full text-left py-2 px-1 text-gray-600 font-semibold hover:bg-gray-100 rounded">
                               <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                               Logout
                           </button>
                         </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default CustomerHeader;

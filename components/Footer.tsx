import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
    const handlePlaceholderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert('This page is not yet implemented.');
    };

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* About B Life Health */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="mb-4">
                            <Logo className="h-12 text-2xl" />
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your trusted partner for health and wellness products in Thailand.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">About Us</button></li>
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">Contact Us</button></li>
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">FAQ</button></li>
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">Blogs</button></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">Shipping Policy</button></li>
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">Returns & Exchanges</button></li>
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">Privacy Policy</button></li>
                            <li><button onClick={handlePlaceholderClick} className="text-gray-400 hover:text-white text-left">Terms of Service</button></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-1">
                         <h4 className="font-semibold mb-4">Newsletter</h4>
                         <p className="text-sm text-gray-400 mb-2">Get promotions and updates.</p>
                         <form className="flex">
                            <input type="email" placeholder="Your email" className="w-full rounded-l-md px-3 py-2 text-gray-800 text-sm" />
                            <button className="bg-brand-green hover:bg-brand-green-dark px-4 py-2 rounded-r-md text-sm font-semibold">
                                Sign Up
                            </button>
                         </form>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} B Life Health. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

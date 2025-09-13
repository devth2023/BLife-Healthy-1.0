import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            // The redirection will be handled by the App component
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoClick = (demoEmail: string) => {
        setEmail(demoEmail);
        setPassword('password'); // Use a dummy password as any will work
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 flex flex-col items-center">
                    <Logo className="h-16 text-3xl" />
                    <p className="text-gray-600 mt-2">Your partner in health and wellness.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g., customer@blivehealthy.co.th"
                                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-green-light placeholder-gray-700 bg-[#F0F0F0]"
                                required
                                aria-label="Email Address"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="******************"
                                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-green-light placeholder-gray-700 bg-[#F0F0F0]"
                                required
                                aria-label="Password"
                            />
                        </div>
                        {error && <p role="alert" className="text-red-500 text-xs italic mb-4">{error}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 flex items-center justify-center transition-colors"
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                         <div className="text-center mt-6 text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
                            <p className="font-semibold">Demo Accounts:</p>
                            <p>Customer: <button type="button" onClick={() => handleDemoClick('customer@blivehealthy.co.th')} className="font-mono bg-gray-200 px-1 rounded hover:bg-gray-300 transition-colors cursor-pointer">customer@blivehealthy.co.th</button></p>
                            <p>Seller: <button type="button" onClick={() => handleDemoClick('seller@healthyhut.co.th')} className="font-mono bg-gray-200 px-1 rounded hover:bg-gray-300 transition-colors cursor-pointer">seller@healthyhut.co.th</button></p>
                             <p>Affiliate: <button type="button" onClick={() => handleDemoClick('influencer@blivehealthy.co.th')} className="font-mono bg-gray-200 px-1 rounded hover:bg-gray-300 transition-colors cursor-pointer">influencer@blivehealthy.co.th</button></p>
                            <p>Admin: <button type="button" onClick={() => handleDemoClick('admin@blivehealthy.co.th')} className="font-mono bg-gray-200 px-1 rounded hover:bg-gray-300 transition-colors cursor-pointer">admin@blivehealthy.co.th</button></p>
                            <p className="mt-1 text-xs">(Any password will work)</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import React from 'react';

interface QuantitySelectorProps {
    value: number;
    onChange: (newValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange }) => {
    const increment = () => onChange(value + 1);
    const decrement = () => onChange(value > 1 ? value - 1 : 1);

    return (
        <div className="flex items-center">
            <label htmlFor="quantity" className="sr-only">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                    onClick={decrement} 
                    className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                    aria-label="Decrease quantity"
                >
                    -
                </button>
                <input 
                    type="text" 
                    value={value} 
                    readOnly 
                    className="w-12 text-center border-l border-r py-1 bg-white"
                    aria-label="Current quantity"
                />
                <button 
                    onClick={increment} 
                    className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;

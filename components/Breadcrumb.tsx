import React from 'react';

interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {item.onClick ? (
                            <button onClick={item.onClick} className="hover:text-brand-green hover:underline">
                                {item.label}
                            </button>
                        ) : (
                            <span className="font-medium text-gray-700">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                             <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
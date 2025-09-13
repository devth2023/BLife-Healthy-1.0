import React from 'react';

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="py-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const CheckboxFilter: React.FC<{ label: string; count: number }> = ({ label, count }) => (
    <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green-light" />
            <span className="ml-3 text-gray-600">{label}</span>
        </label>
        <span className="text-gray-400">{count}</span>
    </div>
);

const FilterSidebar: React.FC = () => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Filters</h2>

            <FilterSection title="Categories">
                <CheckboxFilter label="Vitamins" count={8} />
                <CheckboxFilter label="Protein & Fitness" count={5} />
                <CheckboxFilter label="Healthy Foods" count={6} />
                <CheckboxFilter label="Skin Care" count={4} />
            </FilterSection>

            <FilterSection title="Price Range">
                <div className="flex items-center space-x-2">
                    <input type="number" placeholder="Min" className="w-full border-gray-300 rounded-md shadow-sm text-sm" />
                    <span className="text-gray-500">-</span>
                    <input type="number" placeholder="Max" className="w-full border-gray-300 rounded-md shadow-sm text-sm" />
                </div>
            </FilterSection>

            <FilterSection title="Brands">
                <CheckboxFilter label="VitaWorld" count={7} />
                <CheckboxFilter label="ProteinCo" count={4} />
                <CheckboxFilter label="HerbaGlow" count={6} />
                <CheckboxFilter label="NuttyNaturals" count={3} />
            </FilterSection>

            <FilterSection title="Rating">
                 <div className="flex items-center text-sm">
                    <input type="radio" id="rating-5" name="rating" className="h-4 w-4 text-brand-green border-gray-300 focus:ring-brand-green-light"/>
                    <label htmlFor="rating-5" className="ml-3 text-gray-600">5 Stars</label>
                </div>
                 <div className="flex items-center text-sm">
                    <input type="radio" id="rating-4" name="rating" className="h-4 w-4 text-brand-green border-gray-300 focus:ring-brand-green-light"/>
                    <label htmlFor="rating-4" className="ml-3 text-gray-600">4 Stars & up</label>
                </div>
                 <div className="flex items-center text-sm">
                    <input type="radio" id="rating-3" name="rating" className="h-4 w-4 text-brand-green border-gray-300 focus:ring-brand-green-light"/>
                    <label htmlFor="rating-3" className="ml-3 text-gray-600">3 Stars & up</label>
                </div>
            </FilterSection>

            <div className="pt-6">
                <button className="w-full bg-brand-green text-white py-2 rounded-lg font-semibold hover:bg-brand-green-dark transition-colors">
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;


import React from 'react';
import { ModuleType } from '../types';

interface NavigationProps {
  activeModule: ModuleType;
  onNavigate: (module: ModuleType) => void;
}

const NAV_ITEMS = [
  { id: ModuleType.SMART_INVENTORY, label: "Smart Inventory" },
  { id: ModuleType.CUSTOMER_AI, label: "Customer AI" },
  { id: ModuleType.MARKET_PULSE, label: "Market Pulse" },
  { id: ModuleType.EMPLOYEE_CO_PILOT, label: "Employee Co-Pilot" },
  { id: ModuleType.STORE_PERFORMANCE_DIAGNOSER, label: "Store Diagnoser" },
];

const Navigation: React.FC<NavigationProps> = ({ activeModule, onNavigate }) => {
  return (
    <nav className="bg-white shadow-md mb-8 sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap justify-center space-x-1 sm:space-x-2 p-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 my-1
              ${activeModule === item.id 
                ? 'bg-sky-600 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-sky-100 hover:text-sky-700'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;

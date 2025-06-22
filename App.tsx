
import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SmartInventoryModule from './components/SmartInventoryModule';
import CustomerAIModule from './components/CustomerAIModule';
import MarketPulseModule from './components/MarketPulseModule';
import EmployeeCoPilotModule from './components/EmployeeCoPilotModule';
import StorePerformanceDiagnoserModule from './components/StorePerformanceDiagnoserModule';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.SMART_INVENTORY);

  const renderActiveModule = () => {
    switch (activeModule) {
      case ModuleType.SMART_INVENTORY:
        return <SmartInventoryModule />;
      case ModuleType.CUSTOMER_AI:
        return <CustomerAIModule />;
      case ModuleType.MARKET_PULSE:
        return <MarketPulseModule />;
      case ModuleType.EMPLOYEE_CO_PILOT:
        return <EmployeeCoPilotModule />;
      case ModuleType.STORE_PERFORMANCE_DIAGNOSER:
        return <StorePerformanceDiagnoserModule />;
      default:
        // Fallback to a default module, e.g., Smart Inventory
        return <SmartInventoryModule />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <Navigation activeModule={activeModule} onNavigate={setActiveModule} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderActiveModule()}
      </main>
      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Catalyst AI. Empowering Retail Excellence.</p>
        <p className="text-xs mt-1">This is a demo application. API_KEY must be configured in environment variables.</p>
      </footer>
    </div>
  );
};

export default App;

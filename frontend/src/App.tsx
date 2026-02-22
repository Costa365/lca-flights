import React, { useState, useEffect } from 'react';
import ArrivalsBoard from './components/ArrivalsBoard';
import DeparturesBoard from './components/DeparturesBoard';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';

type TabType = 'arrivals' | 'departures';

function getTabFromPath(): TabType {
  return window.location.pathname === '/departures' ? 'departures' : 'arrivals';
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>(getTabFromPath);

  function navigate(tab: TabType) {
    const path = tab === 'arrivals' ? '/' : '/departures';
    window.history.pushState({}, '', path);
    setActiveTab(tab);
  }

  useEffect(() => {
    function onPopState() {
      setActiveTab(getTabFromPath());
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div className="font-mono min-h-screen bg-gray-900">
      {/* Header with integrated navigation */}
      <header className="bg-yellow-400 px-4 py-2 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 flex items-center justify-center bg-black rounded w-10 h-10">
              {activeTab === 'arrivals'
                ? <PlaneLanding className="text-yellow-400" size={28} strokeWidth={1.5} />
                : <PlaneTakeoff className="text-yellow-400" size={28} strokeWidth={1.5} />
              }
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">LARNACA AIRPORT</h1>
          </div>
          
          <div className="inline-flex rounded-lg bg-black/10 p-1">
            <button
              onClick={() => navigate('arrivals')}
              className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                activeTab === 'arrivals'
                  ? 'bg-black text-yellow-400'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              <PlaneLanding className="mr-1" size={16} />
              Arrivals
            </button>
            <button
              onClick={() => navigate('departures')}
              className={`flex items-center px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                activeTab === 'departures'
                  ? 'bg-black text-yellow-400'
                  : 'text-black hover:bg-black/5'
              }`}
            >
              <PlaneTakeoff className="mr-1" size={16} />
              Departures
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="transition-opacity duration-300">
        {activeTab === 'arrivals' ? <ArrivalsBoard /> : <DeparturesBoard />}
      </div>
    </div>
  );
}

export default App;
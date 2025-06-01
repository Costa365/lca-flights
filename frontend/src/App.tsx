import React, { useState } from 'react';
import ArrivalsBoard from './components/ArrivalsBoard';
import DeparturesBoard from './components/DeparturesBoard';
import { Plane, PlaneLanding, PlaneTakeoff } from 'lucide-react';

type TabType = 'arrivals' | 'departures';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('arrivals');

  return (
    <div className="font-mono min-h-screen bg-gray-900">
      {/* Tab Navigation */}
      <div className="flex justify-center bg-gray-800 p-2">
        <div className="inline-flex rounded-lg bg-gray-700 p-1">
          <button
            onClick={() => setActiveTab('arrivals')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'arrivals'
                ? 'bg-yellow-400 text-black'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <PlaneLanding className="mr-2" size={20} />
            Arrivals
          </button>
          <button
            onClick={() => setActiveTab('departures')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'departures'
                ? 'bg-yellow-400 text-black'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <PlaneTakeoff className="mr-2" size={20} />
            Departures
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="transition-opacity duration-300">
        {activeTab === 'arrivals' ? <ArrivalsBoard /> : <DeparturesBoard />}
      </div>
    </div>
  );
}

export default App;
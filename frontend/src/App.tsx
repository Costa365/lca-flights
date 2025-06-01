import React, { useState } from 'react';
import ArrivalsBoard from './components/ArrivalsBoard';
import DeparturesBoard from './components/DeparturesBoard';
import { Plane, PlaneLanding, PlaneTakeoff } from 'lucide-react';

type TabType = 'arrivals' | 'departures';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('arrivals');

  return (
    <div className="font-mono min-h-screen bg-gray-900">
      {/* Header with integrated navigation */}
      <header className="bg-yellow-400 px-4 py-2 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="40"
              height="40"
              className="mr-2"
              aria-label="Airport"
            >
              <g>
                <rect x="0" y="0" width="100" height="100" fill="#000" rx="2" />
                <rect x="10" y="85" width="80" height="7" fill="#ffe600" rx="2" />
                <path
                  d={
                    activeTab === 'arrivals'
                      ? "M15 20 L25 23 L30 40 L60 50 L35 20 L45 22 L80 62 Q85 70 80 72 Q75 74 15 48 Q10 45 15 43 Z"
                      : "M80 20 L70 23 L65 40 L35 50 L60 20 L50 22 L15 62 Q10 70 15 72 Q20 74 80 48 Q85 45 80 43 Z"
                  }
                  fill="#ffe600"
                />
              </g>
            </svg>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">LARNACA AIRPORT</h1>
          </div>
          
          <div className="inline-flex rounded-lg bg-black/10 p-1">
            <button
              onClick={() => setActiveTab('arrivals')}
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
              onClick={() => setActiveTab('departures')}
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
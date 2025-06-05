import { useState, useEffect, useMemo } from 'react';
import PerformanceGauge from './PerformanceGauge';
import { Info, RefreshCw, Settings } from 'lucide-react';

const MetricRow = ({ label, value, unit, colorClass = 'text-gray-300' }: { label: string; value: string; unit: string; colorClass?: string }) => (
  <div className="flex justify-between items-center py-3">
    <p className="text-gray-300">{label}</p>
    <p className={colorClass}>
      {value} <span className="text-gray-400">{unit}</span>
    </p>
  </div>
);

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<number>(0);
  const [workerResult, setWorkerResult] = useState<string | null>(null);

  // Memoize the worker instance to avoid re-creating it on every render
  const worker = useMemo(() => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }), []);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module'
    });

    worker.postMessage('calculate');

    worker.onmessage = (e) => {
      setResult(e.data);
      setIsLoading(false);
      worker.terminate();
    };

    return () => {
      worker.terminate();
    };
  }, []);


  const handleRunHeavyTask = () => {
    setIsLoading(true);
    setWorkerResult(null);
    console.log('Main: Posting message to worker');
    worker.postMessage('calculate');
  };

  return (
    <div className="bg-slate-800 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-[#282c34] rounded-lg shadow-2xl text-white p-6">
        {/* Header */}
        <header className="flex justify-between items-center pb-4 border-b border-gray-700">
          <h1 className="text-xl text-gray-300">Lighthouse</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <Info size={20} className="cursor-pointer hover:text-white" />
            <RefreshCw size={20} className="cursor-pointer hover:text-white" />
            <Settings size={20} className="cursor-pointer hover:text-white" />
          </div>
        </header>

        {/* Performance Section */}
        <main className="py-6">
          <div className="flex flex-col items-center">
            <PerformanceGauge score={83} />
            <h2 className="text-3xl mt-4">Performance</h2>
            <div className="text-green-300 font-medium">
              Calculation result: <span className="text-md font-bold">{result}</span>
            </div>
          </div>

          <div className="mt-8 space-y-2 border-t border-gray-700">
            <MetricRow label="First Contentful Paint" value="1,2" unit="s" />
            <MetricRow label="Largest Contentful Paint" value="1,8" unit="s" />
            <MetricRow label="Total Blocking Time" value="600" unit="ms" colorClass="text-orange-400 font-semibold" />
            <MetricRow label="Time to Interactive" value="2,1" unit="s" />
          </div>
        </main>
        
        {/* --- DEMO SECTION FOR WEB WORKER --- */}
        <footer className="pt-6 border-t border-gray-700 text-center">
          <h3 className="text-lg font-semibold text-gray-300">Test The Fix</h3>
          <p className="text-sm text-gray-400 mt-1">Click the button below to run a heavy task. The UI will remain responsive.</p>
          <button
            onClick={handleRunHeavyTask}
            disabled={isLoading}
            className="mt-4 px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {isLoading ? 'Calculating in Worker...' : 'Run Heavy Task'}
          </button>
          {workerResult && (
            <div className="mt-4 p-3 bg-slate-700 rounded-md text-left text-sm">
              <p className="font-mono text-green-400">{workerResult}</p>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
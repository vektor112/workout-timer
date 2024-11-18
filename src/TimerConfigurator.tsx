import { useState, Dispatch } from 'react';
import { TimerConfiguration } from './types';

interface TimerConfiguratorProps {
  timerConfig : TimerConfiguration
  setTimerConfig: Dispatch<TimerConfiguration>
  setShowTimer: Dispatch<boolean>
}

const TimerConfigurator: React.FC<TimerConfiguratorProps> = ({
  timerConfig,
  setTimerConfig,
  setShowTimer
}) => {
  const [workTime, setWorkTime] = useState<number>(timerConfig.workTime);
  const [restTime, setRestTime] = useState<number>(timerConfig.restTime);
  const [sets, setSets] = useState<number>(timerConfig.sets);
  
  const handleSubmit = () => {
    setTimerConfig({ workTime, restTime, sets })
    setShowTimer(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Configure a block</h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="work-time" className="block text-sm font-medium text-gray-700">Work Time (sec)</label>
            <input
              type="number"
              id="work-time"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="rest-time" className="block text-sm font-medium text-gray-700">Rest Time (sec)</label>
            <input
              type="number"
              id="rest-time"
              value={restTime}
              onChange={(e) => setRestTime(Number(e.target.value))}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sets" className="block text-sm font-medium text-gray-700">Sets</label>
            <input
              type="number"
              id="sets"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="mt-2 px-12 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-pruple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
              Configure
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimerConfigurator;


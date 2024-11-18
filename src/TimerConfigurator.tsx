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
  const [workTime, setWorkTime] = useState<string>(timerConfig.workTime.toString());
  const [restTime, setRestTime] = useState<string>(timerConfig.restTime.toString());
  const [sets, setSets] = useState<string>(timerConfig.sets.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false)
 
  const isValidNumber = (value: string) => {
    return !isNaN(Number(value)) && value.trim() !== ''
  }

  const handleSubmit = () => {
    setIsInvalid(false)
    if(isValidNumber(workTime) && isValidNumber(restTime) && isValidNumber(sets)) {
      setTimerConfig({ workTime: Number(workTime), restTime: Number(restTime), sets: Number(sets) })
      setShowTimer(true)
    } else {
      setIsInvalid(true)
    }
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Dispatch<string>) => {
    setter(e.target.value)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-white text-2xl font-semibold mb-6 text-center">Configure a block</h2>
        
        <form onSubmit={e => {e.preventDefault()}} className="space-y-4">
          <div>
            <label htmlFor="work-time" className="block text-white text-sm font-medium">Work Time (sec)</label>
            <input
              type="number"
              id="work-time"
              value={workTime}
              onChange={(e) => handleNumberInputChange(e, setWorkTime)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="rest-time" className="block text-white text-sm font-medium">Rest Time (sec)</label>
            <input
              type="number"
              id="rest-time"
              value={restTime}
              onChange={(e) => handleNumberInputChange(e, setRestTime)}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sets" className="block text-white text-sm font-medium">Sets</label>
            <input
              type="number"
              id="sets"
              value={sets}
              onChange={(e) => handleNumberInputChange(e, setSets)}
              className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          { isInvalid && <p className="text-red-500 text-sm">All input must be a number</p>}
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="mt-2 px-12 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              Configure
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimerConfigurator;


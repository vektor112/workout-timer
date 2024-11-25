import { useState, useEffect, Dispatch } from "react"
import { TimerConfiguration } from "./types"
import useSound from "use-sound"
import timerSound from "./assets/timer.mp3"

interface TimerProps {
  timerConfig : TimerConfiguration
  setTimerConfig: Dispatch<TimerConfiguration>
  setShowTimer: Dispatch<boolean>
}

type WorkoutProgress = {
  name: string
  time: number
  setNumber: number
}

const getTimerConfig = (index: number, timerConfig: TimerConfiguration, sets: number): WorkoutProgress[] => {
  const result = []
  if (timerConfig.workTime > 0) {
    result.push({ name: 'work', time: timerConfig.workTime, setNumber: index + 1 })
  }
  if (timerConfig.restTime > 0 && index < sets - 1) {
    result.push({ name: 'rest', time: timerConfig.restTime, setNumber: index + 1 })
  }
  return result
}

const Timer: React.FC<TimerProps> = ({
  timerConfig,
  setTimerConfig,
  setShowTimer,
}) => {
  const workoutProgress: WorkoutProgress[] = [
    { name: 'starting', time: 5, setNumber: 0 },
    ...Array.from({ length: timerConfig.sets }, (_, index) => (getTimerConfig(index, timerConfig, timerConfig.sets))).flat()
  ]

  const [workoutProgressState, setWorkoutProgressState] = useState<number>(0)
  const [time, setTime] = useState<number>(workoutProgress[workoutProgressState].time)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [playTimerSound] = useSound(timerSound)

  const currentWorkoutProgress = workoutProgress[workoutProgressState]
  
  useEffect(() => {
    let timerInterval: number = 0
    if (isRunning && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
      if (time === 2) {
        playTimerSound()
      }
    } else if (time === 0 && workoutProgress.length - 1 === workoutProgressState) {
      clearInterval(timerInterval)
      setTimeout(() => {
        setIsFinished(true) 
      }, 1000)
    } else if (time === 0) {
      const nextWorkoutProgressState = workoutProgressState + 1
      setTimeout(() => {
        setWorkoutProgressState(nextWorkoutProgressState)
        setTime(workoutProgress[nextWorkoutProgressState].time)
      }, 1000)
    }
    return () => clearInterval(timerInterval)
  }, [isRunning, time])

  const handleReset = () => {
    setTimerConfig({ workTime: timerConfig.workTime, restTime: timerConfig.restTime, sets: timerConfig.sets })
    setShowTimer(false)
  }

  const handleStart = () => { 
    setIsRunning(true)
  }

  const calculateColorOfState = () => {
    switch (currentWorkoutProgress.name) {
      case 'work':
        return 'text-green-500'
      case 'rest':
        return 'text-red-500'
      default:
        return 'text-white'
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-4">
          <div className="text-center mb-7">
            <p className="text-white text-9xl mb-7">{isFinished ? 'END' : time}</p>
            <p className={`text-2xl font-bold ${calculateColorOfState()}`}>{!isFinished && currentWorkoutProgress.name}</p>
            <p className="text-white italic text-1xl">{!isFinished && `Sets: ${currentWorkoutProgress.setNumber}/${timerConfig.sets}`}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex space-x-10">
              {!isRunning && !isFinished && (
                  <button 
                    onClick={handleStart}
                    className="px-12 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                    Start
                  </button>
                )
              }
              {isRunning && !isFinished && (
                  <button
                    onClick={() => setIsRunning(false)}
                    className="px-12 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                    Stop
                  </button>
                )
              }
            </div>
          </div>
          <div className="flex items-start justify-center">
            <div className="flex mt-8">
              <button 
                onClick={handleReset}
                className="px-12 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Timer

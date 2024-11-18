import { useState, useEffect, Dispatch } from "react"
import { TimerConfiguration } from "./types"

interface TimerProps {
  timerConfig : TimerConfiguration
  setTimerConfig: Dispatch<TimerConfiguration>
  setShowTimer: Dispatch<boolean>
}

const Timer: React.FC<TimerProps> = ({
  timerConfig,
  setTimerConfig,
  setShowTimer,
}) => {
  const workoutProgress = [
    { type: 'preparation', time: 5 },
    ...Array.from({ length: timerConfig.sets }, () => ([
        { type: 'work', time: timerConfig.workTime },
        { type: 'rest', time: timerConfig.restTime}
      ])
    ).flat()
  ]

  const [workoutProgressState, setWorkoutProgressState] = useState<number>(0)
  const [time, setTime] = useState<number>(workoutProgress[workoutProgressState].time)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)

  const currentWorkoutProgress = workoutProgress[workoutProgressState]
  
  useEffect(() => {
    let timerInterval: number = 0
    if (isRunning && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && workoutProgress.length - 1 === workoutProgressState) {
      clearInterval(timerInterval)
      setIsFinished(true)
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

  
  const calculateColorOfState = () => {
    switch (currentWorkoutProgress.type) {
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
            <p className="text-9xl mb-7">{isFinished ? 'END' : time}</p>
            <p className={`text-3xl ${calculateColorOfState()}`}>{!isFinished && currentWorkoutProgress.type}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex space-x-10">
              {!isRunning && !isFinished && (
                  <button 
                    onClick={() => setIsRunning(true)}
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
            <div className="flex mt-12">
              <button 
                onClick={handleReset}
                className="px-12 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
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

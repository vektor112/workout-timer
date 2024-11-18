import { useState } from 'react'

import Timer from "./Timer"
import TimerConfigurator from './TimerConfigurator'
import { TimerConfiguration } from './types'

function App() {
  const [timerConfig, setTimerConfig] = useState<TimerConfiguration>({
    workTime: 40,
    restTime: 20,
    sets: 2
  })
  const [showTimer, setShowTimer] = useState<boolean>(false)

  return (
    <>
      { !showTimer && <TimerConfigurator setShowTimer={setShowTimer} timerConfig={timerConfig} setTimerConfig={setTimerConfig} /> }
      { showTimer && <Timer setShowTimer={setShowTimer} timerConfig={timerConfig} setTimerConfig={setTimerConfig} /> }
    </>
  )
}

export default App

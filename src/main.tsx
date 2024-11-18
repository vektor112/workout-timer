import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const requestScreenWakeLock = async () => {
  if (!("wakeLock" in navigator)) {
    console.error("Screen Wake Lock API is not supported by the browser")
    return;
  }

  try {
    const wakeLock = await navigator.wakeLock.request("screen")
    wakeLock.addEventListener("release", () => {
      console.log('Wake Lock has been released')
    })
    console.log('Wake Lock has been requested')
  } catch (err) {
    console.error('WakeLock request error')
  }
}

requestScreenWakeLock()

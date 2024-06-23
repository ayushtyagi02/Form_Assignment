import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SurveyComponent from './SurveyComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='background h-[100vh]'>
      <div className=''>
      <h1 className='text-white text-center text-4xl font-bold p-5 '>Form is HERE!</h1>
      <SurveyComponent />

      </div>
    </div>
  )
}

export default App

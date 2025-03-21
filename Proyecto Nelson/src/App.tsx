import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageForm from './component/imageForm'



function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <h1>Sube una imagen</h1>
    <ImageForm/>
    </>
  );
}

export default App

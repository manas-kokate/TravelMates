import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import LandingPage from './Pages/LandingPage.jsx'
import Footer from './Components/Footer.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const hideNavFooter = (location.pathname === '/Login') || (location.pathname === '/Signup');

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  )
}

export default App

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
import Discover from './Pages/Discover.jsx'
import Blogs from './Components/Blogs.jsx'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  const hideNavFooter = (location.pathname === '/login') || (location.pathname === '/signup');

  // color Theme: Primary #5E0006 and secondary : #FFF8F0 

  return (
    <>

      {!hideNavFooter && <Navbar />}

      <div className={!hideNavFooter ? "pt-10" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {!hideNavFooter && <Footer />}
    </>
  )
}

export default App

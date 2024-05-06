import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

// pages and components
import Home from './pages/Home.jsx'
import Navbar from './components/navbar.jsx'

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home/>}
              />
            </Routes>
            
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App

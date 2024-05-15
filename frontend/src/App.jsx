import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

// pages and components
import InventoryPage from './pages/InventoryPage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<InventoryPage/>}
              />
            </Routes>
            
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

// pages and components
import InventoryPage from './pages/InventoryPage.jsx'
import Navbar from './components/Navbar.jsx'
import EditInventItemPage from './pages/EditInventItemPage.jsx'

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
              <Route
                path="/inventory/edit/"
                element={<EditInventItemPage/>}
              />
            </Routes>
            
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

// pages and components
import Navbar from './components/Navbar.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import EditInventoryPage from './pages/EditInventoryPage.jsx'
import AddInventoryPage from './pages/AddInventoryPage.jsx'
import GroupPage from './pages/GroupPage.jsx'

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path='/inventory/'
                element={<InventoryPage/>}
              />
              <Route
                path='/inventory/edit/:id'
                element={<EditInventoryPage/>}
              />
              <Route
                path='/inventory/add/'
                element={<AddInventoryPage/>}
              />
              <Route
                path='/groups/'
                element={<GroupPage/>}
              />
            </Routes>
            
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App

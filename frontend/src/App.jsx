import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'

// pages and components
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import EditInventoryPage from './pages/EditInventoryPage.jsx'
import AddInventoryPage from './pages/AddInventoryPage.jsx'
import GroupsPage from './pages/GroupsPage.jsx'
import EditGroupPage from './pages/EditGroupPage.jsx'
import AddGroupPage from './pages/AddGroupPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

function App() {
  return (
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path='/'
                element={<HomePage/>}
              />
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
                element={<GroupsPage/>}
              />
              <Route
                path='/groups/edit/:id'
                element={<EditGroupPage/>}
              />
              <Route
                path='/groups/add/'
                element={<AddGroupPage/>}
              />
              <Route
                path='/signup'
                element={<SignupPage/>}
              />
            </Routes>
            
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App

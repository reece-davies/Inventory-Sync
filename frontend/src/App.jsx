import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles.css'

// Cookies & JWT guide
import Cookies from 'universal-cookie';

// components
import Navbar from './components/Navbar.jsx'

// pages
import HomePage from './pages/HomePage.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import EditInventoryPage from './pages/EditInventoryPage.jsx'
import AddInventoryPage from './pages/AddInventoryPage.jsx'
import GroupsPage from './pages/GroupsPage.jsx'
import EditGroupPage from './pages/EditGroupPage.jsx'
import AddGroupPage from './pages/AddGroupPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function App() {
  //const [cookies, setCookie, removeCookie] = useCookies([]); // react-cookie method
  const cookies = new Cookies()
  const userToken = cookies.get('token');
  //console.log("Cookie token = ", cookies.token) // react-cookie method
  //console.log("userTokenn = ", userToken)

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
                element={<InventoryPage/>} // THIS NEEDS TO BE REVERTED BACK TO    element={userToken ? <InventoryPage/> : <Navigate to='/login'/>}
              />
              <Route
                path='/inventory/edit/:id'
                element={userToken ? <EditInventoryPage/> : <Navigate to='/login'/>}
              />
              <Route
                path='/inventory/add/'
                element={userToken ? <AddInventoryPage/> : <Navigate to='/login'/>}
              />
              <Route
                path='/groups/'
                element={userToken ? <GroupsPage/> : <Navigate to='/login'/>}
              />
              <Route
                path='/groups/edit/:id'
                element={userToken ? <EditGroupPage/> : <Navigate to='/login'/>}
              />
              <Route
                path='/groups/add/'
                element={userToken ? <AddGroupPage/> : <Navigate to='/login'/>}
              />
              <Route
                path='/signup'
                element={!userToken ? <SignupPage/> : <Navigate to='/'/>}
              />
              <Route
                path='/login'
                element={!userToken ? <LoginPage/> : <Navigate to='/'/>}
              />
            </Routes>
            
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App

import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'

import { useState } from 'react'
import { Login } from './components/accounts/Login'
import DataProvider from './context/DataProvider'

import Home from './components/home/Home'
import Header from './components/header/Header'


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}
function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <>
      <div>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/' element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </div>
    </>
  )
}

export default App

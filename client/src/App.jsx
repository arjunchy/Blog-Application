import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'

import { useState } from 'react'
import { Login } from './components/accounts/Login'
import DataProvider from './context/DataProvider'

import Home from './components/home/Home'
import Header from './components/header/Header'
import CreatePost from './components/create/CreatePost'
import DetailView from './components/details/DetailView'

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

              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/create' element={<CreatePost />} />
              </Route>

              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path='/details/:id' element={<DetailView />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </DataProvider>
      </div>
    </>
  )
}

export default App

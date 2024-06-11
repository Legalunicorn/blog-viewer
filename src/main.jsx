import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import router from "./pages/routes"
import { RouterProvider } from 'react-router-dom'

//TODO create auth context and import it here
import { AuthContextProvider } from './context/AuthContext'


//import the appropriate react-context 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)

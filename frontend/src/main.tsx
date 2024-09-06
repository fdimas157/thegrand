import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Search from './pages/Search.tsx';
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
import LoginHotel from './pages/LoginHotel.tsx';
import RegisterHotel from './pages/RegisterHotel.tsx';
import Booking from './pages/Booking.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/search",
    element: <Search/>,
  },
  {
    path: "/admin",
    element: <Admin/>
  },
  {
    path: "/login",
    element: <LoginHotel/>
  },
  {
    path: "/register",
    element: <RegisterHotel/>
  },
  {
    path: "/booking",
    element: <Booking/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

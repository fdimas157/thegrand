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
import Profile from './pages/Profile.tsx';
import AdminHotel from './pages/AdminHotel.tsx';
import LoginAdminHotel from './pages/LoginAdminHotel.tsx';
import RegisterAdminHotel from './pages/RegisterAdminHotel.tsx';

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
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/admin-hotel",
    element: <AdminHotel/>
  },
  {
    path: "/login-hotel",
    element: <LoginAdminHotel/>
  },
  {
    path: "/register-hotel",
    element: <RegisterAdminHotel/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

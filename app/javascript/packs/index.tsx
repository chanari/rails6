import React from "react";
import App from "./App";
import Chart from "./pages/Chart/Chart";
import Navbar from "./components/Navbar/Navbar";
import toast, { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, Outlet
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home/Home";
import Contacts from "./pages/Contact/Contacts";
import useSession from "./utils/session";

const ProtectedRoutes = ({ user, redirectPath = '/' }) => {
  if (user) return <Outlet />

  toast.error('Forbidden!')
  return <Navigate to={redirectPath} replace />
}

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = createRoot(document.getElementById("root"))
  const {userSession} = useSession()

  rootElement.render(
    <Router>
      <Toaster toastOptions={{duration: 1500}}/>
      <Navbar/>
      <Routes>
        <Route index element={<App/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route element={<ProtectedRoutes user={userSession}/>}>
          <Route path="/chart" element={<Chart/>} />
          <Route path="/contacts" element={<Contacts/>}/>
        </Route>
        <Route
          path="*"
          element={<Navigate to={"/"} state={{isNotFound: true}}/>}
        />
      </Routes>
    </Router>
  )
})


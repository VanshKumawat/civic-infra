import { BrowserRouter } from "react-router-dom"
import { useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"

function AppContent() {

  const location = useLocation()

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (
    <>
      {!hideNavbar && <Navbar />}

      <AppRoutes />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
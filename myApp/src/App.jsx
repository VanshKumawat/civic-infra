import { BrowserRouter } from "react-router-dom"

import Navbar from "./components/Navbar"
import AppRoutes from "./routes/AppRoutes"

function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <BrowserRouter>

      <Navbar />

      <AppRoutes />

    </BrowserRouter>
  )
}

export default App
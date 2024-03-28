import { Route, Routes } from "react-router-dom"
import News from "./pages/News"
import Login from "./pages/Login"
import Announcement from "./pages/Announcement"
import Timetable from "./pages/Timetable"
import Dashboard from "./dashboard/Dashboard"



function App() {


  return (
    <>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*"  element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

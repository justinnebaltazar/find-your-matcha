import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Register } from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home */}
        <Route path="/" element={<Home/>}/>

        {/* register */}
        <Route
        path="/register" element={<Register/>}/>

        {/* login */}
        <Route path="/login" element={<Login/>}/>

        {/* user dashboard */}
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
    </BrowserRouter>

  )
}

export default App;
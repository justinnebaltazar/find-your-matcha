import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Register } from "./pages/Register/Register";
import Wrapper from "./pages/Wrapper/Wrapper";
import Navbar from "./pages/Navbar/Navbar";
import Review from "./pages/Review/Review";
import MatchaMap from "./pages/Map/MatchaMap";

function App() {
  return (


    <BrowserRouter>
    <div>
      <Routes>
        {/* home */}
        <Route path="/" element={
          <>
            <Navbar/>
            <Home/>
            <MatchaMap/>
          </>
      }/>

        {/* register */}
        <Route
        path="/register" element={<Register/>}/>

        {/* login */}
        <Route path="/login" element={<Login/>}/>

        {/* user dashboard */}
        
        <Route path="/dashboard" element={
          /* Wrapped components are not accesible unless authenticated */
          <Wrapper>
            <Dashboard/>
          </Wrapper>
        }/>

        <Route path="/map" element={<MatchaMap/>}/>

        <Route path="/review" element={
          /* Wrapped components are not accesible unless authenticated */
            <Review/>

        }/>

      </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App;
import React from "react";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import { AuthContextProvider } from "./context/AuthContext";
import Trailer from "./pages/Trailer";

function App() {
  return (
    <>
    {/* We have to wrap our whole app with the contextProvider */}
    <AuthContextProvider>

      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/account' element={<Account/>} />
        <Route path="/trailer/:id" element={<Trailer/>}/>
      </Routes>
    </AuthContextProvider>
    </>
  );
}

export default App;

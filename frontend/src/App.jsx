import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';

import Home from "./pages/Home";
import Study from "./pages/Study";
import Encrypt from "./pages/Encrypt";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/study" element={<Study />}></Route>
        <Route path="/encrypt" element={<Encrypt />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

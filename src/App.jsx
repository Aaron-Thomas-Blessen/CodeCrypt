import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Study from "./pages/Study";
import Encrypt from "./pages/Encrypt";

const App = () => {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/study" element={<Study />}></Route>
          <Route path="/encrypt" element={<Encrypt />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Study from "./pages/Study";
import Encrypt from "./pages/Encrypt";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RSADetails from "./components/RSADetails";
import AESDetails from "./components/AESDetails";
import DESDetails from "./components/DESDetails";
import SHADetails from "./components/SHADetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study" element={<Study />} />
        <Route path="/study/rsa" element={<RSADetails />} />
        <Route path="/study/aes" element={<AESDetails />} />
        <Route path="/study/des" element={<DESDetails />} />
        <Route path="/study/sha" element={<SHADetails />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

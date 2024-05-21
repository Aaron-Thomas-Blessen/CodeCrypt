import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Study from "./pages/Study";
import Encrypt from "./pages/Encrypt";
import NavBar from "./components/nav";

const App = () => {


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/study" element={<Study />}></Route>
          <Route path="/encrypt" element={<Encrypt />}></Route>
          <Route path="/Nav" element={<NavBar />}></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Adminpage from "./Adminpage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Adminpage" element={<Adminpage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

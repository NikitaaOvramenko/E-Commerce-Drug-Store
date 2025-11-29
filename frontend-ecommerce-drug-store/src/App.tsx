import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Auth-Pages/RegisterationPage";
import LoginPage from "./Auth-Pages/LoginPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app"></div>
        <Routes>
          <Route path="/sign_up" element={<RegistrationPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

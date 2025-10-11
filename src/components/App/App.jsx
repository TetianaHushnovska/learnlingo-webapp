import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useDispatch } from "react-redux";
import { observeUser } from "../../redux/auth/operations";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(observeUser());
  }, [dispatch]);

  return (
    <>
      <Header
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/teachers" element={<Teachers />} /> */}
        </Routes>
      </main>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default App;

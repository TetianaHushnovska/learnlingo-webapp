import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { observeUser } from "../../redux/auth/operations";
import LoginModal from "../LoginModal/LoginModal";
import TeachersPage from "../../pages/TeachersPage/TeachersPage";
import { fetchFavorites } from "../../redux/favorite/operations";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(observeUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFavorites(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("white-bg");
      document.body.classList.remove("gray-bg");
    } else {
      document.body.classList.add("gray-bg");
      document.body.classList.remove("white-bg");
    }
  }, [location]);

  return (
    <>
      <Header
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
        </Routes>
      </main>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import "./App.css";
import { useState } from "react";
import Header from "../Header/Header";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <Header onRegisterClick={() => setShowRegister(true)} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/teachers" element={<Teachers />} /> */}
        </Routes>
      </main>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}

export default App;

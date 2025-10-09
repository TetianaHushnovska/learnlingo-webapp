import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/teachers" element={<Teachers />} /> */}
      </Routes>
    </>
  );
}

export default App;

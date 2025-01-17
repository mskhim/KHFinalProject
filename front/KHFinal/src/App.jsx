import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminMain from "./page/admin/AdminMain.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminMain />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

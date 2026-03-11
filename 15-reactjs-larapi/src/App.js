import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Add from "./pages/AddPets";
import Show from "./pages/ShowPets";
import Edit from "./pages/EditPets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add" element={<Add />} />

        <Route path="/show/:id" element={<Show />} />

        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Accueil from "./pages/Accueil";
import Allcategories from "./pages/AllCategories/Allcategories";
import Professionnel from "./Components/Professionnel/Professionnel";
import Detailsprof from "./Components/DetailsProf/Detailsprof";
import Contactus from "./pages/Contactus/Contactus";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Registertype from "./pages/Registertype/Registertype";
import Registerpro from "./pages/Registerpro/Registerpro";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RegisterType" element={<Registertype />} />
          <Route path="/Register/Client" element={<Register />} />
          <Route path="/Register/Professionnel" element={<Registerpro />} />
          <Route path="/allcategories" element={<Allcategories />} />
          <Route path="/professionnel" element={<Professionnel />} />
          <Route path="/Details" element={<Detailsprof />} />
          <Route path="/Contact" element={<Contactus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

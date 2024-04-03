import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Accueil from "./pages/Accueil";
import Loginandregister from "./pages/LoginAndRegister/Loginandregister";
import Allcategories from "./pages/AllCategories/Allcategories";
import Professionnel from "./Components/Professionnel/Professionnel";
import Detailsprof from "./Components/DetailsProf/Detailsprof";
import Contactus from "./pages/Contactus/Contactus";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/loginandregister" element={<Loginandregister />} />
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Accueil from "./pages/Accueil";
import Loginandregister from "./pages/LoginAndRegister/Loginandregister";
import Allcategories from "./pages/AllCategories/Allcategories";
import Professionnel from "./Components/Professionnel/Professionnel";

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";

import Footer from "./Components/Footer/Footer";
import Info from "./Components/Infos/Info";
import Navbar from "./Components/Navbar/Navbar";
import Search from "./Components/Search/Search";
import Slider from "./Components/Slider/Slider";
import Stats from "./Components/Stats/Stats";

function App() {
  return (
    <>
      <Navbar />
      <Slider />
      <Search />
      <Info />
      <Stats />
      <Footer />
    </>
  );
}

export default App;

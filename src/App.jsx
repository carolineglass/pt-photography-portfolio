import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Street from "./pages/Street";
import Music from "./pages/Music";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl mx-auto p-8 min-h-[calc(100vh-300px)] md:min-h-[calc(100vh-212px)]">
        <Routes>
          <Route path="/" element={<Street />} />
          <Route path="/street" element={<Street />} />
          <Route path="/music" element={<Music />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

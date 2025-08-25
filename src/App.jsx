import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import CategoryPage from "./pages/CategoryPage";
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
          <Route path="/" element={<CategoryPage />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

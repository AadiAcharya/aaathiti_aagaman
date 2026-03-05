import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Project from "./components/projects/Project";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-background mx-40 text-white max-w-5xl flex p-[32px 0 8px 0] items-end justify-between">
        <div>
          <Link to="/">herman</Link>
        </div>
        <div className="flex gap-8">
          <Link to="/">
            <span className="text-primary">#</span>
            <span>home</span>
          </Link>
          <Link to="/about">
            <span className="text-primary">#</span>
            <span>about</span>
          </Link>
          <Link to="/projects">
            <span className="text-primary">#</span>
            <span>project</span>
          </Link>
          <Link to="/contact">
            <span className="text-primary">#</span>
            <span>contacts</span>
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/nav" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

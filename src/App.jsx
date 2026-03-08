import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/home/Home';
import './App.css';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as needed */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/projects" element={<Projects />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

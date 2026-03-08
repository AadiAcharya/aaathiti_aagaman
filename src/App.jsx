import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home_Example from '../addditinal data/files/Home_EXAMPLE'
import Home from './components/Home';
import './App.css';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<Home_Example/>} />
        {/* Add more routes here as needed */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/projects" element={<Projects />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

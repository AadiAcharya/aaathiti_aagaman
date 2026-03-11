import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home_Example from "../addditinal data/files/Home_EXAMPLE";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Search from "./components/Search";
import Rooms from "./components/Rooms";
import Hosting from "./components/Hosting";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home_Example />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/search" element={<Search />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/hosting" element={<Hosting />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

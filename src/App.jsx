import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Properties from "./components/Properties";
import AddProperty from "./components/AddProperty/AddProperty.jsx";
import AddProperty2 from "./components/AddProperty/AddProperty2.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/add-proop" element={<AddProperty2 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

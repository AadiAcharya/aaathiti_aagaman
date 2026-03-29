import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Account from "./components/Account";
import Hosting from "./components/Hosting";
import Messages from "./components/Messages";
import Rooms from "./components/Rooms";
import Search from "./components/Search";
import Wishlist from "./components/Wishlist";
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
            <Route path="/account" element={<Account />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/add-property2" element={<AddProperty2 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
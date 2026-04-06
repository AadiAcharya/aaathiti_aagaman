import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Account from "./components/Account";
import Hosting from "./components/Hosting";
import Messages from "./components/Messages";
// import Room from "./components/room/Room";
import Rooms from "./components/rooms/Rooms";
import Search from "./components/Search";
import Wishlist from "./components/Wishlist";
import AddProperty from "./components/AddProperty/AddProperty.jsx";
import RoomStatus from "./components/rooms/RoomStatus";
import HostReservation from "./components/host/HostReservation.jsx"
import TransactionHistory from "./components/host/TransactionHistory.jsx"
import NotificationsPage from "./components/host/NotificationsPage.jsx"
import MessagesPage from "./components/host/MessagesPage.jsx"
import Post from "./components/AddProperty/Post.jsx"

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
            {/* <Route path="/room" element={<Room/>} /> */}
            <Route path="/rooms" element={<Rooms/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/room-status" element={<RoomStatus />} />
            <Route path="/reservation" element={<HostReservation/>} />
            <Route path="/transactionh" element={<TransactionHistory/>} />
            <Route path="notification" element={<NotificationsPage/>} />
            <Route path="message" element={<MessagesPage/>} />
            <Route path="post" element={<Post/>} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
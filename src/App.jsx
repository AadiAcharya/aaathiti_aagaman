import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Account from "./components/Account";
import Hosting from "./components/Hosting";
import Messages from "./components/Messages";
import Room from "./components/rooms/Room";
import Rooms from "./components/rooms/Rooms";
import Search from "./components/Search";
import Wishlist from "./components/Wishlist";
import AddProperty from "./components/AddProperty/AddProperty.jsx";
import Amenities from "./components/AddProperty/Amenities.jsx";
import Description from "./components/AddProperty/Description.jsx";
import Facilities from "./components/AddProperty/Facilities.jsx";
import Post from "./components/AddProperty/Post.jsx";
import Saftey from "./components/AddProperty/Saftey.jsx";
import RoomStatus from "./components/rooms/RoomStatus.jsx";
import HostReservation from "./components/host/HostReservation.jsx";
import TransactionHistory from "./components/host/TransactionHistory.jsx";
import NotificationsPage from "./components/host/NotificationsPage.jsx";
import MessagesPage from "./components/host/MessagesPage.jsx";
import SignIn from "./components/sign/SignIn.jsx";
import Login from "./components/sign/Login.jsx";
import MainLayout from "./MainLayout";
import Host from "./components/Host.jsx";
import Help from "./components/Help.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import RentalGuide from "./components/RentalGuide.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route element={<MainLayout />} /> */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/account" element={<Account />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/room" element={<Room />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/search" element={<Search />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/description" element={<Description />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/post" element={<Post />} />
            <Route path="/safety" element={<Saftey />} />
            <Route path="/room-status" element={<RoomStatus />} />
            <Route path="/reservation" element={<HostReservation />} />
            <Route path="/transactionh" element={<TransactionHistory />} />
            <Route path="notification" element={<NotificationsPage />} />
            <Route path="message" element={<MessagesPage />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<Login />} />
            <Route path="host" element={<Host />} />
            <Route path="help" element={<Help />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="rental-guide" element={<RentalGuide />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/ui/Toast";
import RoleRoute from "./RoleRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Account from "./components/Account";
import Hosting from "./components/Hosting";
import Messages from "./components/Messages";
import Room from "./components/rooms/Room";
import Rooms from "./components/rooms/Rooms";
import Wishlist from "./components/Wishlist";
import AddProperty from "./components/AddProperty/AddProperty.jsx";
import Amenities from "./components/AddProperty/Amenities.jsx";
import Description from "./components/AddProperty/Description.jsx";
import Facilities from "./components/AddProperty/Facilities.jsx";
import Post from "./components/AddProperty/Post.jsx";
import Saftey from "./components/AddProperty/Saftey.jsx";
import HostReservation from "./components/host/HostReservation.jsx";
import TransactionHistory from "./components/host/TransactionHistory.jsx";
import NotificationsPage from "./components/host/NotificationsPage.jsx";
import SignIn from "./components/sign/SignIn.jsx";
import SignUp from "./components/sign/SignUp.jsx";
import ForgotPassword from "./components/sign/ForgotPassword.jsx";
import ResetPassword from "./components/sign/ResetPassword.jsx";
import Host from "./components/Host.jsx";
import Help from "./components/Help.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import RentalGuide from "./components/RentalGuide.jsx";
import Profile from "./components/Profile.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import NotFound from "./components/NotFound.jsx";

// Hosts/admins land on their own dashboard instead of the guest homepage
function HomeGate() {
  const { role } = useAuth();
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "host") return <Navigate to="/host" replace />;
  return <Home />;
}

function AppContent() {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div
        className={`min-h-screen flex flex-col ${
          theme === "dark"
            ? "bg-background text-text-primary"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeGate />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/room" element={<Room />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/search" element={<Navigate to="/rooms" replace />} />
            <Route path="/properties" element={<Navigate to="/rooms" replace />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/add-property"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <AddProperty />
                </RoleRoute>
              }
            />
            <Route
              path="/amenities"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <Amenities />
                </RoleRoute>
              }
            />
            <Route
              path="/description"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <Description />
                </RoleRoute>
              }
            />
            <Route
              path="/facilities"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <Facilities />
                </RoleRoute>
              }
            />
            <Route
              path="/post"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <Post />
                </RoleRoute>
              }
            />
            <Route
              path="/safety"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <Saftey />
                </RoleRoute>
              }
            />
            <Route path="/room-status" element={<Navigate to="/host" replace />} />
            <Route
              path="/reservation"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <HostReservation />
                </RoleRoute>
              }
            />
            <Route
              path="/transactionh"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <TransactionHistory />
                </RoleRoute>
              }
            />
            <Route
              path="notification"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <NotificationsPage />
                </RoleRoute>
              }
            />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="host"
              element={
                <RoleRoute allow={["host", "admin"]}>
                  <Host />
                </RoleRoute>
              }
            />
            <Route path="help" element={<Help />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="rental-guide" element={<RentalGuide />} />
            <Route
              path="/admin"
              element={
                <RoleRoute allow={["admin"]}>
                  <AdminDashboard />
                </RoleRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

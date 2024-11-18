import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClientProvider
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import OperatorRegister from "./pages/OperatorRegister";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AdminDashBoard from "./pages/AdminDashBoard";
import PassengerDashBoard from "./pages/PassengerDashBoard";
import BusOperatorDashBoard from "./pages/BusOperatorDashBoard";
import Navbar from "./components/Navbar";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function App() {
  return (
    // Wrap the app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          {/* Navbar section */}
          <div className="bg-white shadow-md">
            <Navbar />
          </div>

          {/* Content section with background image */}
          <div
            className="min-h-screen"
            style={{
              backgroundImage: "url('/bus.jpg')", // Use image from the public folder
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#333",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "16px",
                },
              }}
            />

            {/* Routes section */}
            <div className="container mx-auto px-4 py-12">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/operator/register" element={<OperatorRegister />} />

                {/* Private Routes */}
                <Route
                  path="/admin/dashboard"
                  element={<AdminDashBoard />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
                <Route
                  path="/passenger/dashboard"
                  element={<PassengerDashBoard />}
                />
                <Route
                  path="/operator/dashboard"
                  element={<BusOperatorDashBoard />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

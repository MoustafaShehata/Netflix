import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";
import Footer from "./components/Footer";
import NotFoundPage from "./Pages/NotFoundPage";
import WatchPage from "./Pages/WatchPage";
import SearchPage from "./Pages/SearchPage";
import HistoryPage from "./Pages/HistoryPage";
const App = () => {
  const { user, authcheck, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    authcheck();
  }, [authcheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen  bg-black flex justify-center items-center">
        <LoaderPinwheel className="animate-spin text-red-600 " size={35} />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/login"} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
};
export default App;

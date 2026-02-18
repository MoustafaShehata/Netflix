import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/Auth/SignupPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/userAuth";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import { SkeletonTheme } from "react-loading-skeleton";
import HistoryPage from "./pages/HistoryPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <>
        <div className="h-screen bg-black flex justify-center items-center">
          <Loader className="text-red-500 animate-spin" size={30} />
        </div>
      </>
    );
  }
  return (
    <SkeletonTheme baseColor="#1f1f1f" highlightColor="#2a2a2a">
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />

        <Route
          path="/signup"
          element={
            !user ? (
              <SignupPage />
            ) : !user.isVerified ? (
              <SignupPage />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/verifyemail"
          element={
            !user?.isVerified ? <VerifyEmailPage /> : <Navigate to={"/"} />
          }
        />
        <Route
          path="/login"
          element={
            !user ? (
              <LoginPage />
            ) : !user.isVerified ? (
              <Navigate to={"/verifyemail"} />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route
          path="/movie-details"
          element={
            user?.isVerified ? <MovieDetailsPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/history"
          element={
            user?.isVerified ? <HistoryPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/search"
          element={
            user?.isVerified ? <SearchPage /> : <Navigate to={"/login"} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </SkeletonTheme>
  );
};
export default App;

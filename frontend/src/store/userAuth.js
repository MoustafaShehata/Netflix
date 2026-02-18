import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isVerifingEmail: false,
  isLogging: false,
  sendingResetLink: false,
  isresetingPassword: false,
  isCheckingAuth: true,
  isLoggingOut: false,

  // signup
  signup: async (credentials) => {
    set({ isSigningUp: true, isExistingUser: false });

    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);

      set({
        isSigningUp: false,
        user: response.data.user,
        isExistingUser: false,
      });

      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      set({
        isSigningUp: false,
        user: null,
        isExistingUser: true,
      });

      toast.error(error.response.data.message || "Failed to signup");
      return { success: false };
    }
  },

  // verifyEmail
  verifyEmail: async (credentials) => {
    set({ isVerifingEmail: true });
    try {
      const response = await axios.post(
        "/api/v1/auth/verifyemail",
        credentials,
      );
      set({ isVerifingEmail: false, user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      set({ isVerifingEmail: false, user: null });
      toast.error(error.response.data.message || "Failed to verifyEmail");
    }
  },

  // login
  login: async (credentials) => {
    set({ isLogging: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ isLogging: false, user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      set({ isLogging: false, user: null });
      toast.error(error.response.data.message || "Failed to login");
    }
  },

  // forgot-password
  forgotPassword: async (credentials) => {
    set({ sendingResetLink: true });
    try {
      const response = await axios.post(
        "/api/v1/auth/forgot-password",
        credentials,
      );
      set({ sendingResetLink: false, user: null });
      toast.success(response.data.message);
    } catch (error) {
      set({ sendingResetLink: false, user: null });
      toast.error(
        error.response.data.message || "Failed to send the reset link",
      );
    }
  },

  // reset-password
  resetPassword: async (credentials) => {
    set({ isresetingPassword: true });
    try {
      const response = await axios.post(
        "/api/v1/auth/reset-password",
        credentials,
      );
      set({ isresetingPassword: false, user: null });
      toast.success(response.data.message);
    } catch (error) {
      set({ isresetingPassword: false, user: null });
      toast.error(error.response.data.message || "Failed to reset password");
    }
  },

  // authCheck
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authcheck");
      set({ isCheckingAuth: false, user: response.data.user });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },

  // logout
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axios.get("/api/v1/auth/logout");
      set({ isLoggingOut: false, user: null });
      toast.success(response.data.message);
    } catch (error) {
      set({ isLoggingOut: false, user: null });
      toast.error(error.response.data.message || "Failed to logged out");
    }
  },
}));

import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  isLogingOut: false,

  // Sigup
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success(response.data.message);
    } catch (error) {
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || "Faied to signup ");
    }
  },

  // Login
  login: async (credentials) => {
    set({ isLogingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLogingIn: false });
      toast.success(response.data.message);
    } catch (error) {
      set({ user: null, isLogingIn: false });
      toast.error(error.response.data.message || "Faied to login");
    }
  },

  // Logout
  logout: async () => {
    set({ isLogingOut: true });
    try {
      const response = await axios.get("/api/v1/auth/logout");
      set({ user: null, isLogingOut: false });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Faied to logout");
      set({ user: null, isLogingOut: false });
    }
  },

  // authCheck
  authcheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authcheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));

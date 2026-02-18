import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useGetMoviesStore = create((set) => ({
  type: "movie",
  trendingMovie: {},
  isTrendingMovieLoading: false,
  isMoviesByCategoryLoading: false,
  movieSearchResults: [],
  isMovieSearchResultsLoading: false,
  getHistoryDataResults: [],
  isGetHistoryDataLoading: false,
  movieTrailersResults: [],
  isMovieTrailersResultsLoading: false,
  movieDetailsResults: [],
  isMovieDetailsResultsLoading: false,
  movieSimilarResults: [],
  isMovieSimilarResultsLoading: false,

  //   setType
  setType: async (type) => set({ type: type }),

  // getTrendingMovie || TV
  getTrendingMovie: async (type) => {
    set({ isTrendingMovieLoading: true });
    try {
      const response = await axios.get(`/api/v1/${type}/trending`);
      set({
        trendingMovie: response.data.content,
        isTrendingMovieLoading: false,
      });
    } catch (error) {
      set({ trendingMovie: {}, isTrendingMovieLoading: true });
      console.log("Error in useGetMoviesStore in getTrendingMovie fn ");
    }
  },

  // setIsMoviesByCategoryLoading
  setIsMoviesByCategoryLoading: async (isloading) =>
    set({ isMoviesByCategoryLoading: isloading }),

  // getMovieSearchResults
  getMovieSearchResults: async (searchType, searchInputValue) => {
    set({ isMovieSearchResultsLoading: true });
    try {
      const response = await axios.get(
        `/api/v1/search/${searchType}/${searchInputValue}`,
      );
      set({
        movieSearchResults: response.data.content,
        isMovieSearchResultsLoading: false,
      });
    } catch (error) {
      if (error.response.status == 404) {
        toast.error("Not found");
      }
      set({ movieSearchResults: [], isMovieSearchResultsLoading: false });
      console.log("Error in useGetMoviesStore in getMovieSearchResults fn ");
    }
  },

  // makeMovieSearchResultsEmptyOnceChangeBtn
  makeMovieSearchResultsEmptyOnceChangeBtn: async () => {
    set({ movieSearchResults: [] });
  },

  // addItemToHistory
  addItemToHistory: async (data) => {
    try {
      const response = await axios.post(`/api/v1/search/history/add`, data);
      // toast.success(response.data.message);
    } catch (error) {
      // toast.error("can't saved to history");
      console.log("Error in useGetMoviesStore in addItemToHistory fn ");
    }
  },

  // GetHistoryData
  GetHistoryData: async () => {
    set({ isGetHistoryDataLoading: true });
    try {
      const response = await axios.get(`/api/v1/search/history`);
      set({
        getHistoryDataResults: response.data.content,
        isGetHistoryDataLoading: false,
      });
    } catch (error) {
      set({
        getHistoryDataResults: [],
        isGetHistoryDataLoading: false,
      });

      console.log("Error in useGetMoviesStore in GetHistoryData fn ");
    }
  },

  // SetHistoryData
  SetHistoryData: async (data) => {
    set({ getHistoryDataResults: data });
  },

  // removeMovieFromHistory
  removeMovieFromHistory: async (id) => {
    try {
      const response = await axios.delete(`api/v1/search/history/remove/${id}`);
      set({ getHistoryDataResults: response.data.content });
      toast.success("removed successfully");
    } catch (error) {
      console.log("Error in useGetMoviesStore in removeMovieFromHistory fn ");
    }
  },

  // getMovieTrailers
  getMovieTrailers: async (type, id) => {
    set({ isMovieTrailersResultsLoading: true });
    try {
      const response = await axios.get(`/api/v1/${type}/trailers/${id}`);
      set({
        isMovieTrailersResultsLoading: false,
        movieTrailersResults: response.data.content,
      });
    } catch (error) {
      set({
        isMovieTrailersResultsLoading: false,
        movieTrailersResults: [],
      });
      console.log("Error in useGetMoviesStore in getMovieTrailers fn ");
    }
  },

  // getMovieDetails
  getMovieDetails: async (type, id) => {
    set({ isMovieDetailsResultsLoading: true });
    try {
      const response = await axios.get(`/api/v1/${type}/details/${id}`);
      set({
        isMovieDetailsResultsLoading: false,
        movieDetailsResults: response.data.content,
      });
    } catch (error) {
      set({
        isMovieDetailsResultsLoading: false,
        movieDetailsResults: [],
      });
      console.log("Error in useGetMoviesStore in getMovieDetails fn ");
    }
  },

  // getMovieSimilar
  getMovieSimilar: async (type, id) => {
    set({ isMovieSimilarResultsLoading: true });
    try {
      const response = await axios.get(`/api/v1/${type}/similar/${id}`);
      set({
        isMovieSimilarResultsLoading: false,
        movieSimilarResults: response.data.content,
      });
    } catch (error) {
      set({
        isMovieSimilarResultsLoading: false,
        movieSimilarResults: [],
      });
      console.log("Error in useGetMoviesStore in getMovieSimilar fn ");
    }
  },
}));

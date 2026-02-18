import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Search } from "lucide-react";
import { useGetMoviesStore } from "../store/getMovies";
import toast from "react-hot-toast";
import { smallTMDBImg } from "../store/constants";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SearchPageCardSkeleton from "../components/skeletons/SearchPageCardSkeleton";

const SearchPage = () => {
  const {
    getMovieSearchResults,
    movieSearchResults,
    isMovieSearchResultsLoading,
    makeMovieSearchResultsEmptyOnceChangeBtn,
    setType,
    addItemToHistory,
    type,
  } = useGetMoviesStore();

  const [movieSearchType, setMovieSearchType] = useState("movie");
  const [searchInputValue, setSearchInputValue] = useState("");

  // handleFormSubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (searchInputValue.trim() == "") {
      return toast.error("Please enter something to search");
    }
    getMovieSearchResults(movieSearchType, searchInputValue);

    if (movieSearchType !== "person") {
      setType(movieSearchType);
    }
  };

  // handleMovieBtnClicked
  const handleMovieBtnClicked = (type) => {
    makeMovieSearchResultsEmptyOnceChangeBtn();
    setSearchInputValue("");
    setMovieSearchType(type);
  };

  //  handleSendingMovieDataToDB
  const handleSendingMovieDataToDB = (data) => {
    addItemToHistory(data);
    if (movieSearchType !== "person") {
      makeMovieSearchResultsEmptyOnceChangeBtn();
    }
  };

  return (
    <>
      <div className="min-h-screen py-4 bg-black text-white">
        {/* Nav-start */}
        <Nav />
        {/* Nav-end */}

        <div className="mt-[3em] flex flex-col items-center space-y-8">
          <div className=" flex gap-8">
            <button
              onClick={() => handleMovieBtnClicked("movie")}
              className={`px-4 py-2 cursor-pointer rounded  ${
                movieSearchType == "movie" ? "bg-red-500" : "bg-gray-800"
              }
            `}
            >
              Movies
            </button>
            <button
              onClick={() => handleMovieBtnClicked("tv")}
              className={`px-4 py-2 cursor-pointer rounded  ${
                movieSearchType == "tv" ? "bg-red-500" : "bg-gray-800"
              }
            `}
            >
              TV Shows
            </button>
            <button
              onClick={() => handleMovieBtnClicked("person")}
              className={`px-4 py-2 cursor-pointer rounded  ${
                movieSearchType == "person" ? "bg-red-500" : "bg-gray-800"
              }
            `}
            >
              Person
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <input
              className="w-[18em] md:w-[25em] h-[2.5em] px-2 rounded  bg-gray-800 text-white focus:outline-none"
              type="text"
              placeholder={`search about ${movieSearchType} `}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <button type="submit" className="px-2 bg-red-500 rounded">
              <Search />
            </button>
          </form>
        </div>

        {/* section-Results-start */}

        {isMovieSearchResultsLoading ? (
          <SearchPageCardSkeleton />
        ) : (
          <section className="mt-[2em] mb-[4em] flex flex-wrap justify-center gap-4 px-[10em]">
            {movieSearchResults.map((movie, index) => {
              if (movieSearchType === "person" && movie?.profile_path) {
                return (
                  <div
                    onClick={() =>
                      handleSendingMovieDataToDB({
                        id: movie.id,
                        img: movie.profile_path,
                        title: movie.name,
                        type: movieSearchType,
                      })
                    }
                    key={index}
                    className="bg-gray-500 w-fit px-4 py-2 cursor-pointer"
                  >
                    <img
                      className="max-w-[15em] h-[20em] object-cover"
                      src={`${smallTMDBImg}/${movie?.profile_path}`}
                      alt="movie-img"
                    />
                    <h3 className="text-center">
                      {movie?.name?.length > 20
                        ? movie?.name.slice(0, 20) + "..."
                        : movie?.name}
                    </h3>
                  </div>
                );
              } else if (movie?.backdrop_path) {
                return (
                  <Link
                    onClick={() =>
                      handleSendingMovieDataToDB({
                        id: movie.id,
                        img: movie.backdrop_path,
                        title: movie.name || movie.title,
                        type: movieSearchType,
                      })
                    }
                    to={`/movie-details?type=${type}&id=${movie?.id}`}
                    className="bg-gray-500 w-fit px-4 py-2 cursor-pointer"
                    key={index}
                  >
                    <img
                      loading="lazy"
                      className="max-w-[15em] h-[20em] object-cover"
                      src={`${smallTMDBImg}/${movie?.backdrop_path}`}
                      alt="movie-img"
                    />
                    <h3 className="text-center">
                      {movieSearchType === "movie"
                        ? movie?.title?.length > 20
                          ? movie?.title.slice(0, 20) + "..."
                          : movie?.title
                        : movie?.name?.length > 20
                          ? movie?.name.slice(0, 20) + "..."
                          : movie?.name}
                    </h3>
                  </Link>
                );
              }
            })}
          </section>
        )}

        {/* section-Results-end */}
      </div>
      <Footer />
    </>
  );
};
export default SearchPage;

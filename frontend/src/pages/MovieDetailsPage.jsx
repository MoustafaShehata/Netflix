import { useEffect, useRef, useState } from "react";
import { useGetMoviesStore } from "../store/getMovies";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactPlayer from "react-player";
import { orignalTMDBImg, smallTMDBImg } from "../store/constants";
import { Link, useNavigate } from "react-router-dom";
import MovieDetailsTrailerSkeleton from "../components/skeletons/MovieDetailsTrailerSkeleton";

const MovieDetailsPage = () => {
  const { type } = useGetMoviesStore();

  const {
    getMovieTrailers,
    movieTrailersResults,
    isMovieTrailersResultsLoading,
    getMovieDetails,
    movieDetailsResults,
    isMovieDetailsResultsLoading,
    getMovieSimilar,
    movieSimilarResults,
    isMovieSimilarResultsLoading,
  } = useGetMoviesStore();

  const { searchParams } = new URL(document.location);
  const movieType = searchParams.get("type");
  const id = searchParams.get("id");

  useEffect(() => {
    getMovieTrailers(movieType, id);
    getMovieDetails(movieType, id);
    getMovieSimilar(movieType, id);
  }, []);

  const [movieTrailersIndex, setMovieTrailersIndex] = useState(0);

  // getNextTrailer
  const getNextTrailer = () => {
    if (movieTrailersIndex < movieTrailersResults.length - 1) {
      setMovieTrailersIndex(movieTrailersIndex + 1);
    }
  };

  // getPreviousTrailer
  const getPreviousTrailer = () => {
    if (movieTrailersIndex > 0) {
      setMovieTrailersIndex(movieTrailersIndex - 1);
    }
  };

  // slider
  const [activeSliderBtns, setActiveSliderBtns] = useState(false);
  const sliderRef = useRef(null);

  // scrollLeft
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // scrollRight
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNavigateToMovie = (type, id) => {
    getMovieTrailers(type, id);
    getMovieDetails(type, id);
    getMovieSimilar(type, id);
  };

  return (
    <>
      <div className="min-h-screen pb-2 bg-black text-white">
        <Nav />

        {/* Trailers-sec-start */}
        <section className="relative  h-[50em]">
          <div className="z-20">
            <button
              onClick={getPreviousTrailer}
              className={`absolute top-1/8 left-1/8 px-4 py-2 rounded bg-neutral-600  ${
                movieTrailersIndex == 0
                  ? `cursor-not-allowed`
                  : `cursor-pointer`
              }`}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={getNextTrailer}
              className={`absolute top-1/8 right-1/8 px-4 py-2 rounded bg-neutral-600  ${
                movieTrailersIndex < movieTrailersResults.length - 1
                  ? `cursor-pointer`
                  : `cursor-not-allowed`
              }`}
            >
              <ArrowRight />
            </button>
          </div>
          {isMovieTrailersResultsLoading ? (
            <MovieDetailsTrailerSkeleton />
          ) : movieTrailersResults.length == 0 ? (
            <div className="h-full flex justify-center items-center">
              <h4 className="font-bold text-2xl text-red-500 ">
                No Trailers Found
              </h4>
            </div>
          ) : (
            <div className="flex justify-center px-4  h-full items-center">
              <ReactPlayer
                width={"50em"}
                height={"30em"}
                src={`https://www.youtube.com/watch?v=${movieTrailersResults[movieTrailersIndex]?.key}`}
              />
            </div>
          )}
        </section>
        {/* Trailers-sec-end */}

        {/* details-sec-start */}
        <section className="h-[40em] flex flex-col md:flex-row justify-around items-center space-y-8 px-4">
          {/* content-start */}
          <div className="space-y-4 text-center md:text-start">
            <h2 className="font-bold text-4xl">
              {movieDetailsResults?.title || movieDetailsResults?.name}
            </h2>
            <h4 className="font-bold">
              {movieDetailsResults?.release_date ||
                movieDetailsResults?.first_air_date}
              {" | "}{" "}
              {movieDetailsResults?.adult == true ? (
                <b className="text-red-500">adult</b>
              ) : (
                <b className="text-red-500">PG-13</b>
              )}
            </h4>
            <p className="max-w-[30em]">
              {movieDetailsResults?.overview?.length > 100
                ? movieDetailsResults?.overview?.slice(0, 100) + "..."
                : movieDetailsResults?.overview}
            </p>
          </div>
          {/* content-end */}

          <img
            loading="lazy"
            className="h-[35em] w-[25em] object-cover rounded"
            src={`${orignalTMDBImg + movieDetailsResults?.backdrop_path}`}
            alt="movie-img"
          />
        </section>
        {/* details-sec-end */}

        {/* similar-sec-start */}
        <section className=" h-[40em] px-[2em] flex flex-col justify-center space-y-8">
          <h2 className="text-4xl font-bold">Similar Movies/TV Shows</h2>
          <div className=" relative">
            <div
              onMouseEnter={() => setActiveSliderBtns(true)}
              onMouseLeave={() => setActiveSliderBtns(false)}
              ref={sliderRef}
              className=" flex overflow-x-auto hide-scrollbar gap-4 "
            >
              {movieSimilarResults.map((movie, index) => {
                if (!movie?.backdrop_path) return;
                return (
                  <Link
                    to={`/movie-details?type=${type}&id=${movie?.id}`}
                    onClick={() => handleNavigateToMovie(type, movie.id)}
                    key={index}
                  >
                    <img
                      loading="lazy"
                      className="max-w-[15em] h-[20em] object-cover rounded "
                      src={`${smallTMDBImg + movie?.backdrop_path}`}
                      alt="movie-img"
                    />
                    <h4 className="text-center font-bold">
                      {movie?.name || movie?.title}
                    </h4>
                  </Link>
                );
              })}

              {activeSliderBtns && (
                <>
                  <button
                    onClick={scrollLeft}
                    className={`hidden md:flex absolute top-1/3 left-4 px-4 py-2  bg-neutral-600 cursor-pointer rounded  `}
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    onClick={scrollRight}
                    className={`hidden md:flex absolute top-1/3 right-4 px-4 py-2  bg-neutral-600 cursor-pointer rounded  `}
                  >
                    <ArrowRight />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
        {/* similar-sec-end */}
      </div>
      <Footer />
    </>
  );
};
export default MovieDetailsPage;

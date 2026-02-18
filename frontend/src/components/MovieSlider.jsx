import { useEffect, useRef, useState } from "react";
import { smallTMDBImg } from "../store/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGetMoviesStore } from "../store/getMovies";
import MovieSliderSkeleton from "./skeletons/MovieSliderSkeleton";

const MovieSlider = ({ type, category }) => {
  const [activeBtnsSlider, setActiveBtnsSlider] = useState(false);
  const sliderRef = useRef(null);
  const [movieCategoryResults, setMovieCategoryResults] = useState([]);
  const { setIsMoviesByCategoryLoading, isMoviesByCategoryLoading } =
    useGetMoviesStore();

  const handleType = type == "movie" ? "Movies" : "TV Shows";
  const handleCategory = (
    category.slice(0, 1).toUpperCase() + category.slice(1)
  )
    .split("_")
    .join(" ");

  useEffect(() => {
    // getMoviesByCategory
    const getMoviesByCategory = async (type, category) => {
      setIsMoviesByCategoryLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/${type}/category/${category}`,
        );
        setMovieCategoryResults(response.data.content);
        setIsMoviesByCategoryLoading(false);
      } catch (error) {
        setIsMoviesByCategoryLoading(true);
        console.log("Error in getMoviesByCategory in MovieSlider Component");
      }
    };
    getMoviesByCategory(type, category);
  }, [type, category]);

  // Slider

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6">
      <h1 className="text-2xl md:text-3xl font-bold py-8">
        {handleCategory + " " + handleType}
      </h1>

      {isMoviesByCategoryLoading ? (
        <MovieSliderSkeleton />
      ) : (
        <div
          onMouseEnter={() => setActiveBtnsSlider(true)}
          onMouseLeave={() => setActiveBtnsSlider(false)}
          className="relative"
        >
          <div
            ref={sliderRef}
            className="flex gap-4  overflow-x-auto hide-scrollbar"
          >
            {movieCategoryResults.map((movie, index) => (
              <Link
                to={`/movie-details?type=${type}&id=${movie?.id}`}
                className="space-y-4"
                key={index}
              >
                <img
                  loading="lazy"
                  className="max-w-[20em] h-[20em] object-cover rounded hover:scale-90 cursor-pointer ease-in-out duration-200"
                  src={`${smallTMDBImg}/${movie?.poster_path}`}
                  alt="movie-img"
                />
                <h5 className="text-center font-bold">
                  {movie?.title || movie?.name}
                </h5>
              </Link>
            ))}
          </div>

          {activeBtnsSlider && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute top-5/12 left-0 bg-gray-600 rounded-full p-2"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={scrollRight}
                className="absolute top-5/12 right-0 bg-gray-600 rounded-full p-2"
              >
                <ArrowRight />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSlider;

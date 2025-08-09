import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const handlCategoryType = contentType == "movie" ? "Movies" : "TV Shows";
  const handlCategoryTitle =
    category[0].toUpperCase("").replaceAll("_", " ") +
    category.replaceAll("_", " ").slice(1);

  // fetch-contentByCategory
  const [contentByCategory, setContentByCategory] = useState([]);
  useEffect(() => {
    const getContentByCategory = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/category/${category}`
        );
        setContentByCategory(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getContentByCategory();
  }, [contentType, category]);

  //   Slider-start
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

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
  //   Slider-end

  return (
    // Section-start
    <section className="text-white px-10 ">
      <h1 className="mb-5  text-2xl  font-bold">
        {handlCategoryTitle} {handlCategoryType}
      </h1>
      <div
        onMouseEnter={() => setShowArrows(!showArrows)}
        onMouseLeave={() => setShowArrows(!showArrows)}
        className="relative "
      >
        <div
          className=" flex pl-2 overflow-x-scroll hide-x-sidebar space-y-3"
          ref={sliderRef}
        >
          {/* Movie-content-start */}
          {contentByCategory.map((item) => (
            <Link key={item.id} to={`/watch/${item.id}`}>
              <div className=" min-w-[250px] overflow-hidden cursor-pointer">
                <img
                  className="  transition-all hover:scale-[1.2] duration-500 ease-in-out delay-75"
                  src={SMALL_IMG_BASE_URL + item?.backdrop_path}
                  alt="categoy-img"
                />
                <h5 className="text-center pt-8  text-md ">
                  {item?.name?.length > 25
                    ? item?.name?.slice(0, 25) + "..."
                    : item?.name}
                  {item?.title?.length > 25
                    ? item?.title?.slice(0, 25) + "..."
                    : item?.title}
                </h5>
              </div>
            </Link>
          ))}
          {/* Movie-content-end */}
        </div>
        {/* Slider-start */}
        {showArrows && (
          <>
            <button
              onClick={scrollRight}
              className="absolute top-1/4 -right-5 flex justify-center items-center w-[3em] h-[3em] rounded-full py-text-white  bg-gray-800/90 text-sm cursor-pointer z-10"
            >
              <ChevronRight />
            </button>

            <button
              onClick={scrollLeft}
              className="absolute top-1/4 -left-5 flex justify-center items-center w-[3em] h-[3em] rounded-full py-text-white  bg-gray-800/90 text-sm cursor-pointer z-10"
            >
              <ChevronLeft />
            </button>
          </>
        )}
        {/* Slider-end */}
      </div>
    </section>
    // Section-end
  );
};
export default MovieSlider;

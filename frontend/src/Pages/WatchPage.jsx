import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useContentStore } from "../store/content";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
const WatchPage = () => {
  const { contentType } = useContentStore();
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [details, setDetails] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);

  // getData => movie or tv
  useEffect(() => {
    // getTrailers
    const getTrailers = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/trailers`
        );
        setTrailers(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    // getDetails
    getTrailers();
    const getDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/details`
        );
        setDetails(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();

    // getSimilar
    const getSimilar = async () => {
      try {
        const response = await axios.get(
          `/api/v1/${contentType}/${id}/similar`
        );
        setSimilar(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilar();
  }, [contentType, id]);

  // Nexttrailer
  const nextTrailer = () => {
    if (currentIdx < trailers?.length + 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  // Prevtrailer
  const prevTrailer = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Slider
  const slider = useRef(null);

  const sliderRight = () => {
    if (slider.current) {
      slider.current.scrollBy({
        left: slider.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const sliderLeft = () => {
    if (slider.current) {
      slider.current.scrollBy({
        left: -slider.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const [showArrows, setShowArrows] = useState(false);

  return (
    <>
      {/* Header-start */}
      <header className="h-screen bg-black">
        <Navbar />
        {/* trailers-sec-start */}
        <section className="mt-5 relative ">
          <div className="pb-4">
            <button
              onClick={prevTrailer}
              className={` absolute left-10 text-white bg-gray-700 px-3 py-2 rounded ${
                currentIdx == 0 ? `cursor-not-allowed` : `cursor-pointer`
              }`}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextTrailer}
              className={` absolute right-10 text-white bg-gray-700 px-3 py-2 rounded ${
                currentIdx == trailers?.length + 1
                  ? `cursor-not-allowed`
                  : `cursor-pointer`
              }`}
            >
              <ChevronRight />
            </button>
          </div>
          <div className=" flex h-[30em] md:h-[35em] justify-center pt-10  ">
            <ReactPlayer
              className="object-cover"
              controls
              // playing => if you wanna play video automatically
              loop
              // muted
              width={"65%"}
              height={"100%"}
              src={`https://www.youtube.com/watch?v=${trailers[currentIdx]?.key}`}
            />
          </div>
        </section>
        {/* trailers-sec-end */}
      </header>
      {/* Header-end */}

      {/* Details-sec-start */}
      <section className="h-screen py-5 bg-black flex flex-col space-y-15 md:flex-row md:justify-around  items-center  ">
        <div className="text-white space-y-5 px-5 ">
          <h1 className=" text-4xl md:text-5xl font-bold max-w-lg">
            {details?.name?.length > 25
              ? details?.name?.slice(0, 25) + "..."
              : details?.name}
            {details?.title?.length > 25
              ? details?.title?.slice(0, 25) + "..."
              : details?.title}
          </h1>
          <p className="font-bold ">
            {details?.first_air_date || details?.release_date} |{" "}
            <span className="text-red-500">
              {details?.adult ? "+18" : "PG-13"}
            </span>
          </p>
          <p className="max-w-lg ">
            {details?.overview?.length > 200
              ? details?.overview?.slice(0, 200) + "..."
              : details?.overview}
          </p>
        </div>
        <div>
          <img
            className="rounded h-[17em] md:h-[35em] object-cover"
            src={SMALL_IMG_BASE_URL + details?.poster_path}
            alt="movie-details-img"
          />
        </div>
      </section>
      {/* Details-sec-end */}

      {/* Similar-sec-start */}
      <section className="h-screen flex flex-col justify-center bg-black text-white">
        <h1 className="pl-2 mb-5 md:pl-5 text-4xl md:text-5xl font-bold ">
          Similar Movies/TV Shows
        </h1>
        <div
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
          className=" relative flex items-center  px-3  "
        >
          <div
            ref={slider}
            className="flex gap-2 md:gap-5 overflow-x-scroll hide-x-sidebar mt-5"
          >
            {similar.map((item) => {
              if (!item?.poster_path) return null;
              return (
                <Link
                  key={item?.id}
                  onClick={() => setCurrentIdx(0)}
                  to={`/watch/${item?.id}`}
                >
                  <img
                    className=" min-w-[250px] h-65 md:h-[90%] object-contain md:object-cover"
                    src={SMALL_IMG_BASE_URL + item?.poster_path}
                    alt="movie-similar-img"
                  />
                  <h3 className="text-center  font-bold">
                    {" "}
                    {item?.name?.length > 25
                      ? item?.name?.slice(0, 25) + "..."
                      : item?.name}
                    {item?.title?.length > 25
                      ? item?.title?.slice(0, 25) + "..."
                      : item?.title}
                  </h3>
                </Link>
              );
            })}
          </div>
          {showArrows && (
            <>
              <button
                onClick={sliderLeft}
                className="absolute left-0 p-3 bg-gray-700 rounded-full"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={sliderRight}
                className="absolute right-0 p-3 bg-gray-700 rounded-full"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </section>
      {/* Similar-sec-end */}
    </>
  );
};
export default WatchPage;

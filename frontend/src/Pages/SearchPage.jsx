import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL, ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { useContentStore } from "../store/content";
const SearchPage = () => {
  const [activeBtn, setActiveBtn] = useState("movie");
  const [userInputSearchValue, setUserInputSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleBtnClicked = (type) => {
    if (type !== "person") {
      setActiveBtn(type);
      setUserInputSearchValue("");
      setContentType(type);
      setSearchResults([]);
    } else {
      setActiveBtn(type);
      setUserInputSearchValue("");
      setSearchResults([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault("");

    // getResults => movie , tv , pesron
    const getResults = async () => {
      try {
        const response = await axios.get(
          `/api/v1/search/${activeBtn}/${userInputSearchValue}`
        );

        setSearchResults(response.data.content);
      } catch (error) {
        if (error.response.status == 404) {
          toast.error("Not found");
        } else {
          toast.error("Please try again later");
        }
      }
    };
    getResults();
  };

  // addItemtoHistory
  const addItemtoHistory = async (values) => {
    try {
      const response = await axios.post(`/api/v1/search/history/add`, values);
      // toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    // Main-start
    <div className=" min-h-screen pb-10  bg-black text-white  ">
      <Navbar />
      {/* Sec-start */}
      <section className=" w-full pt-10 flex flex-col items-center">
        {/* btns-start */}
        <div className="  space-x-5">
          <button
            onClick={() => handleBtnClicked("movie")}
            className={`px-4 py-2 cursor-pointer rounded ${
              activeBtn == "movie" ? `bg-red-500` : `bg-gray-700`
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => handleBtnClicked("tv")}
            className={`px-4 py-2 cursor-pointer rounded ${
              activeBtn == "tv" ? `bg-red-500` : `bg-gray-700`
            }`}
          >
            TV Shows
          </button>
          <button
            onClick={() => handleBtnClicked("person")}
            className={`px-4 py-2 cursor-pointer rounded ${
              activeBtn == "person" ? `bg-red-500` : `bg-gray-700`
            }`}
          >
            Person
          </button>
        </div>
        {/* btns-end */}

        {/* Form-start */}
        <form onSubmit={handleFormSubmit} className="mt-5 flex space-x-2">
          <input
            type="text"
            placeholder={`search about ${activeBtn}`}
            value={userInputSearchValue}
            onChange={(e) => setUserInputSearchValue(e.target.value)}
            className=" w-[20em] md:w-[25em] px-3 py-2 bg-gray-700 text-white outline-none rounded"
          />
          <button className="p-2  bg-red-500 rounded">
            <Search />
          </button>
        </form>
        {/* Form-end */}
      </section>
      {/* sec-end */}

      {/* content-res-start */}
      <section className="bg-black  flex justify-center gap-3 flex-wrap mt-5 ">
        {searchResults.map((item) => {
          if (!item.profile_path && !item.poster_path) return null;
          if (activeBtn == "person") {
            return (
              <div
                onClick={() =>
                  addItemtoHistory({
                    id: item.id,
                    title: item.name,
                    image: item.profile_path,
                    type: activeBtn,
                  })
                }
                key={item.id}
              >
                <div className=" px-2 py-3 w-fit rounded bg-gray-800 cursor-pointer">
                  <img
                    className="w-[15em]"
                    src={SMALL_IMG_BASE_URL + item.profile_path}
                    alt="person-img"
                  />
                  <h3 className="text-center pt-2 font-bold">
                    {item?.name?.length > 25
                      ? item?.name?.slice(0, 25) + "..."
                      : item?.name}
                  </h3>
                </div>
              </div>
            );
          } else {
            return (
              <Link
                onClick={() =>
                  addItemtoHistory({
                    id: item.id,
                    title: item.name || item.title,
                    image: item.poster_path,
                    type: activeBtn,
                  })
                }
                to={`/watch/${item.id}`}
                key={item.id}
              >
                <div className="  px-2 py-3 w-fit rounded bg-gray-800">
                  <img
                    className="h-[20em] w-[15em] object-cover"
                    src={SMALL_IMG_BASE_URL + item.poster_path}
                    alt="person-img"
                  />
                  <h3 className="text-center pt-2 font-bold">
                    {item?.name?.length > 25
                      ? item?.name?.slice(0, 25) + "..."
                      : item?.name}
                    {item?.title?.length > 25
                      ? item?.title?.slice(0, 25) + "..."
                      : item?.title}
                  </h3>
                </div>
              </Link>
            );
          }
        })}
      </section>
      {/* content-res-end */}
    </div>
    // main-end
  );
};
export default SearchPage;

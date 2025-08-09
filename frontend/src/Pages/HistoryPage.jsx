import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
const HistoryPage = () => {
  const [historyResults, setHistoryResults] = useState([]);
  useEffect(() => {
    // getHistoryResults
    const getHistoryResults = async () => {
      try {
        const response = await axios.get(`/api/v1/search/history`);
        setHistoryResults(response.data.content);
      } catch (error) {
        console.log(error.message);
      }
    };
    getHistoryResults();
  }, []);

  // removeItemFromSearchHistory;
  const removeItemFromSearchHistory = async (id) => {
    try {
      const response = await axios.delete(
        `/api/v1/search/history/remove/${id}`
      );
      setHistoryResults(historyResults.filter((item) => item.id !== id));
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* section-start */}
      <section className="min-h-screen bg-black">
        <Navbar />
        {/* search-results-start */}
        <div className="text-white mt-10 flex flex-col px-4 ">
          <h1 className="pl-[10%] self-start text-3xl md:text-4xl font-bold">
            Search History
          </h1>
          <div className="w-full flex mt-10 justify-center gap-2 flex-wrap space-y-6 ">
            {historyResults.length == 0 ? (
              <h1 className="mt-[10%] text-red-500 text-xl font-bold">
                Not Searched Yet
              </h1>
            ) : (
              historyResults.map((item) => (
                <div
                  className="flex justify-around items-center  w-[20em] h-18 bg-gray-800 rounded "
                  key={item?.id}
                >
                  <img
                    className="w-15 h-15  rounded-full object-fill"
                    src={SMALL_IMG_BASE_URL + item?.image}
                    alt="search-img"
                  />

                  <div className="flex flex-col items-center">
                    <h3>
                      {item?.title?.length > 20
                        ? item?.title?.slice(0, 20) + "..."
                        : item?.title}
                    </h3>
                    <p
                      className={` px-4 py-2 rounded ${
                        item?.type == "movie"
                          ? `text-red-500`
                          : item?.type == "tv"
                          ? `text-blue-600`
                          : `text-green-600`
                      }`}
                    >
                      <span className="text-white">
                        {" "}
                        {item?.createdAt?.replaceAll("-", " ").slice(0, 10)}
                        {" | "}
                      </span>

                      {item?.type}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => removeItemFromSearchHistory(item.id)}
                    >
                      <Trash className=" transition-all hover:fill-red-500 hover:text-red-600 duration-300 delay-100 ease-in-out cursor-pointer" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* search-results-end */}
      </section>
      {/* section-end */}
    </>
  );
};
export default HistoryPage;

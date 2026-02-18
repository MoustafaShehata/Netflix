import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useGetMoviesStore } from "../store/getMovies";
import { smallTMDBImg, orignalTMDBImg } from "../store/constants";
import { Trash } from "lucide-react";
import HistoryPageCardSkeleton from "../components/skeletons/HistoryPageCardSkeleton";

const HistoryPage = () => {
  const {
    getHistoryDataResults,
    GetHistoryData,
    isGetHistoryDataLoading,
    SetHistoryData,
    removeMovieFromHistory,
  } = useGetMoviesStore();

  useEffect(() => {
    GetHistoryData();
  }, []);

  const handleremoveMovieFromHistory = async (id) => {
    await removeMovieFromHistory(id);

    // filter data
    const updatedData = getHistoryDataResults.filter((item) => item.id !== id);
    SetHistoryData(updatedData);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Nav />
        <section className="px-2 mt-[3em] space-y-10">
          <div className="text-4xl flex justify-center font-bold">
            Search History
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {isGetHistoryDataLoading ? (
              <HistoryPageCardSkeleton />
            ) : getHistoryDataResults.length === 0 ? (
              <div>
                <h1 className="text-red-500 text-center text-xl">
                  Not Searched Yet
                </h1>
              </div>
            ) : (
              getHistoryDataResults.map((movie) => (
                <div
                  key={movie?.id}
                  className="bg-gray-800 flex w-[25em] justify-around items-center px-4 py-2 gap-4 rounded"
                >
                  <img
                    loading="lazy"
                    className="w-15 h-15 rounded-full object-cover"
                    src={`${smallTMDBImg}/${movie?.img}`}
                    alt="movie-img"
                  />

                  <p>
                    {movie?.title?.length > 7
                      ? movie?.title?.slice(0, 7) + "..."
                      : movie?.title}
                    <br />
                    <b className="text-sm">{movie?.createdAt?.slice(0, 10)}</b>
                  </p>

                  <button
                    className={`font-bold ${
                      movie?.type === "movie"
                        ? "text-red-500"
                        : movie?.type === "tv"
                          ? "text-blue-600"
                          : "text-green-500"
                    }`}
                  >
                    {movie?.type}
                  </button>

                  <Trash
                    onClick={() => handleremoveMovieFromHistory(movie?.id)}
                    className="hover:fill-red-500 text-red-500 hover:scale-75 cursor-pointer"
                  />
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default HistoryPage;

import { Link } from "react-router-dom";
import { Search, LogOut } from "lucide-react";
import { useAuthStore } from "../store/userAuth";
import { useGetMoviesStore } from "../store/getMovies";
import { useState } from "react";
import { Menu } from "lucide-react";

const Nav = () => {
  const { user, logout } = useAuthStore();
  const { setType } = useGetMoviesStore();
  const [activeMenu, setActiveMenu] = useState(false);

  // handleClickLinks
  const handleClickLinks = (type) => {
    setType(type);
    setActiveMenu(!activeMenu);
  };

  return (
    <div className="relative">
      {/* Nav-start */}
      <nav className="  flex justify-around items-center pt-4 text-white z-20">
        <div className=" flex items-center gap-8 ">
          <img
            loading="lazy"
            className="w-38 "
            src="/assets/netflix-logo.png"
            alt="logo-img"
          />
          <span className="hidden sm:flex gap-4">
            <Link
              onClick={() => setType("movie")}
              className="hover:underline underline-offset-8 cursor-pointer"
              to={"/"}
            >
              Movies
            </Link>
            <Link
              onClick={() => setType("tv")}
              className="hover:underline underline-offset-8 cursor-pointer "
              to={"/"}
            >
              Tv shows
            </Link>
            <Link
              className="hover:underline underline-offset-8 cursor-pointer "
              to={"/history"}
            >
              Search History
            </Link>
          </span>
        </div>

        {/* Icons-start */}
        <div className="flex gap-4 items-center ">
          <Link to={"/search"}>
            <Search />
          </Link>
          <img
            loading="lazy"
            className="w-8 rounded"
            src={user?.profileImage}
            alt="user-img"
          />
          <LogOut onClick={logout} />
          <Menu
            onClick={() => setActiveMenu(!activeMenu)}
            className="sm:hidden"
          />
        </div>
        {/* Icons-end */}
      </nav>
      {/* Nav-end */}

      <div className="flex justify-center">
        {activeMenu ? (
          <div className=" sm:hidden absolute top-[4em] w-[95%] bg-black  px-4 py-2  flex flex-col space-y-4 z-30">
            <Link
              onClick={() => handleClickLinks("movie")}
              className="hover:underline underline-offset-8 cursor-pointer"
              to={"/"}
            >
              Movies
            </Link>
            <Link
              onClick={() => handleClickLinks("tv")}
              className="hover:underline underline-offset-8 cursor-pointer "
              to={"/"}
            >
              Tv shows
            </Link>
            <Link
              className="hover:underline underline-offset-8 cursor-pointer "
              to={"/history"}
            >
              Search History
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Nav;

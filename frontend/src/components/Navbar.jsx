import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { LogOut, Menu, Search } from "lucide-react";
import { useContentStore } from "../store/content";
import { useState } from "react";
const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { setContentType, contentType } = useContentStore();
  const [activeMenu, setActiveMenu] = useState(false);

  // handlMenuBtnClicked
  const handleMenuBtnClicked = (type) => {
    if (type !== "search") {
      setContentType(type);
      setActiveMenu(!activeMenu);
    } else setActiveMenu(!activeMenu);
  };

  return (
    <header className="relative ">
      {/* Nav-start */}
      <nav className=" flex justify-around pt-5 text-white">
        <div className="flex items-center gap-5 ">
          <div>
            <img className="w-44" src="/assets/netflix-logo.png" alt="logo" />
          </div>

          {/* on-Desktop */}
          <div className="hidden sm:flex space-x-2">
            <Link
              className="hover:underline underline-offset-5"
              onClick={() => setContentType("movie")}
              to={"/"}
            >
              Movies
            </Link>
            <Link
              className="hover:underline underline-offset-5"
              onClick={() => setContentType("tv")}
              to={"/"}
            >
              TV Shows
            </Link>
            <Link
              className="hover:underline underline-offset-5"
              to={"/history"}
            >
              Search History
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 ">
          <Link className="cursor-pointer" to={"/search"}>
            <Search />
          </Link>
          <img
            className="w-7 cursor-pointer rounded"
            src={user.image}
            alt="user-img"
          />
          <LogOut className="cursor-pointer" onClick={logout} />
          <Menu
            onClick={() => setActiveMenu(!activeMenu)}
            className="sm:hidden"
          />
        </div>
      </nav>
      {/* on-Mobile */}
      {activeMenu && (
        <div className=" absolute z-50    sm:hidden  flex flex-col  py-3 px-5 w-full  mt-1   space-y-2 bg-black text-white rounded ">
          <Link onClick={() => handleMenuBtnClicked("movie")} to={"/"}>
            Movies
          </Link>
          <Link onClick={() => handleMenuBtnClicked("tv")} to={"/"}>
            TV Shows
          </Link>
          <Link onClick={() => handleMenuBtnClicked("search")} to={"/history"}>
            Search History
          </Link>
        </div>
      )}
      {/* Nav-end */}
    </header>
  );
};
export default Navbar;

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Nav from "../Nav";

const HomeScreenSkeleton = () => {
  return (
    <header className="h-screen bg-linear-to-b from-black/90 via-black/60 to-black/50">
      <Nav />

      <div className="h-10/12 flex flex-col justify-center  md:px-[10em] px-[2em] space-y-6 ">
        <Skeleton width="18em" height="2em" />
        <Skeleton width="10em" height="2em" />
        <Skeleton width="18em" height="3em" />

        <div className="flex gap-4">
          <Skeleton width="8em" height="2.5em" />
          <Skeleton width="8em" height="2.5em" />
        </div>
      </div>
    </header>
  );
};
export default HomeScreenSkeleton;

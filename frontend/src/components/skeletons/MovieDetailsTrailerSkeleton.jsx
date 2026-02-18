import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieDetailsTrailerSkeleton = () => {
  return (
    <div className="h-full  flex justify-center items-center  ">
      <Skeleton width={"50em"} height={"30em"} />
    </div>
  );
};
export default MovieDetailsTrailerSkeleton;

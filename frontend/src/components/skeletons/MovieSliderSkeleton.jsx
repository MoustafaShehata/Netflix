import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieSliderSkeleton = () => {
  return (
    <div className="h-[20em] pt-6 overflow-x-hidden ">
      <div className="flex gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <Skeleton width="20em" height="10em" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MovieSliderSkeleton;

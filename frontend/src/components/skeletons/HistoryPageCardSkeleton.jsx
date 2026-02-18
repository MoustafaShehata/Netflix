import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HistoryPageCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <div className="bg-neutral-700 flex w-[25em] justify-around items-center px-4 py-2 gap-4 rounded">
          <Skeleton width={50} height={50} circle="50%" />
          <div>
            <Skeleton width={100} />
            <Skeleton width={100} />
          </div>
          <Skeleton width={80} />
          <Skeleton width={20} height={30} />
        </div>
      ))}
    </>
  );
};
export default HistoryPageCardSkeleton;

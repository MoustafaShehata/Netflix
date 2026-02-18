import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchPageCardSkeleton = () => {
  return (
    <section className="mt-[2em] mb-[4em] flex flex-wrap justify-center gap-4 px-[10em]">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="flex flex-col  ">
          <Skeleton width="15em" height="20em" />
          <h1 className="flex justify-center">
            <Skeleton width="10em" height="0.5em" />
          </h1>
        </div>
      ))}
    </section>
  );
};
export default SearchPageCardSkeleton;

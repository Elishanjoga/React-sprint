import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import TripCard from "./TripCard";
import Tag from "./Tag";

export default function TripsList({ trips = [] }) {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);

  const removeQueryParam = (key) => {
    queryParams.delete(key);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
    navigate(newUrl);
  };

  function parseRange(range) {
    if (range === "Any") {
      return { minValue: 0, maxValue: Infinity };
    }

    const match = range.match(/(\d+)?\s*(?:to|-)?\s*(\d+)?\s*Km|min/i);

    if (match) {
      const minValue = match[1] ? parseInt(match[1], 10) : 0;
      const maxValue = match[2] ? parseInt(match[2], 10) : Infinity;
      return { minValue, maxValue };
    }

    throw new Error("Invalid range format");
  }

  const filteredTrips = trips?.filter((trip) => {
    const paramsCopy = new URLSearchParams(queryParams);

    const minTime = paramsCopy.get("time") ? parseRange(paramsCopy.get("time")).minValue : 0;
    const maxTime = paramsCopy.get("time") ? parseRange(paramsCopy.get("time")).maxValue : Infinity;
    const minDistance = paramsCopy.get("distance") ? parseRange(paramsCopy.get("distance")).minValue : 0;
    const maxDistance = paramsCopy.get("distance") ? parseRange(paramsCopy.get("distance")).maxValue : Infinity;
    const status = paramsCopy.get("status") ? paramsCopy.get("status").replace("All Trips", "") : "";
    const search = paramsCopy.get("search") ? paramsCopy.get("search") : "";

    const tripValues = Object.values(trip).map((value) => value?.toString());

    return (
      trip.duration >= minTime &&
      trip.duration <= maxTime &&
      trip.distance >= minDistance &&
      trip.distance <= maxDistance &&
      trip.status.includes(status?.toUpperCase()) &&
      tripValues.some((value) => value?.toLowerCase().includes(search?.toLowerCase()))
    );
  });

  if (!filteredTrips?.length) return <div className='text-white text-lg'>No trips found</div>;

  return (
    <div>
      <div className='flex items-center'>
        <button
          className='text-purple bg-dark border border-purple w-8 h-8 flex justify-center items-center rounded-full mr-8'
          onClick={() => navigate("/trips")}
        >
          <ArrowLeftIcon className='w-4 h-4' />
        </button>
        {[...queryParams.entries()].map(([key, value]) => (
          <Tag key={key} value={value} removeQueryParam={() => removeQueryParam(key)} />
        ))}
      </div>

      <div className='flex flex-wrap gap-2 text-lg my-8'>
        <span className='text-purple'>{filteredTrips.length}</span>
        <span className='text-white'>trips found</span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredTrips?.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

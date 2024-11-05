import { format } from "date-fns";

const LatestTrips = ({ trips }) => {
  const getLatest = trips
    .sort((a, b) => a.request_date < b.request_date)
    ?.slice(0, 5);
  return (
    <div>
        <div className="flex justify-between">
      <h2 className="text-white text-2xl">Latest Trips</h2>
      <a href="#" className="text-purple">See all</a>
      </div>
      <div className="">
        {getLatest?.map((trip, index) => (
          <div
            className="flex py-4 items-baseline"
            key={index}
          >
            <h1 className="text-brown text-3xl font-black mr-6">{index + 1}</h1>
            <div className="flex justify-between w-full">
              <p className="text-white">{trip.dropoff_location}</p>
              <time className="text-gray">
                {format(new Date(trip.request_date), "EEE MMM d, yyyy h:mm")}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTrips;

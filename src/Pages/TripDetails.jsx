import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { ArrowLeftIcon, MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Tag from "../components/Tag";
import { statusColors, toTitleCase } from "../lib/helpers";
import Map from "../components/Map";
import DriverInfo from "../components/DriverInfo";
import CarInfo from "../components/CarInfo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TripDetails() {
  const [trip, setTrip] = useState(null);
  const { data, loading } = useFetchData();
  const { id } = useParams();
  const navigate = useNavigate();

  const getTrip = async () => {
    const selection = data.find((trip) => trip.id == id);
    setTrip(selection);
  };
  useEffect(() => {
    if (data) {
      getTrip();
    }
  }, [data]);

  return (
    <div>
      {loading || !trip ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='flex items-center'>
            <button
              className='text-purple bg-dark border border-purple w-8 h-8 flex justify-center items-center rounded-full mr-8'
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className='w-4 h-4' />
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 my-10'>
            <div className='bg-dark h-96 bg-cover bg-center rounded-3xl text-white border'>
              <Map />
            </div>
            <div className='bg-dark h-96 bg-cover bg-center rounded-3xl p-4 text-white'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <p className='text-white text-md'>{`${format(new Date(trip.request_date), "EEE MMM d, yyyy h:mm a")}`}</p>
                  <div className='flex items-center mt-2'>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden='true'
                        className={classNames(trip.driver_rating > rating ? "text-yellow fill-yellow" : "text-gray fill-gray", "h-4 w-4 shrink-0")}
                      />
                    ))}
                  </div>
                </div>
                <Tag value={toTitleCase(trip.status)} className={`${statusColors[toTitleCase(trip.status)]} px-4 py-2`} />
              </div>

              <div className='flex justify-between items-center my-10'>
                <div className='flex flex-col'>
                  <p className='text-gray text-sm font-thin'>Price</p>
                  <p className='text-white text-3xl font-bold'>{`${trip.cost_unit} ${trip.cost}`}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-gray text-sm font-thin'>Duration</p>
                  <p className='text-white text-md'>{`${trip.duration} ${trip.duration_unit}`}</p>
                </div>
              </div>
              <div className='flex justify-end items-center my-10'>
                <div className='flex flex-col'>
                  <p className='text-gray text-sm font-thin'>Distance</p>
                  <p className='text-white text-md'>{`${trip.distance} ${trip.distance_unit}`}</p>
                </div>
              </div>

              <div className='flex justify-between items-center mt-10'>
                <div className='flex mr-2'>
                  <p className='text-gray text-sm font-thin bg-green w-6 h-6 flex justify-center items-center rounded-full mr-2'>
                    <MapPinIcon className='w-4 h-4 text-white' />
                  </p>
                  <p className='text-white text-md'>{`${trip.pickup_location}`}</p>
                </div>
                <div className='flex mr-2'>
                  <p className='text-white text-md'>{format(new Date(trip.pickup_date), "HH:mm a")}</p>
                </div>
              </div>

              <div className='flex justify-between items-center my-6'>
                <div className='flex mr-2'>
                  <p className='text-gray text-sm font-thin bg-red w-6 h-6 flex justify-center items-center rounded-full mr-2'>
                    <MapPinIcon className='w-4 h-4 text-white' />
                  </p>
                  <p className='text-white text-md'>{`${trip.dropoff_location}`}</p>
                </div>
                <div className='flex mr-2'>
                  <p className='text-white text-md'>{format(new Date(trip.dropoff_date), "HH:mm a")}</p>
                </div>
              </div>
            </div>

          </div>
          <div className='grid gap-10 w-full h-full trip-info'>
            <DriverInfo trip={trip} />
            <CarInfo trip={trip} />
            </div>
        </>
      )}
    </div>
  );
}

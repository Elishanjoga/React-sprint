import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { statusColors, toTitleCase } from "../lib/helpers";

import { Link } from "react-router-dom";
import Tag from "./Tag";
import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TripCard({ trip = {} }) {
  return (
    <Link
      to={`/trips/${trip.id}`}
      className="bg-dark h-96 bg-cover bg-center rounded-3xl p-4"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trip.car_pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-y-20">
        <div className="flex items-center justify-between">
          <span className="text-white text-base">{`${format(
            new Date(trip.request_date),
            "EEE MMM d, yyyy h:mm a"
          )}`}</span>
          <div className="flex flex-col items-center">
            <Tag
              value={toTitleCase(trip.status)}
              className={statusColors[toTitleCase(trip.status)]}
            />
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <StarIcon
                  key={rating}
                  aria-hidden="true"
                  className={classNames(
                    trip.driver_rating > rating
                      ? "text-yellow fill-yellow"
                      : "text-gray fill-gray",
                    "h-3 w-3 shrink-0"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* locations */}
        <div className="flex flex-col">
          <div className="flex flex-row items-center text-lg justify-start mt-3">
            <MapPinIcon className="h-6 w-6 p-1 bg-green mr-2 rounded-full text-white"></MapPinIcon>
            <p className="text-white">{trip.pickup_location}</p>
          </div>
          <div className="flex flex-row items-center justify-start text-lg  mt-3">
            <MapPinIcon className="h-6 w-6 p-1 bg-red  mr-2 rounded-full text-white"></MapPinIcon>
            <p className="text-white">{trip.dropoff_location}</p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start text-white">
          <h1 className="text-3xl font-bold">
            <span className="text-3xl">{trip.cost_unit} </span>
            {trip.cost}
          </h1>
          <p>
            {trip.distance}
            <span> {trip.distance_unit.toUpperCase()} </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

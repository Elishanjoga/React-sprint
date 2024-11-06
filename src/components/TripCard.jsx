import { StarIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { statusColors, toTitleCase } from "../lib/helpers";
import Tag from "./Tag";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TripCard({ trip = {} }) {
  return (
    <Link
      to={`/trips/${trip.id}`}
      className='bg-dark h-96 bg-cover bg-center rounded-3xl p-4'
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trip.car_pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='flex items-center justify-between'>
        <span className='text-white text-xs'>{`${format(new Date(trip.request_date), "EEE MMM d, yyyy h:mm a")}`}</span>
        <div className='flex flex-col items-center'>
          <Tag value={toTitleCase(trip.status)} className={statusColors[toTitleCase(trip.status)]} />
          <div className='flex items-center mt-2'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <StarIcon
                key={rating}
                aria-hidden='true'
                className={classNames(trip.driver_rating > rating ? "text-yellow fill-yellow" : "text-gray fill-gray", "h-3 w-3 shrink-0")}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

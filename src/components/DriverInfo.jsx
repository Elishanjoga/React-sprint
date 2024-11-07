import { StarIcon } from "@heroicons/react/24/outline";

export default function DriverInfo({ trip }) {
  return (
    <div className="">
      <h2 className='text-gray text-2xl mb-6'>Driver Info</h2>
      <div className='flex flex-col items-center border border-purple p-6 rounded-3xl'>
        <div style={{ backgroundImage: `url(${trip.driver_pic})` }} className='w-full h-56 rounded-3xl bg-cover bg-center' />
        <div className='flex justify-between items-center w-full mt-10'>
          <div className='flex flex-col'>
            <p className='text-gray text-md font-thin'>Driver Name</p>
            <p className='text-white text-md'>{trip.driver_name}</p>
          </div>
          <div className='flex items-center bg-purple px-3 py-1 rounded-3xl'>
            <StarIcon aria-hidden='true' className='text-yellow fill-yellow h-4 w-4 shrink-0 mr-2' />
            <p className='text-white text-md'>{trip.driver_rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

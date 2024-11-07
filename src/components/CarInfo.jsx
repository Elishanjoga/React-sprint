export default function CarInfo({ trip }) {
  return (
    <div className="">
      <h2 className='text-gray text-2xl mb-6'>Car Info</h2>
      <div className='flex items-center border border-purple p-6 rounded-3xl min-h-[362px]'>
        <div style={{ backgroundImage: `url(${trip.car_pic})` }} className='h-56 rounded-3xl bg-cover bg-center w-[65%]' />
        <div className='flex flex-col justify-center  ml-4 mr-0 pr-0 w-full max-w-[40%]'>
          <div className='flex justify-between items-center my-4 w-full'>
            <div className='flex flex-col'>
              <p className='text-gray text-sm font-thin'>MAKE/MODEL</p>
              <p className='text-white text-md'>{`${trip.car_model}`}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray text-sm font-thin'>YEAR</p>
              <p className='text-white text-md'>{`${trip.car_year}`}</p>
            </div>
          </div>

          <div className='flex justify-between w-full my-4'>
            <div className='flex flex-col'>
              <p className='text-gray text-sm font-thin'>PLATE</p>
              <p className='text-white text-md'>{`${trip.car_number}`}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray text-sm font-thin'>COLOR</p>
              <p className='text-white text-md'>{`${trip.car_color || ""}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

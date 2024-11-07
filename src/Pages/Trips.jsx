import { useState } from "react";
import RadioGrp from "../components/RadioGrp";
import { useNavigate } from "react-router-dom";
import TripsList from "../components/TripsList";
import useFetchData from "../hooks/useFetchData";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const statuses = [
  { name: "All Trips", current: false },
  { name: "Completed", current: true },
  { name: "Canceled", current: false },
];

const distances = [{ name: "Any" }, { name: "Under 3 Km" }, { name: "3 to 6 Km" }, { name: "6 to 15 Km" }, { name: "More than 15 Km" }];

const times = [{ name: "Any" }, { name: "Under 5 min" }, { name: "5 to 10 min" }, { name: "10 to 20 min" }, { name: "More than 20 min" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Trips = () => {
  const [selectedStatus, setSelectedStatus] = useState(statuses[0].name);
  const [selectedDistance, setSelectedDistance] = useState(distances[0].name);
  const [selectedTime, setSelectedTime] = useState(times[0].name);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { data } = useFetchData();

  const handleStatusChange = (statusName) => {
    setSelectedStatus(statusName);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/trips?status=${selectedStatus}&distance=${selectedDistance}&time=${selectedTime}&search=${search?.trim()?.toLowerCase()}`);
  };

  return (
    <>
      {window.location.search ? (
        <TripsList trips={data} />
      ) : (
        <form className='flex flex-col ' onSubmit={handleSearch}>
          <div className='flex flex-col space-y-4'>
            <div className='relative'>
              <MagnifyingGlassIcon className='absolute left-3 top-6 transform -translate-y-1/2 text-lightGray font-bold w-5 h-5' />
              <input
                type='text'
                placeholder='Search by distance, duration or keyword'
                className='pl-12 w-1/2 rounded-3xl border-gray py-3 px-4 focus:border-0 focus:ring-none !bg-gray mb-4 text-white'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <h1 className='text-lg font-thin text-white mb-3'>Status</h1>
          <div className='sm:hidden'>
            <label htmlFor='tabs' className='sr-only'>
              Select a status
            </label>
            <select
              id='tabs'
              name='tabs'
              defaultValue={statuses.find((status) => status.current).name}
              className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 !bg-gray'
            >
              {statuses.map((status) => (
                <option key={status.name}>{status.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <nav aria-label='Tabs' className='flex space-x-4 !bg-gray rounded-2xl w-fit p-2'>
              {statuses.map((status) => (
                <a
                  key={status.name}
                  href='#'
                  aria-current={status.current ? "page" : undefined}
                  className={classNames(
                    status.name === selectedStatus ? "bg-purple text-white rounded-2xl" : "text-gray-50",
                    "rounded-md px-3 py-2 text-sm font-medium "
                  )}
                  onClick={() => handleStatusChange(status.name)}
                >
                  {status.name}
                </a>
              ))}
            </nav>
          </div>
          <div className='w-fit'>
            <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-10 mt-16 '>
              <RadioGrp label='Distance' selected={selectedDistance} setSelected={setSelectedDistance} options={distances} />
              <RadioGrp label='Time' selected={selectedTime} setSelected={setSelectedTime} options={times} />
            </div>
            <div className='flex justify-center mt-16 w-full'>
              <button className='bg-purple text-white px-12 py-4 rounded-2xl'>SEARCH</button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Trips;

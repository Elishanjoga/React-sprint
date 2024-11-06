import { useState } from "react";
import RadioGrp from "../components/RadioGrp";
import { useNavigate } from "react-router-dom";
import TripsList from "../components/TripsList";
import useFetchData from "../hooks/useFetchData";

const tabs = [
  { name: "All Trips", href: "#", current: false },
  { name: "Completed", href: "#", current: true },
  { name: "Cancelled", href: "#", current: false },
];

const distances = [{ name: "Any" }, { name: "Under 3 Km" }, { name: "3 to 6 Km" }, { name: "6 to 15 Km" }, { name: "More than 15 Km" }];

const times = [{ name: "Any" }, { name: "Under 5 min" }, { name: "5 to 10 min" }, { name: "10 to 20 min" }, { name: "More than 20 min" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Trips = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const [selectedDistance, setSelectedDistance] = useState(distances[0].name);
  const [selectedTime, setSelectedTime] = useState(times[0].name);

  const navigate = useNavigate();
  const { data } = useFetchData();

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/trips?tab=${selectedTab}&distance=${selectedDistance}&time=${selectedTime}`);
  };

  return (
    <>
      {window.location.search ? (
        <TripsList trips={data} />
      ) : (
        <form className='flex flex-col ' onSubmit={handleSearch}>
          <h1 className='text-lg font-thin text-white mb-3'>Status</h1>
          <div className='sm:hidden'>
            <label htmlFor='tabs' className='sr-only'>
              Select a tab
            </label>
            <select
              id='tabs'
              name='tabs'
              defaultValue={tabs.find((tab) => tab.current).name}
              className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 !bg-gray'
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className='hidden sm:block'>
            <nav aria-label='Tabs' className='flex space-x-4 !bg-gray rounded-2xl w-fit p-2'>
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.name === selectedTab ? "bg-purple text-white rounded-2xl" : "text-gray-50",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  onClick={() => handleTabChange(tab.name)}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
          <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-10 mt-16 '>
            <RadioGrp label='Distance' selected={selectedDistance} setSelected={setSelectedDistance} options={distances} />
            <RadioGrp label='Time' selected={selectedTime} setSelected={setSelectedTime} options={times} />
          </div>
          <div className='flex justify-center mt-16 w-1/2'>
            <button className='bg-purple text-white px-12 py-4 rounded-2xl'>SEARCH</button>
          </div>
        </form>
      )}
    </>
  );
};

export default Trips;

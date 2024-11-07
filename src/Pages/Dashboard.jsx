import LatestTrips from "../components/LatestTrips";
import LineChart from "../components/LineChart";
import TopDesinations from "../components/TopDesinations";
import useFetchData from "../hooks/useFetchData";

const Dashboard = () => {
  const { data, loading } = useFetchData();
  return (
    <div>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div>
          <div className="w-full">
            <h1 className="text-white text-2xl py-6">Trips over time</h1>
            <div className="border-2 border-purple rounded-3xl w-full h-96 flex chart">
              <LineChart data={data} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
            <LatestTrips trips={data} />
            <div className="w-full h-auto border-2 border-purple rounded-3xl p-4">
              <h1 className="text-white text-2xl py-6">Top 3 Destinations</h1>
              <TopDesinations data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

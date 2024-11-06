import Dashboard from "./Pages/Dashboard";
import Trips from "./Pages/Trips";
import TripDetails from "./Pages/TripDetails";

export const routes = [
  {
    element: <Dashboard />,
    path: "/",
  },
  {
    element: <Trips />,
    path: "/trips",
  },
  {
    element: <TripDetails />,
    path: "/trips/:id",
  },
];

import { Chart } from "react-charts";
import React from "react";
import { format } from "date-fns";

export default function LineChart({ data }) {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.month,
      elementType: "line",
      fill: "red",
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.trips,
        elementType: "line",
        fill: "green",
      },
    ],
    []
  );

  const dataToMonth = (items) => {
    const obj = {};
    items?.forEach((item) => {
      const month = format(new Date(item.request_date), "LLL");
      if (obj[month]) {
        obj[month] += 1;
      } else {
        obj[month] = 1;
      }
    });

    return Object.keys(obj).map((key) => ({
      month: key,
      trips: obj[key].toString(),
      radius: 2,
    }));
  };

  return (
    <Chart
      options={{
        data: [
          {
            label: "Trips",
            color: "black",
            data: dataToMonth(data),
          },
        ],
        primaryAxis,
        secondaryAxes,
        getSeriesStyle: () => ({
          color: "#8582D9",
        }),
      }}
    />
  );
}

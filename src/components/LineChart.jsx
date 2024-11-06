import { Line } from "@ant-design/plots";
import { format, parseISO, isValid } from "date-fns";
import { useMemo } from "react";
import PropTypes from "prop-types";

const LineChartComponent = ({ data = [] }) => {
  const chartData = useMemo(() => {
    const baseData = Array.from({ length: 12 }, (_, index) => ({
      month: format(new Date(2024, index, 1), "LLL"),
      trips: 0,
    }));

    if (Array.isArray(data) && data.length > 0) {
      const monthCounts = {};

      data.forEach((item) => {
        if (!item?.request_date) return;

        try {
          const date = parseISO(item.request_date);

          if (!isValid(date)) {
            console.warn("Invalid date:", item.request_date);
            return;
          }

          const month = format(date, "LLL");
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        } catch (error) {
          console.error("Error processing date:", item.request_date, error);
        }
      });

      baseData.forEach((item) => {
        if (monthCounts[item.month]) {
          item.trips = Number(monthCounts[item.month]);
        }
      });
    }

    return baseData;
  }, [data]);

  const config = {
    data: chartData,
    xField: "month",
    yField: "trips",
    point: {
      size: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 4,
      stroke: "#8582D9",
    },
    smooth: true,
    label: {
      position: "top",
      style: {
        color: "#fff",
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
        color: "#fff",
      },
    },
  };

  if (!Array.isArray(data)) {
    console.error("Invalid data format provided to LineChart");
    return null;
  }

  return <Line {...config} />;
};

LineChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      request_date: PropTypes.string.isRequired,
    })
  ),
};

LineChartComponent.defaultProps = {
  data: [],
};

export default LineChartComponent;

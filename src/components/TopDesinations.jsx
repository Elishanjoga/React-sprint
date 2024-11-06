import { Pie } from "@ant-design/plots";
import PropTypes from "prop-types";
const TopDesinations = ({ data = [] }) => {
  const destinationsCount = data.reduce((acc, item) => {
    acc[item.dropoff_location] = (acc[item.dropoff_location] || 0) + 1;
    return acc;
  }, {});

  const config = {
    appendPadding: 10,
    // top 3 destinations
    data: Object.entries(destinationsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([location, value]) => ({
        location,
      value,
    })),
    angleField: "value",
    colorField: "location",
    style: {
      stroke: "#fff",
      inset: 1,
      radius: 10,
    },
    innerRadius: 0.6,
    legend: {
      titlePosition: "right",
    //   position: "right",
      titleFill: "#fff",
    },
    scale: {
        color: {
          palette: 'spectral',
          offset: (t) => t * 0.8 + 0.1,
        },
      },
  };

  return <Pie {...config} />;
};

TopDesinations.propTypes = {
  data: PropTypes.array.isRequired,
};

TopDesinations.defaultProps = {
  data: [],
};

export default TopDesinations;

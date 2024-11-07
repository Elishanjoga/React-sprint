import { Pie } from "@ant-design/plots";
import PropTypes from "prop-types";
import Progress from "./Progress";

const TopDesinations = ({ data = [] }) => {
  const destinationsCount = data.reduce((acc, item) => {
    acc[item.dropoff_location] = (acc[item.dropoff_location] || 0) + 1;
    return acc;
  }, {});

  const colors = ["#75BF7A", "#F2C744", "#ef8656"];

  const values = Object.entries(destinationsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([location, value], index) => ({
      location,
      value,
      color: colors[index],
    }));

  const total = values.reduce((acc, item) => acc + item.value, 0);

  const getPercentage = (value) => (value / total) * 100;

  const getColor = () => {
    const sortedValues = values.sort((a, b) => a.value - b.value);
    const maxValue = Math.max(...sortedValues.map((item) => item.value));
    const minValue = Math.min(...sortedValues.map((item) => item.value));
    return sortedValues.map((item) => ({
      ...item,
      color: item.value === maxValue ? "green" : item.value === minValue ? "red" : "yellow",
    }));
  };

  const config = {
    appendPadding: 10,
    data: values,
    angleField: "value",
    colorField: "color",
    style: {
      stroke: "#fff",
      inset: 1,
      radius: 10,
    },
    innerRadius: 0.6,
    legend: false,
    scale: {
      color: {
        palette: "spectral",
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

  return (
    <div className='flex items-center'>
      <div className='w-1/2'>
        <Pie {...config} />
      </div>
      <div className='w-1/2'>
        {/* green is the smallest, red is the biggest */}
        {getColor(values).map((item) => (
          <Progress key={item.location} value={getPercentage(item.value)} color={item.color} label={item.location} />
        ))}
      </div>
    </div>
  );
};

TopDesinations.propTypes = {
  data: PropTypes.array.isRequired,
};

TopDesinations.defaultProps = {
  data: [],
};

export default TopDesinations;

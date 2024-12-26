// src/components/PieChart.js
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
//Register
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const PieChart = ({ data }) => {
  useEffect(() => {
    // You can add more logic here if needed to manage the chart's lifecycle
  }, [data]);

  console.log("Data", data);
  return (
    <Box width="100%" maxW="500px" mx="auto">
      <Pie data={data} />
    </Box>
  );
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PieChart;

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const ThermGraph = () => {
  const [labels, setLabels] = useState([]);
  const [graph, setGraph] = useState([]);
  const { thermId } = useParams();

  const graphData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3010/temperature/${thermId}`);
      const months = [];
      const points = [];
      data.result.forEach((val) => {
        months.push(val.month);
        points.push(val.temperature);
      });
      setLabels(months);
      setGraph(points);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    graphData();
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {labels.length === 0 ? <h3>Please Wait the Data is being Processed ...</h3> : ""}
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Temperature",
              data: graph,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
              // tension: 0.1,
            },
          ],
        }}
        height={300}
        width={500}
        options={
          {
            // maintainAspectRatio: false,
          }
        }
      />
    </div>
  );
};

export default ThermGraph;

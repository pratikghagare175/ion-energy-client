import { useEffect, useState } from "react";
import axios from "axios";
import { Bar,Line } from "react-chartjs-2";
// import { useParams } from "react-router-dom";

const ThermGraph = () => {
  const [labels, setLabels] = useState([]);
  const [graph, setGraph] = useState([]);

  const graphData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3010/temperature/2015`);
      const months = [];
      const points = [];
      data.result.forEach((val) => {
        months.push(val.x);
        const graphPlot = {};
        graphPlot["x"] = val.x
        graphPlot["week_1"] = val["week_1"];
        graphPlot["week_2"] = val["week_2"];
        graphPlot["week_3"] = val["week_3"];
        graphPlot["week_4"] = val["week_4"];
        points.push(graphPlot);
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
              label: "Week 1",
              data: graph,
              parsing: {
                yAxisKey: "week_1",
              },
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              borderWidth: 1,
              barThickness: 15,
            },
            {
              label: "Week 2",
              data: graph,
              parsing: {
                yAxisKey: "week_2",
              },
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgb(255, 159, 64)",
              borderWidth: 1,
              barThickness: 15,
            },
            {
              label: "Week 3",
              data: graph,
              parsing: {
                yAxisKey: "week_3",
              },
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgb(153, 102, 255)",
              borderWidth: 1,
              barThickness: 15,
            },
            {
              label: "Week 4",
              data: graph,
              parsing: {
                yAxisKey: "week_4",
              },
              backgroundColor: "rgba(201, 203, 207, 0.2)",
              borderColor: "rgb(201, 203, 207)",
              borderWidth: 1,
              barThickness: 15,
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

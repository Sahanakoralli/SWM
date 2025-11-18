import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function DustbinHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/dustbin/history/${id}`)
      .then((res) => setHistory(res.data))
      .catch(console.error);
  }, [id]);

  const data = {
    labels: history.map((h) => new Date(h.timestamp).toLocaleString()),
    datasets: [
      {
        label: "Fill Level (%)",
        data: history.map((h) => h.fillLevel),
        borderColor: "green",
        fill: false,
      },
      // {
      //   label: "Gas Level",
      //   data: history.map((h) => h.gasLevel),
      //   borderColor: "red",
      //   fill: false,
      // },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Bin {id} History</h1>
      <Line data={data} />
    </div>
  );
}

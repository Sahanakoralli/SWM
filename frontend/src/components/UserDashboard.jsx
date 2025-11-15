import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DustbinListUser from "./pages/dustbinListUser";

export default function UserDashboard() {
  const [bins, setBins] = useState([]);
  const navigate = useNavigate();
  console.log("Inside list");
  useEffect(() => {
    axios
      .get("/api/dustbin/current")
      .then((res) => setBins(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <DustbinListUser />
    </div>
  );
}

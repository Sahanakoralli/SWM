import { useState } from "react";
import axios from "axios";

export default function AddDustbinForm() {
  const [bin, setBin] = useState({
    binId: "",
    latitude: "",
    longitude: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/admin/addDustbin", bin)
      .then(() => alert("Dustbin added!"))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-lg border">
      <h2 className="font-semibold mb-3">Add Dustbin</h2>
      <input
        placeholder="Bin ID"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setBin({ ...bin, binId: e.target.value })}
      />
      <input
        placeholder="Latitude"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setBin({ ...bin, latitude: e.target.value })}
      />
      <input
        placeholder="Longitude"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setBin({ ...bin, longitude: e.target.value })}
      />
      <input
        placeholder="Address"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setBin({ ...bin, address: e.target.value })}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}

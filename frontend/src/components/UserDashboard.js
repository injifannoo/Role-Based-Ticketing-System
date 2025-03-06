import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/tickets", {
        headers: { Authorization: token },
      });
      setTickets(res.data);
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/tickets", formData, { headers: { Authorization: token } });
      fetchTickets(); // Refresh tickets after creation
    } catch (err) {
      setError("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input type="text" placeholder="Title" className="border p-2 w-full" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <textarea placeholder="Description" className="border p-2 w-full" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create Ticket</button>
      </form>
      <h2 className="text-xl font-bold mt-5">My Tickets</h2>
      {loading ? <p>Loading...</p> : tickets.map(ticket => <div key={ticket._id} className="border p-2 my-2">{ticket.title} - {ticket.status}</div>)}
    </div>
  );
};

export default UserDashboard;

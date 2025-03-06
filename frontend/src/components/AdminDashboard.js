import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState([]);
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

  const updateStatus = async (ticketId, newStatus) => {
    try {
      setLoading(true);
      await axios.put(`/api/tickets/${ticketId}`, { status: newStatus }, { headers: { Authorization: token } });
      fetchTickets(); // Refresh tickets
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Loading...</p> : tickets.map(ticket => (
        <div key={ticket._id} className="border p-2 my-2">
          <p>{ticket.title} - <b>{ticket.status}</b></p>
          <select onChange={(e) => updateStatus(ticket._id, e.target.value)} className="border p-1">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

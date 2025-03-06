import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/authActions"; // Action to check auth state
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser()); // Load user from localStorage on app start
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to={role === "admin" ? "/dashboard/admin" : "/dashboard/user"} /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to={role === "admin" ? "/dashboard/admin" : "/dashboard/user"} /> : <Signup />} />
        <Route path="/dashboard/user" element={isAuthenticated && role === "user" ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/admin" element={isAuthenticated && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? (role === "admin" ? "/dashboard/admin" : "/dashboard/user") : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;

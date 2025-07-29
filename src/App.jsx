import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import AddUser from "./components/AddUser"; // ✅ Make sure this file exists
import ManageUsers from "./components/ManageUsers"; // ✅ Make sure this file exists

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Default route: show Register first */}
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes for logged-in users */}
      {user ? (
        <>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/update-profile" element={<UpdateProfile />} />

          {/* Admin-only routes */}
          {user.role === "admin" && (
            <>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/add-user" element={<AddUser />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </>
          )}
        </>
      ) : (
        <>
          {/* Redirects for guests trying to access protected pages */}
          <Route path="/home" element={<Navigate to="/login" />} />
          <Route path="/profile" element={<Navigate to="/login" />} />
          <Route path="/update-profile" element={<Navigate to="/login" />} />
          <Route path="/admin" element={<Navigate to="/login" />} />
          <Route path="/admin/add-user" element={<Navigate to="/login" />} />
          <Route path="/admin/users" element={<Navigate to="/login" />} />
        </>
      )}

      {/* Catch-all: NotFound page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
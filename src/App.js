import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import ProfileList from "./components/ProfileList";
import { Routes, Route } from "react-router-dom";
import { ProfilesContext } from "./ContextAPI/ProfilesContext";
import ProfileDetails from "./components/ProfileDetails";

const App = () => {
  const { profileToEdit } = useContext(ProfilesContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        {/* Home Route Displays the Profile List */}
        <Route path="/" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />

        {/* Admin Panel Route */}
        <Route
          path={profileToEdit ? "/dashboard/:id" : "/dashboard"}
          element={<AdminPanel />}
        />
      </Routes>
    </div>
  );
};

export default App;

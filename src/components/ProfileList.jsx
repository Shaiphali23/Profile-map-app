import React, { useContext } from "react";
import ProfileCard from "./ProfileCard";
import { ProfilesContext } from "../ContextAPI/ProfilesContext";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
import Spinner from "./Spinner";
import { FaSearch } from "react-icons/fa";

const ProfileList = () => {
  const {
    profiles,
    setProfiles,
    searchTerm,
    setSearchTerm,
    setProfileToEdit,
    selectedProfile,
    setSelectedProfile,
    setCoordinates,
    loading,
    setLoading,
  } = useContext(ProfilesContext);
  const navigate = useNavigate();

  const handleShowMap = async (profile) => {
    setSelectedProfile(profile);
    setLoading(true);

    // Fetch coordinates using an external API
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          profile.address
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates(location);
      } else {
        console.error("No results found for the given address.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    setLoading(false);
  };

  const handleDeleteProfile = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  //filter profile based on search term
  const filteredProfiles = profiles.filter((profile) => {
    const term = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(term) ||
      profile.address.toLowerCase().includes(term)
    );
  });

  const handleEditProfile = (profile) => {
    setProfileToEdit(profile);
    navigate(`/dashboard/${profile.id}`);
  };

  const handleProfileClick = (profileId) => {
    navigate(`/profile/${profileId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Profile */}
      <div className="flex items-center justify-center my-4">
        <FaSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search Profiles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black p-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProfiles.length > 0 || profiles.length > 0 ? (
          (filteredProfiles.length > 0 ? filteredProfiles : profiles).map(
            (profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onShowMap={handleShowMap}
                onDelete={handleDeleteProfile}
                onEdit={handleEditProfile}
                onProfileClick={handleProfileClick}
              />
            )
          )
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500">
            Data Not Found
          </div>
        )}
      </div>

      {/* Show map when a summary btn is selected */}
      {selectedProfile && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {selectedProfile.name}'s Location
          </h2>
          {loading ? (
            <Spinner />
          ) : (
            <MapComponent address={selectedProfile.address} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileList;

import { createContext, useState } from "react";
import { allProfiles } from "../data/profiles";

//create context
export const ProfilesContext = createContext();

//provide context
export const ProfilesProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(allProfiles);
  const [profileToEdit, setProfileToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    profiles,
    setProfiles,
    profileToEdit,
    setProfileToEdit,
    searchTerm,
    setSearchTerm,
    selectedProfile,
    setSelectedProfile,
    coordinates,
    setCoordinates,
    loading, setLoading
  };

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  );
};

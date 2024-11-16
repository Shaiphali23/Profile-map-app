import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfilesContext } from "../ContextAPI/ProfilesContext";

const ProfileDetails = () => {
  const { id } = useParams();
  const { profiles } = useContext(ProfilesContext);
  console.log("Profile ID from URL:", id); // Log ID from URL
  console.log("All Profiles:", profiles);
  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Profile not found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-40 h-40 object-cover rounded-full shadow-lg"
        />
        <h2 className="text-2xl font-semibold mt-4">{profile.name}</h2>
        <p className="text-gray-600 mt-2">{profile.description}</p>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-8">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <p className="mt-2">
          <strong>Email:</strong> {profile.contact.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.contact.phone}
        </p>
        <p className="mt-2">
          <strong>Address:</strong> {profile.address}
        </p>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-8">
        <h3 className="text-xl font-semibold">Interests</h3>
        <ul className="list-disc list-inside mt-2">
          {profile.interests.map((interest, index) => (
            <li key={index} className="text-gray-700">
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;

import React from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const ProfileCard = ({
  profile,
  onShowMap,
  onDelete,
  onEdit,
  onProfileClick,
}) => {
  return (
    <div
      className="cursor-pointer max-w-sm w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4"
      onClick={() => onProfileClick(profile.id)}
    >
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {profile.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{profile.description}</p>
      <div className="flex justify-between">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onShowMap(profile);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Summary
        </button>
        <div className="flex gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDelete(profile.id);
            }}
            className=" text-red-500 text-sm hover:text-red-600"
          >
            <MdDelete fontSize={24} />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onEdit(profile);
            }}
            className=" text-yellow-500 hover:text-yellow-600"
          >
            <MdModeEdit fontSize={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ProfilesContext } from "../ContextAPI/ProfilesContext";

const AdminPanel = () => {
  const { profiles, setProfiles, profileToEdit, setProfileToEdit } =
    useContext(ProfilesContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newProfile = {
      id: profileToEdit?.id || profiles.length + 1,
      ...data,
    };

    if (profileToEdit?.id) {
      //Edit existing profile
      setProfiles(
        profiles.map((profile) =>
          profile.id === profileToEdit.id ? newProfile : profile
        )
      );
      toast.success("Profile updated successfully");
    } else {
      setProfiles([...profiles, newProfile]);
      toast.success("Profile added successfully");
    }
    resetForm();
  };

  useEffect(() => {
    if (profileToEdit) {
      setValue("name", profileToEdit.name);
      setValue("description", profileToEdit.description);
      setValue("photo", profileToEdit.photo);
      setValue("address", profileToEdit.address);
    }
  }, [profileToEdit, setValue]);

  const clearEdit = () => {
    setProfileToEdit(null);
  };

  const resetForm = () => {
    reset();
    clearEdit();
  };

  return (
    <div className="max-w-xl mx-auto p-6 h-screen">
      <h2 className="text-2xl font-bold mb-6">
        {profileToEdit ? "Edit Profile" : "Add Profile"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              Name is required and should be meaningful.
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">
              Please enter your description
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <input
            type="text"
            placeholder="Image URL"
            {...register("photo", {
              required: true,
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">Enter a valid image URL</p>
          )}
        </div>

        {/* Address */}
        <div>
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">Please enter your address</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          {profileToEdit ? "Update Profile" : "Add Profile"}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;

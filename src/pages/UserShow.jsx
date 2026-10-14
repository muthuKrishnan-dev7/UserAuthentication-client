import { useEffect, useState } from "react";
import { editUser, getUser } from "../Service/api/api";

export default function UserShow({ goLogout }) {
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchUser = async () => {
    const response = await getUser();

    console.log("User API response:", response);

    setUserData(response);
    setEditData({
      firstName: response.firstName ?? "",
      lastName: response.lastName ?? "",
      phone: response.phone ?? "",
    });
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (error) {
        console.error(error);
        alert(error.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditData({
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      phone: userData.phone ?? "",
    });

    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const request = {
        firstName: editData.firstname,
        lastName: editData.lastname,
        phone: editData.phone,
      };

      console.log("Request sent:", request);

      await editUser(request);

      const updatedUser = await getUser();
      setUserData(updatedUser);
      setEditData(updatedUser);
      setIsEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update profile");
    }
  };

  if (loading) return <p>Loading user details...</p>;

  if (!userData) {
    return <p>User details not available.</p>;
  }

  const fields = [
    { label: "First Name", name: "firstname" },
    { label: "Last Name", name: "lastname" },
    { label: "Email", name: "email", readOnly: true },
    { label: "Phone", name: "phone" },
  ];
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">
            {field.label}
          </label>

          {isEditing && !field.readOnly ? (
            <input
              type="text"
              name={field.name}
              value={
                field.name === "email"
                  ? (userData.email ?? "")
                  : (editData[field.name] ?? "")
              }
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="font-medium text-gray-800 break-words">
              {userData[field.name] ?? "-"}
            </p>
          )}
        </div>
      ))}

      <div className="mb-5">
        <p className="text-sm text-gray-500 mb-1">Email Verification</p>

        <span
          className={
            userData.emailVerified
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {userData.emailVerified ? "Verified" : "Not Verified"}
        </span>
      </div>

      {isEditing ? (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="flex-1 bg-gray-200 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Edit Profile
        </button>
      )}

      <button
        type="button"
        onClick={goLogout}
        className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

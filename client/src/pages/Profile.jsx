import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { Camera, Loader2, UserCircle, ShieldCheck } from "lucide-react";
import { useUser } from "../UserContext";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [memberSince, setMemberSince] = useState("");
  const [isHost, setIsHost] = useState(false);
  const { fetchUser } = useUser();

  const token = localStorage.getItem("token");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    API.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setAvatarUrl(res.data.avatar || "");
      setIsHost(res.data.isHost || false);

      if (res.data.createdAt) {
        const d = new Date(res.data.createdAt);
        setMemberSince(
          d.toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })
        );
      }
    });
  }, []);

  // ================= HANDLE IMAGE =================
  const handleImageChange = (file) => {
    if (!file) return;
    setImage(file);
    setAvatarUrl(URL.createObjectURL(file));
  };

  // ================= SAVE =================
 const handleSave = async () => {
  try {
    setSaving(true);

    let avatar = avatarUrl;

    // upload new image if selected
    if (image) {
      const form = new FormData();
      form.append("image", image);

      const upload = await API.post("/api/upload", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      avatar = upload.data.url;
      setAvatarUrl(avatar); // local instant preview
    }

    await API.put(
      "/api/users/profile",
      { name, email, avatar },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ⭐⭐⭐ MOST IMPORTANT LINE
    await fetchUser(); // 🔥 updates Navbar instantly

    toast.success("Profile updated successfully");
    setImage(null);
  } catch {
    toast.error("Profile update failed");
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="p-6 md:p-8">
      {/* ================= HEADER ================= */}
      <div className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your personal information and profile photo.
        </p>
      </div>

      {/* ================= ACCOUNT INFO STRIP ================= */}
      <div className="max-w-3xl mb-6 flex flex-wrap items-center gap-3 text-sm">
        {memberSince && (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">
            Member since {memberSince}
          </span>
        )}

        <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-medium">
          <ShieldCheck size={14} />
          {isHost ? "Host Account" : "User Account"}
        </span>
      </div>

      {/* ================= CARD ================= */}
      <div className="max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="text-gray-400" size={48} />
              )}
            </div>

            <label className="absolute -bottom-2 -right-2 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md hover:bg-blue-800 transition">
                <Camera size={16} />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(e.target.files[0])
                }
              />
            </label>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              Profile Photo
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Upload a clear photo to personalize your account.
            </p>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-900 outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email (READ ONLY — premium behavior) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              value={email}
              readOnly
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* ================= SAVE ================= */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

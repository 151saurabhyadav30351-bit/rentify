import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import { CarFront, Loader2, UploadCloud } from "lucide-react";
import { useUser } from "../UserContext";

export default function AddCar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  // ✅ HARD AUTH GUARD (VERY IMPORTANT)
  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue");
      navigate("/auth");
    }
  }, [token, navigate]);
  
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [pricePerDay, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [seats, setSeats] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [transmission, setTransmission] = useState("Manual");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { fetchUser } = useUser();
  const handleAdd = async () => {
    // ✅ extra safety
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/auth");
      return;
    }

    if (!title || !brand || !city || !pricePerDay || !seats) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = image;

      // ================= IMAGE UPLOAD =================
      if (imageFile) {
        try {
          setUploading(true);

          const form = new FormData();
          form.append("image", imageFile);

          const uploadRes = await API.post("/api/upload", form, {
            headers: { Authorization: `Bearer ${token}` },
          });

          imageUrl = uploadRes.data.url;
        } catch (err) {
          toast.error("Image upload failed");
          return;
        } finally {
          setUploading(false);
        }
      }

      // ================= CREATE CAR =================
      await API.post(
        "/api/cars",
        {
          title,
          brand,
          city,
          pricePerDay,
          image: imageUrl,
          seats,
          fuelType,
          transmission,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Car listed successfully. You're now a host 🚀");

        // ⭐ CRITICAL — refresh user globally
        await fetchUser();

        navigate("/dashboard/manage-cars");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-1">
          <CarFront className="text-blue-900" size={30} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add New Car
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-500">
          Fill in the details to list your vehicle for bookings.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* LEFT — FORM */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-4 sm:p-6 md:p-8 space-y-6">
          <SectionTitle title="Basic Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Car Title" onChange={setTitle} />
            <Input label="Brand" onChange={setBrand} />
            <Input label="City" onChange={setCity} />
            <Input label="Price per day" type="number" onChange={setPrice} />
          </div>

          <SectionTitle title="Car Specifications" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Seats" type="number" onChange={setSeats} />

            <Select
              label="Fuel Type"
              value={fuelType}
              onChange={setFuelType}
              options={["Petrol", "Diesel", "Electric"]}
            />

            <Select
              label="Transmission"
              value={transmission}
              onChange={setTransmission}
              options={["Manual", "Automatic"]}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleAdd}
              disabled={loading || uploading}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 transition shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Car"
              )}
            </button>
          </div>
        </div>

        {/* RIGHT — IMAGE PANEL */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 h-fit sticky top-24">
          <h3 className="font-semibold text-gray-900 mb-4">
            Car Image
          </h3>

          <label
            htmlFor="car-image"
            className="block cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) setImageFile(file);
            }}
          >
            <div className="aspect-video rounded-xl bg-gray-100 mb-4 overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 transition">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : image ? (
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <UploadCloud className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-xs text-gray-500">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
            </div>
          </label>

          <input
            id="car-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <p className="text-xs text-gray-500">
            Tip: Use high-quality landscape images. <br />
            JPG, PNG, WEBP supported
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function SectionTitle({ title }) {
  return (
    <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
      {title}
    </h2>
  );
}

function Input({ label, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        className="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        className="w-full border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
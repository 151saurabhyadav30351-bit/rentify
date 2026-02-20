import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import { CarFront, Loader2, UploadCloud } from "lucide-react";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [pricePerDay, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [seats, setSeats] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [transmission, setTransmission] = useState("Manual");

  // ✅ fetch car
  useEffect(() => {
    API.get(`/api/cars/${id}`)
      .then((res) => {
        const car = res.data;
        setTitle(car.title);
        setBrand(car.brand);
        setCity(car.city);
        setPrice(car.pricePerDay);
        setImage(car.image);
        setSeats(car.seats || "");
        setFuelType(car.fuelType || "Petrol");
        setTransmission(car.transmission || "Manual");
      })
      .catch(() => toast.error("Failed to load car"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !brand || !city || !pricePerDay || !seats) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = image;

      // ✅ upload new image if changed
      if (imageFile) {
        setUploading(true);

        const form = new FormData();
        form.append("image", imageFile);

        const uploadRes = await API.post("/api/upload", form, {
          headers: { Authorization: `Bearer ${token}` },
        });

        imageUrl = uploadRes.data.url;
        setUploading(false);
      }

      await API.put(
        `/api/cars/${id}`,
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Car updated successfully 🚗");
      navigate("/dashboard/manage-cars");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <CarFront className="text-blue-900" size={30} />
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Car
          </h1>
        </div>
        <p className="text-gray-500">
          Update your vehicle information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6 md:p-8 space-y-6">
          <SectionTitle title="Basic Information" />

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Car Title" value={title} onChange={setTitle} />
            <Input label="Brand" value={brand} onChange={setBrand} />
            <Input label="City" value={city} onChange={setCity} />
            <Input
              label="Price per day"
              type="number"
              value={pricePerDay}
              onChange={setPrice}
            />
          </div>

          <SectionTitle title="Car Specifications" />

          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Seats" type="number" value={seats} onChange={setSeats} />

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
              onClick={handleUpdate}
              disabled={saving || uploading}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 transition"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Car"
              )}
            </button>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 h-fit sticky top-24">
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
                <UploadCloud className="text-gray-400" size={32} />
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
            Drag & drop or click to replace image
          </p>
        </div>
      </div>
    </div>
  );
}

/* helpers */

function SectionTitle({ title }) {
  return (
    <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
      {title}
    </h2>
  );
}

function Input({ label, value, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

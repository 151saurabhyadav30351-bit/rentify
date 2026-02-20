export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[#0F2D52] text-white px-6 py-3 rounded-xl shadow-lg z-50">
      {message}
    </div>
  );
}

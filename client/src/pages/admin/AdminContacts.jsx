import { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get("/api/contact/admin");
        setMessages(res.data);
      } catch (err) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      setActionLoading(id);
      await API.delete(`/api/contact/admin/${id}`);

      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading messages...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Support Inbox
      </h1>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border shadow-sm p-10 text-center text-gray-500">
          No support messages yet
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {msg.subject}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {msg.name} • {msg.email}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(msg._id)}
                  disabled={actionLoading === msg._id}
                  className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50"
                >
                  {actionLoading === msg._id ? "Deleting..." : "Delete"}
                </button>
              </div>

              <p className="mt-4 text-gray-700 text-sm whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
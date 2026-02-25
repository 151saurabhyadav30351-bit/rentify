import { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";
import { Mail, Trash2 } from "lucide-react";

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // ================= FETCH =================
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

  // ================= DELETE =================
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

  // ================= LOADING SKELETON =================
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />

        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border p-6 space-y-3 animate-pulse"
            >
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-64 bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-5/6 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Support Inbox
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage user queries and support requests
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-white border rounded-xl px-3 py-2">
          <Mail size={16} />
          {messages.length} Messages
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border shadow-sm p-14 text-center">
          <div className="flex justify-center mb-4 text-gray-300">
            <Mail size={42} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            No support messages yet
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            When users contact you, messages will appear here.
          </p>
        </div>
      ) : (
        /* ================= MESSAGE LIST ================= */
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition"
            >
              {/* TOP ROW */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold text-gray-900 text-lg">
                    {msg.subject}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {msg.name} • {msg.email}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(msg._id)}
                  disabled={actionLoading === msg._id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50 whitespace-nowrap"
                >
                  <Trash2 size={14} />
                  {actionLoading === msg._id ? "Deleting..." : "Delete"}
                </button>
              </div>

              {/* MESSAGE BODY */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
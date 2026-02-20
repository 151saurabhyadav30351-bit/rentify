import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api";

export default function Contact() {
  // ================= STATE =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/contact", {
        name,
        email,
        subject,
        message,
      });

      toast.success("Message sent successfully 🚀");

      // ✅ auto reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto pb-20">
      {/* Heading */}
      <div className="text-center mb-25">
        <h1 className="text-5xl font-bold text-blue-900">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-2">
          Have questions? We'd love to hear from you. <br />
          Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-semibold text-blue-900 mb-6">
            Get in Touch
          </h2>

          <p className="text-gray-500 mb-10 max-w-md">
            Our team is here to help. Reach out through any of the
            following channels or fill out the form and we'll get
            back to you within 24 hours.
          </p>

          <div className="space-y-8">
            <ContactItem
              icon={MapPin}
              title="Address"
              lines={["123 Asalpha", "Mumbai City", "India"]}
            />

            <ContactItem
              icon={Phone}
              title="Phone"
              lines={["+91 8591389284", "Mon-Fri, 9am-6pm IST"]}
            />

            <ContactItem
              icon={Mail}
              title="Email"
              lines={[
                "hello@rentify.com",
                "support@rentify.com",
              ]}
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h3 className="text-2xl font-semibold text-blue-900 mb-8">
            Send a Message
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className="mt-2 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                className="mt-2 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us more about your inquiry..."
                className="mt-2 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F2D52] text-white py-3 rounded-xl hover:bg-[#0c2442] transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* LEFT INFO CARD */
function ContactItem({ icon: Icon, title, lines }) {
  return (
    <div className="flex gap-5">
      <div className="w-14 h-14 rounded-xl bg-[#14B8A6]/15 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#14B8A6]" />
      </div>

      <div>
        <h4 className="font-semibold text-blue-900 mb-1">
          {title}
        </h4>

        {lines.map((line, i) => (
          <p key={i} className="text-sm text-gray-500">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
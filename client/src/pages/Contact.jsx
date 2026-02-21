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
    <div className="pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-12 sm:pb-16 lg:pb-20">
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
          Have questions? We'd love to hear from you. <br className="hidden sm:block" />
          Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-900 mb-4 sm:mb-6">
            Get in Touch
          </h2>

          <p className="text-gray-500 mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
            Our team is here to help. Reach out through any of the
            following channels or fill out the form and we'll get
            back to you within 24 hours.
          </p>

          <div className="space-y-6 sm:space-y-8">
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
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6 sm:mb-8">
            Send a Message
          </h3>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-xs sm:text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className="mt-2 w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                className="mt-2 w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-xs sm:text-sm font-medium">Message</label>
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us more about your inquiry..."
                className="mt-2 w-full border rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F2D52] text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-[#0c2442] transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 text-sm sm:text-base font-medium"
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
    <div className="flex gap-3 sm:gap-5">
      <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-xl bg-[#14B8A6]/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#14B8A6]" />
      </div>

      <div>
        <h4 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">
          {title}
        </h4>

        {lines.map((line, i) => (
          <p key={i} className="text-xs sm:text-sm text-gray-500">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
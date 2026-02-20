import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Car
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#14335C] text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* Brand */}
          <div>
            <div className="mb-4">
                <span className="text-xl font-semibold">Rentify</span>
              </div>
              
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
             Your trusted partner for affordable and reliable car rentals. 
             Drive your dreams today.
            </p>

            <div className="flex gap-3 mt-5">

              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </div>
              ))}

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-5">Quick Links</h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/cars" className="hover:text-white">Cars</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium mb-5">Services</h4>

            <ul className="space-y-3 text-sm text-white/70">
              <li>Car Rental</li>
              <li>Long Term Rental</li>
              <li>Become a Host</li>
              <li>Corporate Plans</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-5">Contact Us</h4>

            <ul className="space-y-4 text-sm text-white/70">

              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Asalpha, Mumbai City, India</span>
              </li>

              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 mt-0.5" />
                <span>+91 8591389284</span>
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-0.5" />
                <span>hello@rentify.com</span>
              </li>

            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">

          <p>© 2026 Rentify. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
          </div>

        </div>

      </div>

    </footer>
  );
}

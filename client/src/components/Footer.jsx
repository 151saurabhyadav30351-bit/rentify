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
    <footer className="bg-[#14335C] text-white mt-12 sm:mt-16 lg:mt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-lg sm:text-xl font-semibold">Rentify</span>
            </div>
            
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xs">
              Your trusted partner for affordable and reliable car rentals. 
              Drive your dreams today.
            </p>

            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-4 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/cars" className="hover:text-white transition">Cars</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-4 sm:mb-5">Services</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
              <li>Car Rental</li>
              <li>Long Term Rental</li>
              <li>Become a Host</li>
              <li>Corporate Plans</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-4 sm:mb-5">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/70">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Asalpha, Mumbai City, India</span>
              </li>

              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 8591389284</span>
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>hello@rentify.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/60">
          <p>© 2026 Rentify. All rights reserved.</p>

          <div className="flex gap-4 sm:gap-6 text-center sm:text-right">
            <span className="cursor-pointer hover:text-white transition">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition">Terms of Service</span>
          </div>
        </div>

      </div>

    </footer>
  );
}

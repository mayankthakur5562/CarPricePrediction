import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  CarFront,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Brand Section */}
        <div className="footer-about">
          <div className="footer-brand">
            <CarFront size={24} />
            <span>AutoPredict</span>
          </div>

          <p>
            Get a smarter estimate of your car's market value using
            data-driven price prediction technology.
          </p>

          <div className="footer-contact">
            <div>
              <Mail size={16} />
              <span>support@autopredict.com</span>
            </div>

            <div>
              <MapPin size={16} />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/predict">Price Prediction</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About Us</Link>
        </div>

        {/* Services */}
        <div className="footer-links">
          <h4>Our Services</h4>

          <span>Car Price Estimation</span>
          <span>Used Car Valuation</span>
          <span>Market Price Analysis</span>
          <span>Vehicle Insights</span>
        </div>

        {/* Connect */}
        <div className="footer-connect">
          <h4>Connect With Us</h4>

          <p>
            Have a question or feedback? We'd love to hear from you.
          </p>

          <div className="socials">
            <a
              href="mailto:support@autopredict.com"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <span>
            © 2026 AutoPredict. All rights reserved.
          </span>

          <div>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

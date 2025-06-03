import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-10 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-lg font-playfair font-medium tracking-tight">
              KRISHNA KUMAR
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm">
            <Link to="/about" className="hover:text-gray-500 transition-colors">
              About
            </Link>
            {/* <Link to="/services" className="hover:text-gray-500 transition-colors">
              Services
            </Link> */}
            <Link to="/insights" className="hover:text-gray-500 transition-colors">
              Insights
            </Link>
            <Link to="/contact" className="hover:text-gray-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-playfair">© {currentYear} Krishna Kumar. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/terms" className="hover:text-gray-700 transition-colors font-playfair">
              Terms and Conditions
            </Link>
            <Link to="/privacy" className="hover:text-gray-700 transition-colors font-playfair">
              Privacy & Policies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

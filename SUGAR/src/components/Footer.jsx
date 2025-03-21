import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Quick Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xs  mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link to="/stores" className="text-xs hover:text-gray-300">Stores Locator</Link></li>
              <li><Link to="/elite" className="text-xs hover:text-gray-300">Elite</Link></li>
              <li><Link to="/returns" className="text-xs hover:text-gray-300">Returns</Link></li>
              <li><Link to="/terms" className="text-xs hover:text-gray-300">Terms & Conditions</Link></li>
              <li><Link to="/faqs" className="text-xs hover:text-gray-300">FAQs</Link></li>
              <li><Link to="/about" className="text-xs hover:text-gray-300">About Us</Link></li>
              <li><Link to="/influencer" className="text-xs hover:text-gray-300">Influencer Collab</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xs mr-26  mb-4">SUPPORT</h3>
            {/* Email needs to remain as an anchor tag with mailto: */}
            <a href="mailto:hello@sugarcosmetics.com" className="text-xs mr-26 underline hover:text-gray-300">
              hello@sugarcosmetics.com
            </a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8 mb-8">
          <Link to="/social/facebook" className="text-white hover:text-gray-300">
            <FaFacebookF size={16} />
          </Link>
          <Link to="/social/twitter" className="text-white hover:text-gray-300">
            <FaTwitter size={16} />
          </Link>
          <Link to="/social/instagram" className="text-white hover:text-gray-300">
            <FaInstagram size={16} />
          </Link>
          <Link to="/social/youtube" className="text-white hover:text-gray-300">
            <FaYoutube size={16} />
          </Link>
          <Link to="/social/linkedin" className="text-white hover:text-gray-300">
            <FaLinkedinIn size={16} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          © 2023 - SUGAR COSMETICS
        </div>

        
       
      </div>
    </footer>
  );
};

export default Footer;
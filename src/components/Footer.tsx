import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Made with <Heart className="footer-heart" size={18} /> for a sustainable future
        </p>
        <p className="mt-2">&copy; 2024 CSR/ESG Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
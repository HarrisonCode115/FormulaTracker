import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} F1 Tracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
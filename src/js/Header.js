import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <header className="header">
      <h1>F1 Tracker</h1>
      <nav className="header-nav">
        <a href="/">Home</a>
        <a href="/constructorHome/">Constructors</a>
        <a href="/driverHome/">Drivers</a>
      </nav>
    </header>
  );
}

export default Header;
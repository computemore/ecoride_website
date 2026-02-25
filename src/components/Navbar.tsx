import React, { useState, useEffect } from 'react';
import { Dropdown } from './Dropdown';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadOptions = [
    { label: 'Driver App (Android)', href: 'https://play.google.com/store/apps/details?id=com.ecoridetaxi.driver' },
    { label: 'Rider App (Coming Soon)', href: '#' },
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="/" className="brand">
          <span className="brand-text">eco</span>ride
        </a>

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <Dropdown label="Download App" items={downloadOptions} />
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          background: transparent;
          transition: all 0.3s ease;
          z-index: 1000;
        }
        .navbar-wrapper.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: var(--shadow-sm);
        }
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          font-family: var(--font-family-heading);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
        }
        .brand-text {
          color: var(--primary-green);
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: var(--space-lg);
        }
        .nav-links a {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 16px;
        }
        .navbar-wrapper.scrolled .nav-links a:hover {
          color: var(--primary-green);
        }
        .nav-actions {
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

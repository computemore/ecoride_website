import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h2 className="brand-title"><span className="highlight">eco</span>ride</h2>
          <p className="mt-1">Blantyre City, Victoria Avenue<br/>Meridian House, First Floor</p>
          <p className="mt-1">Phone: +265 994 139 173</p>
        </div>
        
        <div className="footer-links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h3>Our Services</h3>
          <ul>
            <li><a href="#">Where we are</a></li>
            <li><a href="#">Digital Maps</a></li>
            <li><a href="#">Product Management</a></li>
            <li><a href="#">Join Us</a></li>
            <li><a href="#">Quick Calls</a></li>
          </ul>
        </div>
        
        <div className="footer-newsletter">
          <h3>Our Newsletter</h3>
          <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
          <div className="newsletter-form mt-1">
            <input type="email" placeholder="Email address" className="newsletter-input" />
            <button className="btn btn-primary newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Copyright <strong>ecoride</strong> All Rights Reserved</p>
      </div>

      <style>{`
        .footer {
          background: var(--navy-blue);
          color: var(--white);
          padding-top: var(--space-xxl);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
        .brand-title {
          font-size: 2rem;
          color: var(--white);
        }
        .brand-title .highlight {
          color: var(--primary-green);
        }
        .footer p {
          color: rgba(255, 255, 255, 0.7);
        }
        .footer h3 {
          color: var(--white);
          margin-bottom: var(--space-md);
          font-size: 1.2rem;
        }
        .footer-links ul {
          list-style: none;
        }
        .footer-links li {
          margin-bottom: var(--space-sm);
        }
        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-links a:hover {
          color: var(--primary-green);
        }
        .newsletter-form {
          display: flex;
          border-radius: var(--radius-round);
          background: rgba(255, 255, 255, 0.1);
          padding: 4px;
        }
        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 8px 16px;
          color: var(--white);
          outline: none;
        }
        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .newsletter-btn {
          padding: 8px 24px;
        }
        .footer-bottom {
          text-align: center;
          padding: var(--space-lg) 0;
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </footer>
  );
};

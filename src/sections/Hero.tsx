import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background"></div>
      <div className="container hero-container animate-fade-in">
        <h1 className="hero-title">
          welcome to <span className="highlight">ecoride</span>
        </h1>
        <p className="hero-subtitle">A RIDE SIMPLIFIED</p>
        
        <div className="hero-actions">
          <a href="#features" className="btn btn-primary btn-large">
            Explore Features
          </a>
          <a href="#" className="btn btn-outline btn-large">
            Watch Video
          </a>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }
        .hero-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--light-green) 0%, rgba(255,255,255,1) 100%);
          z-index: -1;
        }
        .hero-background::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: var(--primary-green);
          filter: blur(150px);
          opacity: 0.1;
          top: 10%;
          right: -10%;
          border-radius: 50%;
        }
        .hero-container {
          text-align: center;
          max-width: 800px;
        }
        .hero-title {
          font-size: 4rem;
          margin-bottom: var(--space-sm);
        }
        .hero-title .highlight {
          color: var(--primary-green);
        }
        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: var(--space-xxl);
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .hero-actions {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
        }
        .btn-large {
          padding: 16px 36px;
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-actions {
            flex-direction: column;
            padding: 0 var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
};

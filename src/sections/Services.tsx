import React from 'react';

const SERVICES_DATA = [
  'Where we are',
  'Digital Maps',
  'Product Management',
  'Join Us',
  'Quick Calls',
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2 className="section-title text-center">Our Services</h2>
        <p className="text-center mt-1 subtitle">Explore what we have to offer.</p>
        
        <div className="services-grid mt-3">
          {SERVICES_DATA.map((service, idx) => (
            <div key={idx} className="service-item glass card">
              <div className="service-check">✓</div>
              <span className="service-name">{service}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          background: var(--background);
          position: relative;
        }
        .subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-lg);
          max-width: 900px;
          margin: var(--space-xl) auto 0;
        }
        .service-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md) var(--space-lg);
          cursor: pointer;
        }
        .service-item:hover {
          background: var(--primary-green);
          color: var(--white);
        }
        .service-item:hover .service-check {
          background: var(--white);
          color: var(--primary-green);
        }
        .service-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--success-green);
          color: var(--white);
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .service-name {
          font-weight: 500;
          font-size: 1.1rem;
        }
      `}</style>
    </section>
  );
};

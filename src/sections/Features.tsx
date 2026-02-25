import React from 'react';

const FEATURE_DATA = [
  {
    icon: '🛡️',
    title: 'Safe',
    description: 'We inspect vehicles, check insurance, follow laws, drive carefully, and report issues.',
  },
  {
    icon: '⭐',
    title: 'Reliable',
    description: 'We are on-time, open to reviews, confirm reservations, ensure support, and verify policies.',
  },
  {
    icon: '🎧',
    title: '24/7 Support',
    description: 'Round-the-clock assistance, quick resolutions, high customer satisfaction, reliable service.',
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title text-center">Why Choose Us</h2>
        <div className="features-grid mt-3">
          {FEATURE_DATA.map((feature, idx) => (
            <div key={idx} className="card feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section {
          background: var(--white);
        }
        .section-title {
          font-size: 2.5rem;
          color: var(--navy-blue);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-xl);
        }
        .feature-card {
          text-align: center;
          padding: var(--space-xl) var(--space-lg);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary-green);
        }
        .feature-icon {
          font-size: 3rem;
          margin-bottom: var(--space-md);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: var(--light-green);
          border-radius: 50%;
        }
        .feature-title {
          font-size: 1.5rem;
          margin-bottom: var(--space-sm);
          color: var(--navy-blue);
        }
        .feature-desc {
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
};

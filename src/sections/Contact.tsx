import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title text-center">Contact</h2>
        <p className="subtitle text-center mt-1">For all your queries feel free to contact us</p>

        <div className="contact-grid mt-3">
          <div className="contact-info card">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h3>Address</h3>
                <p>Blantyre City, Victoria Avenue</p>
                <p>Meridian House, First Floor</p>
              </div>
            </div>
            
            <div className="info-item mt-2">
              <div className="info-icon">📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+265 994 139 173</p>
                <p>+265 994 919 373</p>
                <p>+265 882 599 345</p>
              </div>
            </div>

            <div className="info-item mt-2">
              <div className="info-icon">📧</div>
              <div>
                <h3>Email Us</h3>
                <p><a href="mailto:info@ecoridemw.com">info@ecoridemw.com</a></p>
              </div>
            </div>
          </div>

          <div className="contact-form card">
            <form className="form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" className="form-input" />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" className="form-textarea" rows={5}></textarea>
              </div>
              <button type="button" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--white);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-xl);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        .info-item {
          display: flex;
          gap: var(--space-md);
          align-items: flex-start;
        }
        .info-icon {
          font-size: 1.5rem;
          padding: 12px;
          background: var(--light-green);
          border-radius: 50%;
        }
        .info-item h3 {
          font-size: 1.2rem;
          margin-bottom: var(--space-xs);
        }
        .info-item p {
          color: var(--text-secondary);
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--divider);
          border-radius: var(--radius-md);
          font-family: inherit;
          font-size: 1rem;
          background: var(--background-light);
          transition: all 0.3s ease;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(37, 167, 148, 0.1);
        }
        .form-textarea {
          resize: vertical;
        }
      `}</style>
    </section>
  );
};

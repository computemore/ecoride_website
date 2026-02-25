import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

export const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        className="btn btn-primary" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true" 
        aria-expanded={isOpen}
      >
        {label} <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <a key={index} href={item.href} className="dropdown-item">
              {item.label}
            </a>
          ))}
        </div>
      )}
      
      <style>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .arrow {
          font-size: 0.8em;
          margin-left: 8px;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          min-width: 200px;
          background: var(--surface);
          border: 1px solid var(--divider);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          z-index: 1000;
          overflow: hidden;
          animation: dropDown 0.2s ease-out;
        }
        .dropdown-item {
          display: block;
          padding: 12px 16px;
          color: var(--text-primary);
          text-decoration: none;
          transition: background 0.2s;
        }
        .dropdown-item:hover {
          background: var(--light-green);
          color: var(--primary-green);
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

import React from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  type: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ message, show, type }) => {
  return (
    <div className={`toast ${show ? 'show' : ''}`} id="toast">
      <div className="toast-content">
        {type === 'success' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="toast-success-icon"
            style={{ color: 'var(--success)' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="toast-success-icon"
            style={{ color: 'var(--error)' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

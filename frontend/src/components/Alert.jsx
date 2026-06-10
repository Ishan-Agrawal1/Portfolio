import React from 'react';

export function Alert({ type = 'success', title, message, isVisible }) {
  if (!isVisible) return null;

  const alertStyles = {
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/50',
      textTitle: 'text-green-400',
      textMessage: 'text-green-400',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      textTitle: 'text-red-400',
      textMessage: 'text-red-400',
      icon: '✕',
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/50',
      textTitle: 'text-yellow-400',
      textMessage: 'text-yellow-400',
      icon: '⚠',
    },
  };

  const styles = alertStyles[type] || alertStyles.success;

  return (
    <div className={`${styles.bg} border ${styles.border} p-6 rounded-lg`}>
      <p className={`${styles.textTitle} font-mono text-sm font-semibold`}>
        {styles.icon} {title}
      </p>
      {message && (
        <p className={`${styles.textMessage} font-mono text-sm mt-2`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Alert;

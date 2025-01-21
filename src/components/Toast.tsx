import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string | null;
  duration?: number;
}

export function Toast({ message, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    } else {
        setIsVisible(false)
    }
  }, [message, duration]);

  if (!message || !isVisible) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-4 rounded z-50">
      {message}
    </div>
  );
}
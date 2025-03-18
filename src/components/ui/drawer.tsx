'use client';

import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: string; 
  showBackdrop?: boolean;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  size = 'w-80',
  showBackdrop = true,
}: SheetProps) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10); 
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {showBackdrop && visible && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300  ${animate ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
      )}
      {visible && (
        <div
          className={`fixed right-0 top-0 pt-10 text-start overflow-y-scroll max-h-full ${size} h-full bg-white shadow-xl z-50 p-4 transform transition-transform duration-300 ease-in-out ${
            animate ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button onClick={onClose} className="absolute top-2 right-2 p-2">
            <IoClose className="w-6 h-6" />
          </button>
          {children}
        </div>
      )}
    </>
  );
}


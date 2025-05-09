"use client";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string; // New width prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, width = "max-w-md" }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50   ${className}`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-4 shadow-lg max-lg:max-h-[700px] max-lg:overflow-x-scroll ${width ? width: "w-[30%]"}  relative animate-fade-in animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        {/* Modal Content */}
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

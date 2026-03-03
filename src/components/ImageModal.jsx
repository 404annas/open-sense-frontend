import React, { useRef, useEffect } from 'react';

const ImageModal = ({ isOpen, onClose, imageSrc, altText }) => {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  // Close modal when clicking outside the image content
  const handleBackdropClick = (e) => {
    if (modalRef.current && modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className="relative max-w-6xl max-h-[90vh] mx-auto p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="
    absolute -top-8 right-0 z-10
    w-10 h-10 rounded-full ring-2 ring-white
    flex items-center justify-center
    text-white text-xl font-bold
    hover:text-gray-300 transition-colors
    focus:outline-none focus:ring-2 focus:ring-white cursor-pointer
  "
        >
          <span className="relative -top-[1px]">✕</span>
        </button>
        <img
          loading='lazy'
          src={imageSrc}
          alt={altText}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import { urlFor } from "../lib/sanity";
import LoadingSpinner from "./LoadingSpinner";

const Lightbox = ({ photos, selectedImageIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    if (selectedImageIndex != null) {
      setCurrentIndex(selectedImageIndex);
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const currentPhoto =
    photos && currentIndex != null ? photos[currentIndex] : null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-700 hover:text-gray-900 z-10 p-2 cursor-pointer"
      >
        <MdClose className="h-8 w-8" />
      </button>

      {/* Previous Button */}
      {photos.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 z-10 p-2 cursor-pointer"
        >
          <MdChevronLeft className="h-12 w-12" />
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 z-10 p-2 cursor-pointer"
        >
          <MdChevronRight className="h-12 w-12" />
        </button>
      )}

      {/* Main Image */}
      {!currentPhoto ? (
        <LoadingSpinner />
      ) : (
        <div className="relative flex items-center justify-center w-full h-full max-w-[90vw] max-h-[90vh]">
          <img
            src={urlFor(currentPhoto.image).width(1600).url()}
            alt={currentPhoto.altText}
            className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Lightbox;

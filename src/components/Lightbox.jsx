import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { urlFor } from "../lib/sanity";

const Lightbox = ({ photos, selectedPhoto, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find index of selected photo when lightbox opens
  useEffect(() => {
    if (selectedPhoto) {
      const index = photos.findIndex(
        (photo) => photo._id === selectedPhoto._id
      );
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [selectedPhoto, photos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (!selectedPhoto) return null;

  const currentPhoto = photos[currentIndex];

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
        <X className="h-8 w-8" />
      </button>

      {/* Previous Button */}
      {photos.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 z-10 p-2 cursor-pointer"
        >
          <ChevronLeft className="h-12 w-12" />
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 z-10 p-2 cursor-pointer"
        >
          <ChevronRight className="h-12 w-12" />
        </button>
      )}

      {/* Main Image */}
      <div className="relative max-w-5xl max-h-full">
        <img
          src={urlFor(currentPhoto.image)
            .width(1600)
            .height(1200)
            .fit("max")
            .url()}
          alt={currentPhoto.altText}
          className="max-w-full max-h-full object-contain shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Lightbox;

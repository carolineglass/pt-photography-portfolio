import { useState, useRef, useEffect } from "react";
import { urlFor } from "../lib/sanity";

const FadeInImage = ({ photo, onClick, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of image is visible
        rootMargin: "50px", // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden cursor-zoom-in transition-all duration-700 ${
        isVisible && isLoaded
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-6"
      } ${className}`}
      onClick={() => onClick && onClick(photo)}
    >
      {/* image placeholder */}
      {!isLoaded && <div className="w-full h-64 animate-pulse"></div>}

      {/* image shows once visible from IntersectionObserver */}
      {isVisible && (
        <img
          src={urlFor(photo.image).width(600).url()}
          alt={photo.altText}
          className={`w-full h-auto object-cover ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default FadeInImage;

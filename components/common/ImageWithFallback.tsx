import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string; // Class for the placeholder/fallback container
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = 'bg-slate-200 flex items-center justify-center text-slate-400',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    
    // Check if src is valid before attempting to load
    if (src && typeof src === 'string' && src.trim() !== '') {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setIsLoading(false);
            setHasError(false);
        };
        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
            setCurrentSrc(null); // Clear src on error
        };
    } else {
        // Invalid src provided
        setHasError(true);
        setIsLoading(false);
        setCurrentSrc(null);
    }

  }, [src]);

  if (isLoading) {
    return (
      <div className={`${className} ${placeholderClassName} animate-pulse`}>
        {/* You can put a simplified SVG or nothing here, pulse animation gives loading feedback */}
      </div>
    );
  }

  if (hasError || !currentSrc) {
    return (
      <div className={`${className} ${placeholderClassName}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-1/2 h-1/2 opacity-50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 opacity-100`}
    />
  );
};

export default ImageWithFallback;
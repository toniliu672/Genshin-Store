import React, { useEffect, useRef, useCallback } from 'react';
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Typography } from '@mui/material';
import useDeviceSize from '../../hooks/useDeviceSize';

interface GallerySectionProps {
  imageLinks: string[];
  handleClick: (index: number) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({ imageLinks, handleClick }) => {
  const isMobile = useDeviceSize();
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const lgInstanceRef = useRef<any>(null);

  const initLightGallery = useCallback(() => {
    if (galleryRef.current) {
      if (lgInstanceRef.current) {
        lgInstanceRef.current.destroy(true);
      }

      lgInstanceRef.current = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        thumbnail: true,
        zoom: true,
        selector: '.gallery-item',
        zoomFromOrigin: false,
        allowMediaOverlap: false,
        actualSize: true,
        controls: true,
        download: false,
        preload: 3,
        closable: true,
        closeOnTap: true,
        showMaximizeIcon: true,
      });
    }
  }, []);

  useEffect(() => {
    initLightGallery();

    return () => {
      if (lgInstanceRef.current) {
        lgInstanceRef.current.destroy(true);
        lgInstanceRef.current = null;
      }
    };
  }, [initLightGallery]);

  return (
    <div className="gallery-section">
      {/* Judul Galeri */}
      <Typography
        variant="h5"
        className="text-gray-400 text-center font-normal"
      >
        Gallery
      </Typography>

      <div 
        id="lightgallery" 
        ref={galleryRef} 
        className={`grid-gallery ${isMobile ? 'columns-2 gap-2 mt-2' : 'columns-3 gap-4 mt-8'}`}
      >
        {imageLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            className="gallery-item break-inside-avoid mb-4 block"
            onClick={(e) => {
              e.preventDefault();
              handleClick(index);
            }}
          >
            <img
              src={link}
              alt={`Gallery Image ${index + 1}`}
              className="w-full rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;

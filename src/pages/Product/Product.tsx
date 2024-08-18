import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import mainBg from '../../assets/bg/bg-product.webp';
import AccountSummary from './AccountSummary';
import MainTeamSection from './MainTeamSection';
import GallerySection from './GallerySection';
import Separator from '../../components/Separator';  // Mengimpor Separator dari components

const imageLinks = [
  'https://i.imgur.com/uG4GBWM.jpg',
  'https://i.imgur.com/3IJyQlY.jpg',
  'https://i.imgur.com/Re7YHXN.jpg',
  'https://i.imgur.com/YFG6vAY.jpg',
  'https://i.imgur.com/QIGhzus.jpg',
  'https://i.imgur.com/muULYBN.jpg',
  'https://i.imgur.com/dcHby4P.jpg',
  'https://i.imgur.com/59VMgeF.jpg',
];

const preloadImages = (links: string[]) => {
  links.forEach((link) => {
    const img = new Image();
    img.src = link;
  });
};

const Product: React.FC = () => {
  const [lgInstance, setLgInstance] = useState<any>(null);

  useEffect(() => {
    gsap.fromTo(
      ".background",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    preloadImages(imageLinks);

    if (!lgInstance) {
      const instance = lightGallery(document.getElementById('lightgallery') as HTMLElement, {
        plugins: [lgThumbnail, lgZoom],
        thumbnail: true,
        zoom: true,
        selector: '.gallery-item',
        zoomFromOrigin: true,
        allowMediaOverlap: true,
        actualSize: true,
        controls: true,
        download: false,
      });

      setLgInstance(instance);
    }

    return () => {
      if (lgInstance) {
        lgInstance.destroy(true);
      }
    };
  }, [lgInstance]);

  const handleClick = (index: number) => {
    if (lgInstance) {
      lgInstance.closeGallery();
      lgInstance.openGallery(index);
    }
  };

  return (
    <div
      className="background flex justify-center items-center min-h-screen p-5 md:p-10"
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="glass-background p-5 md:p-10 bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg max-w-full md:max-w-5xl mx-auto"
      >
        <AccountSummary />
        <Separator />
        <MainTeamSection />
        <Separator />
        <div id="lightgallery">
          <GallerySection imageLinks={imageLinks} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Product;

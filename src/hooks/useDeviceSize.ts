import { useState, useEffect } from 'react';

const useDeviceSize = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const updateDeviceSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDeviceSize);

    // Inisialisasi saat pertama kali hook dipasang
    updateDeviceSize();

    return () => {
      window.removeEventListener('resize', updateDeviceSize);
    };
  }, []);

  return isMobile;
};

export default useDeviceSize;

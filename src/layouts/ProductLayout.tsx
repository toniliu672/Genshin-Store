import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductLayout: React.FC = () => {
  return (
    <div>
      {/* Layout ini bisa diisi dengan header, sidebar, atau elemen lainnya nanti */}
      <Outlet /> {/* Tempat halaman Product.tsx akan dirender */}
    </div>
  );
};

export default ProductLayout;

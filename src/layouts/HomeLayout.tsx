import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const HomeLayout: React.FC = () => {
  return (
    <div>
        <Header />
      <main>
        <Outlet /> {/* Ini akan menampilkan konten dari route anak */}
      </main>
    </div>
  );
};

export default HomeLayout;

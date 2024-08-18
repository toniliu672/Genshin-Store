import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Modal} from '@mui/material';
import useDeviceSize from '../../hooks/useDeviceSize';
import spiralAbyssBackground from '../../assets/bg/spiral-abbys.webp';
import imaginariumTheaterBackground from '../../assets/bg/imaginarium-theater.webp';
import imaginariumTheaterPopup from '../../assets/img/imaginarium-theater.png'; // Pastikan Anda memiliki gambar ini

const SpiralAbyss: React.FC = () => {
    const isMobile = useDeviceSize();
    const [openModal, setOpenModal] = useState(false);
  
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    const cardData = [
      {
        title: 'Spiral Abyss',
        description: 'Cleared Floor 6-3',
        backgroundImage: spiralAbyssBackground,
        onClick: () => {},
      },
      {
        title: 'Imaginarium Theater',
        description: 'Cleared Act 6',
        backgroundImage: imaginariumTheaterBackground,
        onClick: handleOpenModal,
      },
    ];
  
    return (
      <Box className="my-8">
        <Typography variant={isMobile ? 'h5' : 'h4'} className="text-center mb-6 font-bold text-yellow-400">
          Challenge Progress
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                className="relative overflow-hidden rounded-lg shadow-xl h-48 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={card.onClick}
              >
                <Box className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out hover:bg-opacity-40" />
                <CardContent className="relative h-full flex flex-col justify-end transition-all duration-300 ease-in-out transform hover:translate-y-[-5px]">
                  <Typography variant="h6" className="text-white font-bold mb-2 transition-all duration-300 ease-in-out hover:text-yellow-400">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-300 transition-all duration-300 ease-in-out hover:text-white">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="imaginarium-theater-popup"
          aria-describedby="imaginarium-theater-details"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90vw' : '80vw',
            maxHeight: isMobile ? '80vh' : '90vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto', // Add scrollable overflow
          }}>
            <img 
              src={imaginariumTheaterPopup} 
              alt="Imaginarium Theater Details" 
              style={{ 
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
              }} 
            />
          </Box>
        </Modal>
      </Box>
    );
  };
  
export default SpiralAbyss;

import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import useDeviceSize from '../../hooks/useDeviceSize';
import spiralAbyssBackground from '../../assets/bg/spiral-abbys.webp';
import imaginariumTheaterBackground from '../../assets/bg/imaginarium-theater.webp';

const SpiralAbyss: React.FC = () => {
  const isMobile = useDeviceSize();

  const cardData = [
    {
      title: 'Spiral Abyss',
      description: 'Cleared Floor 6-3',
      backgroundImage: spiralAbyssBackground,
    },
    {
      title: 'Imaginarium Theater',
      description: 'Cleared Act 6',
      backgroundImage: imaginariumTheaterBackground,
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
              className="relative overflow-hidden rounded-lg shadow-xl h-48 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Box
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out hover:bg-opacity-40"
              />
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
    </Box>
  );
};

export default SpiralAbyss;
import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { gsap } from 'gsap';
import bgTeam from '../../assets/bg/bg-team.webp';
import bgTeamMondstad from '../../assets/bg/bg-team-mondstad.webp';
import aetherImage from '../../assets/character/aether.webp';
import barbaraImage from '../../assets/character/barbara.webp';
import fischlImage from '../../assets/character/fischl.webp';
import beidouImage from '../../assets/character/beidou.webp';
import useDeviceSize from '../../hooks/useDeviceSize';

import dendroLogo from '../../assets/element-logos/dendro.webp';
import hydroLogo from '../../assets/element-logos/hydro.webp';
import electroLogo from '../../assets/element-logos/electro.webp';

const teamData = [
  { name: 'Aether', image: aetherImage, elementLogo: dendroLogo },
  { name: 'Barbara', image: barbaraImage, elementLogo: hydroLogo },
  { name: 'Fischl', image: fischlImage, elementLogo: electroLogo },
  { name: 'Beidou', image: beidouImage, elementLogo: electroLogo },
];

const MainTeamSection: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState(teamData[0]);
  const isMobile = useDeviceSize();
  const imageRef = useRef(null);

  const backgroundImage = currentCharacter.name === 'Barbara' || currentCharacter.name === 'Fischl'
    ? bgTeamMondstad
    : bgTeam;

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        ease: "back.out(1.7)"
      }
    );
  }, [currentCharacter]);

  const handleBubbleClick = (index: number) => {
    if (teamData[index].name !== currentCharacter.name) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          setCurrentCharacter(teamData[index]);
        }
      });
    }
  };

  return (
    <div className="mb-10">
      <div
        className={`relative bg-gray-900 p-6 rounded-lg shadow-lg flex ${
          isMobile ? 'flex-col' : 'flex-col md:flex-row'
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: isMobile ? 'auto' : '350px',
          maxHeight: isMobile ? 'auto' : '350px',
        }} 
      >
        <div className={`flex-1 flex flex-col justify-center ${isMobile ? 'pr-0' : 'pr-10'}`}>
          <div className="flex justify-center mb-2">
            <img src={currentCharacter.elementLogo} alt={`${currentCharacter.name} Element`} className="w-10 h-10" />
          </div>

          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            className="text-black font-bold mb-2 text-center"
          >
            {currentCharacter.name}
          </Typography>

          <div
            className={`bg-black bg-opacity-60 p-4 rounded-lg ${isMobile ? 'w-full mx-auto text-center' : 'max-w-md'}`}
          >
            <Typography variant="body2" className="text-white">
              Tim ini difokuskan untuk memaksimalkan damage dari reaksi Hyperbloom, Ocean-Hued, dan Quicken. Kombinasi elemen-elemen ini memastikan DPS yang tinggi dan sinergi elemen yang berkelanjutan di seluruh tim.
            </Typography>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <div
            className="w-full rounded-lg shadow-lg mx-auto mb-4 md:mb-0"
            style={{
              background: isMobile ? 'none' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: isMobile ? 'none' : 'blur(10px)',
              WebkitBackdropFilter: isMobile ? 'none' : 'blur(10px)',
              border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: isMobile ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
              height: isMobile ? '250px' : '100%',
            }}
          >
            <img
              ref={imageRef}
              src={currentCharacter.image}
              alt={currentCharacter.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div
            className={`absolute ${isMobile ? 'top-full transform translate-y-[-50%]' : 'bottom-[-10px]'} left-1/2 transform -translate-x-1/2 flex space-x-2 rounded-lg`}
          >
            {teamData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleBubbleClick(index)}
                className="w-12 h-12 rounded-full border-2 border-white focus:outline-none transform hover:scale-110 transition-transform duration-200"
              >
                <img
                  src={teamData[index].image}
                  alt={`Team member ${index + 1}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTeamSection;

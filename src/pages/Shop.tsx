import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import gsap from 'gsap';
import defaultBg from '../assets/bg/main-bg.webp';
import bg1 from '../assets/bg/bg-1.webp';
import bg2 from '../assets/bg/bg-2.webp';
import bg2Mobile from '../assets/bg/bg-2-mobile.webp';
import useDeviceSize from '../hooks/useDeviceSize';
import Carousel from '../components/Carousel';
import { useNavigate } from 'react-router-dom';

const Shop: React.FC = () => {
    const navigate = useNavigate(); // Hook untuk navigasi
    const isMobile = useDeviceSize(); // Menggunakan custom hook untuk mendapatkan ukuran perangkat
    const [background, setBackground] = useState(defaultBg);
    const [bgPosition, setBgPosition] = useState('20% center');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);



    useEffect(() => {
        gsap.killTweensOf(".background");
        gsap.to(".background", {
            duration: 0.1,
            backgroundImage: `url(${background})`,
            backgroundPosition: bgPosition,
            ease: "power1.inOut",
        });
    }, [background, bgPosition]);

    const handleMouseEnter = (bgImage: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const selectedBg = bgImage === bg2 && isMobile ? bg2Mobile : bgImage;

        setBackground(selectedBg);
        setBgPosition('20% center');
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            gsap.to(".background", {
                duration: 0.5,
                backgroundImage: `url(${defaultBg})`,
                backgroundPosition: '20% center',
                ease: "power1.inOut",
                onComplete: () => {
                    setBackground(defaultBg);
                    setBgPosition('20% center');
                }
            });
        }, 2000);
    };

    const handleDetailClick = (productId: string) => {
        // Buat overlay untuk transisi
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'black';
        overlay.style.zIndex = '9999';
        document.body.appendChild(overlay);

        // Animasi transisi
        gsap.set(overlay, { clipPath: 'circle(0% at center)' });
        gsap.to(overlay, {
            duration: 1,
            clipPath: 'circle(150% at center)',
            ease: 'power3.inOut',
            onComplete: () => {
                navigate(`/product/${productId}`);
                // Hapus overlay setelah navigasi
                gsap.to(overlay, {
                    duration: 1,
                    opacity: 0,
                    onComplete: () => {
                        document.body.removeChild(overlay);
                    }
                });
            }
        });
    };



    const slides1 = [
        'https://via.placeholder.com/800x400/000000/FFFFFF?text=Slide+1-1',
        'https://via.placeholder.com/800x400/000000/FFFFFF?text=Slide+1-2',
        'https://via.placeholder.com/800x400/000000/FFFFFF?text=Slide+1-3',
    ];

    const slides2 = [
        'https://via.placeholder.com/800x400/000000/FFFFFF?text=Slide+2-1',
        'https://via.placeholder.com/800x400/000000/FFFFFF?text=Slide+2-2',
        'https://via.placeholder.com/800x400/000000/FFFFFF?text=Slide+2-3',
    ];

    return (
        <Box
            minHeight="100vh"
            className="background relative flex flex-col items-center justify-center p-3"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: bgPosition,
                backgroundImage: `url(${background})`,
                transition: 'background-image 0.5s ease-in-out',
            }}
        >
            <h1 className="text-3xl font-bold text-orange-600 mb-8 z-10">Genshin Impact Account Shop</h1>
            
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        className="relative p-4 rounded-lg shadow-lg transition-all duration-500 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20"
                        onMouseEnter={() => handleMouseEnter(bg1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Carousel slides={slides1} />
                        <Box mt={2}>
                            <h2 className="text-lg font-semibold text-white">AR 55 | 5* Characters: Diluc, Mona</h2>
                            <p className="text-gray-200">$150.00</p>
                        </Box>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDetailClick("1");
                            }}
                            className="mt-4 w-full inline-block text-center bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
                        >
                            Detail
                        </a>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        className="relative p-4 rounded-lg shadow-lg transition-all duration-500 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20"
                        onMouseEnter={() => handleMouseEnter(bg2)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Carousel slides={slides2} />
                        <Box mt={2}>
                            <h2 className="text-lg font-semibold text-white">AR 45 | 5* Characters: Venti, Keqing</h2>
                            <p className="text-gray-200">$120.00</p>
                        </Box>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDetailClick("2");
                            }}
                            className="mt-4 w-full inline-block text-center bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
                        >
                            Detail
                        </a>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Shop;

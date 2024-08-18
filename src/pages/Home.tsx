import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface CircleSectionProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  navigateTo?: string;
  label: string;
}

const CircleSection: React.FC<CircleSectionProps> = ({ position, navigateTo, label }) => {
  const navigate = useNavigate();
  const circleRef = useRef<HTMLDivElement>(null);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 rounded-tl-full';
      case 'top-right':
        return 'top-0 right-0 rounded-tr-full';
      case 'bottom-left':
        return 'bottom-0 left-0 rounded-bl-full';
      case 'bottom-right':
        return 'bottom-0 right-0 rounded-br-full';
      default:
        return '';
    }
  };

  const getTransformClasses = () => {
    switch (position) {
      case 'top-left':
        return '-translate-x-1 -translate-y-1';
      case 'top-right':
        return 'translate-x-1 -translate-y-1';
      case 'bottom-left':
        return '-translate-x-1 translate-y-1';
      case 'bottom-right':
        return 'translate-x-1 translate-y-1';
      default:
        return '';
    }
  };

  const getGradient = () => {
    if (label === "Shop") {
      return 'bg-gradient-to-bl from-gray-200 to-orange-400';
    } else {
      return 'bg-gray-300';
    }
  };

  const handleClick = () => {
    if (navigateTo && circleRef.current) {
      const circle = circleRef.current;
      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const tl = gsap.timeline({
        onComplete: () => navigate(navigateTo),
      });

      tl.to(window, {
        duration: 1,
        scrollTo: { x: centerX, y: centerY },
        ease: 'power2.inOut',
      })
      .to(circle, {
        scale: 20,
        duration: 1,
        ease: 'power2.inOut',
      }, "-=0.5")
      .to('.circle-section:not(.active)', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }, "-=0.5")
      .to('body', {
        backgroundColor: getComputedStyle(circle).backgroundColor,
        duration: 0.5,
        ease: 'power2.inOut',
      }, "-=0.5");
    }
  };

  return (
    <div
      ref={circleRef}
      className={`circle-section group absolute w-1/2 h-1/2 ${getGradient()} flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105 ${getPositionClasses()} ${getTransformClasses()} z-20`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-outline text-lg md:text-xl font-bold">
          {label}
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    const moveObjects = () => {
      const objects = document.querySelectorAll('.shape');
      objects.forEach((obj: Element) => {
        const x = Math.random() * (window.innerWidth - 300);
        const y = Math.random() * (window.innerHeight - 300);
        const duration = 15 + Math.random() * 10;

        if (obj instanceof HTMLElement) {
          obj.style.transition = `transform ${duration}s ease-in-out`;
          obj.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    moveObjects();
    const interval = setInterval(moveObjects, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg z-10"></div>
      {/* Main content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
        <main className="flex-grow flex items-center justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <CircleSection position="top-left" label="Coming Soon" />
            <CircleSection position="top-right" navigateTo="/shop" label="Shop" />
            <CircleSection position="bottom-left" label="Coming Soon" />
            <CircleSection position="bottom-right" label="Coming Soon" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
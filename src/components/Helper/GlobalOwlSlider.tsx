// src/components/GlobalSlider/GlobalSlider.tsx
import React, { useEffect, useState, useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Optional: Lucide React Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GlobalSliderProps {
  children: React.ReactNode;
  autoplay?: boolean;
  dots?: boolean;
  arrows?: boolean;
  defaultSlides?: number;
  infinite?: boolean;
  onSlideChange?: (current: number) => void;
  rows?: number;
}

const GlobalSlider: React.FC<GlobalSliderProps> = ({
  children,
  autoplay = true,
  dots = true,
  arrows = true,
  defaultSlides = 3,
  infinite = true,
  onSlideChange,
  rows = 1,
}) => {
  const [slidesToShow, setSlidesToShow] = useState(defaultSlides);
  const sliderRef = useRef<Slider | null>(null);

  // Fix: Force responsive recalc on mount
  useEffect(() => {
    setTimeout(() => {
      if (sliderRef.current?.innerSlider) {
        sliderRef.current.innerSlider.onWindowResized();
      }
    }, 300);
  }, []);

  // Handle responsive width
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 576) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(defaultSlides);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [defaultSlides]);

  // Custom Arrows
  const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-primary hover:text-white transition-all duration-300"
    >
      <ChevronRight size={20} />
    </button>
  );

  const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-primary hover:text-white transition-all duration-300"
    >
      <ChevronLeft size={20} />
    </button>
  );

  const settings: Settings = {
    slidesToShow,
    slidesToScroll: 1,
    arrows,
    dots,
    rows,
    infinite,
    autoplay,
    autoplaySpeed: 3000,
    speed: 600,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    // Custom Dots
    appendDots: (dots) => (
      <div className="mt-6">
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 rounded-full transition-all duration-300"></div>
    ),

    afterChange: (current) => onSlideChange && onSlideChange(current),
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>

      {/* Extra spacing so dots don't overlap */}
      <div className="pb-10"></div>
    </div>
  );
};

export default GlobalSlider;

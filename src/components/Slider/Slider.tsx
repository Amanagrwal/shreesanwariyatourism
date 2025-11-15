import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plane, ArrowRight } from "lucide-react";

import { BASE_URL } from "@/components/Helper/Base_Url";
import { Button } from "@/components/ui/button";
import Loader from "../Helper/Loader";
import BookingModal from "../BookingModal";
import { useToast } from '@/hooks/use-toast';
import ContactForm from "../Contactform/ContactForm";
import Contactformsubmit from "./Contactformsubmit";

/**
 * Optimized, animated hero slider component.
 * Features:
 * - Smooth crossfade transitions
 * - Auto rotation
 * - Manual navigation dots
 * - Clean structure & performance tuned
 */

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
    const [isBookingOpen, setIsBookingOpen] = useState(false);


  /** 🔹 Fetch Slider Data */
  const fetchSlider = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/slider/`);
    if (!res.ok) throw new Error("Failed to fetch slider data");
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  }, []);

  const {
    data: sliderData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["slider"],
    queryFn: fetchSlider,
    staleTime: 1000 * 60 * 10, // cache 10 min
  });

  /** 🔹 Auto Slide Change */
  useEffect(() => {
    if (!sliderData.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderData, currentIndex]);

  const fetchAboutData = async () => {
    const res = await fetch(`${BASE_URL}/aboutus/`);
    if (!res.ok) throw new Error("Failed to fetch about data");
    const data = await res.json();
    return data.data[0]; // only one object in your response
  };

  // ✅ 2️⃣ React Query
  const { data: aboutData, isLoading: aboutloading, isError: abouterror } = useQuery({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
  });


   
  if (isLoading) return <Loader text="Loading slider..." />;
  if (isError || !sliderData.length)
    return (
      <div className="flex items-center justify-center h-[80vh] text-lg text-muted-foreground">
        No slider data available.
      </div>
    );


  const {
    happy_travelers,
    years_experience,
    uae_branches,
    customer_satisfaction,
  } = aboutData || {};

  const currentSlide = sliderData[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🔸 Backgrounds */}
      {sliderData.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          style={{ backgroundImage: `url(${BASE_URL}${item.Slider_image1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slidercolor/90 via-slidercolor/70 to-transparent" />
        </div>
      ))}

      {/* 🔸 Content */}
      {/* <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl animate-fade-in">
         
          {currentSlide?.Slider_topline && (
            <div className="flex items-center gap-2 mb-6">
              <Plane className="h-6 w-6 text-accent" />
              <span className="text-accent font-medium text-sm tracking-wider uppercase">
                {currentSlide.Slider_topline}
              </span>
            </div>
          )}

      
          {currentSlide?.Slider_maintext && (
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight drop-shadow-lg">
              {currentSlide.Slider_maintext}
              <span className="block text-accent mt-2">{currentSlide?.remark}</span>

            </h1>
          )}

        
          {currentSlide?.Slider_lastline && (
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              {currentSlide.Slider_lastline}
            </p>
          )}

         
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/packages">
                View Tour Packages
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg text-black"  onClick={() => setIsBookingOpen(true)}>
                   Book Your Tour
            <ArrowRight className="h-5 w-5 ml-2" />

            </Button>
          </div>

         
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-6 pt-4 border-t border-primary-foreground/20 text-center sm:text-left">
            {[
              { count: happy_travelers, label: "Happy Travelers" },
              { count: years_experience, label: "Years Experience" },
              { count: uae_branches, label: "UAE Emirates Covered" },
              { count: customer_satisfaction, label: "Customer Satisfaction" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-accent">
                  {stat.count}
                </div>
                <div className="text-sm text-primary-foreground/80 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      
      <div className="relative z-10 container mx-auto px-4">
  <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
    {/* 🔹 Left Side: Text Content */}
    <div className="max-w-3xl">
      {/* Tagline */}
      {currentSlide?.Slider_topline && (
        <div className="flex items-center gap-2 mb-6">
          <Plane className="h-6 w-6 text-accent" />
          <span className="text-accent font-medium text-sm tracking-wider uppercase">
            {currentSlide.Slider_topline}
          </span>
        </div>
      )}

      {/* Main Title */}
      {currentSlide?.Slider_maintext && (
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight drop-shadow-lg">
          {currentSlide.Slider_maintext}
          <span className="block text-accent mt-2">{currentSlide?.remark}</span>
        </h1>
      )}

      {/* Subtitle */}
      {currentSlide?.Slider_lastline && (
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
          {currentSlide.Slider_lastline}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button size="lg" className="text-lg" asChild>
          <Link to="/packages">
            View Tour Packages
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-6 pt-4 border-t border-primary-foreground/20 text-center sm:text-left">
        {[
          { count: happy_travelers, label: "Happy Travelers" },
          { count: years_experience, label: "Years Experience" },
          { count: uae_branches, label: "UAE Emirates Covered" },
          { count: customer_satisfaction, label: "Customer Satisfaction" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-3xl md:text-4xl font-bold text-accent">
              {stat.count}
            </div>
            <div className="text-sm text-primary-foreground/80 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 🔹 Right Side: Booking Form */}
       <Contactformsubmit/>
  </div>
</div>


      
      
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)} 
        prefillData={{
            message : `I'm interested in the Hotel , package , services`,
            travelDate: '',
      }} 
      />
      {/* 🔸 Navigation Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentIndex
                ? "bg-white scale-125 shadow-md"
                : "bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* 🔸 Decorative Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

export default Slider;

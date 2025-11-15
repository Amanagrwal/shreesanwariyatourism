import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

import Slider from '@/components/Slider/Slider';
import City_Section from '@/components/City_section/City_Section';
import TourPackage from '@/components/Tourpackage/TourPackage';
import Testimonials from '@/components/testimonial/Testimonials';
import { BASE_URL } from '@/components/Helper/Base_Url';
import { LanguageSwitcher } from '@/languageswitcher/Language_Switcher';
import { useTranslation } from 'react-i18next';
import Cta_section from '@/components/CTA_section/Cta_section';
import Navbar from '@/components/Navbar';

const Home = () => {
  const { t } = useTranslation();


  return (
    <>
      <SEOHead
        description="Your trusted UAE travel partner. Explore 7 Emirates with India's most trusted UAE travel partner. Book Dubai packages, Abu Dhabi tours, desert safaris and more."
        keywords="UAE tours, Dubai packages, Abu Dhabi travel, UAE tourism, India to UAE travel, UAE tour packages"
        canonical={`${BASE_URL}`}
        url={`${BASE_URL}`}
      />

      <div className="min-h-screen">
        <Navbar /> 
         <main className="pt-20">
        <Slider />
        <City_Section />
        <TourPackage />
        <Testimonials />
        <Cta_section />
        </main>
      </div>
    </>
  );
};

export default Home;

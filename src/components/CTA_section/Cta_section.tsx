import React from 'react'
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function Cta_section() {
  return (
   <>
     <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-card bg-primary opacity-5" />
          <div className="relative z-10 container mx-auto px-4 text-center text-black">
            <h1 className="text-4xl font-bold mb-4">Ready to Start Your UAE Journey?</h1>
            <p className="text-xl mb-8 text-black/90">
              Let us plan your perfect UAE vacation with personalized service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="border-black text-white hover:bg-black  hover:text-primary">
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/packages">
                <Button size="lg" variant="secondary" className="border-black text-white hover:bg-black hover:text-primary">
                  Browse Packages
                </Button>
              </Link>
            </div>
          </div>
        </section>
   
   </>
  )
}

export default Cta_section

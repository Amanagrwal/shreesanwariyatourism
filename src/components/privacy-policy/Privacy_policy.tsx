import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt'
import React from 'react'
import SectionLoader from '../Helper/Section_loader'
import Navbar from '../Navbar'

function PrivacyPolicy() {
  const { termsAndCondition, termsloading } = useGlobalContext() 
   if (termsloading) return <SectionLoader />

  return (
      <div className="min-h-screen pt-20">
        <Navbar/>
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Privacy Policy 
      </h1>

      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: termsAndCondition?.privacy_policy || '<p>No data available.</p>',
        }}
      />
    </div>

   </div>
  )
}

export default PrivacyPolicy

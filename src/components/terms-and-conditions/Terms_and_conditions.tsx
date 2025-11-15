import { useGlobalContext } from '@/Contaxt/UseGlobelcontaxt'
import React from 'react'
import SectionLoader from '../Helper/Section_loader'
import Navbar from '../Navbar'

function Terms_and_conditions() {
  const { termsAndCondition, termsloading } = useGlobalContext()

  if (termsloading) return <SectionLoader />

  return (
        <div className="min-h-screen pt-20">
   <Navbar/>
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Terms & Conditions
      </h1>

      <div
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: termsAndCondition?.terms_and_conditions || '<p>No data available.</p>',
        }}
      />
    </div>
    </div>
  )
}

export default Terms_and_conditions

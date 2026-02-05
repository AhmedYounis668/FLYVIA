import React from 'react'
import { HeroSection } from '../component/Herosection'
import { OurServices } from '../component/OurServices'
import { ClientOpinion } from '../component/ClientOpinion'
import { Blogs } from '../component/Blogs'
import { ContactUs } from '../component/ContactUs'
import { FloatingContact } from '../component/FloatingContact'
import { Footer } from '../component/Footer'
import { useLanguage } from '../component/LanguageProvider'
import { CustomNavbar } from '../component/CustomNavbar'

export const HomePage = () => {
  const { currentLang, updateKey } = useLanguage();

  return (
    <div>

        <HeroSection key={`hero-${currentLang}-${updateKey}`} />
        <OurServices key={`services-${currentLang}-${updateKey}`} />
        <ClientOpinion key={`opinion-${currentLang}-${updateKey}`} />
        <Blogs key={`blogs-${currentLang}-${updateKey}`} />
        <ContactUs key={`contact-${currentLang}-${updateKey}`} />
        {/* <FloatingContact key={`floating-${currentLang}-${updateKey}`} /> */}
        {/* <Footer key={`footer-${currentLang}-${updateKey}`} /> */}
    </div>
  )
}
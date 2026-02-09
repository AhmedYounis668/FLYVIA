import React, { useEffect } from 'react'
import { HeroSection } from '../component/Herosection'
import { OurServices } from '../component/OurServices'
import { ClientOpinion } from '../component/ClientOpinion'
import { Blogs } from '../component/Blogs'
import { ContactUs } from '../component/ContactUs'
import { FloatingContact } from '../component/FloatingContact'
import { Footer } from '../component/Footer'
import { useLanguage } from '../component/LanguageProvider'
import { CustomNavbar } from '../component/CustomNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { Get_All_Blogs_Action } from '../Redux/Actions/BlogsAction'

export const HomePage = () => {
  const { currentLang, updateKey } = useLanguage();
const dispatch=useDispatch()
  const getallblogs=async()=>{
    await dispatch(Get_All_Blogs_Action(`limit=3&sort=-createdAt`))
  }

  useEffect(()=>{
    getallblogs()
  },[dispatch])


    const resblogs = useSelector(state => state.AllBlogs.Blog)
  

    console.log(resblogs,"resblogs")
  return (
    <div>

        <HeroSection key={`hero-${currentLang}-${updateKey}`} />
        <OurServices key={`services-${currentLang}-${updateKey}`} />
        <ClientOpinion key={`opinion-${currentLang}-${updateKey}`} />
        <Blogs key={`blogs-${currentLang}-${updateKey}`} threeblogs={resblogs?.data?.latestBlogs} />
        <ContactUs key={`contact-${currentLang}-${updateKey}`} />
        {/* <FloatingContact key={`floating-${currentLang}-${updateKey}`} /> */}
        {/* <Footer key={`footer-${currentLang}-${updateKey}`} /> */}
    </div>
  )
}
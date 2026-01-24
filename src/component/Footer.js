import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane,
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram,
  FaYoutube, FaChevronUp, FaArrowRight
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider'; // استيراد الـ hook
import { useDispatch } from 'react-redux';
import { Add_Client_Action } from '../Redux/Actions/ClientAction';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const { currentLang } = useLanguage(); // استخدام الـ hook
  
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const backToTopRef = useRef(null);

  // الترجمات
  const translations = {
    EN: {
      tagline: "Transforming businesses with innovative solutions and strategic expertise.",
      quickLinks: "Quick Links",
      home: "Home",
      aboutUs: "About Us",
      services: "Services",
      testimonials: "Testimonials",
      blog: "Blog",
      contact: "Contact",
      ourServices: "Our Services",
      growthStrategy: "Growth Strategy",
      digitalMarketing: "Digital Marketing",
      brandDevelopment: "Brand Development",
      webDevelopment: "Web Development",
      seoOptimization: "SEO Optimization",
      socialMedia: "Social Media",
      contactInfo: "Contact Info",
      address: "123 Business Avenue, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "info@flyvia.com",
      stayUpdated: "Stay Updated",
      newsletterText: "Subscribe to our newsletter for the latest updates and insights.",
      enterphone: "Enter your Phone",
      subscribe: "Subscribe",
      thankYouSubscribe: "Thank you for subscribing!",
      copyright: `© ${new Date().getFullYear()} FLYVIA. All rights reserved.`,
      privacyPolicy: "Privacy Policy",
      termsService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
      backToTop: "Back to top"
    },
    AR: {
      tagline: "تحويل الأعمال بحلول مبتكرة وخبرة استراتيجية.",
      quickLinks: "روابط سريعة",
      home: "الرئيسية",
      aboutUs: "من نحن",
      services: "الخدمات",
      testimonials: "آراء العملاء",
      blog: "المدونة",
      contact: "اتصل بنا",
      ourServices: "خدماتنا",
      growthStrategy: "إستراتيجية النمو",
      digitalMarketing: "التسويق الرقمي",
      brandDevelopment: "تطوير العلامة التجارية",
      webDevelopment: "تطوير الويب",
      seoOptimization: "تحسين محركات البحث",
      socialMedia: "وسائل التواصل الاجتماعي",
      contactInfo: "معلومات الاتصال",
      address: "123 شارع الأعمال، نيويورك، نيويورك 10001",
      phone: "+1 (555) 123-4567",
      email: "info@flyvia.com",
      stayUpdated: "ابق على اطلاع",
      newsletterText: "اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات والرؤى.",
      enterphone: "أدخل رقم الهاتف ",
      subscribe: "اشترك",
      thankYouSubscribe: "شكراً لك على الاشتراك!",
      copyright: `© ${new Date().getFullYear()} FLYVIA. جميع الحقوق محفوظة.`,
      privacyPolicy: "سياسة الخصوصية",
      termsService: "شروط الخدمة",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      backToTop: "العودة للأعلى"
    }
  };

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  const quickLinks = [
    { label: t('home'), href: '#home' },
    { label: t('aboutUs'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('testimonials'), href: '#testimonials' },
    { label: t('blog'), href: '#blog' },
    { label: t('contact'), href: '#contact' }
  ];

  const services = [
    { label: t('growthStrategy'), href: '#' },
    { label: t('digitalMarketing'), href: '#' },
    { label: t('brandDevelopment'), href: '#' },
    { label: t('webDevelopment'), href: '#' },
    { label: t('seoOptimization'), href: '#' },
    { label: t('socialMedia'), href: '#' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' }
  ];

        const dispatch=useDispatch()

        const phonechange=(e)=>{
          setPhone(e.target.value)
        }
  const handleSubscribe =async (e) => {
    e.preventDefault();
    if (phone.trim()) {
      console.log('Phone Newsletter subscription:', phone);
      

   
await dispatch(Add_Client_Action({
name:'No Name',
email:'No Email',
phone:phone,
whatsappNumber:phone,
jobTitle:'No Job Title',
message:'Register From Footer',
countryName:'No Country',


}))
      // Animation for success
      gsap.fromTo('.newsletter-success',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
      setSubscribed(true);
      setPhone('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Animation feedback
    if (backToTopRef.current) {
      gsap.to(backToTopRef.current, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }
  };

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Footer animation
    gsap.fromTo(footerRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Footer columns animation
    columnsRef.current.forEach((column, index) => {
      if (column) {
        gsap.fromTo(column,
          {
            y: 50,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: column,
              start: 'top 90%',
              end: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Link hover animations
    const links = document.querySelectorAll('.footer-links a');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          x: currentLang === 'AR' ? -5 : 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Social links animation
    const socialIcons = document.querySelectorAll('.social-link');
    socialIcons.forEach((icon, index) => {
      gsap.fromTo(icon,
        {
          y: 30,
          opacity: 0,
          rotation: -180,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.6,
          delay: 1 + (index * 0.1),
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
            end: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang]); // أضف currentLang كـ dependency




  // دالة التنقل إلى قسم ContactUs
const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  
  if (contactSection) {
    // إغلاق الفوتر أولاً إذا كان مفتوحاً (إذا كان responsive)
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.style.transition = 'all 0.5s ease';
      footer.style.opacity = '0.8';
    }
    
    // تنقل سلس مع offset للرأس الثابت
    const headerHeight = 80; // ارتفاع الهيدر
    const elementPosition = contactSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // تأثيرات GSAP عند الوصول
    setTimeout(() => {
      // إبراز القسم
      gsap.fromTo(contactSection,
        {
          boxShadow: '0 0 0 5px rgba(255, 64, 129, 0.3)',
          scale: 1.01
        },
        {
          boxShadow: '0 0 0 0 rgba(255, 64, 129, 0)',
          scale: 1,
          duration: 1.5,
          ease: 'power2.out'
        }
      );
      
      // إبراز النموذج
      const form = contactSection.querySelector('.contact-form-container-compact');
      if (form) {
        gsap.fromTo(form,
          {
            border: '2px solid rgba(255, 64, 129, 0.5)',
            backgroundColor: 'rgba(255, 64, 129, 0.05)'
          },
          {
            border: '2px solid transparent',
            backgroundColor: 'transparent',
            duration: 2,
            ease: 'power2.out'
          }
        );
      }
      
      // إعادة الفوتر لحالته الطبيعية
      if (footer) {
        footer.style.opacity = '1';
      }
    }, 1000);
  } else {
    // إذا لم يتم العثور على القسم
    console.warn('Contact section not found. Make sure ContactUs component has id="contact"');
    
    // حاول البحث بطرق أخرى
    const sections = document.querySelectorAll('section');
    const contactSections = Array.from(sections).filter(section => 
      section.textContent.toLowerCase().includes('contact') ||
      section.querySelector('h2, h1')?.textContent.toLowerCase().includes('contact')
    );
    
    if (contactSections.length > 0) {
      contactSections[0].scrollIntoView({ behavior: 'smooth' });
    } else {
      // العودة إلى الأعلى
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
  return (
    <>
      <footer className="footer" ref={footerRef}>
        <Container>
          {/* Footer Top */}
          <div className="footer-top">
            <div className="footer-logo">
              <span className="softy">FLY</span>
              <span className="pinko">VIA</span>
            </div>
            <p className="footer-tagline" >
              {t('tagline')}
            </p>
          </div>

          {/* Footer Grid */}
          <div className="footer-grid">
            {/* Quick Links Column */}
            <div 
              className="footer-column" 
              ref={el => columnsRef.current[0] = el}
              // style={{ direction: currentLang === 'AR' ? 'ltr' : 'ltr' }}
            >
              <h3>{t('quickLinks')}</h3>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} style={{ 
                      // flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
                      // justifyContent: currentLang === 'AR' ? 'flex-start' : 'flex-start'
                    }}>
                      <FaArrowRight style={{ 
                        fontSize: '0.8rem',
                        marginLeft: currentLang === 'AR' ? '10px' : '0',
                        marginRight: currentLang === 'AR' ? '0' : '10px',
                        transform: currentLang === 'AR' ? 'rotate(180deg)' : 'none'
                      }} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div 
              className="footer-column" 
              ref={el => columnsRef.current[1] = el}
              // style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}
            >
              <h3>{t('ourServices')}</h3>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href={service.href} style={{ 
                      // flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
                      // justifyContent: currentLang === 'AR' ? 'flex-start' : 'flex-start'
                    }}>
                      <FaArrowRight style={{ 
                        fontSize: '0.8rem',
                        marginLeft: currentLang === 'AR' ? '10px' : '0',
                        marginRight: currentLang === 'AR' ? '0' : '10px',
                        transform: currentLang === 'AR' ? 'rotate(180deg)' : 'none'
                      }} />
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div 
              className="footer-column" 
              ref={el => columnsRef.current[2] = el}
              // style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}
            >
              <h3>{t('contactInfo')}</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>{t('address')}</span>
                </div>
                <div className="contact-item">
                  <FaPhone />
                  <a href="tel:+15551234567">{t('phone')}</a>
                </div>
                <div className="contact-item">
                  <FaEnvelope />
                  <a href="mailto:info@flyvia.com">{t('email')}</a>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Column */}
           {/* Newsletter Column - Updated to Contact Redirect */}
<div 
  className="footer-column" 
  ref={el => columnsRef.current[3] = el}
  // style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}
>
  <h3>{t('contact')}</h3> {/* تغيير العنوان */}
  <p style={{ 
    color: 'rgba(255, 255, 255, 0.7)', 
    marginBottom: '20px',
    direction: currentLang === 'AR' ? 'rtl' : 'ltr'
  }}>
    {currentLang === 'AR' 
      ? 'لديك استفسارات أو تحتاج إلى مساعدة؟ تواصل مع فريقنا.' 
      : 'Have questions or need assistance? Get in touch with our team.'}
  </p>
  
  <div className="contact-redirect" style={{ textAlign: 'center' }}>
    <button 
      id='contact' 
      className="contact-redirect-btn"
      onClick={scrollToContact}
      style={{ 
        flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
        width: '100%',
        padding: '15px 20px',
        background: 'linear-gradient(135deg, #ff4081, #7b1fa2)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'all 0.3s ease',
        marginTop: '10px'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 8px 25px rgba(255, 64, 129, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {currentLang === 'AR' ? 'اذهب إلى نموذج الاتصال' : 'Go to Contact Form'}
      <FaPaperPlane style={{ 
        marginLeft: currentLang === 'AR' ? '0' : '10px',
        marginRight: currentLang === 'AR' ? '10px' : '0',
        fontSize: '0.9rem'
      }} />
    </button>
    
   
  </div>
</div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom" style={{ 
            // flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
            // textAlign: currentLang === 'AR' ? 'right' : 'left'
          }}>
            <div className="copyright" style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}>
              {t('copyright')}
            </div>
            <div className="footer-legal" style={{ direction: currentLang === 'AR' ? 'rtl' : 'ltr' }}>
              <a href="#" style={{ marginLeft: currentLang === 'AR' ? '25px' : '0', marginRight: currentLang === 'AR' ? '0' : '25px' }}>
                {t('privacyPolicy')}
              </a>
              <a href="#" style={{ marginLeft: currentLang === 'AR' ? '25px' : '0', marginRight: currentLang === 'AR' ? '0' : '25px' }}>
                {t('termsService')}
              </a>
              <a href="#">
                {t('cookiePolicy')}
              </a>
            </div>
          </div>
        </Container>
      </footer>

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label={t('backToTop')}
        title={t('backToTop')}
      >
        <FaChevronUp />
      </button>
    </>
  );
};
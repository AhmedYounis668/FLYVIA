import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane,
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram,
  FaYoutube, FaChevronUp, FaArrowRight
} from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import { useDispatch } from 'react-redux';
import { Add_Client_Action } from '../Redux/Actions/ClientAction';

export const Footer = () => {
  const { currentLang } = useLanguage();
  
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const backToTopRef = useRef(null);
  const observerRef = useRef(null);

  // دالة مساعدة للتحقق إذا كانت اللغة عربية
  const isRTL = () => {
    return currentLang === 'ar';
  };

  // دالة مساعدة للـ direction
  const getDirection = () => {
    return isRTL() ? 'rtl' : 'ltr';
  };
 
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
    try {
      const langKey = currentLang?.toUpperCase?.();
      return translations[langKey]?.[key] || translations.EN[key] || key;
    } catch (error) {
      return translations.EN[key] || key;
    }
  };

  // إنشاء quickLinks
  const quickLinks = useMemo(() => [
    { label: t('home'), href: '#home' },
    { label: t('aboutUs'), href: '#about' },
    { label: t('services'), href: '#services' },
    { label: t('testimonials'), href: '#testimonials' },
    { label: t('blog'), href: '#blog' },
    { label: t('contact'), href: '#contact' }
  ], [currentLang, t]);

  // إنشاء services
  const services = useMemo(() => [
    { label: t('growthStrategy'), href: '#' },
    { label: t('digitalMarketing'), href: '#' },
    { label: t('brandDevelopment'), href: '#' },
    { label: t('webDevelopment'), href: '#' },
    { label: t('seoOptimization'), href: '#' },
    { label: t('socialMedia'), href: '#' }
  ], [currentLang, t]);

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' }
  ];

  const dispatch = useDispatch();

  const phonechange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (phone.trim()) {
      try {
        await dispatch(Add_Client_Action({
          name: 'No Name',
          email: 'No Email',
          phone: phone,
          whatsappNumber: phone,
          jobTitle: 'No Job Title',
          message: 'Register From Footer',
          countryName: 'No Country',
        }));

        setSubscribed(true);
        setPhone('');
        
        setTimeout(() => {
          setSubscribed(false);
        }, 3000);
      } catch (error) {
        console.error('Subscription error:', error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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

  // Intersection Observer لتفعيل الأنيميشن عند الظهور
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (footerRef.current) {
      observerRef.current.observe(footerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // نص الوصف بناء على اللغة
  const contactDescription = isRTL() 
    ? 'لديك استفسارات أو تحتاج إلى مساعدة؟ تواصل مع فريقنا.' 
    : 'Have questions or need assistance? Get in touch with our team.';

  // نص زر التوجيه
  const redirectButtonText = isRTL() 
    ? 'اذهب إلى نموذج الاتصال' 
    : 'Go to Contact Form';

  return (
    <>
      <footer 
        className={`footer ${isVisible ? 'visible' : ''}`} 
        ref={footerRef}
      >
        <Container>
          {/* Footer Top */}
          <div className="footer-top">
            <div className="footer-logo">
              <span className="softy">FLY</span>
              <span className="pinko">VIA</span>
            </div>
            <p className="footer-tagline">
              {t('tagline')}
            </p>
          </div>

          {/* Footer Grid */}
          <div className="footer-grid">
            {/* Quick Links Column */}
            <div 
              className={`footer-column column-1 ${isVisible ? 'animate' : ''}`} 
              ref={el => columnsRef.current[0] = el}
              style={{ direction: getDirection() }}
            >
              <div className="footer-title-wrapper">
                <h3 className="footer-column-title">
                  {t('quickLinks')}
                  <span className="footer-title-line"></span>
                </h3>
              </div>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    <a href={link.href}>
                      <FaArrowRight className={`footer-link-arrow ${isRTL() ? 'rtl-arrow' : ''}`} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div 
              className={`footer-column column-2 ${isVisible ? 'animate' : ''}`} 
              ref={el => columnsRef.current[1] = el}
              style={{ direction: getDirection() }}
            >
              <div className="footer-title-wrapper">
                <h3 className="footer-column-title">
                  {t('ourServices')}
                  <span className="footer-title-line"></span>
                </h3>
              </div>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    <a href={service.href}>
                      <FaArrowRight className={`footer-link-arrow ${isRTL() ? 'rtl-arrow' : ''}`} />
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div 
              className={`footer-column column-3 ${isVisible ? 'animate' : ''}`} 
              ref={el => columnsRef.current[2] = el}
              style={{ direction: getDirection() }}
            >
              <div className="footer-title-wrapper">
                <h3 className="footer-column-title">
                  {t('contactInfo')}
                  <span className="footer-title-line"></span>
                </h3>
              </div>
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

              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link"
                    aria-label={social.label}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div 
              className={`footer-column column-4 ${isVisible ? 'animate' : ''}`} 
              ref={el => columnsRef.current[3] = el}
              style={{ direction: getDirection() }}
            >
              <div className="footer-title-wrapper">
                <h3 className="footer-column-title">
                  {t('contact')}
                  <span className="footer-title-line"></span>
                </h3>
              </div>
              <p className="contact-description">
                {contactDescription}
              </p>
              
              <div className="contact-redirect">
                <button 
                  className="contact-redirect-btn"
                  onClick={scrollToContact}
                >
                  {redirectButtonText}
                  <FaPaperPlane className={`contact-btn-icon ${isRTL() ? 'rtl-icon' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={`footer-bottom ${isVisible ? 'animate' : ''}`}>
            <div className="copyright">
              {t('copyright')}
            </div>
            <div className="footer-legal">
              <a href="#">
                {t('privacyPolicy')}
              </a>
              <a href="#">
                {t('termsService')}
              </a>
              <a href="#">
                {t('cookiePolicy')}
              </a>
            </div>
          </div>
        </Container>
      </footer>

      <button
        ref={backToTopRef}
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label={t('backToTop')}
        title={t('backToTop')}
      >
        <FaChevronUp />
      </button>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2E3959 0%, #2d2d2d 100%);
          color: #fff;
          padding: 60px 0 30px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff4081, #7c4dff, #00bcd4);
          animation: shimmer 3s infinite linear;
        }

        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }

        .footer-top {
          text-align: center;
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s 0.3s forwards;
        }

        .footer-logo {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          display: inline-block;
          background: linear-gradient(90deg, #fff, #ff4081);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: logoGlow 2s infinite alternate;
        }

        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 5px rgba(255, 64, 129, 0.3)); }
          100% { filter: drop-shadow(0 0 15px rgba(255, 64, 129, 0.6)); }
        }

        .footer-tagline {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 50px;
        }

        .footer-column {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }

        .footer-column.animate {
          animation: slideInUp 0.6s forwards;
        }

        .column-1.animate { animation-delay: 0.1s; }
        .column-2.animate { animation-delay: 0.2s; }
        .column-3.animate { animation-delay: 0.3s; }
        .column-4.animate { animation-delay: 0.4s; }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .footer-title-wrapper {
          margin-bottom: 25px;
          position: relative;
        }

        .footer-column-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #fff;
          display: inline-block;
        }

        .footer-title-line {
          display: block;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff4081, #7c4dff);
          margin-top: 8px;
          transition: width 0.6s 0.5s;
        }

        .footer-column.animate .footer-title-line {
          width: 60px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
          opacity: 0;
          transform: translateX(${isRTL() ? '20px' : '-20px'});
          animation: slideInLink 0.5s forwards;
        }

        @keyframes slideInLink {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          padding: 8px 0;
          position: relative;
          overflow: hidden;
        }

        .footer-links a::before {
          content: '';
          position: absolute;
          left: ${isRTL() ? 'auto' : '0'};
          right: ${isRTL() ? '0' : 'auto'};
          bottom: 0;
          width: 0;
          height: 2px;
          background: #ff4081;
          transition: width 0.3s ease;
        }

        .footer-links a:hover {
          color: #fff;
          transform: translateX(${isRTL() ? '-5px' : '5px'});
        }

        .footer-links a:hover::before {
          width: 100%;
        }

        .footer-link-arrow {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .footer-links a:hover .footer-link-arrow {
          transform: translateX(${isRTL() ? '-3px' : '3px'});
        }

        .rtl-arrow {
          transform: rotate(180deg);
        }

        .contact-info {
          margin-bottom: 25px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        .contact-item svg {
          color: #ff4081;
          min-width: 20px;
        }

        .contact-item a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: #ff4081;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0) rotate(-180deg);
        }

        .social-link.animate {
          animation: popIn 0.6s forwards;
        }

        @keyframes popIn {
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        .social-link:hover {
          background: #ff4081;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 5px 15px rgba(255, 64, 129, 0.4);
        }

        .contact-description {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .contact-redirect-btn {
          background: linear-gradient(135deg, #ff4081, #7c4dff);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 30px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .contact-redirect-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .contact-redirect-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255, 64, 129, 0.4);
        }

        .contact-redirect-btn:hover::before {
          left: 100%;
        }

        .contact-btn-icon {
          transition: transform 0.3s ease;
        }

        .contact-redirect-btn:hover .contact-btn-icon {
          transform: translateX(${isRTL() ? '-5px' : '5px'});
        }

        .rtl-icon {
          transform: rotate(180deg);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeIn 0.8s 0.8s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .copyright {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .footer-legal {
          display: flex;
          gap: 25px;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
          position: relative;
        }

        .footer-legal a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #ff4081;
          transition: width 0.3s ease;
        }

        .footer-legal a:hover {
          color: #fff;
        }

        .footer-legal a:hover::after {
          width: 100%;
        }

        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: ${isRTL() ? 'auto' : '30px'};
          left: ${isRTL() ? '30px' : 'auto'};
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff4081, #7c4dff);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
        }

        .back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .back-to-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 64, 129, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 20px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .footer-column {
            text-align: ${isRTL() ? 'right' : 'left'};
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .footer-legal {
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
          }

          .back-to-top {
            bottom: 20px;
            right: ${isRTL() ? 'auto' : '20px'};
            left: ${isRTL() ? '20px' : 'auto'};
            width: 45px;
            height: 45px;
          }
        }

        @media (max-width: 480px) {
          .footer-logo {
            font-size: 2.5rem;
          }

          .footer-tagline {
            font-size: 1rem;
          }

          .social-links {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};
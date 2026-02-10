import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { 
  FaPhone, FaPlay, FaPause, FaArrowRight, FaArrowDown,
  FaRocket, FaUsers, FaChartLine, FaHandshake,
  FaLightbulb, FaGlobe, FaAward
} from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import { useDispatch } from 'react-redux';
import { Add_Client_Action } from '../Redux/Actions/ClientAction';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const { currentLang } = useLanguage();
  const navigate = useNavigate();

  // دالة مساعدة للـ direction
  const isRTL = () => {
    return currentLang === 'ar';
  };

  // ========== الترجمات ==========
  const translations = {
    EN: {
      mainTitle: "We provide the best strategy<br />to grow up your business",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      discoverBtn: "DISCOVER MORE",
      loading: "LOADING...",
      
      phoneTitle: "Get Free Consultation",
      phoneSubtitle: "Leave your number and we'll call you back within 24 hours",
      phonePlaceholder: "Enter your phone number",
      submitBtn: "Submit",
      submittedBtn: "✓ Submitted",
      successMessage: "Thank you! We'll contact you soon.",
      
      aboutTitle: "About FLYVIA",
      aboutSubtitle: "We are a passionate team dedicated to helping businesses thrive in the digital age through innovative solutions and strategic partnerships",
      
      missionTitle: "Our Mission",
      missionDesc: "To empower businesses with innovative digital solutions that drive growth, enhance efficiency, and create lasting impact in today's competitive market.",
      
      visionTitle: "Our Vision",
      visionDesc: "To be the leading digital transformation partner for businesses worldwide, recognized for our excellence, innovation, and client-centric approach.",
      
      partnershipTitle: "Client Partnership",
      partnershipDesc: "We build lasting partnerships based on trust, transparency, and mutual success with our clients.",
      
      readMore: "Read more",
      discoverMoreAbout: "Discover More About Us",
      pauseVideo: "Pause video",
      playVideo: "Play video"
    },
    AR: {
      mainTitle: "نقدم أفضل استراتيجية<br />لتنمية أعمالك",
      description: "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسسينج إيليت، سيد دو إيوسمود تيمبور إينسيديدونت أوت لابور إت دولور ماجنا أليكوا.",
      discoverBtn: "اكتشف المزيد",
      loading: "جاري التحميل...",
      
      phoneTitle: "احصل على استشارة مجانية",
      phoneSubtitle: "اترك رقمك وسنتصل بك خلال 24 ساعة",
      phonePlaceholder: "أدخل رقم هاتفك",
      submitBtn: "إرسال",
      submittedBtn: "✓ تم الإرسال",
      successMessage: "شكراً! سنتصل بك قريباً.",
      
      aboutTitle: "من نحن",
      aboutSubtitle: "نحن فريق متحمس مكرس لمساعدة الشركات على الازدهار في العصر الرقمي من خلال حلول مبتكرة وشراكات استراتيجية",
      
      missionTitle: "مهمتنا",
      missionDesc: "تمكين الشركات من خلال حلول رقمية مبتكرة تعزز النمو، وتحسن الكفاءة، وتخلق تأثيراً دائماً في السوق التنافسية اليوم.",
      
      visionTitle: "رؤيتنا",
      visionDesc: "أن نكون الشريك الرائد في التحول الرقمي للشركات على مستوى العالم، معترفاً بتميزنا وابتكارنا ونهجنا المرتكز على العملاء.",
      
      partnershipTitle: "شراكة العملاء",
      partnershipDesc: "نبني شراكات دائمة تقوم على الثقة والشفافية والنجاح المتبادل مع عملائنا.",
      
      readMore: "اقرأ المزيد",
      discoverMoreAbout: "اكتشف المزيد عنا",
      pauseVideo: "إيقاف الفيديو",
      playVideo: "تشغيل الفيديو"
    }
  };

  // ========== دالة الترجمة المحسنة ==========
  const t = useCallback((key) => {
    const langKey = currentLang.toUpperCase();
    const translation = translations[langKey]?.[key];
    
    if (!translation) {
      return translations.EN[key] || key;
    }
    
    return translation;
  }, [currentLang]);

  // تعريف aboutCardsData بدون استخدام t() مباشرة في useMemo
  const aboutCardsData = useMemo(() => {
    const getTranslatedText = (key) => {
      const langKey = currentLang.toUpperCase();
      return translations[langKey]?.[key] || translations.EN[key] || key;
    };
    
    return [
      {
        id: 1,
        icon: <FaRocket />,
        title: getTranslatedText('missionTitle'),
        description: getTranslatedText('missionDesc'),
        color: "#e83e8c"
      },
      {
        id: 2,
        icon: <FaGlobe />,
        title: getTranslatedText('visionTitle'),
        description: getTranslatedText('visionDesc'),
        color: "#2196F3"
      },
      {
        id: 6,
        icon: <FaHandshake />,
        title: getTranslatedText('partnershipTitle'),
        description: getTranslatedText('partnershipDesc'),
        color: "#00BCD4"
      }
    ];
  }, [currentLang]);

  // Refs للعناصر
  const heroRef = useRef(null);
  const brandNameRef = useRef(null);
  const mainTitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const discoverBtnRef = useRef(null);
  const sectionDividerRef = useRef(null);
  const phoneSectionRef = useRef(null);
  const aboutCardsRef = useRef([]);
  const videoWrapperRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutSubtitleRef = useRef(null);

  // وظيفة للانتقال لصفحة AboutUs
  const goToAboutUsPage = useCallback(() => {
    navigate('/Aboutuspage');
  }, [navigate]);

  // وظيفة للانتقال لسيكشن services
  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      console.log('Phone number submitted:', phoneNumber);
      
      await dispatch(Add_Client_Action({
        name: 'No Name',
        email: 'No Email',
        phone: phoneNumber,
        whatsappNumber: phoneNumber,
        jobTitle: 'No Job Title',
        message: 'Register From Herosection',
        countryName: 'No Country',
      }));
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setPhoneNumber('');
      }, 3000);
    }
  }, [phoneNumber, dispatch]);

  const toggleVideoPlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleVideoEnded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

  // تنظيف الـ refs القديمة
  useEffect(() => {
    aboutCardsRef.current = aboutCardsRef.current.slice(0, aboutCardsData.length);
  }, [aboutCardsData]);

  return (
    <div className="hero-container" ref={heroRef}>
      {/* Hero Section */}
      <section className="hero-section" id="home">
        {/* الخلفية المنحنية مع الفيديو */}
        <div className="hero-background-container">
          <div className="hero-background-curve">
            <div className="video-wrapper" ref={videoWrapperRef}>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="hero-background-video"
                onEnded={handleVideoEnded}
              >
                <source 
                  src="https://videos.pexels.com/video-files/855005/855005-hd_1920_1080_30fps.mp4" 
                  type="video/mp4" 
                />
                <source 
                  src="https://v.pinimg.com/videos/mc/expMp4/67dSf3yvW/avc/240/67dSf3yvW-avc-240.mp4" 
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              
              {/* تدرج فوق الفيديو */}
              <div className="video-overlay"></div>
              
              {/* زر التحكم بالفيديو */}
              <button 
                className="video-control-btn"
                onClick={toggleVideoPlay}
                aria-label={isPlaying ? t('pauseVideo') : t('playVideo')}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </div>
        </div>      
        
        {/* المحتوى العلوي */}
        <div className="hero-content">
          <Container fluid="lg">
            <Row className="justify-content-center">
              <Col 
                xl={10} 
                lg={11} 
                md={12} 
                className="text-center"
              >
                <div className="brand-name" ref={brandNameRef}>
                  <span className="softy">FLY</span>
                  <span className="pinko">VIA</span>
                </div>
                
                <h1 
                  className="main-title" 
                  ref={mainTitleRef}
                  dangerouslySetInnerHTML={{ __html: t('mainTitle') }}
                />
                
                <p className="description" ref={descriptionRef}>
                  {t('description')}
                </p>
                
                <div className="d-flex justify-content-center">
                  <Button 
                    className="discover-btn" 
                    ref={discoverBtnRef}
                    onClick={scrollToServices}
                    id="discover-btn"
                  >
                    {t('discoverBtn')}
                  </Button>
                </div>
                
                {/* الخط الفاصل */}
                <div className="section-divider" ref={sectionDividerRef}></div>

                {/* قسم التسجيل بالهاتف */}
                <div className="phone-section" ref={phoneSectionRef}>
                  <h3 className="phone-title">{t('phoneTitle')}</h3>
                  <p className="phone-subtitle">{t('phoneSubtitle')}</p>
                  
                  <Form onSubmit={handleSubmit} className="phone-form">
                    <div className="form-wrapper">
                      <div className="input-group-wrapper">
                        <div className="phone-input-group">
                          <div className="input-icon">
                            <FaPhone />
                          </div>
                          <Form.Control
                            type="tel"
                            placeholder={t('phonePlaceholder')}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="phone-input"
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className={`submit-btn ${isSubmitted ? 'success' : ''}`}
                          disabled={!phoneNumber.trim()}
                        >
                          {isSubmitted ? t('submittedBtn') : t('submitBtn')}
                        </Button>
                      </div>
                    </div>
                    {isSubmitted && (
                      <div className="success-message">
                        {t('successMessage')}
                      </div>
                    )}
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* قسم About Us */}
      <section className="about-us-section" id="about">
        <Container fluid="lg">
          <Row className="justify-content-center">
            <Col xl={10} lg={11} md={12} className="text-center">
              <h2 className="about-us-title" ref={aboutTitleRef}>
                {t('aboutTitle')}
              </h2>
              <p className="about-us-subtitle" ref={aboutSubtitleRef}>
                {t('aboutSubtitle')}
              </p>
            </Col>
          </Row>
          
          <Row 
            className="justify-content-center about-us-content"
            key={`about-cards-${currentLang}`}
          >
            {aboutCardsData.map((card, index) => (
              <Col lg={4} md={6} sm={12} key={card.id} className="mb-4">
                <div 
                  className="about-us-card"
                  ref={el => aboutCardsRef.current[index] = el}
                >
                  <div 
                    className="about-us-icon" 
                    style={{ backgroundColor: `${card.color}15`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h4 className="about-us-card-title">{card.title}</h4>
                  <p className="about-us-card-description">{card.description}</p>
                  <div className="about-us-line" style={{ backgroundColor: card.color }}></div>
                  <div 
                    className="about-us-link"
                    onClick={goToAboutUsPage}
                    style={{ cursor: 'pointer' }}
                  >
                    <span>{t('readMore')}</span>
                    <FaArrowRight className="about-us-arrow" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};
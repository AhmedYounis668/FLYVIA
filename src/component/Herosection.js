// HeroSection.js
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { 
  FaPhone, FaPlay, FaPause, FaArrowRight, FaArrowDown,
  FaRocket, FaUsers, FaChartLine, FaHandshake,
  FaLightbulb, FaGlobe, FaAward
} from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider';
import { useDispatch } from 'react-redux';
import { Add_Client_Action } from '../Redux/Actions/ClientAction';
import { useNavigate } from 'react-router-dom'; // إضافة useNavigate

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const { currentLang } = useLanguage();
  const navigate = useNavigate(); // إضافة useNavigate

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
      discoverMoreAbout: "اكتشف المزيد عننا",
      pauseVideo: "إيقاف الفيديو",
      playVideo: "تشغيل الفيديو"
    }
  };

  // ========== دالة الترجمة ==========
  const t = useCallback((key) => {
    return translations[currentLang][key] || translations.EN[key];
  }, [currentLang]);

  // تعريف aboutCardsData باستخدام useMemo
  const aboutCardsData = useMemo(() => [
    {
      id: 1,
      icon: <FaRocket />,
      title: t('missionTitle'),
      description: t('missionDesc'),
      color: "#e83e8c"
    },
    {
      id: 2,
      icon: <FaGlobe />,
      title: t('visionTitle'),
      description: t('visionDesc'),
      color: "#2196F3"
    },
    {
      id: 6,
      icon: <FaHandshake />,
      title: t('partnershipTitle'),
      description: t('partnershipDesc'),
      color: "#00BCD4"
    }
  ], [t]);

  // Refs للعناصر اللي هنعملها animate
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
    navigate('/Aboutuspage'); // الانتقال لصفحة /about
  }, [navigate]);

  // وظيفة للانتقال لسيكشن services
  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      // تأثير على الزر عند الدوس
      gsap.to(discoverBtnRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          gsap.to(discoverBtnRef.current, {
            scale: 1,
            duration: 0.2
          });
        }
      });

      // Scroll باستخدام smooth behavior
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

      // Animation عند التسجيل
      gsap.fromTo('.success-message',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
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
        // Animation عند الإيقاف
        gsap.to('.video-control-btn', {
          scale: 0.9,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });
      } else {
        videoRef.current.play();
        // Animation عند التشغيل
        gsap.to('.video-control-btn', {
          rotation: 360,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
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

  // GSAP Animations
  useEffect(() => {
    // تنظيف الـ refs القديمة
    aboutCardsRef.current = aboutCardsRef.current.slice(0, aboutCardsData.length);

    // Initial animations عند التحميل
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animation للفيديو
    if (videoWrapperRef.current) {
      tl.fromTo(videoWrapperRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      );
    }

    if (document.querySelector('.video-overlay')) {
      tl.fromTo('.video-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        '-=1'
      );
    }

    // Animation للنصوص
    if (brandNameRef.current?.children) {
      tl.fromTo(brandNameRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
        '-=0.5'
      );
    }

    if (mainTitleRef.current) {
      tl.fromTo(mainTitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.3'
      );
    }

    if (descriptionRef.current) {
      tl.fromTo(descriptionRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );
    }

    if (discoverBtnRef.current) {
      tl.fromTo(discoverBtnRef.current,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Add pulse animation to button
            gsap.to(discoverBtnRef.current, {
              boxShadow: '0 0 20px rgba(231, 62, 140, 0.5)',
              duration: 2,
              repeat: -1,
              yoyo: true
            });
          }
        },
        '-=0.3'
      );
    }

    if (sectionDividerRef.current) {
      tl.fromTo(sectionDividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8 },
        '-=0.2'
      );
    }

    if (phoneSectionRef.current) {
      tl.fromTo(phoneSectionRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.3'
      );
    }

    // About Us animations
    if (aboutTitleRef.current) {
      gsap.fromTo(aboutTitleRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: aboutTitleRef.current,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    if (aboutSubtitleRef.current) {
      gsap.fromTo(aboutSubtitleRef.current,
        {
          y: 40,
          opacity: 0,
          x: -20
        },
        {
          y: 0,
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutSubtitleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // About cards animations
    aboutCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            rotationY: 20,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Button hover animation
    const buttons = document.querySelectorAll('.discover-btn, .submit-btn');
    buttons.forEach(btn => {
      const mouseEnterHandler = () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const mouseLeaveHandler = () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      btn.addEventListener('mouseenter', mouseEnterHandler);
      btn.addEventListener('mouseleave', mouseLeaveHandler);
      
      // Cleanup
      return () => {
        btn.removeEventListener('mouseenter', mouseEnterHandler);
        btn.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    });

    // Card hover animations
    const cardElements = document.querySelectorAll('.about-us-card');
    cardElements.forEach(card => {
      const mouseEnterHandler = () => {
        gsap.to(card, {
          y: -15,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        const icon = card.querySelector('.about-us-icon');
        if (icon) {
          gsap.to(icon, {
            rotationY: 180,
            scale: 1.1,
            duration: 0.6,
            ease: 'back.out(1.7)'
          });
        }
        
        const link = card.querySelector('.about-us-link');
        if (link) {
          gsap.to(link, {
            opacity: 1,
            y: 0,
            duration: 0.4
          });
        }
        
        // Pulse effect on hover
        gsap.to(card, {
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.15)',
          duration: 0.3
        });
      };
      
      const mouseLeaveHandler = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
        
        const icon = card.querySelector('.about-us-icon');
        if (icon) {
          gsap.to(icon, {
            rotationY: 0,
            scale: 1,
            duration: 0.4
          });
        }
        
        gsap.to(card, {
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.08)',
          duration: 0.3
        });
      };
      
      card.addEventListener('mouseenter', mouseEnterHandler);
      card.addEventListener('mouseleave', mouseLeaveHandler);
      
      // Cleanup
      return () => {
        card.removeEventListener('mouseenter', mouseEnterHandler);
        card.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    });

    // Input focus animation
    const phoneInput = document.querySelector('.phone-input');
    if (phoneInput) {
      const focusHandler = () => {
        gsap.to('.phone-input-group', {
          scale: 1.02,
          duration: 0.3
        });
      };
      
      const blurHandler = () => {
        gsap.to('.phone-input-group', {
          scale: 1,
          duration: 0.3
        });
      };
      
      phoneInput.addEventListener('focus', focusHandler);
      phoneInput.addEventListener('blur', blurHandler);
      
      return () => {
        phoneInput.removeEventListener('focus', focusHandler);
        phoneInput.removeEventListener('blur', blurHandler);
      };
    }

    // Scroll animation للفيديو
    if (videoWrapperRef.current) {
      gsap.to(videoWrapperRef.current, {
        scale: 1.05,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang, aboutCardsData]);

  // Animation للنصوص عند تغيير اللغة
  useEffect(() => {
    const elementsToAnimate = [
      mainTitleRef.current,
      descriptionRef.current,
      discoverBtnRef.current,
      phoneSectionRef.current,
      aboutTitleRef.current,
      aboutSubtitleRef.current,
      ...aboutCardsRef.current.filter(card => card)
    ].filter(el => el);

    if (elementsToAnimate.length > 0) {
      gsap.to(elementsToAnimate, {
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        onComplete: () => {
          gsap.fromTo(elementsToAnimate,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: 'power2.out'
            }
          );
        }
      });
    }
  }, [currentLang, aboutCardsData]);

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
          
          {/* إضافة key للـ Row لفرض إعادة التصيير عند تغيير اللغة */}
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

          {/* زر الانتقال لصفحة AboutUs الكاملة */}
          <Row className="justify-content-center mt-5">
            <Col xs={12} className="text-center">
              <div 
                className="go-to-about-page"
                onClick={goToAboutUsPage}
                style={{
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  background: 'rgba(231, 62, 140, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '2px solid rgba(231, 62, 140, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(231, 62, 140, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(231, 62, 140, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ 
                  fontWeight: '600', 
                  color: '#e83e8c',
                  fontSize: '1.1rem'
                }}>
                  {t('discoverMoreAbout')}
                </span>
                <div className="animated-arrow">
                  <FaArrowDown style={{ 
                    color: '#e83e8c',
                    animation: 'bounce 2s infinite'
                  }} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
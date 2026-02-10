import React, { useRef, useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaChartLine, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const OurServices = () => {
  const { currentLang, isInitialized } = useLanguage();
  
  const cardsRef = useRef([]);
  const sectionTitleRef = useRef(null);
  const sectionSubtitleRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // الترجمات
  const translations = {
    EN: {
      sectionTitle: "Our Core Services",
      sectionSubtitle: "We provide comprehensive solutions to help your business thrive in today's competitive market",
      growthStrategy: "Growth Strategy",
      growthDesc: "Customized strategies to scale your business efficiently and effectively.",
      teamCollaboration: "Team Collaboration",
      teamDesc: "Expert team working together to achieve your business goals.",
      innovation: "Innovation",
      innovationDesc: "Cutting-edge solutions and innovative approaches for your business.",
      learnMore: "Learn more",
      discoverMore: "Discover More"
    },
    AR: {
      sectionTitle: "خدماتنا الأساسية",
      sectionSubtitle: "نقدم حلولاً شاملة لمساعدة أعمالك على الازدهار في السوق التنافسي اليوم",
      growthStrategy: "إستراتيجية النمو",
      growthDesc: "استراتيجيات مخصصة لتوسيع نطاق عملك بكفاءة وفعالية.",
      teamCollaboration: "تعاون الفريق",
      teamDesc: "فريق من الخبراء يعملون معًا لتحقيق أهداف عملك.",
      innovation: "الابتكار",
      innovationDesc: "حلول متطورة ونهج مبتكر لعملك.",
      learnMore: "تعلم المزيد",
      discoverMore: "اكتشف المزيد"
    }
  };

  // دالة الترجمة المحسنة مع معالجة الخطأ
  const t = (key) => {
    try {
      // تحويل currentLang إلى أحرف كبيرة مع fallback
      const langKey = currentLang?.toUpperCase?.() || 'EN';
      const translation = translations[langKey]?.[key];
      
      if (!translation) {
        return translations.EN[key] || key;
      }
      
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return translations.EN[key] || key;
    }
  };

  // تعريف cardsData باستخدام useMemo
  const cardsData = useMemo(() => [
    {
      id: 1,
      icon: <FaChartLine />,
      title: t('growthStrategy'),
      description: t('growthDesc'),
      color: "#4CAF50",
      link: "/ourservicepage"
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: t('teamCollaboration'),
      description: t('teamDesc'),
      color: "#2196F50",
      link: "/ourservicepage"
    },
    {
      id: 3,
      icon: <FaLightbulb />,
      title: t('innovation'),
      description: t('innovationDesc'),
      color: "#FF9800",
      link: "/ourservicepage"
    }
  ], [currentLang, t]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP Animations - مع إضافة شرط التحقق من التحميل
  useEffect(() => {
    if (!isInitialized || !isMounted) return;

    // تنظيف أي animations سابقة
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.killTweensOf('*');

    // تأخير بسيط لضمان تحميل DOM
    setTimeout(() => {
      // تنظيف الـ refs القديمة
      cardsRef.current = cardsRef.current.slice(0, cardsData.length);

      // جعل العناصر مرئية أولاً
      if (sectionTitleRef.current) {
        sectionTitleRef.current.style.opacity = '1';
        sectionTitleRef.current.style.visibility = 'visible';
      }
      
      if (sectionSubtitleRef.current) {
        sectionSubtitleRef.current.style.opacity = '1';
        sectionSubtitleRef.current.style.visibility = 'visible';
      }

      // Animation للعنوان
      if (sectionTitleRef.current) {
        gsap.fromTo(sectionTitleRef.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionTitleRef.current,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
              markers: false
            }
          }
        );
      }

      // Animation للوصف
      if (sectionSubtitleRef.current) {
        gsap.fromTo(sectionSubtitleRef.current,
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
              trigger: sectionSubtitleRef.current,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
              markers: false
            }
          }
        );
      }

      // Cards animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // جعل الكارد مرئياً أولاً
          card.style.opacity = '1';
          card.style.visibility = 'visible';
          
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
                toggleActions: 'play none none reverse',
                markers: false
              }
            }
          );
        }
      });

      // Card hover animations
      const cardElements = document.querySelectorAll('.feature-card-under');
      cardElements.forEach(card => {
        if (!card) return;
        
        const mouseEnterHandler = () => {
          gsap.to(card, {
            y: -15,
            duration: 0.4,
            ease: 'power2.out'
          });
          
          const icon = card.querySelector('.card-icon-under');
          if (icon) {
            gsap.to(icon, {
              rotationY: 180,
              scale: 1.1,
              duration: 0.6,
              ease: 'back.out(1.7)'
            });
          }
          
          const link = card.querySelector('.card-link-under');
          if (link) {
            gsap.to(link, {
              opacity: 1,
              y: 0,
              duration: 0.4
            });
          }
          
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
          
          const icon = card.querySelector('.card-icon-under');
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
      });
    }, 100); // تأخير 100ms

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang, cardsData, isInitialized, isMounted]);

  // إذا لم يكن المكون جاهزاً بعد
  if (!isMounted || !isInitialized) {
    return (
      <section className="cards-section-under-curve" id="services">
        <Container fluid="lg">
          <Row className="justify-content-center">
            <Col xl={10} lg={11} md={12} className="text-center">
              <h2 className="cards-section-title center-text" style={{ opacity: 1 }}>
                {t('sectionTitle')}
              </h2>
              <p className="cards-section-subtitle center-text" style={{ opacity: 1 }}>
                {t('sectionSubtitle')}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center cards-row">
            {cardsData.map((card, index) => (
              <Col lg={4} md={6} sm={12} key={card.id} className="mb-4">
                <Link 
                  to={card.link} 
                  className="text-decoration-none"
                  style={{ display: 'block' }}
                >
                  <div 
                    className="feature-card-under center-text"
                    style={{ 
                      cursor: 'pointer',
                      opacity: 1,
                      transform: 'none'
                    }}
                  >
                    <div 
                      className="card-icon-under center-icon" 
                      style={{ backgroundColor: `${card.color}15`, color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <h4 className="card-title-under center-text">{card.title}</h4>
                    <p className="card-description-under center-text">{card.description}</p>
                    <div className="card-line-under center-line" style={{ backgroundColor: card.color }}></div>
                    
                    <button className="discover-more-btn mt-3">
                      {t('discoverMore')}
                      <FaArrowRight className="ms-2" />
                    </button>
                    
                    <div className="card-link-under center-link" style={{ opacity: 1, transform: 'none' }}>
                      <span>{t('learnMore')}</span>
                      <FaArrowRight className="arrow-icon-under" />
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <div>
      <style>{`
        .cards-section-under-curve {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        .feature-card-under {
          opacity: 1 !important;
          visibility: visible !important;
        }
      `}</style>
      
      <section className="cards-section-under-curve" id="services">
        <Container fluid="lg">
          <Row className="justify-content-center">
            <Col xl={10} lg={11} md={12} className="text-center">
              <h2 className="cards-section-title center-text" ref={sectionTitleRef}>
                {t('sectionTitle')}
              </h2>
              <p className="cards-section-subtitle center-text" ref={sectionSubtitleRef}>
                {t('sectionSubtitle')}
              </p>
            </Col>
          </Row>
          <Row 
            className="justify-content-center cards-row"
            key={`services-cards-${currentLang}`}
          >
            {cardsData.map((card, index) => (
              <Col lg={4} md={6} sm={12} key={card.id} className="mb-4">
                <Link 
                  to={card.link} 
                  className="text-decoration-none"
                  style={{ display: 'block' }}
                >
                  <div 
                    className="feature-card-under center-text"
                    ref={el => cardsRef.current[index] = el}
                    style={{ cursor: 'pointer' }}
                  >
                    <div 
                      className="card-icon-under center-icon" 
                      style={{ backgroundColor: `${card.color}15`, color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <h4 className="card-title-under center-text">{card.title}</h4>
                    <p className="card-description-under center-text">{card.description}</p>
                    <div className="card-line-under center-line" style={{ backgroundColor: card.color }}></div>
                    
                    <button className="discover-more-btn mt-3">
                      {t('discoverMore')}
                      <FaArrowRight className="ms-2" />
                    </button>
                    
                    <div className="card-link-under center-link">
                      <span>{t('learnMore')}</span>
                      <FaArrowRight className="arrow-icon-under" />
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}
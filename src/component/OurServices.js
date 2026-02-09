import React, { useRef, useEffect, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaChartLine, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider';
import { Link } from 'react-router-dom'; // Add this import

gsap.registerPlugin(ScrollTrigger);

export const OurServices = () => {
  const { currentLang } = useLanguage();
  
  const cardsRef = useRef([]);
  const sectionTitleRef = useRef(null);
  const sectionSubtitleRef = useRef(null);


  
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
      discoverMore: "Discover More" // Added translation for the button
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
      discoverMore: "اكتشف المزيد" // Added translation for the button
    }
  };

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  // تعريف cardsData باستخدام useMemo
  const cardsData = useMemo(() => [
    {
      id: 1,
      icon: <FaChartLine />,
      title: t('growthStrategy'),
      description: t('growthDesc'),
      color: "#4CAF50",
      link: "/ourservicepage" // Added link for each card
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: t('teamCollaboration'),
      description: t('teamDesc'),
      color: "#2196F3",
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
  ], [currentLang]);

  // GSAP Animations - Same as before
  useEffect(() => {
    // تنظيف الـ refs القديمة
    cardsRef.current = cardsRef.current.slice(0, cardsData.length);

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
      
      // Cleanup
      return () => {
        card.removeEventListener('mouseenter', mouseEnterHandler);
        card.removeEventListener('mouseleave', mouseLeaveHandler);
      };
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang, cardsData]);

  // Animation للنصوص عند تغيير اللغة
  useEffect(() => {
    const elementsToAnimate = [
      sectionTitleRef.current,
      sectionSubtitleRef.current,
      ...cardsRef.current.filter(card => card)
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
  }, [currentLang, cardsData]);

  return (
    <div>
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
                {/* Wrap the entire card with Link */}
                <Link 
                  to={card.link} 
                  className="text-decoration-none"
                  style={{ display: 'block' }}
                >
                  <div 
                    className="feature-card-under center-text"
                    ref={el => cardsRef.current[index] = el}
                    style={{ cursor: 'pointer' }} // Add cursor pointer
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
                    
                    {/* Added Discover More Button */}
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
      
      {/* Add CSS for the new button */}
      <style>
        {`
          .discover-more-btn {
            background: linear-gradient(45deg, #2196F3, #21CBF3);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
          }
          
          .discover-more-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4);
          }
          
          .discover-more-btn:active {
            transform: translateY(-1px);
          }
          
          /* Optional: Style for Arabic direction */
          .discover-more-btn[dir="rtl"] {
            flex-direction: row-reverse;
          }
        `}
      </style>
    </div>
  )
}
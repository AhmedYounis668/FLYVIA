import React, { useRef, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaChartLine, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from './LanguageProvider'; // استيراد الـ hook

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const OurServices = () => {
  const { currentLang } = useLanguage(); // استخدام الـ hook
  
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
      learnMore: "Learn more"
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
      learnMore: "تعلم المزيد"
    }
  };

  // دالة الترجمة
  const t = (key) => {
    return translations[currentLang][key] || translations.EN[key];
  };

  const cardsData = [
    {
      id: 1,
      icon: <FaChartLine />,
      title: t('growthStrategy'),
      description: t('growthDesc'),
      color: "#4CAF50"
    },
    {
      id: 2,
      icon: <FaUsers />,
      title: t('teamCollaboration'),
      description: t('teamDesc'),
      color: "#2196F3"
    },
    {
      id: 3,
      icon: <FaLightbulb />,
      title: t('innovation'),
      description: t('innovationDesc'),
      color: "#FF9800"
    }
  ];

  // GSAP Animations
  useEffect(() => {
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
      card.addEventListener('mouseenter', () => {
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
      });
      
      card.addEventListener('mouseleave', () => {
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
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentLang]); // أضف currentLang كـ dependency

  return (
    <div>
      <section className="cards-section-under-curve" id="services">
        <Container fluid="lg">
          <Row className="justify-content-center">
            <Col xl={10} lg={11} md={12} className="text-center">
              <h2 className="cards-section-title" ref={sectionTitleRef}>
                {t('sectionTitle')}
              </h2>
              <p className="cards-section-subtitle" ref={sectionSubtitleRef}>
                {t('sectionSubtitle')}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center cards-row">
            {cardsData.map((card, index) => (
              <Col lg={4} md={6} sm={12} key={card.id} className="mb-4">
                <div 
                  className="feature-card-under"
                  ref={el => cardsRef.current[index] = el}
                >
                  <div 
                    className="card-icon-under" 
                    style={{ backgroundColor: `${card.color}15`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h4 className="card-title-under">{card.title}</h4>
                  <p className="card-description-under">{card.description}</p>
                  <div className="card-line-under" style={{ backgroundColor: card.color }}></div>
                  <div className="card-link-under">
                    <span>{t('learnMore')}</span>
                    <FaArrowRight className="arrow-icon-under" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}
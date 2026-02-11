import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  alpha,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import {
  ArrowForward,
  LocationOn,
  Group,
  TrendingUp,
  CheckCircle
} from '@mui/icons-material';
import { useLanguage } from '../component/LanguageProvider';

// بيانات الخدمات لكل دولة مع دعم اللغات
const getServicesData = (lang) => ({
  spain: {
    title: lang === 'ar' ? 'إسبانيا' : 'Spain',
    subtitle: lang === 'ar' ? 'السوق الأوروبي المتميز' : 'Premium European Market',
    description: lang === 'ar' 
      ? 'حلول أعمال متكاملة مصممة خصيصًا للسوق الإسباني النابض بالحياة'
      : 'Integrated business solutions tailored for the vibrant Spanish market',
    icon: <LocationOn />,
    color: "#2196F3",
    services: [
      {
        title: lang === 'ar' ? 'التحول الرقمي' : 'Digital Transformation',
        description: lang === 'ar' 
          ? 'نقدم حلولاً رقمية شاملة لتحديث وتطوير عمليات أعمالك في السوق الإسباني، بما في ذلك تطوير أنظمة التجارة الإلكترونية المتقدمة، هجرة البنية التحتية إلى السحابة، دمج تقنيات الذكاء الاصطناعي، وأتمتة العمليات لتحسين الكفاءة والإنتاجية.'
          : 'We provide comprehensive digital solutions to modernize and develop your business operations in the Spanish market, including advanced e-commerce systems development, cloud infrastructure migration, AI technology integration, and process automation to improve efficiency and productivity.',
        features: lang === 'ar' 
          ? [
            "تطوير أنظمة التجارة الإلكترونية المتقدمة",
            "هجرة البنية التحتية إلى السحابة الآمنة", 
            "دمج حلول الذكاء الاصطناعي وتحليل البيانات",
            "أتمتة العمليات وتحسين سير العمل",
            "تطوير تطبيقات الأعمال المخصصة",
            "حلول الأمن السيبراني والحماية"
          ]
          : [
            "Advanced e-commerce systems development",
            "Secure cloud infrastructure migration",
            "AI solutions and data analytics integration",
            "Process automation and workflow optimization",
            "Custom business application development",
            "Cybersecurity and protection solutions"
          ]
      },
      {
        title: lang === 'ar' ? 'استشارات الأعمال' : 'Business Consulting',
        description: lang === 'ar'
          ? 'نوفر خدمات استشارية استراتيجية متخصصة تساعدك على التوسع والنمو في السوق الإسباني، من خلال تحليل السوق الدقيق، وضع استراتيجيات الأعمال الفعالة، التخطيط المالي المحكم، وإدارة المخاطر بطريقة احترافية.'
          : 'We provide specialized strategic consulting services to help you expand and grow in the Spanish market, through accurate market analysis, effective business strategies, meticulous financial planning, and professional risk management.',
        features: lang === 'ar'
          ? [
            "تحليل السوق والمنافسة الشامل",
            "تطوير استراتيجيات الأعمال والتوسع",
            "التخطيط المالي والتحليل المالي",
            "إدارة المخاطر والتقييم",
            "استشارات التسويق والعلامة التجارية",
            "تحسين العمليات وتقليل التكاليف"
          ]
          : [
            "Comprehensive market and competition analysis",
            "Business and expansion strategy development",
            "Financial planning and analysis",
            "Risk management and assessment",
            "Marketing and brand consulting",
            "Process optimization and cost reduction"
          ]
      },
      {
        title: lang === 'ar' ? 'تطوير العلامات التجارية الفاخرة' : 'Luxury Brand Development',
        description: lang === 'ar'
          ? 'نساعدك على رفع مكانة علامتك التجارية في سوق إسبانيا التنافسي للسلع الفاخرة، من خلال تطوير هوية علامة تجارية مميزة، استراتيجيات تسويقية مبتكرة، تجارب عملاء VIP استثنائية، وتميز في تجربة التجزئة.'
          : 'We help elevate your brand presence in Spain\'s competitive luxury market, through distinctive brand identity development, innovative marketing strategies, exceptional VIP customer experiences, and retail excellence.',
        features: lang === 'ar'
          ? [
            "تطوير هوية العلامة التجارية الفاخرة",
            "استراتيجيات التسويق الراقي والمبتكر",
            "برامج تجربة العملاء VIP",
            "تصميم وتطوير تجربة التجزئة",
            "إدارة العلاقات مع العملاء المميزين",
            "حلول العلامات التجارية الرقمية"
          ]
          : [
            "Development of luxury brand identity",
            "Sophisticated and innovative marketing strategies",
            "VIP customer experience programs",
            "Retail experience design and development",
            "Premium customer relationship management",
            "Digital branding solutions"
          ]
      },
      {
        title: lang === 'ar' ? 'حلول الضيافة' : 'Hospitality Solutions',
        description: lang === 'ar'
          ? 'نقدم حلولاً متميزة ومتكاملة لصناعة الضيافة العالمية في إسبانيا، تشمل إدارة الفنادق والمنتجعات، تحسين تجربة الضيوف، تحسين الإيرادات، وتطبيق حلول الاستدامة البيئية.'
          : 'We provide premium integrated solutions for Spain\'s world-class hospitality industry, including hotel and resort management, guest experience enhancement, revenue optimization, and environmental sustainability solutions.',
        features: lang === 'ar'
          ? [
            "إدارة الفنادق والمنتجعات الشاملة",
            "تحسين تجربة الضيوف والخدمات",
            "حلول تحسين الإيرادات والأرباح",
            "تطبيق معايير الاستدامة البيئية",
            "نظم الحجز وإدارة الغرف المتقدمة",
            "تدريب وتطوير كوادر الضيافة"
          ]
          : [
            "Comprehensive hotel and resort management",
            "Guest experience and service enhancement",
            "Revenue and profit optimization solutions",
            "Implementation of environmental sustainability standards",
            "Advanced booking and room management systems",
            "Hospitality staff training and development"
          ]
      }
    ]
  },
  uae: {
    title: lang === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates',
    subtitle: lang === 'ar' ? 'مركز الأعمال العالمي' : 'Global Business Hub',
    description: lang === 'ar' 
      ? 'حلول مبتكرة ومتطورة للسوق الإماراتي الديناميكي والمتنامي، مصممة لتحقيق النجاح في قلب العالم'
      : 'Innovative and advanced solutions for the dynamic and growing UAE market, designed for success at the heart of the world',
    icon: <LocationOn />,
    color: "#00BCD4",
    services: [
      {
        title: lang === 'ar' ? 'حلول المدن الذكية' : 'Smart City Solutions',
        description: lang === 'ar'
          ? 'نطور حلولاً تكنولوجية متقدمة لمبادرات المدن الذكية في الإمارات، تشمل دمج أنظمة إنترنت الأشياء، تطوير البنية التحتية الذكية، تطبيقات الذكاء الاصطناعي، وتحليلات البيانات المتقدمة.'
          : 'We develop advanced technology solutions for smart city initiatives in the UAE, including IoT system integration, smart infrastructure development, AI applications, and advanced data analytics.',
        features: lang === 'ar'
          ? [
            "دمج أنظمة إنترنت الأشياء المتكاملة",
            "تطوير البنية التحتية الذكية",
            "حلول الذكاء الاصطناعي والروبوتات",
            "أنظمة تحليلات البيانات الضخمة",
            "حلول النقل الذكي والمرور",
            "أنظمة الطاقة المستدامة"
          ]
          : [
            "Integrated IoT system integration",
            "Smart infrastructure development",
            "AI and robotics solutions",
            "Big data analytics systems",
            "Smart transportation and traffic solutions",
            "Sustainable energy systems"
          ]
      },
      {
        title: lang === 'ar' ? 'التجزئة الفاخرة' : 'Luxury Retail',
        description: lang === 'ar'
          ? 'نقدم حلول تجزئة حصرية ومبتكرة للسوق الفاخر في الإمارات، من استراتيجيات التجزئة الفاخرة إلى إدارة علاقات العملاء VIP والتجارب الرقمية المتطورة.'
          : 'We provide exclusive and innovative retail solutions for the UAE\'s luxury market, from luxury retail strategies to VIP customer relationship management and advanced digital experiences.',
        features: lang === 'ar'
          ? [
            "استراتيجيات التجزئة الفاخرة المخصصة",
            "إدارة علاقات العملاء VIP",
            "حلول الرفاهية الرقمية",
            "تصميم تجارب التسوق الاستثنائية",
            "نظم إدارة المخزون والمبيعات",
            "حلول الدفع الإلكتروني الآمن"
          ]
          : [
            "Customized luxury retail strategies",
            "VIP customer relationship management",
            "Digital luxury solutions",
            "Exceptional shopping experience design",
            "Inventory and sales management systems",
            "Secure electronic payment solutions"
          ]
      },
      {
        title: lang === 'ar' ? 'إعداد الأعمال' : 'Business Setup',
        description: lang === 'ar'
          ? 'نوفر خدمات كاملة وشاملة لإعداد الأعمال والتراخيص في الإمارات، بدءاً من تأسيس الشركات وخدمات PRO إلى الاستشارات القانونية والدعم المصرفي.'
          : 'We provide comprehensive business setup and licensing services in the UAE, from company formation and PRO services to legal consultations and banking support.',
        features: lang === 'ar'
          ? [
            "تأسيس الشركات بكافة أنواعها",
            "خدمات PRO والإجراءات الحكومية",
            "استشارات قانونية متخصصة",
            "الدعم المصرفي وفتح الحسابات",
            "خدمات التوطين والموارد البشرية",
            "التخطيط الضريبي والمالي"
          ]
          : [
            "Company formation of all types",
            "PRO and government procedures services",
            "Specialized legal consultations",
            "Banking support and account opening",
            "Localization and human resources services",
            "Tax and financial planning"
          ]
      },
      {
        title: lang === 'ar' ? 'تكنولوجيا العقارات' : 'Real Estate Technology',
        description: lang === 'ar'
          ? 'نطور حلول تكنولوجية متقدمة لقطاع العقارات المزدهر في الإمارات، تشمل حلول Proptech، الجولات الافتراضية، عقود البلوكشين، وتكنولوجيا المنازل الذكية.'
          : 'We develop advanced technology solutions for the booming real estate sector in the UAE, including PropTech solutions, virtual tours, blockchain contracts, and smart home technology.',
        features: lang === 'ar'
          ? [
            "حلول Proptech المتكاملة",
            "جولات افتراضية ثلاثية الأبعاد",
            "عقود ذكية باستخدام البلوكشين",
            "تكنولوجيا المنازل والأبنية الذكية",
            "أنظمة إدارة الممتلكات",
            "حلول التسويق العقاري الرقمي"
          ]
          : [
            "Integrated PropTech solutions",
            "3D virtual tours",
            "Smart contracts using blockchain",
            "Smart home and building technology",
            "Property management systems",
            "Digital real estate marketing solutions"
          ]
      }
    ]
  },
  saudi: {
    title: lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
    subtitle: lang === 'ar' ? 'قلب رؤية 2030' : 'Heart of Vision 2030',
    description: lang === 'ar' 
      ? 'شراكات استراتيجية ومشاريع مبتكرة لدعم مبادرات التحول الوطني السعودي وتحقيق أهداف رؤية 2030'
      : 'Strategic partnerships and innovative projects to support Saudi Arabia\'s national transformation initiatives and achieve Vision 2030 goals',
    icon: <LocationOn />,
    color: "#FF5722",
    services: [
      {
        title: lang === 'ar' ? 'مشاريع رؤية 2030' : 'Vision 2030 Projects',
        description: lang === 'ar'
          ? 'نشارك في شراكات استراتيجية لمبادرات رؤية 2030 في السعودية، بما في ذلك مشاريع نيوم العملاقة، تطوير البحر الأحمر، مدينة القدية الترفيهية، ومدينة روشن الاقتصادية.'
          : 'We participate in strategic partnerships for Saudi Arabia\'s Vision 2030 initiatives, including the giant NEOM projects, Red Sea development, Qiddiya entertainment city, and ROSEN economic city.',
        features: lang === 'ar'
          ? [
            "شراكات مشاريع نيوم العملاقة",
            "تطوير مشاريع البحر الأحمر",
            "مدينة القدية الترفيهية",
            "مدينة روشن الاقتصادية",
            "مشاريع البنية التحتية الكبرى",
            "حلول المدن المستقبلية"
          ]
          : [
            "Partnerships in giant NEOM projects",
            "Red Sea development projects",
            "Qiddiya entertainment city",
            "ROSEN economic city",
            "Major infrastructure projects",
            "Future city solutions"
          ]
      },
      {
        title: lang === 'ar' ? 'الطاقة والاستدامة' : 'Energy & Sustainability',
        description: lang === 'ar'
          ? 'نقدم حلول الطاقة المستدامة والمتجددة للسوق السعودي المتطور، مع التركيز على تقليل البصمة الكربونية والتحول نحو الطاقة النظيفة.'
          : 'We provide sustainable and renewable energy solutions for Saudi Arabia\'s evolving market, focusing on carbon footprint reduction and transition to clean energy.',
        features: lang === 'ar'
          ? [
            "حلول الطاقة الشمسية والمتجددة",
            "برامج تقليل الانبعاثات الكربونية",
            "استشارات الاستدامة البيئية",
            "تكنولوجيا الترشيد والكفاءة",
            "مشاريع الطاقة الخضراء",
            "حلول إدارة الطاقة الذكية"
          ]
          : [
            "Solar and renewable energy solutions",
            "Carbon emission reduction programs",
            "Environmental sustainability consulting",
            "Conservation and efficiency technology",
            "Green energy projects",
            "Smart energy management solutions"
          ]
      },
      {
        title: lang === 'ar' ? 'تطوير السياحة' : 'Tourism Development',
        description: lang === 'ar'
          ? 'نطور حلولاً شاملة ومتكاملة للسياحة والضيافة في السعودية، بدءاً من استراتيجيات السياحة الوطنية إلى تطوير الفنادق والوجهات السياحية.'
          : 'We develop comprehensive tourism and hospitality solutions in Saudi Arabia, from national tourism strategies to hotel and destination development.',
        features: lang === 'ar'
          ? [
            "استراتيجيات السياحة الوطنية والإقليمية",
            "تطوير الفنادق والمنتجعات",
            "السياحة الثقافية والتراثية",
            "حلول الترفيه والأنشطة",
            "تطوير الوجهات السياحية",
            "تدريب كوادر السياحة"
          ]
          : [
            "National and regional tourism strategies",
            "Hotel and resort development",
            "Cultural and heritage tourism",
            "Entertainment and activity solutions",
            "Tourism destination development",
            "Tourism staff training"
          ]
      },
      {
        title: lang === 'ar' ? 'ابتكار الرعاية الصحية' : 'Healthcare Innovation',
        description: lang === 'ar'
          ? 'نطور حلول رعاية صحية متقدمة ومبتكرة للقطاع الصحي المتنامي في السعودية، مع التركيز على الطب عن بعد والإدارة الذكية للمستشفيات.'
          : 'We develop advanced and innovative healthcare solutions for Saudi Arabia\'s growing healthcare sector, focusing on telemedicine and smart hospital management.',
        features: lang === 'ar'
          ? [
            "حلول الطب عن بعد والاستشارات الطبية",
            "أنظمة إدارة المستشفيات الذكية",
            "برامج السياحة العلاجية",
            "تكنولوجيا الصحة الرقمية",
            "حلول الرعاية المنزلية",
            "تدريب وتطوير الكوادر الطبية"
          ]
          : [
            "Telemedicine and medical consultation solutions",
            "Smart hospital management systems",
            "Medical tourism programs",
            "Digital health technology",
            "Home care solutions",
            "Medical staff training and development"
          ]
      }
    ]
  }
});

// بيانات الإحصائيات مع دعم اللغات
const getStatsData = (lang) => [
  { 
    value: '200+', 
    label: lang === 'ar' ? 'عميل عالمي' : 'Global Clients', 
    icon: <Group />, 
    color: '#2196F3' 
  },
  { 
    value: '15+', 
    label: lang === 'ar' ? 'سنوات خبرة' : 'Years Experience', 
    icon: <TrendingUp />, 
    color: '#4CAF50' 
  },
  { 
    value: '50+', 
    label: lang === 'ar' ? 'دولة نخدمها' : 'Countries Served', 
    icon: <LocationOn />, 
    color: '#FF9800' 
  },
  { 
    value: '99%', 
    label: lang === 'ar' ? 'رضا العملاء' : 'Client Satisfaction', 
    icon: <CheckCircle />, 
    color: '#E91E63' 
  }
];

const CountryServiceSection = ({ countryData, index, currentLang }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box 
      ref={sectionRef} 
      sx={{ 
        mb: 8,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        transitionDelay: `${index * 0.2}s`,
        animation: isVisible ? 'float 3s ease-in-out infinite' : 'none',
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          }
        }
      }}
      id={`country-${countryData.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* عنوان الدولة */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="center" 
          spacing={2}
          sx={{ mb: 2 }}
        >
          <IconButton sx={{ 
            backgroundColor: countryData.color, 
            color: 'white',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                boxShadow: `0 0 0 0 ${alpha(countryData.color, 0.7)}`,
              },
              '70%': {
                transform: 'scale(1.05)',
                boxShadow: `0 0 0 10px ${alpha(countryData.color, 0)}`,
              },
              '100%': {
                transform: 'scale(1)',
                boxShadow: `0 0 0 0 ${alpha(countryData.color, 0)}`,
              }
            },
            '&:hover': {
              backgroundColor: alpha(countryData.color, 0.8)
            }
          }}>
            {countryData.icon}
          </IconButton>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#1a1a1a',
              fontSize: { xs: '2rem', md: '2.5rem' },
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isVisible ? '100px' : '0',
                height: '4px',
                backgroundColor: countryData.color,
                transition: 'width 1s ease 0.5s',
                borderRadius: '2px'
              }
            }}
          >
            {countryData.title}
          </Typography>
        </Stack>
        
        <Typography
          variant="h5"
          sx={{
            color: countryData.color,
            fontWeight: 600,
            mb: 1,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
          }}
        >
          {countryData.subtitle}
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            color: '#666666',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s'
          }}
        >
          {countryData.description}
        </Typography>
      </Box>

      {/* قائمة الخدمات بشكل مقالي */}
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        {countryData.services.map((service, idx) => (
          <Box 
            key={idx} 
            sx={{ 
              mb: 6,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.8s ease ${0.7 + idx * 0.1}s, transform 0.8s ease ${0.7 + idx * 0.1}s`
            }}
          >
            {/* عنوان الخدمة */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: countryData.color,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isVisible ? '24px' : '12px',
                    height: isVisible ? '24px' : '12px',
                    borderRadius: '50%',
                    backgroundColor: alpha(countryData.color, 0.2),
                    transition: 'all 0.5s ease 0.2s',
                    zIndex: -1
                  }
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  fontSize: '1.8rem',
                  borderBottom: `3px solid ${alpha(countryData.color, 0.3)}`,
                  pb: 1,
                  flexGrow: 1,
                  textAlign: currentLang === 'ar' ? 'right' : 'left',
                  direction: currentLang === 'ar' ? 'rtl' : 'ltr',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: currentLang === 'ar' ? 'auto' : 0,
                    right: currentLang === 'ar' ? 0 : 'auto',
                    width: isVisible ? '100%' : '0%',
                    height: '3px',
                    backgroundColor: countryData.color,
                    transition: 'width 1s ease 0.3s'
                  }
                }}
              >
                {service.title}
              </Typography>
            </Stack>

            {/* وصف الخدمة */}
            <Typography
              variant="body1"
              sx={{
                color: '#444444',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 4,
                textAlign: currentLang === 'ar' ? 'right' : 'left',
                direction: currentLang === 'ar' ? 'rtl' : 'ltr'
              }}
            >
              {service.description}
            </Typography>

            {/* المميزات على شكل قائمة */}
            <Box sx={{ 
              mb: 4,
              direction: currentLang === 'ar' ? 'rtl' : 'ltr'
            }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: '#555555',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexDirection: currentLang === 'ar' ? 'row-reverse' : 'row',
                  justifyContent: currentLang === 'ar' ? 'flex-end' : 'flex-start'
                }}
              >
                {currentLang === 'ar' ? 'الخدمات المقدمة' : 'Services Offered'}
              </Typography>
              
              <Box sx={{ 
                pl: currentLang === 'ar' ? 0 : 2,
                pr: currentLang === 'ar' ? 2 : 0,
                direction: currentLang === 'ar' ? 'rtl' : 'ltr',
              }}>
                {service.features.map((feature, featureIdx) => (
                  <Box 
                    key={featureIdx}
                    sx={{ 
                      py: 2,
                      px: 3,
                      borderLeft: currentLang === 'ar' ? 'none' : `3px solid ${alpha(countryData.color, 0.2)}`,
                      borderRight: currentLang === 'ar' ? `3px solid ${alpha(countryData.color, 0.2)}` : 'none',
                      mb: 1.5,
                      backgroundColor: alpha(countryData.color, 0.03),
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      opacity: 0,
                      animation: isVisible ? `fadeIn 0.5s ease forwards ${featureIdx * 0.1}s` : 'none',
                      '@keyframes fadeIn': {
                        'from': {
                          opacity: 0,
                          transform: currentLang === 'ar' ? 'translateX(20px)' : 'translateX(-20px)'
                        },
                        'to': {
                          opacity: 1,
                          transform: 'translateX(0)'
                        }
                      },
                      '&:hover': {
                        backgroundColor: alpha(countryData.color, 0.08),
                        transform: currentLang === 'ar' ? 'translateX(-5px)' : 'translateX(5px)',
                        borderLeft: currentLang === 'ar' ? 'none' : `3px solid ${countryData.color}`,
                        borderRight: currentLang === 'ar' ? `3px solid ${countryData.color}` : 'none',
                        boxShadow: `0 5px 15px ${alpha(countryData.color, 0.1)}`
                      },
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: countryData.color,
                        mt: 1,
                        flexShrink: 0,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: isVisible ? '16px' : '8px',
                          height: isVisible ? '16px' : '8px',
                          borderRadius: '50%',
                          backgroundColor: alpha(countryData.color, 0.2),
                          transition: 'all 0.3s ease'
                        }
                      }}
                    />
                    <Typography 
                      sx={{ 
                        color: '#555555',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        textAlign: currentLang === 'ar' ? 'right' : 'left',
                        direction: currentLang === 'ar' ? 'rtl' : 'ltr'
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* CTA للدولة */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(countryData.color, 0.08)} 0%, ${alpha('#ffffff', 0.1)} 100%)`,
          border: `1px solid ${alpha(countryData.color, 0.2)}`,
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s'
        }}
      >
        <Typography variant="h5" sx={{ color: '#1a1a1a', mb: 2, fontWeight: 600 }}>
          {currentLang === 'ar' 
            ? `مستعد للتوسع في ${countryData.title}؟`
            : `Ready to Expand in ${countryData.title}?`
          }
        </Typography>
        <Typography variant="body1" sx={{ color: '#666666', mb: 3, maxWidth: '600px', mx: 'auto' }}>
          {currentLang === 'ar'
            ? 'احصل على استشارة مجانية ومخصصة لاحتياجات عملك في هذه السوق.'
            : 'Get a free, personalized consultation for your business needs in this market.'}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          endIcon={currentLang === 'ar' ? null : <ArrowForward />}
          startIcon={currentLang === 'ar' ? <ArrowForward sx={{ transform: 'rotate(180deg)' }} /> : null}
          sx={{
            background: `linear-gradient(45deg, ${countryData.color}, ${alpha(countryData.color, 0.7)})`,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transition: 'left 0.5s ease'
            },
            '&:hover::before': {
              left: '100%'
            },
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: `0 15px 30px ${alpha(countryData.color, 0.4)}`
            },
            transition: 'all 0.3s'
          }}
        >
          {currentLang === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
        </Button>
      </Box>
    </Box>
  );
};

export const Ourservicepage = () => {
  const { currentLang } = useLanguage();
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  // الحصول على البيانات بناءً على اللغة
  const servicesData = getServicesData(currentLang);
  const statsData = getStatsData(currentLang);

  const countries = [
    { key: 'spain', data: servicesData.spain },
    { key: 'uae', data: servicesData.uae },
    { key: 'saudi', data: servicesData.saudi }
  ];

  // Hero animation with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  // دالة للتنقل إلى قسم الدولة
  const scrollToCountry = (countryKey) => {
    const element = document.getElementById(`country-${countryKey}`);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#ffffff',
      direction: currentLang === 'ar' ? 'rtl' : 'ltr'
    }}>
      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '70vh' },
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              ref={titleRef}
              variant="h1"
              sx={{
                color: '#fff',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 3,
                lineHeight: 1.2,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 1s ease, transform 1s ease',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {currentLang === 'ar' ? 'خدماتنا العالمية' : 'Our Global Services'}
            </Typography>
            
            <Typography
              variant="h4"
              sx={{
                color: '#fff',
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                lineHeight: 1.5,
                fontWeight: 500,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              {currentLang === 'ar' 
                ? 'حلول أعمال متميزة مصممة خصيصًا للأسواق الدولية الرئيسية'
                : 'Premium business solutions specifically designed for key international markets'}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* أزرار التنقل السريع للدول */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: '#1a1a1a',
              fontWeight: 700
            }}
          >
            {currentLang === 'ar' ? 'استكشف خدماتنا حسب الدولة' : 'Explore Our Services by Country'}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            px: { xs: 2, md: 0 }
          }}>
            {countries.map((country, index) => (
              <Button
                key={country.key}
                variant="contained"
                startIcon={<LocationOn />}
                onClick={() => scrollToCountry(country.data.title.toLowerCase().replace(/\s+/g, '-'))}
                sx={{
                  background: `linear-gradient(45deg, ${country.data.color}, ${alpha(country.data.color, 0.8)})`,
                  borderRadius: 3,
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minWidth: { xs: '100%', sm: 'auto' },
                  flex: { xs: '1 1 100%', sm: '0 1 auto' },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s ease'
                  },
                  '&:hover::before': {
                    left: '100%'
                  },
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 30px ${alpha(country.data.color, 0.4)}`
                  },
                  transition: 'all 0.3s ease',
                  animation: `slideIn 0.5s ease forwards ${index * 0.1}s`,
                  opacity: 0,
                  '@keyframes slideIn': {
                    'from': {
                      opacity: 0,
                      transform: 'translateY(20px)'
                    },
                    'to': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    }
                  }
                }}
              >
                {country.data.title}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Global Stats */}
      <Box
        className="stats-section"
        sx={{
          py: 8,
          background: '#f8f9fa',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: '#1a1a1a',
              fontWeight: 700,
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            {currentLang === 'ar' ? 'أرقامنا في العالم' : 'Our Global Numbers'}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 4,
            direction: 'ltr'
          }}>
            {statsData.map((stat, index) => (
              <Box
                key={index}
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  flex: '1 1 200px',
                  maxWidth: '250px',
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'scale(1)' : 'scale(0.8)',
                  transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)} 0%, ${alpha(stat.color, 0.2)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    border: `2px solid ${alpha(stat.color, 0.2)}`,
                    animation: statsVisible ? 'rotate 10s linear infinite' : 'none',
                    '@keyframes rotate': {
                      'from': {
                        transform: 'rotate(0deg)'
                      },
                      'to': {
                        transform: 'rotate(360deg)'
                      }
                    }
                  }}
                >
                  <IconButton sx={{ 
                    color: stat.color, 
                    fontSize: 32,
                    animation: statsVisible ? 'bounce 2s ease infinite' : 'none',
                    '@keyframes bounce': {
                      '0%, 100%': {
                        transform: 'translateY(0)'
                      },
                      '50%': {
                        transform: 'translateY(-10px)'
                      }
                    }
                  }}>
                    {stat.icon}
                  </IconButton>
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#1a1a1a',
                    fontWeight: 800,
                    mb: 1,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: `linear-gradient(45deg, ${stat.color}, ${alpha(stat.color, 0.7)})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="h6" sx={{ color: '#666666', fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* خدمات الدول */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: '#1a1a1a',
              mb: 2,
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' },
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                backgroundColor: '#2196F3',
                borderRadius: '2px',
                animation: 'widthGrow 1.5s ease forwards',
                '@keyframes widthGrow': {
                  'from': {
                    width: '0'
                  },
                  'to': {
                    width: '100px'
                  }
                }
              }
            }}
          >
            {currentLang === 'ar' ? 'خدماتنا في مختلف الدول' : 'Our Services Across Countries'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666666',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}
          >
            {currentLang === 'ar'
              ? 'اكتشف كيف نقدم حلولاً مخصصة لكل سوق دولي نعمل فيه'
              : 'Discover how we deliver tailored solutions for every international market we serve'}
          </Typography>
        </Box>

        {/* عرض خدمات كل دولة */}
        {countries.map((country, index) => (
          <React.Fragment key={country.key}>
            <CountryServiceSection 
              countryData={country.data} 
              index={index} 
              currentLang={currentLang}
            />
            {index < countries.length - 1 && (
              <Divider sx={{ 
                my: 8, 
                borderColor: 'rgba(0, 0, 0, 0.1)',
                opacity: 0,
                animation: `fadeIn 0.5s ease forwards ${1 + index * 0.5}s`,
                '@keyframes fadeIn': {
                  'to': {
                    opacity: 1
                  }
                }
              }} />
            )}
          </React.Fragment>
        ))}
      </Container>
    </Box>
  );
};
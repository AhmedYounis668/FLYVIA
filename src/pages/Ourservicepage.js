import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  alpha,
  IconButton,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowForward,
  LocationOn,
  Business,
  TrendingUp,
  Group,
  Lightbulb,
  Cloud,
  DesignServices,
  Store,
  Restaurant,
  LocalHotel,
  MedicalServices,
  Construction,
  CheckCircle,
  Circle
} from '@mui/icons-material';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLanguage } from '../component/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

// بيانات الخدمات لكل دولة مع دعم اللغات
const getServicesData = (lang) => ({
  spain: {
    title: lang === 'AR' ? 'إسبانيا' : 'Spain',
    subtitle: lang === 'AR' ? 'السوق الأوروبي المتميز' : 'Premium European Market',
    description: lang === 'AR' 
      ? 'حلول أعمال متكاملة مصممة خصيصًا للسوق الإسباني النابض بالحياة'
      : 'Integrated business solutions tailored for the vibrant Spanish market',
    icon: <LocationOn />,
    color: "#2196F3",
    services: [
      {
        title: lang === 'AR' ? 'التحول الرقمي' : 'Digital Transformation',
        description: lang === 'AR' 
          ? 'نقدم حلولاً رقمية شاملة لتحديث وتطوير عمليات أعمالك في السوق الإسباني، بما في ذلك تطوير أنظمة التجارة الإلكترونية المتقدمة، هجرة البنية التحتية إلى السحابة، دمج تقنيات الذكاء الاصطناعي، وأتمتة العمليات لتحسين الكفاءة والإنتاجية.'
          : 'We provide comprehensive digital solutions to modernize and develop your business operations in the Spanish market, including advanced e-commerce systems development, cloud infrastructure migration, AI technology integration, and process automation to improve efficiency and productivity.',
        features: lang === 'AR' 
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
        title: lang === 'AR' ? 'استشارات الأعمال' : 'Business Consulting',
        description: lang === 'AR'
          ? 'نوفر خدمات استشارية استراتيجية متخصصة تساعدك على التوسع والنمو في السوق الإسباني، من خلال تحليل السوق الدقيق، وضع استراتيجيات الأعمال الفعالة، التخطيط المالي المحكم، وإدارة المخاطر بطريقة احترافية.'
          : 'We provide specialized strategic consulting services to help you expand and grow in the Spanish market, through accurate market analysis, effective business strategies, meticulous financial planning, and professional risk management.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'تطوير العلامات التجارية الفاخرة' : 'Luxury Brand Development',
        description: lang === 'AR'
          ? 'نساعدك على رفع مكانة علامتك التجارية في سوق إسبانيا التنافسي للسلع الفاخرة، من خلال تطوير هوية علامة تجارية مميزة، استراتيجيات تسويقية مبتكرة، تجارب عملاء VIP استثنائية، وتميز في تجربة التجزئة.'
          : 'We help elevate your brand presence in Spain\'s competitive luxury market, through distinctive brand identity development, innovative marketing strategies, exceptional VIP customer experiences, and retail excellence.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'حلول الضيافة' : 'Hospitality Solutions',
        description: lang === 'AR'
          ? 'نقدم حلولاً متميزة ومتكاملة لصناعة الضيافة العالمية في إسبانيا، تشمل إدارة الفنادق والمنتجعات، تحسين تجربة الضيوف، تحسين الإيرادات، وتطبيق حلول الاستدامة البيئية.'
          : 'We provide premium integrated solutions for Spain\'s world-class hospitality industry, including hotel and resort management, guest experience enhancement, revenue optimization, and environmental sustainability solutions.',
        features: lang === 'AR'
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
    title: lang === 'AR' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates',
    subtitle: lang === 'AR' ? 'مركز الأعمال العالمي' : 'Global Business Hub',
    description: lang === 'AR' 
      ? 'حلول مبتكرة ومتطورة للسوق الإماراتي الديناميكي والمتنامي، مصممة لتحقيق النجاح في قلب العالم'
      : 'Innovative and advanced solutions for the dynamic and growing UAE market, designed for success at the heart of the world',
    icon: <LocationOn />,
    color: "#00BCD4",
    services: [
      {
        title: lang === 'AR' ? 'حلول المدن الذكية' : 'Smart City Solutions',
        description: lang === 'AR'
          ? 'نطور حلولاً تكنولوجية متقدمة لمبادرات المدن الذكية في الإمارات، تشمل دمج أنظمة إنترنت الأشياء، تطوير البنية التحتية الذكية، تطبيقات الذكاء الاصطناعي، وتحليلات البيانات المتقدمة.'
          : 'We develop advanced technology solutions for smart city initiatives in the UAE, including IoT system integration, smart infrastructure development, AI applications, and advanced data analytics.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'التجزئة الفاخرة' : 'Luxury Retail',
        description: lang === 'AR'
          ? 'نقدم حلول تجزئة حصرية ومبتكرة للسوق الفاخر في الإمارات، من استراتيجيات التجزئة الفاخرة إلى إدارة علاقات العملاء VIP والتجارب الرقمية المتطورة.'
          : 'We provide exclusive and innovative retail solutions for the UAE\'s luxury market, from luxury retail strategies to VIP customer relationship management and advanced digital experiences.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'إعداد الأعمال' : 'Business Setup',
        description: lang === 'AR'
          ? 'نوفر خدمات كاملة وشاملة لإعداد الأعمال والتراخيص في الإمارات، بدءاً من تأسيس الشركات وخدمات PRO إلى الاستشارات القانونية والدعم المصرفي.'
          : 'We provide comprehensive business setup and licensing services in the UAE, from company formation and PRO services to legal consultations and banking support.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'تكنولوجيا العقارات' : 'Real Estate Technology',
        description: lang === 'AR'
          ? 'نطور حلول تكنولوجية متقدمة لقطاع العقارات المزدهر في الإمارات، تشمل حلول Proptech، الجولات الافتراضية، عقود البلوكشين، وتكنولوجيا المنازل الذكية.'
          : 'We develop advanced technology solutions for the booming real estate sector in the UAE, including PropTech solutions, virtual tours, blockchain contracts, and smart home technology.',
        features: lang === 'AR'
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
    title: lang === 'AR' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
    subtitle: lang === 'AR' ? 'قلب رؤية 2030' : 'Heart of Vision 2030',
    description: lang === 'AR' 
      ? 'شراكات استراتيجية ومشاريع مبتكرة لدعم مبادرات التحول الوطني السعودي وتحقيق أهداف رؤية 2030'
      : 'Strategic partnerships and innovative projects to support Saudi Arabia\'s national transformation initiatives and achieve Vision 2030 goals',
    icon: <LocationOn />,
    color: "#FF5722",
    services: [
      {
        title: lang === 'AR' ? 'مشاريع رؤية 2030' : 'Vision 2030 Projects',
        description: lang === 'AR'
          ? 'نشارك في شراكات استراتيجية لمبادرات رؤية 2030 في السعودية، بما في ذلك مشاريع نيوم العملاقة، تطوير البحر الأحمر، مدينة القدية الترفيهية، ومدينة روشن الاقتصادية.'
          : 'We participate in strategic partnerships for Saudi Arabia\'s Vision 2030 initiatives, including the giant NEOM projects, Red Sea development, Qiddiya entertainment city, and ROSEN economic city.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'الطاقة والاستدامة' : 'Energy & Sustainability',
        description: lang === 'AR'
          ? 'نقدم حلول الطاقة المستدامة والمتجددة للسوق السعودي المتطور، مع التركيز على تقليل البصمة الكربونية والتحول نحو الطاقة النظيفة.'
          : 'We provide sustainable and renewable energy solutions for Saudi Arabia\'s evolving market, focusing on carbon footprint reduction and transition to clean energy.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'تطوير السياحة' : 'Tourism Development',
        description: lang === 'AR'
          ? 'نطور حلولاً شاملة ومتكاملة للسياحة والضيافة في السعودية، بدءاً من استراتيجيات السياحة الوطنية إلى تطوير الفنادق والوجهات السياحية.'
          : 'We develop comprehensive tourism and hospitality solutions in Saudi Arabia, from national tourism strategies to hotel and destination development.',
        features: lang === 'AR'
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
        title: lang === 'AR' ? 'ابتكار الرعاية الصحية' : 'Healthcare Innovation',
        description: lang === 'AR'
          ? 'نطور حلول رعاية صحية متقدمة ومبتكرة للقطاع الصحي المتنامي في السعودية، مع التركيز على الطب عن بعد والإدارة الذكية للمستشفيات.'
          : 'We develop advanced and innovative healthcare solutions for Saudi Arabia\'s growing healthcare sector, focusing on telemedicine and smart hospital management.',
        features: lang === 'AR'
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
    label: lang === 'AR' ? 'عميل عالمي' : 'Global Clients', 
    icon: <Group />, 
    color: '#2196F3' 
  },
  { 
    value: '15+', 
    label: lang === 'AR' ? 'سنوات خبرة' : 'Years Experience', 
    icon: <TrendingUp />, 
    color: '#4CAF50' 
  },
  { 
    value: '50+', 
    label: lang === 'AR' ? 'دولة نخدمها' : 'Countries Served', 
    icon: <LocationOn />, 
    color: '#FF9800' 
  },
  { 
    value: '99%', 
    label: lang === 'AR' ? 'رضا العملاء' : 'Client Satisfaction', 
    icon: <CheckCircle />, 
    color: '#E91E63' 
  }
];

const CountryServiceSection = ({ countryData, index, currentLang, animationKey }) => {
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const cleanupRef = useRef([]);

  useEffect(() => {
    // تنظيف شامل للأنيميشن السابقة
    if (animationRef.current) {
      animationRef.current.kill();
      const trigger = animationRef.current.scrollTrigger;
      if (trigger) trigger.kill();
    }

    // تنظيف أي triggers أخرى مرتبطة بهذا العنصر
    cleanupRef.current.forEach(cleanup => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    });

    // إعادة تعيين العنصر لحالته الأصلية
    if (sectionRef.current) {
      gsap.set(sectionRef.current, {
        opacity: 1,
        y: 0,
        clearProps: "all" // تنظيف جميع الـ props
      });
    }

    // إنشاء أنيميشن جديدة فقط بعد إعادة التصيير
    if (sectionRef.current) {
      // تأخير بسيط لضمان تحديث DOM
      const timer = setTimeout(() => {
        animationRef.current = gsap.fromTo(sectionRef.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              id: `country-section-${animationKey}-${index}` // ID فريد
            }
          }
        );
      }, 50);

      cleanupRef.current.push(() => clearTimeout(timer));
    }

    return () => {
      // تنظيف شامل عند unmount
      if (animationRef.current) {
        animationRef.current.kill();
        const trigger = animationRef.current.scrollTrigger;
        if (trigger) trigger.kill();
      }
      
      cleanupRef.current.forEach(cleanup => {
        if (cleanup && typeof cleanup === 'function') {
          cleanup();
        }
      });
      
      cleanupRef.current = [];
    };
  }, [index, currentLang, animationKey]);

  return (
    <Box 
      ref={sectionRef} 
      sx={{ 
        mb: 8,
        opacity: 1, // تأكد من أن opacity يبدأ من 1
        visibility: 'visible' // تأكد من أن العنصر مرئي
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
              fontSize: { xs: '2rem', md: '2.5rem' }
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
            mb: 1
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
            lineHeight: 1.6
          }}
        >
          {countryData.description}
        </Typography>
      </Box>

      {/* قائمة الخدمات بشكل مقالي */}
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        {countryData.services.map((service, idx) => (
          <Box key={idx} sx={{ mb: 6 }}>
            {/* عنوان الخدمة */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: countryData.color
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
                  textAlign: currentLang === 'AR' ? 'right' : 'left',
                  direction: currentLang === 'AR' ? 'rtl' : 'ltr'
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
                textAlign: currentLang === 'AR' ? 'right' : 'left',
                direction: currentLang === 'AR' ? 'rtl' : 'ltr'
              }}
            >
              {service.description}
            </Typography>

            {/* المميزات على شكل قائمة - استبدال List بـ Box للتحكم الكامل */}
            <Box sx={{ 
              mb: 4,
              direction: currentLang === 'AR' ? 'rtl' : 'ltr'
            }}>
                {/* <CheckCircle sx={{ color: countryData.color }} /> */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: '#555555',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
                  justifyContent: currentLang === 'AR' ? 'flex-end' : 'flex-start'
                }}
              >
                {currentLang === 'AR' ? 'الخدمات المقدمة' : 'Services Offered'}
              </Typography>
              
              <Box sx={{ 
                pl: currentLang === 'AR' ? 0 : 2,
                pr: currentLang === 'AR' ? 2 : 0,
                direction: currentLang === 'AR' ? 'rtl' : 'ltr', // تأكيد الاتجاه
              flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
                  justifyContent: currentLang === 'AR' ? 'flex-end' : 'flex-start'
             }}>
                {service.features.map((feature, featureIdx) => (
                  <Box 
                    key={featureIdx}
                    sx={{ 
                      py: 2,
                      px: 3,
                      borderLeft: currentLang === 'AR' ? 'none' : `3px solid ${alpha(countryData.color, 0.2)}`,
                      borderRight: currentLang === 'AR' ? `3px solid ${alpha(countryData.color, 0.2)}` : 'none',
                      mb: 1.5,
                      backgroundColor: alpha(countryData.color, 0.03),
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(countryData.color, 0.08),
                        transform: currentLang === 'AR' ? 'translateX(-5px)' : 'translateX(5px)',
                        borderLeft: currentLang === 'AR' ? 'none' : `3px solid ${countryData.color}`,
                        borderRight: currentLang === 'AR' ? `3px solid ${countryData.color}` : 'none'
                      },
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
 flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
                  justifyContent: currentLang === 'AR' ? 'flex-end' : 'flex-start'                    }}
                  >
                    {/* <Circle sx={{ 
                      fontSize: 10, 
                      color: countryData.color,
                      mt: 0.5,
                      flexShrink: 0,
                      marginLeft: currentLang === 'AR' ? 0 : undefined,
                      marginRight: currentLang === 'AR' ? undefined : 0,
                      
                    }} /> */}
                    <Typography 
                      sx={{ 
                        color: '#555555',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        textAlign: currentLang === 'AR' ? 'right' : 'left',
                        direction: currentLang === 'AR' ? 'rtl' : 'ltr',
                         flexDirection: currentLang === 'AR' ? 'row-reverse' : 'row',
                  justifyContent: currentLang === 'AR' ? 'flex-end' : 'flex-start'
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
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" sx={{ color: '#1a1a1a', mb: 2, fontWeight: 600 }}>
          {currentLang === 'AR' 
            ? `مستعد للتوسع في ${countryData.title}؟`
            : `Ready to Expand in ${countryData.title}?`
          }
        </Typography>
        <Typography variant="body1" sx={{ color: '#666666', mb: 3, maxWidth: '600px', mx: 'auto' }}>
          {currentLang === 'AR'
            ? 'احصل على استشارة مجانية ومخصصة لاحتياجات عملك في هذه السوق.'
            : 'Get a free, personalized consultation for your business needs in this market.'}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          endIcon={currentLang === 'AR' ? null : <ArrowForward />}
          startIcon={currentLang === 'AR' ? <ArrowForward sx={{ transform: 'rotate(180deg)' }} /> : null}
          sx={{
            background: `linear-gradient(45deg, ${countryData.color}, ${alpha(countryData.color, 0.7)})`,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 10px 30px ${alpha(countryData.color, 0.4)}`
            },
            transition: 'all 0.3s'
          }}
        >
          {currentLang === 'AR' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
        </Button>
      </Box>
    </Box>
  );
};

export const Ourservicepage = () => {
  const { currentLang } = useLanguage();
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const [animationKey, setAnimationKey] = useState(0);
  const titleAnimationRef = useRef(null);
  const statsAnimationRef = useRef([]);

  // الحصول على البيانات بناءً على اللغة
  const servicesData = getServicesData(currentLang);
  const statsData = getStatsData(currentLang);

  const countries = [
    { key: 'spain', data: servicesData.spain },
    { key: 'uae', data: servicesData.uae },
    { key: 'saudi', data: servicesData.saudi }
  ];

  // تحديث animationKey عند تغيير اللغة
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentLang]);

  // Hero animation - بدون ScrollTrigger
  useEffect(() => {
    // تنظيف الأنيميشن السابقة
    if (titleAnimationRef.current) {
      titleAnimationRef.current.kill();
    }

    // إعادة تعيين العنوان
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 1,
        y: 0,
        clearProps: "all"
      });

      // إنشاء أنيميشن جديدة
      titleAnimationRef.current = gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out"
        }
      );
    }

    return () => {
      if (titleAnimationRef.current) {
        titleAnimationRef.current.kill();
      }
    };
  }, [currentLang, animationKey]);

  // Stats animation
  useEffect(() => {
    // تنظيف الأنيميشن السابقة
    statsAnimationRef.current.forEach(animation => {
      if (animation) {
        animation.kill();
        const trigger = animation.scrollTrigger;
        if (trigger) trigger.kill();
      }
    });

    statsAnimationRef.current = [];

    // إعادة تعيين العناصر الإحصائية
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.set(stat, {
          opacity: 1,
          scale: 1,
          clearProps: "all"
        });
      }
    });

    // إنشاء أنيميشن جديدة بعد تأخير لضمان تحديث DOM
    const timer = setTimeout(() => {
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          // تنظيف أي triggers سابقة
          const existingTriggers = ScrollTrigger.getAll().filter(t => 
            t.vars && t.vars.id && t.vars.id.startsWith(`stat-${index}`)
          );
          existingTriggers.forEach(t => t.kill());

          const animation = gsap.fromTo(stat,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none reverse",
                id: `stat-${index}-${animationKey}` // ID فريد
              }
            }
          );
          statsAnimationRef.current[index] = animation;
        }
      });

      // إعادة حساب جميع الـ ScrollTriggers
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      statsAnimationRef.current.forEach(animation => {
        if (animation) {
          animation.kill();
          const trigger = animation.scrollTrigger;
          if (trigger) trigger.kill();
        }
      });
    };
  }, [currentLang, animationKey]);

  // تنظيف شامل عند unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (titleAnimationRef.current) {
        titleAnimationRef.current.kill();
      }
      statsAnimationRef.current.forEach(animation => {
        if (animation) {
          animation.kill();
          const trigger = animation.scrollTrigger;
          if (trigger) trigger.kill();
        }
      });
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
      direction: currentLang === 'AR' ? 'rtl' : 'ltr' // إضافة اتجاه الصفحة كاملة
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
          color: 'white'
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
                lineHeight: 1.2
              }}
            >
              {currentLang === 'AR' ? 'خدماتنا العالمية' : 'Our Global Services'}
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
                fontWeight: 500
              }}
            >
              {currentLang === 'AR' 
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
            {currentLang === 'AR' ? 'استكشف خدماتنا حسب الدولة' : 'Explore Our Services by Country'}
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
                key={`${country.key}-${animationKey}`}
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
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 30px ${alpha(country.data.color, 0.4)}`
                  },
                  transition: 'all 0.3s ease'
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
              fontWeight: 700
            }}
          >
            {currentLang === 'AR' ? 'أرقامنا في العالم' : 'Our Global Numbers'}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: 4,
            direction: 'ltr' // الإحصائيات تبقى بنفس الاتجاه
          }}>
            {statsData.map((stat, index) => (
              <Box
                key={`${index}-${animationKey}`}
                ref={el => statsRef.current[index] = el}
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  flex: '1 1 200px',
                  maxWidth: '250px'
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
                    border: `2px solid ${alpha(stat.color, 0.2)}`
                  }}
                >
                  <IconButton sx={{ color: stat.color, fontSize: 32 }}>
                    {stat.icon}
                  </IconButton>
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#1a1a1a',
                    fontWeight: 800,
                    mb: 1,
                    fontSize: { xs: '2rem', md: '2.5rem' }
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
            key={`services-title-${animationKey}`}
            variant="h2"
            sx={{
              color: '#1a1a1a',
              mb: 2,
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            {currentLang === 'AR' ? 'خدماتنا في مختلف الدول' : 'Our Services Across Countries'}
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
            {currentLang === 'AR'
              ? 'اكتشف كيف نقدم حلولاً مخصصة لكل سوق دولي نعمل فيه'
              : 'Discover how we deliver tailored solutions for every international market we serve'}
          </Typography>
        </Box>

        {/* عرض خدمات كل دولة */}
        {countries.map((country, index) => (
          <React.Fragment key={`${country.key}-${animationKey}`}>
            <CountryServiceSection 
              countryData={country.data} 
              index={index} 
              currentLang={currentLang}
              animationKey={animationKey}
            />
            {index < countries.length - 1 && (
              <Divider sx={{ my: 8, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </Container>

     

     
    </Box>
  );
};
// AboutUsPage.js
import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';

import {
  TrendingUp,
  Settings as SettingsIcon,
  Chat as ChatIcon,
  Support as SupportIcon,
  AttachMoney as AttachMoneyIcon,
  RocketLaunch as RocketIcon,
  Public as GlobeIcon,
  Handshake as HandshakeIcon,
  Diversity3 as TeamIcon,
  Lightbulb as InnovationIcon,
  Security as SecurityIcon,
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useLanguage } from '../component/LanguageProvider';
import { useNavigate } from 'react-router-dom';

export const AboutUsPage = ({ 
  visibleSections = ['story', 'mission', 'team', 'whyChooseUs', 'contact'],
  hiddenSections = ['values', 'process']
}) => {
  const { currentLang, isInitialized } = useLanguage();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const pageRef = useRef(null);
  const teamContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  // الترجمات
  const translations = {
    EN: {
      pageTitle: "About FLYVIA",
      backToHome: "Back to Home",
      heroTitle: "Pioneering Digital Excellence",
      heroSubtitle: "Transforming businesses through innovative digital solutions and strategic partnerships",
      ourStory: "Our Journey",
      storyTitle: "From Vision to Reality",
      storyContent: "Founded in 2018, FLYVIA began as a small team of passionate digital innovators with a big vision: to revolutionize how businesses operate in the digital age. Today, we're proud to be a leading digital transformation partner for companies worldwide, helping them navigate the complexities of the digital landscape with confidence and clarity.",
      storyStats: [
        { value: "250+", label: "Projects Completed" },
        { value: "150+", label: "Happy Clients" },
        { value: "30+", label: "Countries Served" },
        { value: "25+", label: "Awards Won" }
      ],
      ourMission: "Our Mission",
      missionContent: "To empower businesses with innovative digital solutions that drive sustainable growth, enhance operational efficiency, and create lasting impact in today's competitive market. We believe in building meaningful partnerships that transform challenges into opportunities.",
      ourVision: "Our Vision",
      visionContent: "To be the most trusted digital transformation partner globally, recognized for our excellence, innovation, and unwavering commitment to client success. We envision a future where technology and human ingenuity converge to create extraordinary value.",
      meetTeam: "Meet Our Leadership",
      teamDescription: "Our diverse team of experts brings together decades of experience and fresh perspectives to drive your success",
      teamMembers: [
        {
          name: "Alex Johnson",
          role: "CEO & Founder",
          description: "Visionary leader with 15+ years in digital transformation",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          expertise: ["Strategy", "Leadership", "Innovation"]
        },
        {
          name: "Sarah Williams",
          role: "Chief Technology Officer",
          description: "Tech innovator specializing in cutting-edge solutions",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          expertise: ["Technology", "Architecture", "R&D"]
        },
        {
          name: "Michael Chen",
          role: "Head of Strategy",
          description: "Strategic thinker with expertise in business growth",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
          expertise: ["Strategy", "Consulting", "Growth"]
        },
        {
          name: "Emma Davis",
          role: "Creative Director",
          description: "Award-winning designer with a passion for innovation",
          image: "https://randomuser.me/api/portraits/women/33.jpg",
          expertise: ["Design", "UX/UI", "Branding"]
        },
        {
          name: "David Wilson",
          role: "Project Manager",
          description: "Experienced in delivering complex projects on time",
          image: "https://randomuser.me/api/portraits/men/55.jpg",
          expertise: ["Project Management", "Agile", "Delivery"]
        },
        {
          name: "Lisa Brown",
          role: "Marketing Director",
          description: "Digital marketing expert with proven results",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          expertise: ["Marketing", "SEO", "Content Strategy"]
        }
      ],
      whyChooseUs: "Why Choose FLYVIA?",
      benefits: [
        "Proven track record of success",
        "Industry-leading expertise",
        "Customized solutions for your needs",
        "Transparent communication",
        "Ongoing support and maintenance",
        "Competitive pricing"
      ],
      getInTouch: "Ready to Transform Your Business?",
      contactDescription: "Let's discuss how we can help you achieve your digital goals"
    },
    AR: {
      pageTitle: "من نحن",
      backToHome: "العودة للرئيسية",
      heroTitle: "الريادة في التميز الرقمي",
      heroSubtitle: "تحويل الأعمال من خلال حلول رقمية مبتكرة وشراكات استراتيجية",
      ourStory: "رحلتنا",
      storyTitle: "من الرؤية إلى الواقع",
      storyContent: "تأسست FLYVIA في عام 2018 كفريق صغير من المبتكرين الرقميين المتحمسين برؤية كبيرة: إحداث ثورة في طريقة عمل الشركات في العصر الرقمي. اليوم، نحن فخورون بأن نكون الشريك الرائد في التحول الرقمي للشركات في جميع أنحاء العالم، مما يساعدهم على التنقل في تعقيدات المشهد الرقمي بثقة ووضوح.",
      storyStats: [
        { value: "٢٥٠+", label: "مشروع مكتمل" },
        { value: "١٥٠+", label: "عميل سعيد" },
        { value: "٣٠+", label: "دولة خدمناها" },
        { value: "٢٥+", label: "جائزة حصلنا عليها" }
      ],
      ourMission: "مهمتنا",
      missionContent: "تمكين الشركات من خلال حلول رقمية مبتكرة تعزز النمو المستدام، وتحسن الكفاءة التشغيلية، وتخلق تأثيراً دائماً في السوق التنافسية اليوم. نحن نؤمن ببناء شراكات ذات معنى تحول التحديات إلى فرص.",
      ourVision: "رؤيتنا",
      visionContent: "أن نكون الشريك الأكثر ثقة في التحول الرقمي على مستوى العالم، معترفاً بتميزنا وابتكارنا والتزامنا الثابت بنجاح العملاء. نتطلع إلى مستقبل تلتقي فيه التكنولوجيا والإبداع البشري لخلق قيمة استثنائية.",
      meetTeam: "تعرف على فريق القيادة",
      teamDescription: "يجمع فريقنا المتنوع من الخبراء عقوداً من الخبرة وجهات نظر جديدة لدفع نجاحك",
      teamMembers: [
        {
          name: "أليكس جونسون",
          role: "الرئيس التنفيذي والمؤسس",
          description: "قائد ذو رؤية مع أكثر من 15 عاماً في التحول الرقمي",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          expertise: ["الإستراتيجية", "القيادة", "الابتكار"]
        },
        {
          name: "سارة ويليامز",
          role: "الرئيس التقني",
          description: "مبتكر تكنولوجي متخصص في الحلول المتطورة",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          expertise: ["التكنولوجيا", "الهندسة المعمارية", "البحث والتطوير"]
        },
        {
          name: "مايكل تشين",
          role: "رئيس الإستراتيجية",
          description: "مفكر إستراتيجي متخصص في نمو الأعمال",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
          expertise: ["الإستراتيجية", "الاستشارات", "النمو"]
        },
        {
          name: "إيما ديفيس",
          role: "المدير الإبداعي",
          description: "مصمم حائز على جوائز وشغوف بالابتكار",
          image: "https://randomuser.me/api/portraits/women/33.jpg",
          expertise: ["التصميم", "تجربة المستخدم", "الهوية البصرية"]
        },
        {
          name: "ديفيد ويلسون",
          role: "مدير المشاريع",
          description: "خبير في إدارة وتنفيذ المشاريع المعقدة في الوقت المحدد",
          image: "https://randomuser.me/api/portraits/men/55.jpg",
          expertise: ["إدارة المشاريع", "أجايل", "التسليم"]
        },
        {
          name: "ليزا براون",
          role: "مدير التسويق",
          description: "خبيرة تسويق رقمي مع نتائج مثبتة",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          expertise: ["التسويق", "تحسين محركات البحث", "استراتيجية المحتوى"]
        }
      ],
      whyChooseUs: "لماذا تختار FLYVIA؟",
      benefits: [
        "سجل حافل بالنجاحات المثبتة",
        "خبرة رائدة في المجال",
        "حلول مخصصة لاحتياجاتك",
        "تواصل شفاف",
        "دعم وصيانة مستمرة",
        "أسعار تنافسية"
      ],
      getInTouch: "مستعد لتحويل عملك؟",
      contactDescription: "دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك الرقمية"
    }
  };

  // دالة محسنة للترجمة مع القيمة الافتراضية
  const t = (key) => {
    const translation = translations[currentLang] || translations.EN;
    return translation[key] !== undefined ? translation[key] : translations.EN[key];
  };

  // دالة مساعدة للتعامل مع المصفوفات بشكل آمن
  const safeArray = (arrayKey) => {
    const value = t(arrayKey);
    return Array.isArray(value) ? value : [];
  };

  useEffect(() => {
    setIsMounted(true);
    
    // تنظيف أي Swiper سابق
    const existingSwiper = document.querySelector('.why-choose-us-swiper.swiper');
    if (existingSwiper) {
      existingSwiper.remove();
    }
    
    // Load Swiper dynamically
    const loadSwiper = async () => {
      try {
        await import('swiper/css');
        await import('swiper/css/navigation');
        await import('swiper/css/pagination');
        await import('swiper/css/effect-cards');
        
        setSwiperLoaded(true);
      } catch (error) {
        console.error('Failed to load Swiper:', error);
      }
    };
    
    if (isMounted && isInitialized) {
      loadSwiper();
    }
    
    return () => {
      // تنظيف عند الخروج من الصفحة
      const swiperEl = document.querySelector('.why-choose-us-swiper');
      if (swiperEl) {
        swiperEl.innerHTML = '';
      }
    };
  }, [isMounted, isInitialized]);

  useEffect(() => {
    if (!swiperLoaded || !isMounted || !isInitialized) return;

    const initSwiper = async () => {
      try {
        const SwiperModule = await import('swiper');
        const { Autoplay, Navigation, Pagination, EffectCards } = await import('swiper/modules');
        
        const Swiper = SwiperModule.default;
        
        new Swiper('.why-choose-us-swiper', {
          modules: [Autoplay, Navigation, Pagination, EffectCards],
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          speed: 600,
          centeredSlides: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },
          breakpoints: {
            600: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 25 },
            1200: { slidesPerView: 4, spaceBetween: 30 }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        });
      } catch (error) {
        console.error('Failed to initialize Swiper:', error);
      }
    };
    
    initSwiper();
  }, [swiperLoaded, isMounted, isInitialized, currentLang]);

  const goToHome = () => {
    navigate('/');
  };

  const shouldShowSection = (sectionName) => {
    return visibleSections.includes(sectionName) && !hiddenSections.includes(sectionName);
  };

  // دالة لتمرير الكروت
  const scrollTeamCards = (direction) => {
    if (!teamContainerRef.current) return;
    
    const container = teamContainerRef.current;
    const scrollAmount = direction === 'next' ? 300 : -300;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // تحديث موضع التمرير
  useEffect(() => {
    const updateScroll = () => {
      if (teamContainerRef.current) {
        setScrollPosition(teamContainerRef.current.scrollLeft);
        setMaxScroll(
          teamContainerRef.current.scrollWidth - teamContainerRef.current.clientWidth
        );
      }
    };

    const container = teamContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScroll);
      updateScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScroll);
      }
    };
  }, [isMounted]);

  // إذا لم يكن المكون جاهزاً بعد
  if (!isMounted || !isInitialized) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{
            width: '60px',
            height: '60px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #2196F3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Loading About Us...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      opacity: 1,
      visibility: 'visible',
      direction: currentLang === 'ar' ? 'rtl' : 'ltr'
    }} ref={pageRef}>
      
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '50vh', md: '60vh' },
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <Box>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #fff, #2196F3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {t('heroTitle')}
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mb: 4, opacity: 0.9 }}>
              {t('heroSubtitle')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ArrowBackIcon sx={{ transform: currentLang === 'ar' ? 'scaleX(-1)' : 'none' }} />}
              onClick={goToHome}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '25px',
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
              }}
            >
              {t('backToHome')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        
        {/* Our Story */}
        {shouldShowSection('story') && (
          <Box sx={{ mb: 10, py: 4 }}>
            <Container maxWidth="lg">
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(45deg, #121212 30%, #2196F3 90%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontSize: { xs: '2.2rem', md: '3rem' }
                }}>
                  {t('ourStory')}
                </Typography>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  color: 'primary.main',
                  fontSize: { xs: '1.5rem', md: '1.8rem' }
                }}>
                  {t('storyTitle')}
                </Typography>
              </Box>

              <Card sx={{ 
                p: 4,
                borderRadius: 3,
                mb: 6,
                bgcolor: 'background.paper',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(33, 150, 243, 0.1)'
              }}>
                <Typography variant="body1" sx={{ 
                  fontSize: { xs: '1rem', md: '1.1rem' }, 
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  textAlign: 'center'
                }}>
                  {t('storyContent')}
                </Typography>
              </Card>

              {/* الإحصائيات */}
              <Box sx={{ 
                position: 'relative',
                width: '100%'
              }}>
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)'
                  },
                  gap: 3,
                  alignItems: 'stretch'
                }}>
                  {safeArray('storyStats').map((stat, index) => (
                    <Card 
                      key={index}
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        minHeight: { xs: '180px', md: '220px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(33, 150, 243, 0.1)',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 60px rgba(33, 150, 243, 0.15)',
                          borderColor: 'primary.light'
                        }
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%',
                        py: 3,
                        px: 2,
                        textAlign: 'center'
                      }}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography 
                            variant="h1" 
                            sx={{ 
                              fontWeight: 900,
                              fontSize: { xs: '3rem', md: '3.5rem' },
                              color: 'primary.main',
                              lineHeight: 1
                            }}
                          >
                            {stat.value}
                          </Typography>
                        </Box>

                        <Box sx={{
                          width: '60px',
                          height: '3px',
                          background: 'linear-gradient(90deg, transparent, #2196F3, transparent)',
                          my: 2
                        }} />

                        <Box sx={{ 
                          flex: 1, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          minHeight: '60px'
                        }}>
                          <Typography variant="h6" sx={{ 
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textAlign: 'center',
                            lineHeight: 1.3
                          }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Container>
          </Box>
        )}

        {/* Mission & Vision */}
        {shouldShowSection('mission') && (
          <Box sx={{ mb: 10 }}>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  height: '100%',
                  minHeight: '280px',
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <RocketIcon sx={{ fontSize: 60, mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {t('ourMission')}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                    {t('missionContent')}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  height: '100%',
                  minHeight: '280px',
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'secondary.main',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <GlobeIcon sx={{ fontSize: 60, mb: 3 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {t('ourVision')}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                    {t('visionContent')}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Meet Our Team */}
        {shouldShowSection('team') && (
          <Box sx={{ mb: 12, py: 8 }}>
            <Container maxWidth="xl">
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h2" sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(45deg, #121212 30%, #2196F3 90%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontSize: { xs: '2.2rem', md: '3rem' }
                }}>
                  {t('meetTeam')}
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: 'text.secondary',
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontWeight: 400
                }}>
                  {t('teamDescription')}
                </Typography>
              </Box>

              <Box sx={{ position: 'relative', width: '100%' }}>
                <Box
                  ref={teamContainerRef}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)'
                    },
                    gap: 3,
                    width: '100%',
                    overflowX: { xs: 'auto', lg: 'visible' },
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    py: 2
                  }}
                >
                  {safeArray('teamMembers').map((member, index) => (
                    <Card 
                      key={index}
                      sx={{
                        width: '100%',
                        minHeight: '420px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 60px rgba(33, 150, 243, 0.15)'
                        }
                      }}
                    >
                      <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                          src={member.image}
                          sx={{
                            width: 80,
                            height: 80,
                            border: '3px solid white',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
                          }}
                        />
                      </Box>

                      <CardContent sx={{ p: 3, pt: 0, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 2, fontSize: '0.85rem' }}>
                          {member.role}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6, fontSize: '0.85rem', flex: 1 }}>
                          {member.description}
                        </Typography>
                        <Stack direction="row" spacing={0.8} justifyContent="center" flexWrap="wrap" sx={{ mb: 2 }}>
                          {(member.expertise || []).map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: idx === 0 ? 'rgba(33, 150, 243, 0.1)' : idx === 1 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(156, 39, 176, 0.1)',
                                color: idx === 0 ? 'primary.dark' : idx === 1 ? 'success.dark' : 'secondary.dark',
                                fontWeight: 500,
                                fontSize: '0.65rem',
                                height: '22px',
                                borderRadius: '11px',
                                m: 0.3
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Container>
          </Box>
        )}

        {/* Why Choose Us - Swiper */}
        {shouldShowSection('whyChooseUs') && swiperLoaded && (
          <Box sx={{ mb: 10, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #121212 30%, #2196F3 90%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontSize: { xs: '2rem', md: '2.8rem' }
              }}>
                {t('whyChooseUs')}
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', py: 2 }}>
              <div className="swiper why-choose-us-swiper">
                <div className="swiper-wrapper">
                  {/* Swiper slides here - نفس المحتوى السابق */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '320px',
                      p: 4,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.2)', mb: 3 }}>
                        <TrendingUp sx={{ fontSize: 35 }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {currentLang === 'ar' ? 'سجل حافل' : 'Proven Track Record'}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                        {safeArray('benefits')[0]}
                      </Typography>
                    </Card>
                  </div>

                  {/* Add other slides similarly */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '320px',
                      p: 4,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: '50%', bgcolor: 'rgba(255, 255, 255, 0.2)', mb: 3 }}>
                        <StarIcon sx={{ fontSize: 35 }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {currentLang === 'ar' ? 'خبرة رائدة' : 'Industry Expertise'}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                        {safeArray('benefits')[1]}
                      </Typography>
                    </Card>
                  </div>

                  {/* Add more slides as needed */}
                </div>
                
                <div className="swiper-pagination"></div>
              </div>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: '25px',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(33, 150, 243, 0.4)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {currentLang === 'ar' ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
                <RocketIcon sx={{ ml: 1, fontSize: 20 }} />
              </Button>
            </Box>
          </Box>
        )}

        {/* Contact CTA */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 10,
          p: 6,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {t('getInTouch')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            {t('contactDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: '25px',
              fontWeight: 600,
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 35px rgba(255, 255, 255, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            {t('backToHome')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
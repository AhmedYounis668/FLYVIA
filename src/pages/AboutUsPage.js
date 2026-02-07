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
  Fade,
  Zoom,
  IconButton
} from '@mui/material';

import { 
  // الأيقونات الموجودة أضف معها:
  TrendingUp,
  Settings,
  Chat,
  Support,
  AttachMoney
} from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';

// وعدل الاستيرادات الحالية لتشمل:
import {
  // ... باقي الاستيرادات الموجودة
  Settings as SettingsIcon,
  Chat as ChatIcon,
  Support as SupportIcon,
  AttachMoney as AttachMoneyIcon,
  // ... إلخ
} from '@mui/icons-material';

import {
  RocketLaunch as RocketIcon,
  Public as GlobeIcon,
  Handshake as HandshakeIcon,
  Diversity3 as TeamIcon,
  TrendingUp as GrowthIcon,
  Lightbulb as InnovationIcon,
  Security as SecurityIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon
} from '@mui/icons-material';
import { useLanguage } from '../component/LanguageProvider';
import { useNavigate } from 'react-router-dom';
import { cleanupGSAP, initGSAP } from './initGSAP';

export const AboutUsPage = ({ 
  visibleSections = ['story', 'mission', 'team', 'whyChooseUs', 'contact'],
  hiddenSections = ['values', 'process']
}) => {
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const pageRef = useRef(null);
  const teamContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
 useEffect(() => {
    initGSAP();
    
    return () => {
      cleanupGSAP();
    };
  }, []);
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
      ourValues: "Our Core Values",
      values: [
        { 
          title: "Innovation", 
          description: "Constantly pushing boundaries and exploring new possibilities to stay ahead of the curve",
          icon: <InnovationIcon />,
          color: "#FF9800"
        },
        { 
          title: "Excellence", 
          description: "Delivering exceptional quality and outstanding results in everything we do",
          icon: <StarIcon />,
          color: "#4CAF50"
        },
        { 
          title: "Integrity", 
          description: "Building trust through transparency, honesty, and ethical business practices",
          icon: <SecurityIcon />,
          color: "#2196F3"
        },
        { 
          title: "Collaboration", 
          description: "Working together as one team to achieve shared success and mutual growth",
          icon: <TeamIcon />,
          color: "#9C27B0"
        },
        { 
          title: "Growth", 
          description: "Fostering continuous learning and development for our team and clients",
          icon: <GrowthIcon />,
          color: "#E91E63"
        },
        { 
          title: "Client-Centric", 
          description: "Putting our clients' success at the heart of everything we do",
          icon: <HandshakeIcon />,
          color: "#00BCD4"
        }
      ],
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
      ourProcess: "Our Process",
      processDescription: "A structured approach that ensures success at every stage",
      processSteps: [
        { title: "Discovery", description: "Understanding your goals and challenges" },
        { title: "Strategy", description: "Developing a customized roadmap" },
        { title: "Execution", description: "Implementing solutions with precision" },
        { title: "Optimization", description: "Continuous improvement and support" }
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
      contactDescription: "Let's discuss how we can help you achieve your digital goals",
      contactInfo: {
        address: "123 Business Avenue, Suite 100, New York, NY 10001",
        phone: "+1 (555) 123-4567",
        email: "info@flyvia.com",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM"
      },
      contactButton: "Get in Touch"
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
      ourValues: "قيمنا الأساسية",
      values: [
        { 
          title: "الابتكار", 
          description: "دفع الحدود باستمرار واستكشاف إمكانيات جديدة للبقاء في المقدمة",
          icon: <InnovationIcon />,
          color: "#FF9800"
        },
        { 
          title: "التميز", 
          description: "تقديم جودة استثنائية ونتائج متميزة في كل ما نقوم به",
          icon: <StarIcon />,
          color: "#4CAF50"
        },
        { 
          title: "النزاهة", 
          description: "بناء الثقة من خلال الشفافية والصدق والممارسات التجارية الأخلاقية",
          icon: <SecurityIcon />,
          color: "#2196F3"
        },
        { 
          title: "التعاون", 
          description: "العمل معاً كفريق واحد لتحقيق النجاح المشترك والنمو المتبادل",
          icon: <TeamIcon />,
          color: "#9C27B0"
        },
        { 
          title: "النمو", 
          description: "تعزيز التعلم والتطوير المستمر لفريقنا وعملائنا",
          icon: <GrowthIcon />,
          color: "#E91E63"
        },
        { 
          title: "العميل أولاً", 
          description: "وضع نجاح عملائنا في قلب كل ما نقوم به",
          icon: <HandshakeIcon />,
          color: "#00BCD4"
        }
      ],
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
      ourProcess: "عملنا",
      processDescription: "نهج منظم يضمن النجاح في كل مرحلة",
      processSteps: [
        { title: "الاكتشاف", description: "فهم أهدافك وتحدياتك" },
        { title: "الإستراتيجية", description: "تطوير خارطة طريق مخصصة" },
        { title: "التنفيذ", description: "تنفيذ الحلول بدقة" },
        { title: "التحسين", description: "التطوير المستمر والدعم" }
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
      contactDescription: "دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك الرقمية",
      contactInfo: {
        address: "123 شارع الأعمال، جناح 100، نيويورك، نيويورك 10001",
        phone: "+1 (555) 123-4567",
        email: "info@flyvia.com",
        hours: "الإثنين-الجمعة: 9:00 صباحاً - 6:00 مساءً"
      },
      contactButton: "تواصل معنا"
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
    const cards = container.querySelectorAll('.team-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    const scrollAmount = direction === 'next' ? cardWidth * 4 : -cardWidth * 4;
    
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
      updateScroll(); // تحديث أولي
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScroll);
      }
    };
  }, []);

  // إنشاء أنيميشن CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { opacity: 0.1; transform: scale(1); }
        100% { opacity: 0.3; transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
      direction: currentLang === 'AR' ? 'rtl' : 'ltr'
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
          <Fade in timeout={1000}>
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
                startIcon={<ArrowBackIcon sx={{ transform: currentLang === 'AR' ? 'scaleX(-1)' : 'none' }} />}
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
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        
        {/* Our Story */}
{/* Our Story */}
{shouldShowSection('story') && (
  <Box sx={{ 
    mb: 10,
    py: 4,
    position: 'relative',
    zIndex: 1,
    bgcolor: 'background.default'
  }}>
    <Container maxWidth="lg">
      {/* عنوان القسم */}
      <Box sx={{ 
    mb: 10,
    py: 4,
    position: 'relative',
    zIndex: 1,
    bgcolor: 'background.default'
  }}>
    <Container maxWidth="lg">
      {/* عنوان القسم */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        {/* <Chip 
          label={t('ourStory')}
          sx={{
            mb: 3,
            py: 1,
            px: 3,
            fontSize: '0.9rem',
            fontWeight: 600,
            bgcolor: 'rgba(33, 150, 243, 0.1)',
            color: 'primary.main',
            border: '1px solid rgba(33, 150, 243, 0.3)',
            borderRadius: '20px'
          }}
        /> */}
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

      {/* النص */}
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

      {/* الإحصائيات - 4 كروت متساوية الطول */}
      <Box sx={{ 
        position: 'relative',
        width: '100%'
      }}>
        {/* Grid Container مع height متساوي */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          alignItems: 'stretch', // هذي مهمة عشان الكروت تتمد بنفس الطول
          justifyItems: 'center'
        }}>
          {safeArray('storyStats').map((stat, index) => (
            <Card 
              key={index}
              sx={{ 
                width: '100%',
                height: '100%', // هذي تضبط الطول
                minHeight: { xs: '180px', md: '220px' }, // نحدد minimum height
                maxHeight: '250px', // و maximum height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(33, 150, 243, 0.1)',
                borderRadius: 3,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(33, 150, 243, 0.15)',
                  borderColor: 'primary.light',
                  bgcolor: 'primary.lighter',
                  '& .stat-value': {
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  },
                  '& .stat-icon': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                },
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
                  opacity: 0,
                  transition: 'all 0.3s ease'
                },
                '&:hover:before': {
                  opacity: 1
                }
              }}
            >
              {/* أيقونة زخرفية */}
              <Box className="stat-icon" sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                opacity: 0,
                transform: 'translateY(-10px)',
                transition: 'all 0.4s ease',
                '& svg': {
                  fontSize: 40,
                  color: 'rgba(33, 150, 243, 0.1)'
                }
              }}>
                {index === 0 && <RocketIcon />}
                {index === 1 && <TeamIcon />}
                {index === 2 && <GlobeIcon />}
                {index === 3 && <StarIcon />}
              </Box>

              {/* محتوى الكارت - مركز وعمودي */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
                py: 3,
                px: 2,
                textAlign: 'center',
                flex: 1
              }}>
                {/* الرقم */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography 
                    className="stat-value"
                    variant="h1" 
                    sx={{ 
                      fontWeight: 900,
                      fontSize: { xs: '3rem', md: '3.5rem' },
                      color: 'primary.main',
                      lineHeight: 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

                {/* خط زخرفي */}
                <Box sx={{
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, #2196F3, transparent)',
                  my: 2,
                  flexShrink: 0
                }} />

                {/* النص */}
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minHeight: '60px' // نحدد ارتفاع أدنى للنص
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

              {/* شارة صغيرة */}
              <Box sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                bgcolor: 'rgba(33, 150, 243, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:before': {
                  content: '""',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  bgcolor: 'primary.main'
                }
              }} />
            </Card>
          ))}
        </Box>

        {/* خلفية زخرفية */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(33, 150, 243, 0.03) 0%, transparent 70%)',
          zIndex: -1
        }} />
      </Box>

      {/* نبذة إضافية */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 6,
        pt: 4,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ 
          color: 'text.secondary',
          mb: 3,
          maxWidth: 800,
          mx: 'auto',
          lineHeight: 1.7,
          fontSize: '1.1rem'
        }}>
          {currentLang === 'AR' 
            ? 'مع كل مشروع نكسب خبرة جديدة، ومع كل عميل نبني علاقة طويلة الأمد. هذه ليست مجرد أرقام، بل هي قصص نجاح نفتخر بها.'
            : 'With every project we gain new experience, with every client we build a long-term relationship. These are not just numbers, they are success stories we are proud of.'
          }
        </Typography>
      </Box>
    </Container>
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
                  justifyContent: 'center',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
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
                  justifyContent: 'center',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    bottom: -50,
                    left: -50,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
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

        {/* Meet Our Team - مع 4 كروت في صف واحد */}
        {shouldShowSection('team') && (
          <Box sx={{ 
            mb: 12, 
            py: 8,
            position: 'relative',
            overflow: 'hidden'
          }}>
            
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
              zIndex: 0
            }} />
            
            <Container maxWidth="xl">
              <Box sx={{ 
                textAlign: 'center', 
                mb: 8,
                position: 'relative',
                zIndex: 1
              }}>
                {/* <Chip 
                  label={t('meetTeam')}
                  sx={{
                    mb: 3,
                    py: 1,
                    px: 3,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(33, 150, 243, 0.1)',
                    color: 'primary.main',
                    border: '1px solid rgba(33, 150, 243, 0.3)',
                    borderRadius: '20px'
                  }}
                /> */}
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

              {/* Container مع 4 كروت في صف واحد */}
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                overflow: 'hidden'
              }}>
                
                {/* أزرار التنقل */}
                <IconButton
                  onClick={() => scrollTeamCards('prev')}
                  disabled={scrollPosition <= 0}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    left: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    bgcolor: 'white',
                    boxShadow: 3,
                    width: 56,
                    height: 56,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-50%) scale(1.1)'
                    },
                    '&.Mui-disabled': {
                      opacity: 0.3,
                      bgcolor: 'grey.200'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <LeftIcon />
                </IconButton>
                
                {/* Grid Container مع 4 أعمدة */}
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
                    scrollBehavior: { xs: 'smooth', lg: 'auto' },
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none'
                    },
                    py: 2
                  }}
                >
                  {safeArray('teamMembers').map((member, index) => (
                    <Card 
                      key={index}
                      className="team-card"
                      sx={{
                        width: '100%',
                        minHeight: '420px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'visible',
                        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        zIndex: 1,
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: '0 20px 60px rgba(33, 150, 243, 0.15)',
                          borderColor: 'primary.light',
                          '& .member-avatar': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 15px 30px rgba(33, 150, 243, 0.3)',
                          }
                        }
                      }}
                    >
                      
                      {/* الصورة */}
                      <Box sx={{ 
                        p: 3, 
                        pb: 2, 
                        display: 'flex', 
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        <Box sx={{
                          position: 'relative',
                          '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                            opacity: 0.1,
                            top: '-5px',
                            left: '-5px',
                            animation: 'pulse 2s infinite alternate'
                          }
                        }}>
                          <Avatar
                            src={member.image}
                            className="member-avatar"
                            sx={{
                              width: 80,
                              height: 80,
                              border: '3px solid white',
                              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                              transition: 'all 0.4s ease',
                              position: 'relative',
                              zIndex: 3
                            }}
                          />
                        </Box>
                      </Box>

                      {/* المحتوى */}
                      <CardContent sx={{ 
                        p: 3, 
                        pt: 0, 
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* الاسم */}
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          mb: 1,
                          fontSize: '1rem',
                          color: 'text.primary'
                        }}>
                          {member.name}
                        </Typography>

                        {/* المنصب */}
                        <Typography variant="body2" sx={{ 
                          color: 'primary.main', 
                          fontWeight: 600, 
                          mb: 2,
                          fontSize: '0.85rem',
                          minHeight: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {member.role}
                        </Typography>

                        {/* الوصف */}
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary', 
                          mb: 3,
                          lineHeight: 1.6,
                          fontSize: '0.85rem',
                          flex: 1
                        }}>
                          {member.description}
                        </Typography>

                        {/* المهارات */}
                        <Stack 
                          direction="row" 
                          spacing={0.8} 
                          justifyContent="center" 
                          flexWrap="wrap"
                          sx={{ mb: 2 }}
                        >
                          {(member.expertise || []).map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: idx === 0 
                                  ? 'rgba(33, 150, 243, 0.1)' 
                                  : idx === 1 
                                  ? 'rgba(76, 175, 80, 0.1)'
                                  : 'rgba(156, 39, 176, 0.1)',
                                color: idx === 0 
                                  ? 'primary.dark' 
                                  : idx === 1 
                                  ? 'success.dark'
                                  : 'secondary.dark',
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

                {/* زر التنقل التالي */}
                <IconButton
                  onClick={() => scrollTeamCards('next')}
                  disabled={scrollPosition >= maxScroll - 10}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    right: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    bgcolor: 'white',
                    boxShadow: 3,
                    width: 56,
                    height: 56,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-50%) scale(1.1)'
                    },
                    '&.Mui-disabled': {
                      opacity: 0.3,
                      bgcolor: 'grey.200'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <RightIcon />
                </IconButton>
              </Box>

              {/* معلومات إضافية */}
              {/* <Box sx={{ 
                textAlign: 'center', 
                mt: 6,
                pt: 4,
                borderTop: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="body1" sx={{ 
                  color: 'text.secondary',
                  mb: 3,
                  maxWidth: 800,
                  mx: 'auto'
                }}>
                  {currentLang === 'AR' 
                    ? 'فريقنا المتميز جاهز لمساعدتك في تحقيق أهدافك الرقمية. تواصل معنا اليوم!'
                    : 'Our exceptional team is ready to help you achieve your digital goals. Contact us today!'
                  }
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
                    bgcolor: 'primary.main',
                    backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 30px rgba(33, 150, 243, 0.4)',
                      bgcolor: 'primary.dark'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {currentLang === 'AR' ? 'تواصل مع فريقنا' : 'Contact Our Team'}
                </Button>
              </Box> */}
            </Container>
          </Box>
        )}

{shouldShowSection('whyChooseUs') && (
  <Box sx={{ mb: 10, position: 'relative', overflow: 'hidden' }}>
    {/* عنوان القسم */}
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      {/* <Chip 
        label={t('whyChooseUs')}
        sx={{
          mb: 3,
          py: 1,
          px: 3,
          fontSize: '0.9rem',
          fontWeight: 600,
          bgcolor: 'rgba(33, 150, 243, 0.1)',
          color: 'primary.main',
          border: '1px solid rgba(33, 150, 243, 0.3)',
          borderRadius: '20px'
        }}
      /> */}
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
      <Typography variant="h6" sx={{ 
        color: 'text.secondary',
        maxWidth: 600,
        mx: 'auto',
        lineHeight: 1.7,
        mb: 1
      }}>
        {currentLang === 'AR' 
          ? 'اكتشف ما يميزنا ويساعدك في تحقيق أهدافك الرقمية' 
          : 'Discover what sets us apart and helps you achieve your digital goals'
        }
      </Typography>
    </Box>

    {/* Swiper Container */}
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      py: 2,
      '& .swiper': {
        width: '100%',
        overflow: 'visible',
        padding: { xs: '20px 10px', md: '30px 20px' }
      },
      '& .swiper-slide': {
        height: 'auto',
        display: 'flex'
      }
    }}>
      {/* Swiper Component */}
      <Box
        component="div"
        sx={{
          '& .swiper-wrapper': {
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }}
      >
        {(() => {
          // إنشاء Swiper ديناميكياً باستخدام useEffect
          const SwiperComponent = () => {
            useEffect(() => {
              const initSwiper = async () => {
                const Swiper = await import('swiper');
                const { Autoplay, Navigation, Pagination, EffectCards } = await import('swiper/modules');
                
                await import('swiper/css');
                await import('swiper/css/navigation');
                await import('swiper/css/pagination');
                await import('swiper/css/effect-cards');
                
                new Swiper.default('.why-choose-us-swiper', {
                  modules: [Autoplay, Navigation, Pagination, EffectCards],
                  slidesPerView: 1,
                  spaceBetween: 30,
                  loop: true,
                  speed: 800,
                  centeredSlides: true,
                  autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  },
                  breakpoints: {
                    600: {
                      slidesPerView: 2,
                      spaceBetween: 25
                    },
                    900: {
                      slidesPerView: 3,
                      spaceBetween: 30
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 35
                    }
                  },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                  },
                  effect: 'cards',
                  cardsEffect: {
                    slideShadows: true,
                    rotate: false,
                    perSlideOffset: 15,
                    perSlideRotate: 2
                  }
                });
              };
              
              initSwiper();
            }, []);

            return (
              <div className="swiper why-choose-us-swiper">
                <div className="swiper-wrapper">
                  {/* Card 1: Proven Track Record */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '100%',
                      minHeight: '320px',
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          mb: 3,
                          mx: 'auto'
                        }}>
                          <TrendingUp sx={{ fontSize: 35 }} />
                        </Box>
                        
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          fontSize: { xs: '1.4rem', md: '1.6rem' }
                        }}>
                          {currentLang === 'AR' ? 'سجل حافل' : 'Proven Track Record'}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          opacity: 0.9,
                          lineHeight: 1.7,
                          mb: 4,
                          fontSize: '1rem'
                        }}>
                          {safeArray('benefits')[0]}
                        </Typography>
                        
                        <Typography variant="h3" sx={{ 
                          fontWeight: 900,
                          color: 'rgba(255, 255, 255, 0.9)'
                        }}>
                          250+ {currentLang === 'AR' ? 'مشروع' : 'Projects'}
                        </Typography>
                      </Box>
                    </Card>
                  </div>

                  {/* Card 2: Industry Expertise */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '100%',
                      minHeight: '320px',
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          mb: 3,
                          mx: 'auto'
                        }}>
                          <StarIcon sx={{ fontSize: 35 }} />
                        </Box>
                        
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          fontSize: { xs: '1.4rem', md: '1.6rem' }
                        }}>
                          {currentLang === 'AR' ? 'خبرة رائدة' : 'Industry Expertise'}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          opacity: 0.9,
                          lineHeight: 1.7,
                          mb: 4,
                          fontSize: '1rem'
                        }}>
                          {safeArray('benefits')[1]}
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3
                        }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900 }}>
                              10+
                            </Typography>
                            <Typography variant="caption">
                              {currentLang === 'AR' ? 'سنوات خبرة' : 'Years'}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 900 }}>
                              50+
                            </Typography>
                            <Typography variant="caption">
                              {currentLang === 'AR' ? 'خبير' : 'Experts'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </div>

                  {/* Card 3: Custom Solutions */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '100%',
                      minHeight: '320px',
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          mb: 3,
                          mx: 'auto'
                        }}>
                          <SettingsIcon sx={{ fontSize: 35 }} />
                        </Box>
                        
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          fontSize: { xs: '1.4rem', md: '1.6rem' }
                        }}>
                          {currentLang === 'AR' ? 'حلول مخصصة' : 'Custom Solutions'}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          opacity: 0.9,
                          lineHeight: 1.7,
                          mb: 4,
                          fontSize: '1rem'
                        }}>
                          {safeArray('benefits')[2]}
                        </Typography>
                        
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3,
                          width: '100%'
                        }}>
                          <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <CheckCircleIcon sx={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.9)', mb: 1 }} />
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              {currentLang === 'AR' ? 'تعديل كامل' : 'Fully Customizable'}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <CheckCircleIcon sx={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.9)', mb: 1 }} />
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              {currentLang === 'AR' ? 'مرنة' : 'Flexible'}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center', flex: 1 }}>
                            <CheckCircleIcon sx={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.9)', mb: 1 }} />
                            <Typography variant="caption" sx={{ display: 'block' }}>
                              {currentLang === 'AR' ? 'قابلة للتطوير' : 'Scalable'}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  </div>

                  {/* Card 4: Transparent Communication */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '100%',
                      minHeight: '320px',
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          mb: 3,
                          mx: 'auto'
                        }}>
                          <ChatIcon sx={{ fontSize: 35 }} />
                        </Box>
                        
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          fontSize: { xs: '1.4rem', md: '1.6rem' }
                        }}>
                          {currentLang === 'AR' ? 'تواصل شفاف' : 'Transparent Communication'}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          opacity: 0.9,
                          lineHeight: 1.7,
                          mb: 4,
                          fontSize: '1rem'
                        }}>
                          {safeArray('benefits')[3]}
                        </Typography>
                        
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                          <Grid item xs={6}>
                            <Box sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.15)',
                              p: 2,
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                24/7
                              </Typography>
                              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                {currentLang === 'AR' ? 'دعم' : 'Support'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.15)',
                              p: 2,
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                2h
                              </Typography>
                              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                {currentLang === 'AR' ? 'استجابة' : 'Response'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </div>

                  {/* Card 5: Ongoing Support */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '100%',
                      minHeight: '320px',
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          mb: 3,
                          mx: 'auto'
                        }}>
                          <SupportIcon sx={{ fontSize: 35 }} />
                        </Box>
                        
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          fontSize: { xs: '1.4rem', md: '1.6rem' }
                        }}>
                          {currentLang === 'AR' ? 'دعم مستمر' : 'Ongoing Support'}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          opacity: 0.9,
                          lineHeight: 1.7,
                          mb: 4,
                          fontSize: '1rem'
                        }}>
                          {safeArray('benefits')[4]}
                        </Typography>
                        
                        <Box sx={{ 
                          width: '100%',
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                          p: 2,
                          borderRadius: 2,
                          textAlign: 'center'
                        }}>
                          <Typography variant="h4" sx={{ fontWeight: 900 }}>
                            100%
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            {currentLang === 'AR' ? 'تغطية شاملة' : 'Full Coverage'}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </div>

                  {/* Card 6: Competitive Pricing */}
                  <div className="swiper-slide">
                    <Card sx={{ 
                      height: '100%',
                      minHeight: '320px',
                      p: { xs: 3, md: 4 },
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                      color: '#333',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'center'
                    }}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: 'rgba(0, 0, 0, 0.1)',
                          mb: 3,
                          mx: 'auto'
                        }}>
                          <AttachMoneyIcon sx={{ fontSize: 35, color: '#333' }} />
                        </Box>
                        
                        <Typography variant="h5" sx={{ 
                          fontWeight: 700, 
                          mb: 2,
                          fontSize: { xs: '1.4rem', md: '1.6rem' },
                          color: '#222'
                        }}>
                          {currentLang === 'AR' ? 'أسعار تنافسية' : 'Competitive Pricing'}
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                          opacity: 0.8,
                          lineHeight: 1.7,
                          mb: 4,
                          fontSize: '1rem',
                          color: '#444'
                        }}>
                          {safeArray('benefits')[5]}
                        </Typography>
                        
                        <Box sx={{ 
                          width: '100%',
                          bgcolor: 'rgba(0, 0, 0, 0.08)',
                          p: 2,
                          borderRadius: 2,
                          textAlign: 'center'
                        }}>
                          <Typography variant="h5" sx={{ 
                            fontWeight: 900,
                            background: 'linear-gradient(45deg, #333 30%, #666 90%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                          }}>
                            {currentLang === 'AR' ? 'أفضل قيمة' : 'Best Value'}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            color: '#666',
                            fontWeight: 600
                          }}>
                            {currentLang === 'AR' 
                              ? 'أسعار شفافة' 
                              : 'Transparent Pricing'
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </div>
                </div>
                
                {/* Pagination Dots */}
                <div className="swiper-pagination" style={{ position: 'relative', marginTop: '20px' }}></div>
              </div>
            );
          };

          return <SwiperComponent />;
        })()}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        className="swiper-button-prev"
        sx={{
          position: 'absolute',
          left: { xs: 5, md: -20 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          bgcolor: 'white',
          boxShadow: 3,
          width: { xs: 40, md: 56 },
          height: { xs: 40, md: 56 },
          display: { xs: 'none', md: 'flex' },
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <LeftIcon />
      </IconButton>
      
      <IconButton
        className="swiper-button-next"
        sx={{
          position: 'absolute',
          right: { xs: 5, md: -20 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          bgcolor: 'white',
          boxShadow: 3,
          width: { xs: 40, md: 56 },
          height: { xs: 40, md: 56 },
          display: { xs: 'none', md: 'flex' },
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <RightIcon />
      </IconButton>
    </Box>

    {/* CTA Button */}
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
          fontSize: '1.1rem',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 12px 35px rgba(33, 150, 243, 0.4)',
          },
          transition: 'all 0.3s ease',
          minWidth: '200px'
        }}
      >
        {currentLang === 'AR' ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
        <RocketIcon sx={{ ml: 1, fontSize: 20 }} />
      </Button>
    </Box>
  </Box>
)}

       
      </Container>
    </Box>
  );
};
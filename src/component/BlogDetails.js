import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaCalendar, FaUser, FaArrowLeft, FaClock } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';
import { cleanupGSAP, initGSAP } from '../pages/initGSAP';

export const BlogDetails = () => {
  const { id } = useParams();
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    initGSAP();
    
    return () => {
      cleanupGSAP();
    };
  }, []);
  // الترجمات
  const translations = {
    EN: {
      backToBlogs: "Back to Blogs",
      publishedOn: "Published on",
      readTime: "min read",
      by: "by",
      loading: "Loading...",
      noBlogFound: "Blog post not found",
      goBack: "Go Back"
    },
    AR: {
      backToBlogs: "العودة إلى المدونات",
      publishedOn: "نُشر في",
      readTime: "دقيقة للقراءة",
      by: "بواسطة",
      loading: "جارٍ التحميل...",
      noBlogFound: "المدونة غير موجودة",
      goBack: "العودة"
    }
  };

  const t = (key) => translations[currentLang][key] || translations.EN[key];

  // إنشاء محتوى مقالة تعبيرية طويل بالعربي والإنجليزي
  const generateArticleContent = (lang) => {
    if (lang === 'AR') {
      const paragraphs = [];
      const paragraphContent = "في عالم الأعمال سريع التطور اليوم، النمو ليس مجرد خيار - بل هو ضرورة للبقاء. الشركات التي تفشل في التكيف والتوسع تخاطر بتخلفها عن منافسيها الأكثر مرونة.";
      
      for (let i = 0; i < 15; i++) {
        paragraphs.push(`
          <p>${paragraphContent} هذا يتطلب تحولاً جوهرياً في العقلية، حيث يصبح الابتكار هو القوة الدافعة وراء كل قرار وإجراء. يجب على المنظمات أن تزرع ثقافةً تتبنى التغيير، وتشجع التجريب، وتكافئ التفكير الإبداعي.</p>
          
          <p>لقد غيرت الثورة الرقمية نماذج الأعمال التقليدية، مما يجعل من الضروري للشركات الاستفادة من التكنولوجيا ليس كأداة فحسب، بل كأصل استراتيجي. من الذكاء الاصطناعي إلى تقنية البلوك تشين، تقدم التقنيات الناشئة فرصاً غير مسبوقة لأولئك الذين يرغبون في تبنيها.</p>
          
          <p>كما تطورت توقعات العملاء بشكل كبير في السنوات الأخيرة. يطلب المستهلكون اليوم تجارب شخصية، وإشباعاً فورياً، ومشاركة ذات معنى. تضع الشركات التي تفهم هذه التوقعات وتتوقعها نفسها لتحقيق نجاح طويل الأمد.</p>
        `);
      }
      
      return `
        <div class="article-introduction">
          <h2>مقدمة</h2>
          <p class="lead">${paragraphContent} تستكشف هذه المقالة المبادئ الأساسية لنمو الأعمال في العصر الحديث، وتقدم رؤى قابلة للتنفيذ للمنظمات التي تسعى إلى الازدهار في سوق تنافسية بشكل متزايد.</p>
        </div>
        
        <div class="article-body">
          ${paragraphs.join('')}
        </div>
        
        <div class="article-conclusion">
          <h2>خاتمة</h2>
          <p>تتطلب الرحلة نحو النمو المستدام الصبر والمثابرة والاستعداد للتكيف. من خلال تبني الابتكار، وإعطاء الأولوية لاحتياجات العملاء، وتعزيز ثقافة التحسين المستمر، يمكن للمنظمات التنقل في تحديات بيئة الأعمال الحديثة والخروج أقوى من أي وقت مضى.</p>
          
          <p>تذكر، النمو ليس وجهة بل عملية مستمرة من التطور والتكيف. الشركات الأكثر نجاحاً هي تلك التي تنظر إلى التحديات كفرص وتظل ملتزمة بالتعلم والنمو والابتكار في كل مرحلة من رحلتها.</p>
        </div>
      `;
    } else {
      const paragraphs = [];
      const paragraphContent = "In today's rapidly evolving business landscape, growth is not just an option—it's a necessity for survival. Companies that fail to adapt and expand risk being left behind by more agile competitors.";
      
      for (let i = 0; i < 15; i++) {
        paragraphs.push(`
          <p>${paragraphContent} This requires a fundamental shift in mindset, where innovation becomes the driving force behind every decision and action. Organizations must cultivate a culture that embraces change, encourages experimentation, and rewards creative thinking.</p>
          
          <p>The digital revolution has transformed traditional business models, making it imperative for companies to leverage technology not just as a tool, but as a strategic asset. From artificial intelligence to blockchain, emerging technologies offer unprecedented opportunities for those willing to embrace them.</p>
          
          <p>Customer expectations have also evolved dramatically in recent years. Today's consumers demand personalized experiences, instant gratification, and meaningful engagement. Businesses that understand and anticipate these expectations position themselves for long-term success.</p>
        `);
      }
      
      return `
        <div class="article-introduction">
          <h2>Introduction</h2>
          <p class="lead">${paragraphContent} This article explores the fundamental principles of business growth in the modern era, providing actionable insights for organizations seeking to thrive in an increasingly competitive marketplace.</p>
        </div>
        
        <div class="article-body">
          ${paragraphs.join('')}
        </div>
        
        <div class="article-conclusion">
          <h2>Conclusion</h2>
          <p>The journey toward sustainable growth requires patience, persistence, and a willingness to adapt. By embracing innovation, prioritizing customer needs, and fostering a culture of continuous improvement, organizations can navigate the challenges of the modern business landscape and emerge stronger than ever before.</p>
          
          <p>Remember, growth is not a destination but a continuous process of evolution and adaptation. The most successful companies are those that view challenges as opportunities and remain committed to learning, growing, and innovating at every stage of their journey.</p>
        </div>
      `;
    }
  };

  // بيانات المدونات الكاملة باللغتين
  const allBlogsData = {
    EN: [
      {
        id: 1,
        title: "10 Strategies to Boost Your Business Growth in 2024",
        excerpt: "Discover the most effective strategies that successful businesses are using to achieve exponential growth in today's competitive market.",
        category: "Business",
        date: "March 15, 2024",
        readTime: 15,
        author: "Alex Johnson",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 2,
        title: "The Future of Digital Marketing: Trends You Can't Ignore",
        excerpt: "Explore the latest digital marketing trends that are shaping the industry and learn how to stay ahead of the curve.",
        category: "Marketing",
        date: "March 10, 2024",
        readTime: 12,
        author: "Sarah Williams",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 3,
        title: "How AI is Transforming Business Operations in 2024",
        excerpt: "Learn how artificial intelligence is revolutionizing business operations and creating new opportunities for efficiency and growth.",
        category: "Technology",
        date: "March 5, 2024",
        readTime: 18,
        author: "Michael Chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 4,
        title: "Building a Strong Brand Identity: A Complete Guide",
        excerpt: "A comprehensive guide to creating a memorable brand identity that resonates with your target audience and drives loyalty.",
        category: "Branding",
        date: "February 28, 2024",
        readTime: 20,
        author: "Emma Rodriguez",
        authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 5,
        title: "Remote Team Collaboration: Tools and Best Practices",
        excerpt: "Discover the best tools and practices for effective remote team collaboration and maintaining productivity.",
        category: "Teamwork",
        date: "February 20, 2024",
        readTime: 14,
        author: "David Wilson",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 6,
        title: "Sustainable Business Practices for Long-Term Success",
        excerpt: "How implementing sustainable practices can lead to long-term business success and positive social impact.",
        category: "Sustainability",
        date: "February 15, 2024",
        readTime: 16,
        author: "Lisa Thompson",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      }
    ],
    AR: [
      {
        id: 1,
        title: "10 استراتيجيات لتعزيز نمو أعمالك في 2024",
        excerpt: "اكتشف الاستراتيجيات الأكثر فعالية التي تستخدمها الشركات الناجحة لتحقيق نمو أسّي في السوق التنافسية اليوم.",
        category: "أعمال",
        date: "15 مارس 2024",
        readTime: 15,
        author: "أليكس جونسون",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 2,
        title: "مستقبل التسويق الرقمي: اتجاهات لا يمكن تجاهلها",
        excerpt: "استكشف أحدث اتجاهات التسويق الرقمي التي تشكل الصناعة وتعلم كيف تبقى في المقدمة.",
        category: "تسويق",
        date: "10 مارس 2024",
        readTime: 12,
        author: "سارة ويليامز",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 3,
        title: "كيف يحول الذكاء الاصطناعي عمليات الأعمال في 2024",
        excerpt: "تعلم كيف يحدث الذكاء الاصطناعي ثورة في عمليات الأعمال ويخلق فرصاً جديدة للكفاءة والنمو.",
        category: "تكنولوجيا",
        date: "5 مارس 2024",
        readTime: 18,
        author: "مايكل تشن",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 4,
        title: "بناء هوية علامة تجارية قوية: دليل شامل",
        excerpt: "دليل شامل لإنشاء هوية علامة تجارية لا تُنسى تتردد صداها مع جمهورك المستهدف وتدفع الولاء.",
        category: "هوية العلامة التجارية",
        date: "28 فبراير 2024",
        readTime: 20,
        author: "إيما رودريجيز",
        authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 5,
        title: "تعاون فريق العمل عن بُعد: الأدوات وأفضل الممارسات",
        excerpt: "اكتشف أفضل الأدوات والممارسات للتعاون الفعال لفريق العمل عن بُعد والحفاظ على الإنتاجية.",
        category: "العمل الجماعي",
        date: "20 فبراير 2024",
        readTime: 14,
        author: "ديفيد ويلسون",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      },
      {
        id: 6,
        title: "ممارسات الأعمال المستدامة للنجاح طويل الأمد",
        excerpt: "كيف يمكن لتطبيق الممارسات المستدامة أن يؤدي إلى نجاح الأعمال طويل الأمد وتأثير اجتماعي إيجابي.",
        category: "الاستدامة",
        date: "15 فبراير 2024",
        readTime: 16,
        author: "ليزا طومسون",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      }
    ]
  };

  useEffect(() => {
    setLoading(true);
    // البحث عن المدونة بناءً على الـ ID واللغة الحالية
    const currentBlogs = allBlogsData[currentLang] || allBlogsData.EN;
    const foundBlog = currentBlogs.find(blog => blog.id === parseInt(id));
    
    if (foundBlog) {
      // إضافة المحتوى الكامل بناءً على اللغة
      const blogWithContent = {
        ...foundBlog,
        fullContent: generateArticleContent(currentLang)
      };
      setBlog(blogWithContent);
    } else {
      setBlog(null);
    }
    
    // محاكاة تأخير التحميل
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id, currentLang]);

  const handleBack = () => {
    navigate(-1);
  };

  // إضافة style للعربية
  const arabicStyles = currentLang === 'AR' ? {
    textAlign: 'right',
    direction: 'rtl'
  } : {};

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <h4 style={arabicStyles}>{t('loading')}</h4>
      </div>
    );
  }

  // عرض حالة عدم العثور على المدونة
  if (!blog) {
    return (
      <div className="not-found-container" style={arabicStyles}>
        <h3 className="mb-4">{t('noBlogFound')}</h3>
        <Button variant="primary" onClick={handleBack}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          {t('goBack')}
        </Button>
      </div>
    );
  }

  return (
    <div className="blog-details-page" style={arabicStyles}>
   

      {/* صورة المدونة الرئيسية */}
      <div className="blog-main-image-container">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="blog-main-image"
        />
        <div className="image-overlay"></div>
      </div>

      {/* محتوى المدونة */}
      <div className="blog-content-full-width">
        {/* عنوان المدونة */}
        <h1 className="blog-detail-title">
          {blog.title}
        </h1>

        {/* معلومات المدونة */}
        <div className="blog-meta-info" style={arabicStyles}>
          <div className="author-info">
            <img 
              src={blog.authorAvatar} 
              alt={blog.author} 
              className="author-avatar-small"
            />
            <div className="meta-content">
              <div className="author-name">
                <FaUser className="me-2" />
                {t('by')} <strong>{blog.author}</strong>
              </div>
              <div className="meta-details">
                <span>
                  <FaCalendar className="me-1" />
                  {t('publishedOn')}: <strong>{blog.date}</strong>
                </span>
                <span>
                  <FaClock className="me-1" />
                  <strong>{blog.readTime}</strong> {t('readTime')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* محتوى المقال الكامل */}
        <div className="blog-full-content">
          <div 
            className="article-content" 
            dangerouslySetInnerHTML={{ __html: blog.fullContent }}
          />
        </div>

        {/* زر العودة في الأسفل */}
        <div className="text-center mt-5">
          <Button 
            variant="outline-primary" 
            onClick={handleBack}
            size="lg"
            className="back-bottom-btn"
          >
            <FaArrowLeft style={{ marginRight: '10px' }} />
            {t('backToBlogs')}
          </Button>
        </div>
      </div>
    </div>
  );
};
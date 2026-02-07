import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initGSAP = () => {
  // تنظيف أي triggers قديمة
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  // إعادة التسجيل
  gsap.registerPlugin(ScrollTrigger);
  
  // إعادة حساب بعد تأخير
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
};

export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
};
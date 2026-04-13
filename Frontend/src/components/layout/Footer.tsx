import { motion } from 'framer-motion';
import { Facebook, Github, Gitlab, Instagram, Figma, Send, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const footerLinks = {
  services: [
    { label: 'Process Validation', path: '/services' },
    { label: 'CSV', path: '/services' },
    { label: 'Equipment Qualification', path: '/services' },
    { label: 'Method Validation', path: '/services' },
    { label: 'Regulatory Audits', path: '/services' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Industries', path: '/industries' },
    { label: 'Contact', path: '/contact' },
    { label: 'Dashboard', path: '/dashboard' },
  ],
};

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = newsletterEmail.trim();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsSubscribing(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`, {
        email,
      });
      toast.success(data?.message || 'Subscribed successfully.');
      setNewsletterEmail('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to subscribe.');
      } else {
        toast.error('Failed to subscribe.');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Gitlab size={20} />, href: "#", label: "GitLab" },
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Send size={20} />, href: "#", label: "Telegram" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Figma size={20} />, href: "#", label: "Figma" },
  ];

  return (
    <footer className="relative w-full bg-white pt-20 overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">TRUQUAL</h2>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">
                Validation Expert Services
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm max-w-xs">
              Precision-driven validation and compliance solutions for life sciences and regulated industries worldwide.
            </p>
            <div className="flex gap-4 mt-4">
              {socialLinks.slice(0, 4).map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, color: '#f97316' }}
                  className="text-gray-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-orange-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-6">
              Get regulatory updates and validation insights.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
                required
                disabled={isSubscribing}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribing}
                className="w-full py-3 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Wavy Background */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] pointer-events-none">
        <svg
          className="relative block w-full h-[200px] md:h-[300px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Layer 1 */}
          <path
            d="M0,0 C300,120 900,0 1200,120 L1200,120 L0,120 Z"
            className="fill-orange-100 opacity-30"
          />
          {/* Layer 2 */}
          <path
            d="M0,30 C400,100 800,20 1200,80 L1200,120 L0,120 Z"
            className="fill-orange-200 opacity-50"
          />
          {/* Layer 3 */}
          <path
            d="M0,60 C450,120 750,40 1200,100 L1200,120 L0,120 Z"
            className="fill-orange-300 opacity-70"
          />
          {/* Layer 4 (Main) */}
          <path
            d="M0,90 C500,130 700,60 1200,110 L1200,120 L0,120 Z"
            className="fill-orange-400"
          />
        </svg>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 w-full bg-white/10 backdrop-blur-sm py-6 px-4 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end items-center gap-4">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-orange-200 text-orange-500 hover:border-orange-500 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

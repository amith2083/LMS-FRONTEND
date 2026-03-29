import React from 'react';
import Logo from './logo';
import { BorderBeam } from "@/components/magicui/border-beam";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Courses', href: '/courses' },
    { label: 'About Us', href: '/about' },
    { label: 'Instructors', href: '/instructors' },

    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="relative bg-[#0B1215] text-slate-300 overflow-hidden pt-20 pb-10">
      {/* Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 opacity-20" />
      
      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-2xl font-bold text-white tracking-tight">
                Skillseed
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Empowering lifelong learners with cutting-edge courses and expert instructors. 
              Join our community and transform your future through project-based learning.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-accent transition-colors duration-200 flex items-center group text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-accent/30 rounded-full mr-3 group-hover:bg-accent transition-all group-hover:scale-150"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider text-sm">Legal Path</h3>
            <ul className="space-y-4 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider text-sm">Get in Touch</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5 text-accent border border-white/5 group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-slate-400 group-hover:text-white transition-colors">support@skillseed.com</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5 text-accent border border-white/5 group-hover:bg-accent group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-slate-400 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="p-2 rounded-lg bg-white/5 text-accent border border-white/5 group-hover:bg-accent group-hover:text-white transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-slate-400 group-hover:text-white transition-colors">San Francisco, CA, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <p>© {currentYear} <span className="text-white font-bold">Skillseed</span>. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <div className="h-4 w-[1px] bg-white/10" />
            <p className="flex items-center gap-2 italic">
              Built with <span className="text-accent animate-pulse">🧡</span> for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

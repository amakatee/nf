'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

import Image from 'next/image';
import Link from 'next/link';
interface SubMenuItem {
  id: number;
  title: string;
  href: string;
}

interface MenuItem {
  id: number;
  title: string;
  href?: string;
  subItems?: SubMenuItem[];
}

export default function UpperNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isUpperNavVisible, setIsUpperNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navbarRef = useRef<HTMLDivElement>(null);
  const upperNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Menu items data structure
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Услуги',
      subItems: [
        { id: 11, title: 'Поиск поставщиков', href: '/services/suppliers' },
        { id: 12, title: 'Таможенное оформление', href: '/services/customs' },
        { id: 13, title: 'Доставка "от двери до двери"', href: '/services/delivery' },
        { id: 14, title: 'Страхование груза', href: '/services/insurance' },
        { id: 15, title: 'Сертификация', href: '/services/certification' },
      ]
    },
    {
      id: 2,
      title: 'Этапы работы',
      href: '/process'
    },
    {
      id: 3,
      title: 'О компании',
      href: '/about'
    },
    {
      id: 4,
      title: 'Кейсы',
      href: '/cases'
    },
    {
      id: 5,
      title: 'Блог',
      href: '/blog'
    },
    {
      id: 6,
      title: 'Контакты',
      href: '/contact'
    },
  ];

  // Upper navbar contact info
  const contactInfo = {
    phone: '+7 (495) 123-45-67',
    email: 'info@northernfox.ru',
    hours: '9:00-18:00 Пн-Пт'
  };

  // Handle scroll effect - main navbar hide/show with animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle upper nav visibility - only show at top 0
      if (currentScrollY === 0 && !isUpperNavVisible) {
        setIsUpperNavVisible(true);
        if (upperNavRef.current) {
          gsap.fromTo(upperNavRef.current,
            { y: -40, opacity: 1 },
            { 
              y: 0, 
              opacity: 1,
              duration: 0.4,
              ease: 'power3.out'
            }
          );
        }
      } else if (currentScrollY > 0 && isUpperNavVisible) {
        setIsUpperNavVisible(false);
        if (upperNavRef.current) {
          gsap.to(upperNavRef.current, {
            y: -40,
            opacity: 1,
            duration: 0.3,
            ease: 'power3.in'
          });
        }
      }
      
      // Handle main navbar visibility - original behavior
      if (currentScrollY < lastScrollY) {
        // Scrolling UP - show navbar from top
        if (!isNavbarVisible) {
          setIsNavbarVisible(true);
          if (navbarRef.current) {
            gsap.fromTo(navbarRef.current,
              { y: -100, opacity: 1 },
              { 
                y: 0, 
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out'
              }
            );
          }
        }
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN and past threshold - hide navbar to top
        if (isNavbarVisible) {
          setIsNavbarVisible(false);
          if (navbarRef.current) {
            gsap.to(navbarRef.current, {
              y: -100,
              opacity: 0,
              duration: 0.3,
              ease: 'power3.in'
            });
          }
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavbarVisible, isUpperNavVisible]);

  // Reset both navbars when at top of page
  useEffect(() => {
    const checkTopOfPage = () => {
      if (window.scrollY === 0) {
        // Show upper nav at top
        if (!isUpperNavVisible) {
          setIsUpperNavVisible(true);
          if (upperNavRef.current) {
            gsap.set(upperNavRef.current, { y: 0, opacity: 1 });
          }
        }
        
        // Show main nav at top
        if (!isNavbarVisible) {
          setIsNavbarVisible(true);
          if (navbarRef.current) {
            gsap.set(navbarRef.current, { y: 0, opacity: 1 });
          }
        }
      }
    };

    window.addEventListener('scroll', checkTopOfPage);
    return () => window.removeEventListener('scroll', checkTopOfPage);
  }, [isNavbarVisible, isUpperNavVisible]);

  // Close dropdown when clicking outside (desktop)
 
        
   

  // Handle mobile menu animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      // Show overlay
      if (mobileOverlayRef.current) {
        mobileOverlayRef.current.style.display = 'block';
        gsap.to(mobileOverlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      // Animate mobile menu from LEFT to RIGHT
      if (mobileMenuRef.current) {
        gsap.fromTo(mobileMenuRef.current,
          { x: '-100%' },
          { 
            x: 0,
            duration: 0.4,
            ease: 'power3.out'
          }
        );
      }
      
      // Animate menu items in
      const items = mobileMenuRef.current?.querySelectorAll('.mobile-menu-item');
      if (items) {
        gsap.fromTo(items,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.1
          }
        );
      }
    } else {
      // Close mobile menu
      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: '-100%',
          duration: 0.3,
          ease: 'power3.in'
        });
      }
      
      // Hide overlay
      if (mobileOverlayRef.current) {
        gsap.to(mobileOverlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (mobileOverlayRef.current) {
              mobileOverlayRef.current.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
          }
        });
      }
      
      // Close mobile dropdown when menu closes
      setOpenMobileDropdown(null);
    }
  }, [isMenuOpen]);

  // Animate desktop dropdown
 


  // Handle desktop dropdown toggle
 






  return (
    <>
      {/* Upper Navbar - Contact Info (Only shows at scroll position 0) */}
     
  <div 
    ref={upperNavRef}
    className="fixed top-0 left-0 right-0 z-5000000 bg-[#193060] "
  >
    <div className="container mx-auto px-4">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between h-10">
        {/* Left: Company Name and Contact Info */}
        <div className="flex items-center space-x-6 md:space-x-8 text-sm">
          {/* Phone Number */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-white">+13232813</span>
          </div>
          
          {/* Email */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-white">info@northenfox.com</span>
          </div>
          
          {/* Address */}
          <div className="hidden lg:flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white">Guanzhou tianhe</span>
          </div>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center space-x-3">
          {/* Empty for now */}
        </div>
      </div>

      {/* Mobile Layout - Column Design */}
      <div className="md:hidden py-1">
        <div className="flex flex-col items-center space-y-1">
          {/* Phone and Email on same line */}
          <div className="flex flex-wrap items-center  gap-x-4 gap-y-1">
            {/* Phone */}
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-white text-xs">+123243423</span>
            </div>
            
            {/* Email */}
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-white text-xs">info@northenfox.com</span>
            </div>
          </div>
          
          {/* Address on next line */}
          <div className="flex items-start gap-1">
            <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white text-xs">Guangzhou tian he</span>
          </div>

         
        </div>
      </div>
    </div>
  </div>


    
    </>
  );
}
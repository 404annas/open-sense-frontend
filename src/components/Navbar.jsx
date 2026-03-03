"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '@/contexts/MenuContext';
import { ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();

  return (
    <>
      {/* Fixed Navbar Elements */}
      <div className='fixed top-8 z-[100] w-full'>
        <div className={` flex gap-5 items-center  w-full container px-3 mx-auto ${pathname !== "/" ? "justify-between" : "justify-end"}`}>

          {pathname !== '/' && (
            <div className='bg-[#1A292D] p-3 rounded-full'>
              <ArrowLeft
                className='text-2xl text-white cursor-pointer hover:opacity-80 transition-opacity'
                onClick={() => window.history.back()}
              />
            </div>
          )}

          <button
            onClick={toggleMenu}
            className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 group outline-none bg-[#1A292D] transition-colors duration-200 rounded-full cursor-pointer  "
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white block "
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1px] bg-white block "
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white block "
            />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
          onClick={closeMenu}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-black z-[90] flex flex-col justify-center px-12 md:px-24 border-l border-white/10 shadow-2xl transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="space-y-6 md:space-y-8 flex flex-col items-start">
          {['HOME', 'ABOUT', 'WORK', 'CONTACT'].map((text, i) => (
            <div key={text} className="overflow-visible">
              <a
                href={
                  text === 'HOME' ? '/' :
                    text === 'ABOUT' ? '#about' :
                      text === 'WORK' ? '#work' :
                        text === 'CONTACT' ? '#contact' :
                          `/${text.toLowerCase()}`
                }
                className="text-6xl md:text-8xl font-black text-white hover:text-[#34484e] transition-colors duration-300 inline-block"
                style={{ fontFamily: 'var(--font-bebas)' }}
                onClick={closeMenu}
              >
                <motion.span
                  whileHover={{ x: 15 }}
                  className="inline-block transition-transform duration-300"
                >
                  {text}
                </motion.span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
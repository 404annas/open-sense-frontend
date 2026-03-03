// src/sections/Works/Works.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Works = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Simulate fetching works data
    const fetchWorks = async () => {
      try {
        const response = await fetch('/api/works');
        const data = await response.json();

        if (data.success) {
          // Take only the first 6 works for the home page
          setWorks(data.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching works:', error);
        // Fallback to sample data
        setWorks([
          {
            _id: 1,
            name: "Heart to Heart",
            description: "A comprehensive brand identity for a healthcare startup.",
            media: [{ type: "image", src: "/images/work1-1.jpg", alt: "Heart to Heart branding" }],
            categories: ["UI/UX Design", "E-commerce", "Web Development"]
          },
          {
            _id: 2,
            name: "Discos el Popular",
            description: "Mobile banking application with intuitive navigation.",
            media: [{ type: "image", src: "/images/work2.jpg", alt: "Discos el Popular branding" }],
            categories: ["Mobile App", "FinTech", "UI/UX Design"]
          },
          {
            _id: 3,
            name: "Brand Identity for Tech Startup",
            description: "Complete brand identity including logo and guidelines.",
            media: [{ type: "image", src: "/images/work3.jpg", alt: "Logo design" }],
            categories: ["Branding", "Identity Design", "Marketing"]
          },
          {
            _id: 4,
            name: "Healthcare Dashboard Interface",
            description: "Patient management dashboard with real-time data.",
            media: [{ type: "image", src: "/images/work4.jpg", alt: "Dashboard overview" }],
            categories: ["Dashboard", "Healthcare", "Data Visualization"]
          },
          {
            _id: 5,
            name: "Restaurant Booking System",
            description: "Online reservation system for restaurants.",
            media: [{ type: "image", src: "/images/work5.jpg", alt: "Reservation interface" }],
            categories: ["Web Application", "Hospitality", "Booking System"]
          },
          {
            _id: 6,
            name: "Educational Platform UI",
            description: "User interface for an online learning platform.",
            media: [{ type: "image", src: "/images/work6.jpg", alt: "Course browsing" }],
            categories: ["Education", "UI/UX Design", "E-learning"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <h2 className="text-5xl md:text-7xl font-black mb-16" style={{ fontFamily: 'var(--font-bebas)' }}>
              OUR WORKS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg h-80 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6" style={{ fontFamily: 'var(--font-bebas)' }}>
            OUR WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-playfair)' }}>
            Explore our portfolio of innovative projects that blend creativity with technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {works.map((work, index) => (
            <Link
              key={work._id}
              href={`/work-detail?id=${work._id}`}
              className="block"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
                onMouseEnter={() => setHoveredCard(work._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={work.media[0]?.src || '/images/default-work.jpg'}
                      alt={work.media[0]?.alt || work.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end transition-opacity duration-300 ${hoveredCard === work._id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="p-6 w-full">
                      <h3 className="text-white text-xl font-bold mb-2">{work.name}</h3>
                      <p className="text-gray-200 text-sm mb-3 line-clamp-2">{work.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {work.categories.slice(0, 3).map((category, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Static Info Overlay (when not hovered) */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${hoveredCard === work._id ? 'opacity-0' : 'opacity-100'}`}>
                    <h3 className="text-white text-xl font-bold mb-1">{work.name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {work.categories.slice(0, 2).map((category, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/works">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              VIEW ALL PROJECTS
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Works;
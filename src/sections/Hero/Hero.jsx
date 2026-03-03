"use client"
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useMenu } from '@/contexts/MenuContext';
const projects = [
    { id: 1, title: 'CRICKET WIRELESS', sub: 'WE ARE', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop' },
    { id: 2, title: 'UNDER ARMOUR', sub: 'HEATGEAR', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop' },
    { id: 3, title: 'PEACE CORPS', sub: 'BOLD INVITATION', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop' },
    { id: 4, title: 'FORD', sub: "LET'S MAKE A DIFFERENCE", img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop' },
    { id: 5, title: 'THE NORTH FACE', sub: 'HAPPY CAMPERS', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop' },
    { id: 6, title: 'POKERSTARS', sub: 'NEYMAR', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop' },
    { id: 7, title: 'TURBOTAX', sub: 'SIDE HUSTLES', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
    { id: 8, title: 'KIA', sub: 'LIGHTNING BUGS', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop' },
];
const Hero = () => {
    const { isMenuOpen } = useMenu();
    const sliderRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(-30);
    const lastTimeRef = useRef(performance.now());
    const scrollVelocityRef = useRef(0);
    const lastScrollYRef = useRef(0);
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragStartOffsetRef = useRef(0);
    const lastDragXRef = useRef(0);
    const lastDragTimeRef = useRef(0);
    const dragVelocityRef = useRef(0);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const itemWidth = 256 + 64;
        const loopWidth = itemWidth * projects.length;

        const animate = (timestamp) => {
            const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
            lastTimeRef.current = timestamp;

            let targetVelocity = -30;
            if (isDraggingRef.current) {
                targetVelocity = dragVelocityRef.current;
            } else {
                targetVelocity += scrollVelocityRef.current;
                scrollVelocityRef.current *= 0.95;
            }

            const easingFactor = 1 - Math.exp(-deltaTime / 0.12);
            velocityRef.current += (targetVelocity - velocityRef.current) * easingFactor;

            if (loopWidth > 0) {
                offsetRef.current += velocityRef.current * deltaTime;
                while (offsetRef.current < 0) offsetRef.current += loopWidth;
                while (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth;
                slider.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollYRef.current;
            lastScrollYRef.current = currentScrollY;
            scrollVelocityRef.current = -scrollDelta * 12;
        };

        const handleMouseDown = (e) => {
            if (isMenuOpen) return;
            isDraggingRef.current = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            dragStartXRef.current = clientX;
            dragStartOffsetRef.current = offsetRef.current;
            lastDragXRef.current = clientX;
            lastDragTimeRef.current = performance.now();
        };

        const handleMouseMove = (e) => {
            if (!isDraggingRef.current) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const currentTime = performance.now();
            const deltaTime = Math.max((currentTime - lastDragTimeRef.current) / 1000, 0.001);
            const deltaX = clientX - lastDragXRef.current;
            dragVelocityRef.current = (deltaX / deltaTime) * 0.8;
            const totalDelta = clientX - dragStartXRef.current;
            offsetRef.current = dragStartOffsetRef.current - totalDelta;
            lastDragXRef.current = clientX;
            lastDragTimeRef.current = currentTime;
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            velocityRef.current = dragVelocityRef.current * 0.3;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        containerRef.current?.addEventListener('mousedown', handleMouseDown);
        containerRef.current?.addEventListener('touchstart', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isMenuOpen]);

    return (
        <div className="h-screen sticky top-0 bg-black text-white font-sans ">

            {/* Side menu is now handled globally in the layout */}
            <div className="relative overflow-hidden h-full w-full">
                <div className="relative h-full w-full">

                    {/* BACKGROUND */}
                    <div className="absolute inset-0 w-full z-0 bg-black">
                        <img
                            className="w-full h-full object-cover opacity-40"
                            src="https://cdn.prod.website-files.com/68ff2c0e4147b55d6b6221ca/692d45e053cb1ab7efdd6377_c89c52af607c41a754417b1a880d2275da20b1fb_11zon-p-1600.webp"
                            alt="Background"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Removed fixed navbar elements as they are now in the global layout */}

                    {/* HERO SECTION */}
                    <section className="absolute inset-0 w-full h-[100vh] flex flex-col items-center justify-center z-20 pt-10 text-center px-4">
                        <div className="relative">
                            <h1 className="text-[12vw] font-black leading-none tracking-tight mb-0 relative">
                                <span className="block italic" style={{ fontFamily: 'Georgia, serif', fontWeight: 900, letterSpacing: '-0.02em' }}>
                                    Open Sense
                                </span>
                                <span className="absolute -top-5 md:top-9 right-0 md:-right-8 text-2xl md:text-4xl">®</span>
                            </h1>
                        </div>
                        <div className="max-w-2xl mt-9" style={{ fontFamily: "Bebas neue" }}>
                            <p className="text-xl tracking-wide font-light leading-tight mb-4 text-gray-200">
                                As a hybrid film production company and creative agency, we partner with brands,
                                artists, and organizations to develop bold ideas and bring them to life through film,
                                design, and strategy. From high-end video production to full-scale creative visual
                                campaigns, we build work that looks beautiful, feels authentic, and delivers real
                                impact.
                            </p>
                            <p className="opacity-90 text-xl font-medium
           bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600
           bg-clip-text text-transparent">
                                [And yes, we are AI friendly. We embrace it]
                            </p>
                        </div>
                    </section>

                    {/* MARQUEE SLIDER */}
                    {/* <div className="absolute bottom-16 left-0 right-0 py-3 z-20 overflow-hidden cursor-grab select-none">
                    <div className="absolute top-0 left-0 w-full h-px bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.3)_0,rgba(255,255,255,0.3)_6px,transparent_6px,transparent_10px)]" />
                    <div ref={containerRef}>
                        <div ref={sliderRef} className="flex gap-16" style={{ willChange: 'transform' }}>
                            {[...projects, ...projects, ...projects].map((item, index) => (
                                <div key={index} className="marquee-item flex-shrink-0 h-16 w-64 flex gap-4 pointer-events-none">
                                    <div className="bg-zinc-800 aspect-video overflow-hidden group relative border h-full border-zinc-700">
                                        <img src={item.img} alt="" className="w-full h-full object-cover transition-all duration-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                                        <p className="text-sm text-zinc-400 uppercase italic font-serif tracking-wide">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.3)_0,rgba(255,255,255,0.3)_6px,transparent_6px,transparent_10px)]" />
                </div> */}

                </div>
            </div >
            {/* Extended height for scrolling trigger */}
            {/* <div className="h-[2000vh]" /> */}
        </div >
    );
};
export default Hero;
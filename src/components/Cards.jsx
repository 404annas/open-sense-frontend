"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import staticWorkData from '@/utils/workdata';
import Link from 'next/link';
import { useWorks } from '@/hooks/useWorks';

const Cards = () => {
    const projectsPerFetch = 6;
    const [hovering, setHovering] = useState(false);

    // Store all loaded projects here
    const [cardData2, setCardData2] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: projectsPerFetch,
    });

    const { data: workData, loading, error, hasNextPage } = useWorks(pagination);

    // 1. FIX: accumulate data safely without duplicates
    useEffect(() => {
        if (workData?.data?.projects) {
            setCardData2(prev => {
                const newProjects = workData.data.projects;
                // Avoid adding duplicates based on ID
                const existingIds = new Set(prev.map(p => p._id || p.id));
                const uniqueNew = newProjects.filter(p => !existingIds.has(p._id || p.id));
                return [...prev, ...uniqueNew];
            });
        }
    }, [workData]);

    // Mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // 2. FIX: Image selection logic inside transformedCardData
    const transformedCardData = useMemo(() => {
        // If we have fetched data, use it. Otherwise, use static data as fallback.
        const sourceData = cardData2.length > 0 ? cardData2 : staticWorkData.slice(0, 6);

        if (!sourceData) return []; // Safety check to prevent crash

        return sourceData.map((work) => {
            let finalImage = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=100&w=1000&auto=format&fit=crop";

            // LOGIC: Find the correct image
            if (work.media && Array.isArray(work.media) && work.media.length > 0) {
                // A. Try to find a file that is ACTUALLY an image (jpg, png, etc.)
                const imageItem = work.media.find(m => m.src && /\.(jpg|jpeg|png|webp|gif)$/i.test(m.src));

                if (imageItem) {
                    finalImage = imageItem.src;
                }
                // B. If no image found, check if the first item is a VIDEO and generate a thumbnail
                else if (work.media[0]?.src) {
                    let src = work.media[0].src;
                    // If it is a video, change extension to .jpg (Cloudinary/S3 thumbnail trick)
                    if (/\.(mp4|mov|webm|mkv)$/i.test(src)) {
                        src = src.replace(/\.(mp4|mov|webm|mkv)$/i, '.jpg');
                    }
                    finalImage = src;
                }
            } else if (work.image) {
                finalImage = work.image;
            }

            return {
                id: work._id || work.id,
                title: work.name || work.title,
                category: work.categories?.[0] || work.category || "Project",
                image: finalImage
            };
        });
    }, [cardData2]); // Depend on cardData2 so it updates when "Load More" adds items

    return (
        <section id='work' className="bg-black pt-10 pb-20 px-6 relative cursor-none">
            {/* Custom Cursor Element */}
            <motion.div
                style={{
                    left: x,
                    top: y,
                    translateX: "-50%",
                    translateY: "-50%",
                    pointerEvents: "none",
                }}
                animate={{
                    scale: hovering ? 1 : 0,
                    opacity: hovering ? 1 : 0,
                }}
                className="fixed z-[999] w-24 h-24 bg-white rounded-full flex items-center justify-center"
            >
                <span className="text-black font-bold uppercase text-sm dance tracking-tight">
                    View
                </span>
            </motion.div>

            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {transformedCardData.map((card) => (
                        <Link href={`/work-detail?id=${card.id}`}
                            key={card.id}
                            className="flex flex-col group relative"
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                        >
                            <div className="w-full h-[400px] overflow-hidden bg-neutral-900 relative">
                                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm">
                                    <span className="text-white text-[9px] md:text-[10px] uppercase tracking-[0.2em] pt font-medium">
                                        {(typeof card.category === 'object'
                                            ? card.category.name
                                            : card.category
                                        )?.replace(/-/g, ' ')}
                                    </span>
                                </div>

                                <motion.img
                                    src={card.image}
                                    alt={card.title}
                                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700`}
                                />
                            </div>

                            <div className="bg-white py-5 px-4 text-center">
                                <h3 className="text-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tighter leading-none font-bebas">
                                    {card.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
                {hasNextPage && (
                    <div className="mt-8 text-center">
                        <button
                            disabled={loading}
                            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                            className="text-white border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
                        >
                            {loading ? "Loading..." : "Load more"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cards;
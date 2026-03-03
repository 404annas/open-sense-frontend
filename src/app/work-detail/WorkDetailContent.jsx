"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Quote, Star } from 'lucide-react'; // Added Star
import { useSearchParams } from 'next/navigation';
import ImageModal from '@/components/ImageModal';
import { useWorkDetail } from '@/hooks/useWorkDetail';
import Marquee from "react-fast-marquee"; // Ensure this package is installed

const WorkDetailContent = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { workItem, loading, error } = useWorkDetail(id);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    if (loading) {
        return (
            <section className="relative min-h-screen bg-[#F2EFE6] text-black flex flex-col items-center pt-24 pb-12 px-4 overflow-hidden font-sans">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Loading work details...</h1>
                </div>
            </section>
        );
    }

    if (error || !workItem) {
        return (
            <section className="relative min-h-screen bg-[#F2EFE6] text-black flex flex-col items-center pt-24 pb-12 px-4 overflow-hidden font-sans">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Work Not Found</h1>
                    <p className="mt-4">{error || 'The requested work item could not be found.'}</p>
                </div>
            </section>
        );
    }

    const isDrHomeFinance = workItem.name === "Such a funny life";
    const word = workItem.name.split(" ");
    const galleryImages = workItem?.media?.filter(m => m.type === "image").slice(1);

    const handleImageClick = (imageSrc, altText) => {
        setSelectedImage({ src: imageSrc, alt: altText });
        setIsModalOpen(true);
    };

    // Mock data for Dr Home Finance
    const reviews = [
        { name: "La Weekly", review: "Such a Funny Life offers an alternative angle on the plight of the struggling stand-up comedian.", rating: 5, count: "1.2k", img: "https://i.pravatar.cc/150?u=1", link: "https://www.laweekly.com/movie-pick" },
        { name: "That Momentin", review: "Such a Funny Life is a rare indie gem that deserves attention. Highly recommended.", rating: 5, count: "850", img: "/review2.png", link: "https://www.thatmomentin.com/such-a-funny-life-review" },
        { name: "Cinema Smack", review: "What writer/director Oliver Mann strives to achieve with Such a Funny Life is quite impressive.", rating: 4, count: "420", img: "https://i.pravatar.cc/150?u=3", link: "http://www.cinemasmack.com/indie-film-review-such-a-funny-life" },
        { name: "TRAINWRECK'D SOCIETY", review: "Gonzalo Trigueros gives an amazing performance in a beautifully shot, delightful story that had so much promise, and completely lived up to the hype I was given around this brilliant film.", rating: 5, count: "960", img: "/review4.jpeg", link: "https://trainwreckdsociety.com/2019/09/22/sunday-matinee-such-a-funny-life-film/" },
    ];

    const drHomeImages = [
        "/funnyLife1.jpg",
        "/funnyLife2.jpg",
        "/funnyLife5.jpg",
        "/funnyLife4.jpg",
        "/funnyLife6.jpg",
        "/funnyLife7.jpg",
        "/funnyLife8.jpg",
        "/funnyLife9.jpg",
        "/funnyLife10.jpg",
    ];

    return (
        <section className="relative min-h-screen bg-[#F2EFE6] text-black flex flex-col items-center pt-24 pb-10 px-4 overflow-hidden font-sans">
            <header className="flex flex-col items-center text-center space-y-0 mb-10">
                <h2 className="text-5xl sm:text-6xl md:text-7xl flex items-center gap-5 font-black uppercase leading-16" style={{ fontFamily: "bebas neue" }}>
                    {word.map((w, i) => (
                        <p key={i}>
                            <span className="dance">{w.charAt(0)}</span>
                            <span>{w.slice(1)}</span>
                        </p>
                    ))}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {(Array.isArray(workItem.categories) ? workItem.categories : []).map((category, index) => (
                        <span key={index} className="text-[#34484e] text-xl bg-white px-4 py-px border border-[#34484e] border-dashed" style={{ fontFamily: 'bebas neue' }}>
                            {typeof category === 'object' ? category.name : category}
                        </span>
                    ))}
                </div>
            </header>

            <div className="text-center w-full max-w-3xl mb-16">
                <p className="text-2xl md:text-3xl font-medium mb-6" style={{ fontFamily: 'bebas neue' }}>Project Overview</p>
                <p className="text-lg md:text-xl font-medium tracking-tighter" style={{ fontFamily: 'pt sans' }}>{workItem.description}</p>
            </div>

            <div className="w-full max-w-xl mb-16">
                <div className="aspect-video overflow-hidden rounded-lg bg-black shadow-xl">
                    {workItem.media && workItem.media.some(m => m.type === "iframe") ? (
                        <iframe src={workItem.media.find(m => m.type === "iframe")?.src} title={workItem.name} className="w-full h-full" allowFullScreen />
                    ) : workItem.media && workItem.media[0] ? (
                        <img src={workItem.media[0].src} alt={workItem.media[0].alt} className="w-full h-full object-cover cursor-pointer" onClick={() => handleImageClick(workItem.media[0].src, workItem.media[0].alt)} />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p>No media available</p></div>
                    )}
                </div>
            </div>

            {galleryImages && galleryImages.length > 0 && (
                <div className="w-full max-w-6xl relative mb-20">
                    <h3 className="text-3xl font-bold mb-14 text-center" style={{ fontFamily: 'bebas neue' }}>Project Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                        {galleryImages.map((media, index) => (
                            <div key={index} className="overflow-hidden rounded-lg cursor-pointer shadow-md" onClick={() => handleImageClick(media.src, media.alt)}>
                                <img loading="lazy" src={media.src} alt={media.alt} className="w-full h-auto object-contain max-h-[420px] mx-auto transition-transform duration-500 hover:scale-105" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* DR HOME FINANCE SPECIFIC CONTENT */}
            {isDrHomeFinance && (
                <div className="w-full max-w-6xl space-y-10">

                    {/* INTERVIEWED AT */}
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-medium mb-10" style={{ fontFamily: 'bebas neue' }}>We Interviewed At :</h3>
                        <div className="flex md:flex-row flex-col justify-center items-center gap-6 sm:gap-10 md:gap-12">
                            <a href="https://www.wusa9.com/video/entertainment/television/programs/great-day-washington/such-a-funny-life-theatrical-premiere-by-maryland-native-oliver-mann/65-65643f89-2130-4460-adc3-14dd9aa8af55" target='_blank'><img loading='lazy' src="/interview1.png" alt="Wusa 90" className="h-14 md:h-18 invert hover:scale-95 transition-all duration-300" /></a>
                            <a href="https://wjla.com/news/lets-talk/local-director-tells-us-more-about-his-film-set-to-premiere-tonight" target='_blank'><img loading='lazy' src="/interview2.svg" alt="abc7 News" className="h-24 md:h-30 invert hover:scale-95 transition-all duration-300" /></a>
                        </div>
                    </div>

                    {/* REVIEWS MARQUEE */}
                    <div className="w-full overflow-hidden">
                        <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center" style={{ fontFamily: 'bebas neue' }}>Reviews :</h3>
                        <Marquee gradient={false} speed={50} className='h-[450px] md:h-[350px]'>
                            {reviews.map((rev, idx) => (
                                <a href={rev.link} target='_blank'
                                    key={idx}
                                    className="group relative bg-white mx-6 p-8 w-[320px] md:w-[500px] flex flex-col justify-between transition-all duration-500 hover:rotate-1"
                                >
                                    {/* The Sleek Background Frame - Offset for a modern "Living" look */}
                                    <div className="absolute inset-0 border-2 border-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300 -z-10"></div>
                                    <div className="absolute inset-0 bg-white border border-black -z-0"></div>

                                    <div className="relative z-10">
                                        {/* Top Section: Bold & Different */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex gap-4 items-center">
                                                <div className="relative">
                                                    <img
                                                        loading='lazy'
                                                        src={rev.img}
                                                        alt={rev.name}
                                                        className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full"
                                                    />
                                                    <span className="absolute -top-3 -left-3 dance text-2xl text-black -rotate-12">
                                                        Real
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-2xl md:text-3xl leading-none uppercase" style={{ fontFamily: 'bebas neue' }}>
                                                        {rev.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                className={i < rev.rating ? "text-yellow-800" : "text-gray-200"}
                                                                fill={i < rev.rating ? "yellow" : "none"}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10px] pt font-bold uppercase tracking-widest text-gray-700">Verified</p>
                                                <p className="dance font-bold text-base md:text-lg leading-none">{rev.count}</p>
                                            </div>
                                        </div>

                                        {/* The Review Text: Large and Impactful */}
                                        <div className="relative">
                                            <Quote className="absolute -left-2 -top-4 w-10 h-10 text-black/5 -z-10" />
                                            <p className="text-base sm:text-lg md:text-xl pt font-medium leading-tight tracking-tight text-black/80">
                                                ❝{rev.review}❞
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Accent: Modern Sleekness */}
                                    <div className="relative z-10 mt-6 flex justify-end">
                                        <span className="text-[10px] sm:text-xs dance font-black uppercase tracking-widest bg-black text-white px-3 py-1">
                                            Customer Story 0{idx + 1}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </Marquee>
                    </div>

                    {/* PICTURES GRID LAYOUT */}
                    <div className="pb-10">
                        <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center uppercase" style={{ fontFamily: 'bebas neue' }}>Pictures :</h3>
                        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                            {drHomeImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    // Added cursor-pointer and onClick handler below
                                    onClick={() => handleImageClick(img, `Dr Home Detail ${idx + 1}`)}
                                    className={`overflow-hidden rounded-xl shadow-lg border-4 border-white cursor-pointer
                    ${idx === 3 ? "w-full flex-shrink-0 order-first mb-2 h-auto lg:h-60" : "w-full md:w-[31%] flex-grow"}
                `}
                                >
                                    <img
                                        src={img}
                                        alt="Dr Home"
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedImage && (
                <ImageModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    imageSrc={selectedImage.src}
                    altText={selectedImage.alt}
                />
            )}
        </section>
    );
};

export default WorkDetailContent;
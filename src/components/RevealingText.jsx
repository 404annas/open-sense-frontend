"use client";
import React, { useRef, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Cards from './Cards';
import VideosSection from './VideosSection';

const sentence = [
    { type: 'word', text: 'WE' },
    { type: 'word', text: 'TAKE' },
    { type: 'image', src: 'https://cdn.prod.website-files.com/68adce835b19760dc2e731a9/68adce835b19760dc2e731d9_inspirex4.webp' },
    { type: 'word', text: 'On', highlightFirst: true },
    { type: 'word', text: 'NEW' },
    { type: 'word', text: 'START' },
    { type: 'word', text: 'UP' },
    { type: 'word', text: 'BRANDS' },
    { type: 'word', text: 'OR' },
    { type: 'word', text: 'BRANDS', highlightFirst: true },
    { type: 'image', src: '/reveal3.jpg' },
    { type: 'word', text: 'THAT' },
    { type: 'word', text: 'NEED' },
    { type: 'word', text: 'A' },
    { type: 'word', text: 'NEW' },
    { type: 'image', src: 'https://cdn.prod.website-files.com/68adce835b19760dc2e731a9/68adce835b19760dc2e731da_67345a1f073c74c258bb51af_66c1a07abffcf3768dda2aad_5908994290938397304_11zon-p-500.webp' },
    { type: 'word', text: 'FEEL.', highlightFirst: true },
    { type: 'word', text: 'NO' },
    { type: 'word', text: 'SECTOR' },
    { type: 'word', text: 'IS' },
    { type: 'word', text: 'OUT' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1648999897104-ae39fefd17a7?w=1000&auto=format&fit=crop&q=100' },
    { type: 'word', text: 'OF' },
    { type: 'word', text: 'BOUNDS', highlightFirst: true },
    { type: 'word', text: 'FOR' },
    { type: 'word', text: 'US' },
    { type: 'word', text: 'TO' },
    { type: 'word', text: 'TELL' },
    { type: 'word', text: 'THEIR' },
    { type: 'word', text: 'STORY.', highlightFirst: true },
];

const RevealingText = () => {
    const container = useRef(null);
    const [selectedImg, setSelectedImg] = useState(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const totalSteps = useMemo(() => {
        return sentence.reduce((acc, item) => {
            return acc + (item.type === 'word' ? item.text.length : 1);
        }, 0);
    }, []);

    let stepCounter = 0;

    return (
        <div className="relative bg-black text-white w-full">
            {/* POPUP MODAL */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 250, damping: 25 }}
                            className="relative w-[90vw] md:w-[80vw] h-[50vh] md:h-[70vh] overflow-hidden rounded-3xl shadow-2xl object-cover"
                        >
                            <img
                            loading='lazy'
                                src={selectedImg}
                                alt="zoomed-visual"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section ref={container} className="relative w-full h-[600vh]">
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-10">
                    <div className="flex flex-wrap items-center justify-center text-center gap-x-2 max-w-[1400px] gap-y-4">
                        {sentence.map((item, idx) => {
                            if (item.type === 'word') {
                                const chars = item.text.split("");
                                return (
                                    <span key={idx} className="inline-block whitespace-nowrap mr-[0.3em] flex-shrink-0">
                                        {chars.map((char, charIdx) => {
                                            const start = stepCounter / totalSteps;
                                            const end = (stepCounter + 1) / totalSteps;
                                            stepCounter++;

                                            return (
                                                <Character
                                                    key={charIdx}
                                                    char={char}
                                                    progress={scrollYProgress}
                                                    range={[start, end]}
                                                    isAccent={item.highlightFirst && charIdx === 0}
                                                />
                                            );
                                        })}
                                    </span>
                                );
                            } else {
                                const start = stepCounter / totalSteps;
                                const end = (stepCounter + 1) / totalSteps;
                                stepCounter++;

                                return (
                                    <InlineImage
                                        key={idx}
                                        src={item.src}
                                        progress={scrollYProgress}
                                        range={[start, end]}
                                        onExpand={() => setSelectedImg(item.src)}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </section>
            <VideosSection />
            <Cards />
        </div>
    );
};

const Character = ({ char, progress, range, isAccent }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);

    if (isAccent) {
        return (
            <motion.span
                style={{ opacity }}
                className="text-[14vw] md:text-[145px] italic uppercase leading-[0] translate-y-[0.1em] inline-block mr-3 font-light dance"
            >
                {char}
            </motion.span>
        );
    }

    const isPeriod = char === '.';

    return (
        <motion.span
            style={{ opacity }}
            className={`text-[9vw] md:text-[70px] pt font-bold uppercase tracking-tighter leading-none inline-block ${isPeriod ? "ml-1 translate-y-[-0.05em]" : ""}`}
        >
            {char}
        </motion.span>
    );
};

const InlineImage = ({ src, progress, range, onExpand }) => {
    const widthRaw = useTransform(progress, range, ["0vw", "14vw"]);
    const width = useSpring(widthRaw, { stiffness: 45, damping: 20, mass: 0.8 });
    const opacity = useTransform(progress, range, [0, 1]);
    const scale = useTransform(progress, range, [0.4, 1]);

    return (
        <motion.div
            style={{ width, opacity, scale }}
            onClick={onExpand}
            className="inline-flex items-center justify-center h-[7vw] md:h-[100px] rounded-2xl md:rounded-[45px] overflow-hidden mx-2 bg-neutral-900 flex-shrink-0 cursor-zoom-in group active:scale-95 transition-transform"
        >
            <img src={src} alt="visual" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </motion.div>
    );
};

export default RevealingText;
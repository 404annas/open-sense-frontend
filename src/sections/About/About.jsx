"use client";

import { motion } from "framer-motion";
import {
    FaTelegramPlane,
    FaPhoneAlt,
    FaWhatsapp,
    FaEnvelope,
} from "react-icons/fa";

export default function About() {
    return (
        <section className="relative h-screen w-full overflow-hidden text-white">

            {/* BACKGROUND IMAGE */}
            <div
                className="absolute inset-0 bg-cover bg-top"
                style={{
                    backgroundImage:
                        "url(https://cdn.prod.website-files.com/68ff2c0e4147b55d6b6221ca/69297f4b29e41ea4f3dbb108_75d5e6f53bd985f0c7fceaca9754ff53c5da4225_11zon.webp)",
                }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 z-20 flex gap-32 justify-center items-center pt-40" >
                <img src="workbg.jfif" alt="" className="w-56" />
                <img src="workbg.jfif" alt="" className="w-56" />
                <img src="workbg.jfif" alt="" className="w-64" />
                <img src="workbg.jfif" alt="" className="w-56" />
                <img src="workbg.jfif" alt="" className="w-56" />

            </div>

            {/* LEFT SOCIAL BAR */}


            {/* TOP RIGHT TEXT */}
            <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}

                className="absolute top-16 right-16 max-w-md z-20 text-right hidden md:block"
            >
                <p className="text-2xl  " style={{ fontFamily: 'pt sans' }}>
                    We take on new start up brands or brands that need a new feel.
                    No sector is out of bounds for us to tell their story.
                </p>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                style={{ fontFamily: 'pt sans' }}
                className="absolute top-12 left-12 z-20 text-[18vw] md:text-[12vw] font-extrabold leading-none"
            >
                Work
            </motion.h1>
        </section>
    );
}

/* SOCIAL ICON COMPONENT */
function SocialIcon({ children, color }) {
    return (
        <div
            className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition`}
        >
            {children}
        </div>
    );
}

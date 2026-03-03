"use client";
import React, { useState } from "react";
import { ArrowRight, ChevronDown, Check, Loader2 } from "lucide-react";
import { sendEmail } from "@/utils/email";

const ContactUs = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState("What Do You Need");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");


    const options = [
        "General Inquiry",
        "Creative Direction",
        "Film Production",
    ];


    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) { setError("Email is required"); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { setError("Please enter a valid email address"); return; }
        setError("");
        setIsLoading(true);
        try {
            await sendEmail({ email, topic: selectedOption });
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail("");
                setSelectedOption("What Do You Need");
            }, 3000);
        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative w-full min-h-screen overflow-hidden max-lg:bg-none "

        >
            <img src="/funny-mobile.png" alt="" className="inset-0  absolute object-cover w-full h-full xl:hidden " />
            <img src="/funny1.jpg" alt="" className="inset-0 max-xl:hidden absolute object-cover w-full h-full " />

            {/* GLOBAL OVERLAY */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* CONTENT */}
            <div className="relative z-10 w-full min-h-screen lg:pt-16 flex flex-col lg:flex-row">

                {/* LEFT SIDE */}
                <div className="w-full lg:w-[68%] text-white p-6  xl:px-16 flex flex-col min-h-full">
                    <div className="flex-grow h-screen flex flex-col justify-end lg:justify-center max-lg:items-center relative max-lg:pb-20 ">

                        {/* WRAPPER FOR TEXT + ARROW */}

                        <p className="italic max-lg:absolute max-lg:top-4  text-4xl dance text-white flex flex-col lg:flex-row lg:mb-8 underline-offset-4 items-center hover:underline gap-3 group max-lg:text-center  max-lg:translate-0 max-xl:-translate-y-20 " alt="" >
                            Creative Director -Oliver Mann  <ArrowRight className="group-hover:translate-x-3 max-lg:rotate-90 transition-all duration-150" /> </p>
                        <h1
                            className="text-[14vw] lg:text-9xl font-black uppercase"
                            style={{ fontFamily: "var(--font-bebas)" }}
                        >
                            Contact Us
                        </h1>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="w-full max-w-md">
                            <div className="w-full relative mb-6">
                                <label className="block text-[10px] lg:text-[12px] font-bold tracking-[0.2em] uppercase mb-6 opacity-90 font-serif">
                                    info@opensenseproductions.com
                                </label>

                                <div className="flex items-end gap-4">
                                    <div
                                        className="flex-1 border-b-[1.5px] border-white/80 pb-3 flex justify-between items-center cursor-pointer"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <span className="text-lg lg:text-2xl font-medium opacity-90 font-serif">
                                            {selectedOption}
                                        </span>
                                        <ChevronDown size={24} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                    </div>
                                </div>


                                {isOpen && (
                                    <div className="absolute z-20 mt-2 w-full bg-black/90 border border-white/20">
                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 hover:bg-white/10 cursor-pointer font-serif"
                                                onClick={() => handleSelect(option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-[10px] lg:text-[12px] font-bold tracking-[0.2em] uppercase mb-6 opacity-90 font-serif">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="w-full border-b-[1.5px] border-white/80 bg-transparent pb-3 text-white placeholder-white/60 focus:outline-none focus:border-white font-serif"
                                    disabled={isLoading || isSubmitted}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    disabled={isLoading || isSubmitted}
                                    className={`flex items-center justify-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-wide transition ${isLoading || isSubmitted ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    style={{ fontFamily: "var(--font-bebas)" }}
                                >
                                    {isLoading ? (
                                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                                    ) : isSubmitted ? (
                                        <><Check className="h-4 w-4" /> Sent!</>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>

                                {error && (
                                    <p className="text-red-400 text-sm ml-4 font-serif">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
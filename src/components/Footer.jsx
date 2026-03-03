import React from "react";

const Footer = () => {
    return (
        <div className="relative bg-black text-white py-10 sm:py-6 px-4 uppercase text-center font-bold">
            <h1 className="flex items-center justify-center pb-4 text-3xl sm:text-6xl md:text-8xl">
                <span className="dance text-[60px] sm:text-[130px] md:text-[150px] leading-none ">
                    O
                </span>
                <span className="pt z-10">pen</span>

                {/* Image right after "Say" */}
                <img
                    loading="lazy"
                    className="w-20 sm:w-30 md:w-35 object-cover rounded-md sm:rounded-2xl h-14 sm:h-25 md:h-20 inline-block -translate-x-2 sm:-translate-x-4 md:-translate-x-8"
                    src="/reveal2.jpg"
                    alt="Image"
                />

                {/* Dancing Script H */}

                <span className="dance text-[60px] sm:text-[130px] md:text-[150px] leading-none -translate-x-0 md:-translate-x-8">
                    S
                </span>

                <span className="-translate-x-0 md:-translate-x-8">ense</span>
            </h1>

            <p className="uppercase text-lg sm:text-2xl  " style={{ fontFamily: "babas neue" }}>
                A Film Production Company & Creative Agency
            </p>
        </div>
    );
};

export default Footer;
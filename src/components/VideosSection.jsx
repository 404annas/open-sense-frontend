import React from 'react';

const VideosSection = () => {
    return (
        <section className="relative bg-black min-h-screen pt-20 pb-10 px-4 md:px-8 flex flex-col items-center">

            {/* --- Text Content Section --- */}
            <div className="max-w-[1000px] mx-auto text-center mb-16">
                <h2 className="text-white text-4xl md:text-[3.5rem] font-bold mb-6">
                    Snapchat Discovery Shows
                </h2>
                <p className="text-white text-base md:text-lg leading-normal px-4 md:px-0 font-medium opacity-90 tracking-wide">
                    Daily Vertex LLC has been working closely with Snap on their Discover program and has successfully launched numerous unique shows. We facilitate the entire process, from pitching a show to editing and optimizing your existing content to make it suitable for Snap. Our deep understanding of what resonates on the platform in terms of content and edits is reflected in our impressive monthly results. We consistently generate substantial monthly views, turning this into a highly lucrative new revenue stream for our creators. Our expertise in the Snap ecosystem allows us to maximize the potential of your content, ensuring it reaches and engages the right audience on this dynamic platform.
                </p>
            </div>

            {/* --- Cards Section --- */}
            <div className="flex flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-6xl mt-4">

                {/* Left Card (Smaller) */}
                <div
                    className="w-[120px] h-[180px] sm:w-[220px] sm:h-[340px] md:w-[260px] md:h-[400px] rounded-2xl border-[5px] border-[#6b21a8] bg-gradient-to-b from-gray-900 to-[#0a0a0a] shadow-[0_0_15px_rgba(107,33,168,0.3)] transition-transform hover:scale-105 cursor-pointer duration-300"
                >
                    {/* Add your image/video for Left Card here */}
                </div>

                {/* Center Card (Larger) */}
                <div
                    className="w-[160px] h-[240px] sm:w-[280px] sm:h-[420px] md:w-[320px] md:h-[500px] rounded-2xl border-[5px] border-[#8b5cf6] bg-black relative overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.4)] z-10 transition-transform hover:scale-105 cursor-pointer duration-300"
                >
                    {/* Mimicking the subtle gold design from your screenshot's center card */}
                    <div className="absolute top-0 w-full h-[30%] bg-gradient-to-b from-yellow-600/20 to-transparent"></div>
                    <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-yellow-600/30 to-transparent flex justify-center items-end pb-8">
                        {/* Fake abstract waves at bottom */}
                        <div className="w-24 h-24 border-b-[3px] border-yellow-500/50 rounded-full blur-[1px]"></div>
                    </div>
                    {/* Add your main center image/video here */}
                </div>

                {/* Right Card (Smaller - Light textured look from screenshot) */}
                <div
                    className="w-[120px] h-[180px] sm:w-[220px] sm:h-[340px] md:w-[260px] md:h-[400px] rounded-2xl border-[5px] border-[#6b21a8] bg-[#e5e5e5] shadow-[0_0_15px_rgba(107,33,168,0.3)] transition-transform hover:scale-105 cursor-pointer relative overflow-hidden duration-300"
                >
                    {/* Mimicking the static/noise texture seen in the right card */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    {/* Add your image/video for Right Card here */}
                </div>

            </div>
        </section>
    );
}

export default VideosSection;
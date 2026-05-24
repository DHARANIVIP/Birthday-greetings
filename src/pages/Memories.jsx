import React from 'react'
import { Link } from 'react-router'
import { GiCrossMark } from 'react-icons/gi'

const MEMORIES = [
    { src: '/dh1.jpeg', caption: 'Brother 💙', rotate: '-rotate-3', objectFit: 'cover', objectPosition: 'center 30%' },
    { src: '/dh2.jpeg', caption: 'Cute Hime ✨', rotate: 'rotate-2', objectFit: 'cover', objectPosition: 'center 20%' },
    { src: '/dh3.jpeg', caption: 'School Days 🎒', rotate: '-rotate-2', objectFit: 'cover', objectPosition: 'center 30%' },
    { src: '/dh4.jpeg', caption: 'Precious Group ✨', rotate: 'rotate-3', objectFit: 'contain', objectPosition: 'center' },
    { src: '/dh5.jpeg', caption: 'Ethnic Grace 🌸', rotate: '-rotate-1', objectFit: 'cover', objectPosition: 'center 15%' },
    { src: '/dh6.jpeg', caption: 'Baby Brother 🍼', rotate: 'rotate-3', objectFit: 'cover', objectPosition: 'center 15%' },
    { src: '/dh7.jpeg', caption: "Mother's Love 💖", rotate: '-rotate-3', objectFit: 'cover', objectPosition: 'center 45%' },
    { src: '/dh8.jpeg', caption: 'Baby Hime 🎀', rotate: 'rotate-2', objectFit: 'cover', objectPosition: 'center 30%' },
    { src: '/dh9.jpeg', caption: 'Temple Visit 🛕', rotate: '-rotate-2', objectFit: 'cover', objectPosition: '25% 35%' },
    { src: '/dh10.jpeg', caption: 'Serene Moments 🌷', rotate: 'rotate-1', objectFit: 'cover', objectPosition: 'center 20%' },
    { src: '/dh11.jpeg', caption: 'Mirror Selfie 🤳', rotate: '-rotate-3', objectFit: 'cover', objectPosition: 'center 25%' },
    { src: '/dh12.jpeg', caption: 'Pongal Vibes 🍯', rotate: 'rotate-2', objectFit: 'cover', objectPosition: 'center 15%' },
    { src: '/dh13.jpeg', caption: 'Elegant Saree 🌟', rotate: '-rotate-1', objectFit: 'cover', objectPosition: 'center 35%' },
    { src: '/dh14.jpeg', caption: "Grandfather's Blessing 💖", rotate: 'rotate-3', objectFit: 'cover', objectPosition: 'center 30%' },
    { src: '/dh15.jpeg', caption: 'Little Hime 🎒', rotate: '-rotate-2', objectFit: 'cover', objectPosition: 'center 35%' },
    { src: '/dh16.png', caption: 'Life at 8:41 AM 🤍', rotate: 'rotate-1', objectFit: 'cover', objectPosition: 'center 25%' }
];

const Memories = () => {
    return (
        <main className="min-h-screen w-full overflow-y-auto pt-24 pb-12 px-6 flex flex-col items-center relative" 
              style={{
                  background: 'linear-gradient(135deg, #feecea 0%, #fecfef 50%, #f7ccd2 100%)',
                  fontFamily: "'Outfit', sans-serif"
              }}>
            
            {/* Close Cross Button */}
            <Link 
                to="/" 
                className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center justify-center bg-white/80 hover:bg-pink-100 text-pink-600 w-11 h-11 rounded-full border border-pink-200 shadow-md hover:scale-110 hover:rotate-90 transition-all duration-300 z-30"
                title="Back to Home"
            >
                <GiCrossMark size={18} />
            </Link>

            {/* Title Header */}
            <h1 className="font-coiny text-[#8B0000] text-3xl md:text-5xl mt-8 md:mt-12 mb-14 text-center uppercase tracking-widest"
                style={{ textShadow: '3px 3px 0px rgba(255, 255, 255, 0.8), 5px 5px 0px rgba(139, 0, 0, 0.05)' }}>
                🌸 Hime's Memories Wall 🌸
            </h1>

            {/* Polaroid Grid */}
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center max-w-5xl w-full z-10 mb-10">
                {MEMORIES.map((m, idx) => (
                    <div 
                        key={idx} 
                        className={`bg-[#fdfcf7] p-4 pb-6 rounded-xl shadow-2xl border border-[#e5dec9] w-[180px] md:w-[210px] flex flex-col items-center relative ${m.rotate} hover:scale-105 hover:rotate-0 transition-all duration-300 cursor-pointer`}
                    >
                        <span className="absolute -top-4 text-3xl select-none filter drop-shadow">📌</span>
                        <img 
                            src={m.src} 
                            alt={m.caption} 
                            className="w-full h-[140px] md:h-[165px] rounded-md border border-gray-200/50 bg-transparent"
                            style={{
                                objectFit: m.objectFit,
                                objectPosition: m.objectPosition
                            }}
                        />
                        <span className="font-dancingScript text-pink-600 font-bold text-xl md:text-2xl mt-4 text-center tracking-wide">
                            {m.caption}
                        </span>
                    </div>
                ))}
            </div>
            
            {/* Cute stickers in corners */}
            <div className="absolute bottom-6 left-6 text-4xl select-none filter drop-shadow opacity-60">🧸</div>
            <div className="absolute bottom-6 right-6 text-4xl select-none filter drop-shadow opacity-60">🎀</div>
        </main>
    );
};

export default Memories;

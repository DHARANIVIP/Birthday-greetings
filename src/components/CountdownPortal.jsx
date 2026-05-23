import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import mewmew from '../assets/mewmew.gif';
import ribbonImg from '../assets/ribbonImg.png';

const CUTE_ITEMS = [
    { emoji: '🧸', size: 'text-2xl md:text-3xl' },
    { emoji: '🎀', size: 'text-3xl md:text-4xl' },
    { emoji: '🧁', size: 'text-2xl md:text-3xl' },
    { emoji: '🌸', size: 'text-xl md:text-2xl' },
    { emoji: '🎈', size: 'text-3xl md:text-4xl' },
    { emoji: '🐱', size: 'text-2xl md:text-3xl' },
    { emoji: '💖', size: 'text-2xl md:text-3xl' },
    { emoji: '🍭', size: 'text-2xl md:text-3xl' },
    { emoji: '⭐', size: 'text-lg md:text-xl' },
    { emoji: '🌷', size: 'text-2xl md:text-3xl' },
    { emoji: '🍬', size: 'text-xl md:text-2xl' },
    { emoji: '🐶', size: 'text-2xl md:text-3xl' },
    { emoji: '🌈', size: 'text-3xl md:text-4xl' },
    { emoji: '🍓', size: 'text-2xl md:text-3xl' },
    { emoji: '🧸', size: 'text-2xl md:text-3xl' },
    { emoji: '🎀', size: 'text-3xl md:text-4xl' }
];

const CountdownPortal = ({ onUnlock }) => {
    const calculateTimeLeft = () => {
        const birthdayDate = new Date('2026-05-25T00:00:00+05:30'); // Next birthday
        const difference = +birthdayDate - +new Date();
        
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [floatingParticles, setFloatingParticles] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            const time = calculateTimeLeft();
            setTimeLeft(time);
            
            if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
                clearInterval(timer);
                onUnlock();
            }
        }, 1000);

        // Generate cute floating background particles
        const particles = Array.from({ length: 22 }).map((_, i) => {
            const template = CUTE_ITEMS[i % CUTE_ITEMS.length];
            return {
                id: i,
                emoji: template.emoji,
                size: template.size,
                x: Math.random() * 90 + 5, // Keep away from extreme edges
                y: 100 + Math.random() * 15, // Start below screen
                delay: Math.random() * 8,
                duration: 12 + Math.random() * 15,
                scale: 0.6 + Math.random() * 0.6,
                rotate: Math.random() * 360,
            };
        });
        setFloatingParticles(particles);

        return () => clearInterval(timer);
    }, []);

    // May 2007 grid calculation: 1st was Tuesday, 31 days
    // Empty spots: 2 (Sunday, Monday)
    const calendarDays = [
        null, null, // Sun, Mon
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];

    const countdownItems = [
        { label: 'Days', value: timeLeft.days, emoji: '🧸', color: 'from-[#ffdce3] to-[#ffb3c1] border-[#ffa6c9]/50 text-[#8B0000]', delay: 0 },
        { label: 'Hours', value: timeLeft.hours, emoji: '🧁', color: 'from-[#ffe8d6] to-[#ffcaa4] border-[#ffa6c9]/50 text-[#8b6a60]', delay: 0.15 },
        { label: 'Mins', value: timeLeft.minutes, emoji: '🎀', color: 'from-[#e8dbfc] to-[#d8bbf7] border-[#b8c0ff]/50 text-[#5c3c8c]', delay: 0.3 },
        { label: 'Secs', value: timeLeft.seconds, emoji: '🌟', color: 'from-[#fefae0] to-[#e6ecbe] border-[#ccd5ae]/50 text-[#4c6a4c]', delay: 0.45 }
    ];

    return (
        <main className="fixed inset-0 w-full h-full overflow-y-auto flex flex-col items-center justify-start md:justify-center py-10 md:py-16 px-4" 
              style={{
                  background: 'linear-gradient(135deg, #feecea 0%, #fecfef 50%, #f7ccd2 100%)',
                  fontFamily: "'Outfit', sans-serif"
              }}>
            
            {/* Self-contained animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes handDrawCircle {
                    from { stroke-dasharray: 250; stroke-dashoffset: 250; }
                    to { stroke-dashoffset: 0; }
                }
                .marker-circle {
                    stroke-dasharray: 250;
                    stroke-dashoffset: 250;
                    animation: handDrawCircle 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    animation-delay: 0.8s;
                }
            `}} />

            {/* Ambient Cute Floating Orbs */}
            <div className="absolute w-[250px] h-[250px] rounded-full bg-white/40 blur-[75px] top-[10%] left-[15%] pointer-events-none animate-pulse"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-300/30 blur-[85px] bottom-[10%] right-[15%] pointer-events-none animate-pulse" style={{ animationDelay: '1.2s' }}></div>

            {/* Dynamic Floating Emojis Background */}
            {floatingParticles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute pointer-events-none select-none ${p.size}`}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: 0.25,
                    }}
                    animate={{
                        y: '-130vh',
                        x: [
                            '0%', 
                            `${Math.sin(p.id) * 40}px`, 
                            `${Math.sin(p.id + 1) * -40}px`, 
                            '0%'
                        ],
                        rotate: p.rotate + 360,
                        scale: [p.scale, p.scale * 1.1, p.scale],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'linear',
                    }}
                >
                    {p.emoji}
                </motion.div>
            ))}

            {/* Header: Title with Hime's Name */}
            <motion.h1 
                className="md:absolute md:top-8 lg:top-14 left-0 right-0 text-[#8B0000] text-3xl md:text-5xl font-extrabold tracking-wider mb-10 md:mb-0 text-center uppercase font-coiny z-20"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
                style={{ 
                    textShadow: '3px 3px 0px rgba(255, 255, 255, 0.8), 5px 5px 0px rgba(139, 0, 0, 0.1)'
                }}
            >
                Count Down to Hime's Special Day ✨
            </motion.h1> 
 
            {/* Main Spacing Layout Container */}
            <div className="flex flex-col items-center gap-8 md:gap-12 z-10 max-w-4xl w-full">
                
                {/* Calendar & Countdown Box Side-by-Side */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-center w-full">
                    
                    {/* 1. REAL-WORLD CALENDAR SHEET WITH RIBBON AND PEEKING KITTEN */}
                    <div className="relative">
                        {/* Peeking Kitten mewmew.gif */}
                        <motion.img 
                            src={mewmew} 
                            alt="cute kitten"
                            className="absolute -bottom-6 -left-8 w-24 h-24 z-[-1] object-contain pointer-events-none"
                            initial={{ rotate: -15, scale: 0.9 }}
                            animate={{ 
                                y: [0, -6, 0],
                                rotate: [-15, -10, -15]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Top Ribbon RibbonImg */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-24 z-20 pointer-events-none">
                            <img src={ribbonImg} alt="Cute Pink Ribbon" className="w-full drop-shadow-md" />
                        </div>

                        {/* Sticker Decorations */}
                        <div className="absolute -top-4 -right-4 text-3xl rotate-12 select-none filter drop-shadow z-20">🌸</div>
                        <div className="absolute bottom-8 -right-6 text-3xl -rotate-12 select-none filter drop-shadow z-20">💖</div>

                        <motion.div 
                            className="w-[300px] bg-[#fdfcf7] text-[#2c1a04] rounded-2xl shadow-2xl relative flex flex-col pt-8 pb-4 px-4 border border-[#e5dec9] cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: -1 }}
                            whileHover={{ rotate: 1, scale: 1.03 }}
                            transition={{ type: 'spring', duration: 1 }}
                        >
                            {/* Spiral Binding Rings */}
                            <div className="absolute -top-3 left-14 w-5 h-8 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600 rounded-full border border-gray-500/30 shadow-md"></div>
                            <div className="absolute -top-3 right-14 w-5 h-8 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-600 rounded-full border border-gray-500/30 shadow-md"></div>

                            {/* Calendar Header */}
                            <div className="text-center border-b border-[#e5dec9] pb-3 mb-3">
                                <span className="text-[#a52a2a] text-xl font-bold tracking-widest block uppercase font-mono">MAY 2007</span>
                            </div>

                            {/* Weekdays Headers */}
                            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
                                <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center font-mono font-medium text-sm">
                                {calendarDays.map((day, idx) => {
                                    if (day === null) {
                                        return <div key={`empty-${idx}`} className="h-7"></div>;
                                    }
                                    if (day === 25) {
                                        return (
                                            <div key={day} className="h-7 relative flex justify-center items-center font-bold text-red-700">
                                                <span>25</span>
                                                {/* Highlight circle */}
                                                <svg className="absolute -inset-1 w-9 h-9 text-red-500 pointer-events-none z-10" viewBox="0 0 100 100">
                                                    <path 
                                                        d="M 50 12 C 25 12, 10 32, 18 58 C 22 75, 65 88, 82 68 C 95 48, 75 14, 46 16" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="5" 
                                                        strokeLinecap="round" 
                                                        className="marker-circle" 
                                                    />
                                                </svg>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={day} className="h-7 flex justify-center items-center text-gray-700 hover:text-red-500 transition-colors duration-200">
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Birthday Note Label */}
                            <div className="text-center mt-5 pt-3 border-t border-dashed border-gray-300">
                                <span className="text-[#a52a2a] font-bold text-2xl font-dancingScript block">
                                    Hime's 19th Birthday! 🎂
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. CUTE BOBBING PASTEL COUNTDOWN CARDS */}
                    <div className="flex gap-3 md:gap-4 justify-center items-center">
                        {countdownItems.map((item) => (
                            <motion.div
                                key={item.label}
                                className={`w-[75px] h-[105px] md:w-[95px] md:h-[130px] flex flex-col justify-between items-center p-3 rounded-2xl border-2 bg-gradient-to-br ${item.color} shadow-xl relative`}
                                initial={{ y: 0 }}
                                animate={{ y: [-5, 5, -5] }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: item.delay
                                }}
                                whileHover={{ scale: 1.05, y: -8 }}
                            >
                                {/* Top Floating Emoji Tag */}
                                <span className="absolute -top-4.5 left-1/2 -translate-x-1/2 text-2xl filter drop-shadow-md select-none">
                                    {item.emoji}
                                </span>
                                
                                <div className="flex-1 flex items-center justify-center mt-3 w-full bg-white/70 rounded-xl py-1 md:py-2 px-1 shadow-inner">
                                    <span className="text-3xl md:text-5xl font-extrabold font-mono tracking-tighter">
                                        {String(item.value).padStart(2, '0')}
                                    </span>
                                </div>
                                <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-wider mt-1 opacity-90">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* 3. ALIGNED ENTER BUTTON CENTERED BELOW WITH SPARKLE AND HOVER POP */}
                <motion.button 
                    className="relative font-sriracha tracking-wide bg-gradient-to-r from-[#ff6b8b] to-[#ff477e] hover:from-[#ff477e] hover:to-[#ff6b8b] text-white font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 text-xl border-4 border-white/50 cursor-pointer overflow-hidden group mt-4"
                    style={{ 
                        boxShadow: '0 10px 30px rgba(255, 71, 126, 0.45)',
                    }}
                    whileHover={{ 
                        scale: 1.08,
                        rotate: [0, -1.5, 1.5, -1.5, 1.5, 0],
                        transition: { duration: 0.4 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onUnlock}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Enter Birthday Surprises 
                        <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            💖
                        </motion.span>
                    </span>
                    {/* Cute shining ray sweep */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </motion.button>

            </div>
        </main>
    );
};

export default CountdownPortal;


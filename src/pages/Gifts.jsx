import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { GiCrossMark } from 'react-icons/gi';
import { FaBirthdayCake, FaVolumeUp } from 'react-icons/fa';
import './Gifts.css';

const Gifts = () => {
    // Page states
    const [activeModal, setActiveModal] = useState(null); // 'cake', 'diary', 'collage'
    const [howlActive, setHowlActive] = useState(false);
    const [confetti, setConfetti] = useState([]);
    
    // Gift 1: interactive states
    const [cakeCut, setCakeCut] = useState(false);
    const [slicing, setSlicing] = useState(false);

    // Diary & Collage floating elements
    const [letterHearts, setLetterHearts] = useState([]);

    // Confetti generator
    const triggerConfetti = () => {
        const tempConfetti = [];
        const colors = ['#ff5e6c', '#ffd700', '#38bdf8', '#a855f7', '#06b6d4', '#facc15'];
        for (let i = 0; i < 60; i++) {
            tempConfetti.push({
                id: Math.random(),
                left: Math.random() * 100, // percentage
                delay: Math.random() * 0.8, // seconds
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 6, // size in px
                rotate: Math.random() * 360
            });
        }
        setConfetti(tempConfetti);
        setTimeout(() => setConfetti([]), 3000);
    };

    // Howl cheerleader audio & visual bubble
    const triggerHowl = () => {
        setHowlActive(true);
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            
            const now = ctx.currentTime;
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);
            osc.frequency.linearRampToValueAtTime(330, now + 1.2);
            
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now);
            osc.stop(now + 1.2);
        } catch (e) {
            console.log("Audio feedback blocked or not supported");
        }

        setTimeout(() => {
            setHowlActive(false);
        }, 2500);
    };

    // Open Modal Handler
    const handleOpenModal = (modalName) => {
        setActiveModal(modalName);
        triggerConfetti();

        if (modalName === 'cake') {
            setCakeCut(false);
            setSlicing(false);
        }
    };

    // Synthesize swoosh sound on cake cut
    const playCutSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const now = ctx.currentTime;
            
            const bufferSize = ctx.sampleRate * 0.3;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1000, now);
            filter.frequency.exponentialRampToValueAtTime(120, now + 0.3);
            
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            
            noise.start(now);
        } catch (e) {
            console.log("Audio play error", e);
        }
    };

    // Cut cake handler
    const handleCutCake = () => {
        if (cakeCut || slicing) return;
        setSlicing(true);
        playCutSound();
        
        setTimeout(() => {
            setCakeCut(true);
            setSlicing(false);
            triggerConfetti();
        }, 400);
    };

    // Floating heart spawner inside active modals
    useEffect(() => {
        let interval;
        if (activeModal === 'diary') {
            interval = setInterval(() => {
                const emojis = ['💖', '🎈', '🧸', '🌸', '✨', '🤍', '👑', '🎂'];
                setLetterHearts(prev => [
                    ...prev,
                    {
                        id: Math.random(),
                        emoji: emojis[Math.floor(Math.random() * emojis.length)],
                        left: Math.random() * 85 + 5,
                        scale: Math.random() * 0.4 + 0.8
                    }
                ]);
            }, 750);
        } else if (activeModal === 'collage') {
            interval = setInterval(() => {
                const emojis = ['❤️', '💖', '💕', '🌹', '✨', '👩‍❤️‍👩', '🫶'];
                setLetterHearts(prev => [
                    ...prev,
                    {
                        id: Math.random(),
                        emoji: emojis[Math.floor(Math.random() * emojis.length)],
                        left: Math.random() * 85 + 5,
                        scale: Math.random() * 0.4 + 0.8
                    }
                ]);
            }, 600);
        } else {
            setLetterHearts([]);
        }
        return () => clearInterval(interval);
    }, [activeModal]);

    // Memory cleanup
    useEffect(() => {
        if (letterHearts.length > 20) {
            setLetterHearts(prev => prev.slice(prev.length - 20));
        }
    }, [letterHearts]);

    return (
        <main className="gifts-page">
            {/* SVG Clip Path definitions for heart frames */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
                        <path d="M 0.5, 0.24 C 0.5, 0.24, 0.42, 0.0, 0.25, 0.0 C 0.11, 0.0, 0.0, 0.12, 0.0, 0.27 C 0.0, 0.51, 0.29, 0.82, 0.5, 1.0 C 0.71, 0.82, 1.0, 0.51, 1.0, 0.27 C 1.0, 0.12, 0.89, 0.0, 0.75, 0.0 C 0.58, 0.0, 0.5, 0.24, 0.5, 0.24 Z" />
                    </clipPath>
                </defs>
            </svg>

            {/* Confetti overlay */}
            {confetti.map(c => (
                <div 
                    key={c.id} 
                    className="confetti-piece"
                    style={{
                        left: `${c.left}%`,
                        backgroundColor: c.color,
                        width: `${c.size}px`,
                        height: `${c.size}px`,
                        animationDelay: `${c.delay}s`,
                        transform: `rotate(${c.rotate}deg)`
                    }}
                />
            ))}

            {/* Back home */}
            <Link to="/" className="back-btn">
                <GiCrossMark size={16} /> Close & Go Home
            </Link>

            {/* Header */}
            <div className="gifts-header">
                <h1>🎁 Hime's Zootopia Delivery 🎁</h1>
                <p>NICK WILDE HAS DELIVERED SPECIAL BIRTHDAY GIFTS FOR YOU!</p>
            </div>

            {/* Tap choir */}
            <div className="cheer-btn-container">
                <button className="cheer-btn" onClick={triggerHowl} disabled={howlActive}>
                    <FaVolumeUp /> {howlActive ? "AWOOOOOOOO! 🦊📣" : "Tap Nick to Cheer! 🦊✨"}
                </button>
            </div>

            {/* Delivery cards (realistic hold overlays) */}
            <div className="gifts-grid">
                
                {/* Gift 1: Cake Surprise */}
                <div className="delivery-card">
                    {howlActive && <div className="speech-bubble">AWOOOO! 🎂</div>}
                    
                    <div className="character-wrapper gold" onClick={() => handleOpenModal('cake')}>
                        <img src="/nick_wilde_gift.jpg" alt="Nick Wilde Cake Delivery" className="character-gift-img" />
                        <div className="mini-gift-badge gold">
                            <img src="/gift_box.png" alt="Gold Gift Box" className="mini-gift-img" />
                        </div>
                    </div>

                    <div className="gift-label">
                        <h3>Gary's Gift Box</h3>
                        <p>🎂 Cake Surprise</p>
                    </div>
                </div>

                {/* Gift 2: Birthday Diary */}
                <div className="delivery-card">
                    {howlActive && <div className="speech-bubble">AWOOOO! 📖</div>}

                    <div className="character-wrapper purple" onClick={() => handleOpenModal('diary')}>
                        <img src="/nick_wilde_gift.jpg" alt="Nick Wilde Diary Delivery" className="character-gift-img" />
                        <div className="mini-gift-badge purple">
                            <img src="/gift_box.png" alt="Purple Gift Box" className="mini-gift-img" />
                        </div>
                    </div>

                    <div className="gift-label">
                        <h3>Larry's Gift Box</h3>
                        <p>📖 Birthday Diary</p>
                    </div>
                </div>

                {/* Gift 3: Love Collage */}
                <div className="delivery-card">
                    {howlActive && <div className="speech-bubble">AWOOOO! 💖</div>}

                    <div className="character-wrapper cyan" onClick={() => handleOpenModal('collage')}>
                        <img src="/nick_wilde_gift.jpg" alt="Nick Wilde Collage Delivery" className="character-gift-img" />
                        <div className="mini-gift-badge cyan">
                            <img src="/gift_box.png" alt="Cyan Gift Box" className="mini-gift-img" />
                        </div>
                    </div>

                    <div className="gift-label">
                        <h3>Shadow's Gift Box</h3>
                        <p>💖 Love Collage</p>
                    </div>
                </div>

            </div>

            {/* ================= MODAL SURPRISES ================= */}

            {/* Gift 1 Modal: Cake Slicing Reveal */}
            {activeModal === 'cake' && (
                <div className="modal-overlay" onClick={() => setActiveModal(null)}>
                    <div 
                        className="modal-content narrow" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
                        <div className="modal-body">
                            
                            <div className="cake-interactive-wrapper">
                                {!cakeCut ? (
                                    <div className="cake-instructions animate-bounce">
                                        🎂 Click the Cake to slice it! 🔪
                                    </div>
                                ) : (
                                    <div className="cake-wish-banner">
                                        <h4>✨ Happy 19th Birthday Hime! ✨</h4>
                                        <p>Make a sweet wish! May all your dreams come true! 💖</p>
                                    </div>
                                )}

                                <div className="cake-container-19" onClick={handleCutCake}>
                                    {/* Slicing glow line overlay */}
                                    {slicing && <div className="slice-slash"></div>}
                                    
                                    <div className={`cake-splitter ${cakeCut ? 'cut' : ''}`}>
                                        <div className="cake-half left">
                                            <img src="/birthday_cake_real.png" alt="Cake Left" />
                                        </div>
                                        <div className="cake-half right">
                                            <img src="/birthday_cake_real.png" alt="Cake Right" />
                                        </div>
                                    </div>

                                    {/* Birthday Person Reveal */}
                                    {cakeCut && (
                                        <div className="birthday-person-reveal">
                                            <div className="reveal-photo-frame">
                                                <svg viewBox="0 0 100 100" className="reveal-heart-svg">
                                                    <defs>
                                                        <clipPath id="reveal-heart-clip">
                                                            <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" />
                                                        </clipPath>
                                                    </defs>
                                                    <image href="/img1.jpeg" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#reveal-heart-clip)" />
                                                    <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" fill="none" stroke="#ff7882" strokeWidth="4" />
                                                </svg>
                                            </div>
                                            <div className="reveal-label">Hime 🤍</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Gift 2 Modal: Direct Open Diary Book Layout */}
            {activeModal === 'diary' && (
                <div className="modal-overlay" onClick={() => setActiveModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
                        <div className="modal-body">
                            
                            <div className="diary-book">
                                {/* Top Ribbon Banner decoration */}
                                <div className="card-top-decoration">
                                    <span>🎀 Birthday Wishes for Hime 🎀</span>
                                </div>

                                {/* Floating heart emitter */}
                                <div className="diary-floating-hearts-container">
                                    {letterHearts.map(h => (
                                        <div 
                                            key={h.id} 
                                            className="floating-heart"
                                            style={{ left: `${h.left}%`, transform: `scale(${h.scale})` }}
                                        >
                                            {h.emoji}
                                        </div>
                                    ))}
                                </div>

                                {/* Left Page: Photos & Vector Stickers */}
                                <div className="diary-page-left">
                                    {/* Left Gold Star */}
                                    <svg viewBox="0 0 24 24" className="diary-star-left" fill="#ffd700">
                                        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/>
                                    </svg>

                                    {/* Right Gold Star */}
                                    <svg viewBox="0 0 24 24" className="diary-star-right" fill="#ffd700">
                                        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/>
                                    </svg>

                                    {/* Main heart photo of Hime as SVG Frame */}
                                    <div className="diary-heart-frame-container">
                                        <svg viewBox="0 0 100 100" className="diary-heart-svg">
                                            <defs>
                                                <clipPath id="diary-heart-clip">
                                                    <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" />
                                                </clipPath>
                                            </defs>
                                            <image href="/img1.jpeg" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#diary-heart-clip)" />
                                            <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" fill="none" stroke="white" strokeWidth="3.5" />
                                        </svg>
                                    </div>
                                    
                                    <h3 className="diary-photo-label">Cutie 🤍</h3>

                                    {/* Scattered pastel bottom dots */}
                                    <div className="diary-bottom-dots">
                                        <span className="dot dot-pink-1"></span>
                                        <span className="dot dot-blue-1"></span>
                                        <span className="dot dot-yellow-1"></span>
                                        <span className="dot dot-pink-2"></span>
                                        <span className="dot dot-blue-2"></span>
                                        <span className="dot dot-yellow-2"></span>
                                    </div>
                                </div>

                                {/* Right Page: Poem Content */}
                                <div className="diary-page-right">
                                    <div className="diary-poem-content">
                                        {`Happy Birthday, my love ❤️
                                        It's your special day...
                                        and every reminder of you makes my heart smile.
                                        Somewhere in your laughter and happiness,
                                        my whole world exists. 🌸
                                        
                                        You are the kind of person
                                        who turns ordinary moments into beautiful memories.
                                        Every second with you feels soft, warm, and special.
                                        
                                        No matter how many birthdays come and go,
                                        I'll always choose you, every single time.
                                        You're my always and forever. 💖
                                        
                                        My safe place, my happiness, my favorite person.
                                        I hope this year brings you endless smiles,
                                        peace,
                                        success, and all the love your heart
                                        deserves.
                                        
                                        and whenever life gets difficult,
                                        just remember - I'll always be right beside you.`}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Gift 3 Modal: Heart Collage (Second Screenshot Layout) */}
            {activeModal === 'collage' && (
                <div className="modal-overlay" onClick={() => setActiveModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
                        <div className="modal-body collage-modal-wrapper">
                            
                            <h2 className="collage-title">Will you be mine? ❤️</h2>

                            <div className="collage-container-3">
                                {/* Floating heart emitter inside modal */}
                                <div className="diary-floating-hearts-container">
                                    {letterHearts.map(h => (
                                        <div 
                                            key={h.id} 
                                            className="floating-heart"
                                            style={{ left: `${h.left}%`, transform: `scale(${h.scale})` }}
                                        >
                                            {h.emoji}
                                        </div>
                                    ))}
                                </div>

                                {/* Left Heart image (rotated) */}
                                <div className="collage-heart left">
                                    <svg viewBox="0 0 100 100" className="collage-heart-svg">
                                        <defs>
                                            <clipPath id="collage-heart-clip-left">
                                                <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" />
                                            </clipPath>
                                        </defs>
                                        <image href="/collage_table.png" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#collage-heart-clip-left)" />
                                        <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" fill="none" stroke="white" strokeWidth="4" />
                                    </svg>
                                    <span className="collage-heart-label">Sweet Smile 😊</span>
                                </div>

                                {/* Right Heart image (rotated) */}
                                <div className="collage-heart right">
                                    <svg viewBox="0 0 100 100" className="collage-heart-svg">
                                        <defs>
                                            <clipPath id="collage-heart-clip-right">
                                                <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" />
                                            </clipPath>
                                        </defs>
                                        <image href="/collage_christmas.jpg" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#collage-heart-clip-right)" />
                                        <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" fill="none" stroke="white" strokeWidth="4" />
                                    </svg>
                                    <span className="collage-heart-label">Happy Times ✨</span>
                                </div>

                                {/* Center Heart image (large, overlaps) */}
                                <div className="collage-heart center">
                                    <svg viewBox="0 0 100 100" className="collage-heart-svg">
                                        <defs>
                                            <clipPath id="collage-heart-clip-center">
                                                <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" />
                                            </clipPath>
                                        </defs>
                                        <image href="/collage_outdoor.png" width="100" height="100" preserveAspectRatio="xMidYMid slice" clipPath="url(#collage-heart-clip-center)" />
                                        <path d="M 50, 24 C 50, 24, 42, 0, 25, 0 C 11, 0, 0, 12, 0, 27 C 0, 51, 29, 82, 50, 100 C 71, 82, 100, 51, 100, 27 C 100, 12, 89, 0, 75, 0 C 58, 0, 50, 24, 50, 24 Z" fill="none" stroke="white" strokeWidth="4" />
                                    </svg>
                                    <span className="collage-heart-label center-label">You & Me ❤️</span>
                                </div>
                            </div>

                            {/* Handwritten Birthday Date */}
                            <div className="collage-date-sign">25.05.2026</div>

                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Gifts;

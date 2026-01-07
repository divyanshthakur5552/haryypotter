import React, { useEffect, useRef, useState } from "react";

function SlideFive() {
    const containerRef = useRef(null);
    const [titleShift, setTitleShift] = useState(-40);     // vw, start off-screen left (closer)
    const [subtitleShift, setSubtitleShift] = useState(40); // vw, start off-screen right (closer)

    useEffect(() => {
        const handleScroll = () => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vw = window.innerWidth || document.documentElement.clientWidth;

            // Progress of slide through viewport: 0 (right/off) -> 1 (passed left)
            const raw = (vw - rect.left) / (vw + rect.width);
            // Start movement much earlier by biasing progress forward
            const biased = raw + 0.6; // begin animation ~60% earlier than default
            const progress = Math.max(0, Math.min(1, biased));
            const eased = Math.pow(progress, 0.3); // strong early motion for immediate visibility

            const maxTitle = 40;    // title: -40vw -> 0 (to left edge)
            const maxSubtitle = 40; // subtitle: 40vw -> 0 (to right edge)

            setTitleShift(-maxTitle + eased * maxTitle);
            setSubtitleShift(maxSubtitle * (1 - eased));
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-0 overflow-hidden pb-[56.25%]">
            <img
                src="/slides/5.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute inset-0 z-30 flex flex-row items-center justify-between py-6 px-0">
                <h1
                    className="text-left text-6xl md:text-8xl font-extrabold tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] z-10 pb-30"
                    style={{ transform: `translateX(${titleShift}vw)` }}
                >
                   You’re <br /> just as
                </h1>
                <h1
                    className="text-right text-4xl md:text-6xl font-bold tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] z-30"
                    style={{ transform: `translateX(${subtitleShift}vw)` }}
                >
                <span className="text-red-500">sane</span> as <br /> I am.
                </h1>
            </div>
            <img
                src="/slides/5char.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-20"
            />
        </div>
    )
}

export default SlideFive



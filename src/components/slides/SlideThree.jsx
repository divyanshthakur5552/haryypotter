import React, { useRef, useEffect, useState } from "react";

function SlideThree() {
    const containerRef = useRef(null);
    const [titleShift, setTitleShift] = useState(0); // in vw units (negative moves left)
    const [subtitleShift, setSubtitleShift] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const vw = window.innerWidth || document.documentElement.clientWidth;

            // Compute horizontal progress of slide through viewport
            // 0 when off to the right, 1 when fully passed to the left
            const raw = (vw - rect.left) / (vw + rect.width);
            const progress = Math.max(0, Math.min(1, raw));

            // Max shift amounts (in vw). Adjust to taste.
            const maxTitle = 12;    // 12vw to the left
            const maxSubtitle = 18; // 18vw to the left

            setTitleShift(-progress * maxTitle);
            setSubtitleShift(-progress * maxSubtitle);
        };

        // Initial and listeners
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
                src="/slides/3.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div  className="absolute inset-0  flex flex-col gap-3 items-center justify-center p-6 text-center">
                <h1
                    className="text-6xl md:text-8xl font-extrabold tracking-wider text-red-500 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] z-10 pb-30 pl-50"
                    style={{ transform: `translateX(${titleShift}vw)` }}
                >
                    Anyone can speak Troll
                </h1>
                <h1
                    className="text-xl md:text-3xl font-bold tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] z-30 pl-30"
                    style={{ transform: `translateX(${subtitleShift}vw)` }}
                >
                    All you have to do is point and grunt.

                </h1>
                <h1
                    className="text-xl md:text-3xl font-bold tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] z-30 pl-30"
                    style={{ transform: `translateX(${subtitleShift}vw)` }}
                >
                    All you have to do is point and grunt.

                </h1>
                <h1
                    className="text-xl md:text-3xl font-bold tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] z-30 pl-30"
                    style={{ transform: `translateX(${subtitleShift}vw)` }}
                >
                    All you have to do is point and grunt.

                </h1>
            </div>
            <img
                src="/slides/3char.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-20"
            />
        </div>
    )
}

export default SlideThree


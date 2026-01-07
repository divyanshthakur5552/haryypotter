import SlideOne from "./components/slides/Slide1";
import SlideTwo from "./components/slides/SlideTwo";
import SlideThree from "./components/slides/SlideThree";
import SlideFour from "./components/slides/SlideFour";
import SlideFive from "./components/slides/SlideFive";
import SlideSix from "./components/slides/SlideSix";
import SlideSeven from "./components/slides/SlideSeven";
import Navbar from "./components/Navbar";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Qoutes() {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const videoRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".panel");
            if (!panels.length) return;

            const getScrollDistance = () => Math.max(0, track.scrollWidth - container.clientWidth);

            const tween = gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    end: () => "+=" + getScrollDistance(),
                },
            });

            // Expose tween so child slides can use containerAnimation
            window.__QoutesHorizontalTween = tween;
            window.dispatchEvent(new Event("qoutesTweenReady"));

            ScrollTrigger.addEventListener("refreshInit", () => {
                gsap.set(track, { x: 0 });
            });

            return () => {
                tween.kill();
            };
        }, container);

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        return () => {
            window.removeEventListener("load", onLoad);
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const wrapper = video.parentElement;
        if (!wrapper) return;
        const tryPlayWithAudio = async () => {
            try {
                video.muted = false;
                await video.play();
            } catch (_) {
                try {
                    video.muted = true;
                    await video.play();
                } catch (_) {}
            }
        };
        const onClick = async () => {
            try {
                video.muted = false;
                await video.play();
            } catch (_) {}
        };
        video.addEventListener("click", onClick);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        tryPlayWithAudio();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(wrapper);
        return () => {
            observer.disconnect();
            video.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-black text-white">
            <Navbar />

            <section ref={containerRef} className="relative h-screen overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex h-full will-change-transform"
                    style={{ width: "max-content" }}
                >
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideOne />
                        </div>
                    </div>
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideTwo />
                        </div>
                    </div>
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideThree />
                        </div>
                    </div>
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideFour />
                        </div>
                    </div>
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideFive />
                        </div>
                    </div>
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideSix />
                        </div>
                    </div>
                    <div className="panel w-screen h-full flex items-center justify-center ">
                        <div className="w-full h-full">
                            <SlideSeven />
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative h-[80%] w-[80%] mx-auto  pb-20 overflow-hidden">
                <video ref={videoRef} src="/finalVideo.mp4" loop playsInline preload="auto" className="object-cover object-center w-full h-full rounded-4xl"></video>
            </div>
        </div>
    )
}

export default Qoutes

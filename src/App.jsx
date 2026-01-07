import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

function App() {
  let [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = false;
    el.volume = 0.8;
    el.play().catch(() => {});
  }, []);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.3,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.6,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.2,
      x: "-50%",
      bottom: "-70%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const harryEl = document.querySelector(".text h1:nth-child(1)");
    const potterEl = document.querySelector(".text h1:nth-child(2)");
    if (harryEl && potterEl) {
      gsap.fromTo(
        harryEl,
        { x: "-60vw"},
        { x: "40vw" ,duration: 1.8, ease: "power3.out" }
      );
      gsap.fromTo(
        potterEl,
        { x: "60vw"},
        { x: "-33vw",  duration: 1.8, ease: "power3.out" }
      );
    }

    const main = document.querySelector(".main");

    gsap.set(".imagesdiv", { transformPerspective: 800, transformStyle: "preserve-3d" });
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 120;
      const yMove = (e.clientY / window.innerHeight - 0.5) * 120;
      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
      // Parallax with clamping to prevent edge reveal
      const skyScale = 1.3; // matches GSAP animation target
      const skyPad = 12;
      const skyLimitX = (window.innerWidth * (skyScale - 1)) / 2 - skyPad;
      const skyLimitY = (window.innerHeight * (skyScale - 1)) / 2 - skyPad;
      const skyX = clamp(xMove * 0.6, -skyLimitX, skyLimitX);
      const skyY = clamp(yMove * 0.6, -skyLimitY, skyLimitY);
      gsap.to(".sky", { x: skyX, y: skyY });

      const bgScale = 1.6; // matches GSAP animation target
      const bgPad = 12;
      const bgLimitX = (window.innerWidth * (bgScale - 1)) / 2 - bgPad;
      const bgLimitY = (window.innerHeight * (bgScale - 1)) / 2 - bgPad;
      const bgX = clamp(xMove * 0.5, -bgLimitX, bgLimitX);
      const bgY = clamp(yMove * 0.4, -bgLimitY, bgLimitY);
      gsap.to(".bg", { x: bgX, y: bgY, transformOrigin: "50% 50%" });
      gsap.to(".imagesdiv", {
        rotationY: xMove * 0.06,
        rotationX: -yMove * 0.06,
        transformOrigin: "50% 50%",
        ease: "power2.out",
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  H.P
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Harry Potter
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="/sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="/bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[12rem] leading-none -ml-40">Harry</h1>
                <h1 className="text-[12rem] leading-none ml-20">Potter</h1>
              
              </div>
              <img
                className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg] "
                src="/girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-full py-95 flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="/imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] h-full relative top-[-250px]">
                <h1 className="text-8xl">The</h1>
                <h1 className="text-8xl">Cursed Child</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
               
                <Link to="/story" className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl cursor-pointer inline-block">
                  Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        src="/audio.mp3"
        autoPlay
        loop
        preload="auto"
        playsInline
        controls={false}
        className="hidden"
        aria-hidden="true"
      />
    </>
  );
}

export default App;

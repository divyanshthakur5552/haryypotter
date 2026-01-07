import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ObjScene from "./components/ThreeD";
const video = [
  "/Harry video/intro.mp4",
  "/Harry video/fight.mp4",
  "/Harry video/fight1.mp4",
  "/Harry video/2nd.mp4",
  "/Harry video/last.mp4",
  "/Harry video/scret.mp4",
  "/Harry video/vold.mp4",
]
const hpTexts = [
  "Expecto Patronum",
  "The Boy Who Lived",
  "Mischief Managed",
  "Expelliarmus",
  "Hogwarts",
  "Gryffindor",
  "Lumos",
  "Nox",
  "Wingardium Leviosa",
  "Dumbledore's Army",
  "Order of the Phoenix",
  "Deathly Hallows",
];
const textBySrc = Object.fromEntries(
  video.map((src) => [src, hpTexts[Math.floor(Math.random() * hpTexts.length)]])
);
function Story() {
  const audioRef = useRef(null);
  const [needsUnmute, setNeedsUnmute] = useState(true);

  const handleEnableSound = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.muted = false;
      el.volume = 0.7;
      await el.play();
    } catch {}
  };
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
    const tryUnmutePlay = async () => {
      try {
        await handleEnableSound();
      } catch {}
    };
    const onPlaying = () => setNeedsUnmute(el.muted);
    const onInteract = () => {
      tryUnmutePlay();
      window.removeEventListener('click', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
    window.addEventListener('click', onInteract);
    window.addEventListener('touchstart', onInteract);
    window.addEventListener('keydown', onInteract);
    el.addEventListener('playing', onPlaying);
    return () => {
      window.removeEventListener('click', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('keydown', onInteract);
      el.removeEventListener('playing', onPlaying);
    };
  }, []);
  return ( <>
    <div className="min-h-screen w-full relative bg-cover bg-no-repeat bg-center bg-[url('/sky.png')] text-white">
      <img src="/bg.png" alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      <Navbar/>
      <div className="w-full h-screen relative z-10">
        <ObjScene />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-3xl px-6">
        <h1 className="text-8xl font-bold">Harry Potter</h1>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-200">
          Harry Potter follows a young wizard who discovers his magical heritage on his eleventh birthday and
          attends Hogwarts School of Witchcraft and Wizardry. Alongside his friends, he faces daunting challenges,
          unravels mysteries about his past, and confronts the dark wizard Lord Voldemort whose return threatens
          both the wizarding and Muggle worlds.
        </p>
      </div>
    </div>
    <div className="min-h-screen w-full relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-6 auto-rows-[160px] md:auto-rows-[200px]">
          {video.slice(0, 4).map((src, i) => (
            <div
              key={src}
              className={
                `relative overflow-hidden rounded-xl bg-zinc-900/40 border border-white/10 ` +
                (i === 0
                  ? "col-span-2 md:col-span-3 row-span-2"
                  : i === 1
                  ? "col-span-2 md:col-span-3 row-span-1"
                  : i === 2
                  ? "col-span-1 md:col-span-2 row-span-1"
                  : "col-span-1 md:col-span-1 row-span-1")
              }
            >
              <video
                src={src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 z-20 bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm">
                <span className="text-amber-100 text-sm md:text-base font-semibold tracking-wide font-sans not-italic">
                  {textBySrc[src]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 grid-cols-2 md:grid-cols-6 auto-rows-[160px] md:auto-rows-[200px]">
          {video.slice(4).map((src, i) => (
            <div
              key={src}
              className={
                `relative overflow-hidden rounded-xl bg-zinc-900/40 border border-white/10 ` +
                (i === 0
                  ? "col-span-2 md:col-span-4 row-span-2"
                  : i === 1
                  ? "col-span-2 md:col-span-2 row-span-1"
                  : i === 2
                  ? "col-span-2 md:col-span-2 row-span-1"
                  : "col-span-2 md:col-span-3 row-span-1")
              }
            >
              <video
                src={src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 z-20 bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm">
                <span className="text-amber-100 text-sm md:text-base font-semibold tracking-wide font-sans not-italic">
                  {textBySrc[src]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <audio
      ref={audioRef}
      src="/audio.mp3"
      autoPlay
      loop
      preload="auto"
      playsInline
      muted
      controls={false}
      className="hidden"
      aria-hidden="true"
    />
    {needsUnmute && (
      <button
        type="button"
        onClick={handleEnableSound}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold shadow-lg hover:bg-amber-400 active:bg-amber-600"
      >
        Enable sound
      </button>
    )}
    </>
  )
}

export default Story


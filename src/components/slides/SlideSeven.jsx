import React, { useEffect, useRef, useState } from 'react'

function SlideSeven() {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true)
                        // reveal once
                        io.disconnect()
                    }
                })
            },
            { root: null, threshold: 0.2 }
        )

        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section
            ref={containerRef}
            className="bg-black min-h-screen flex items-center justify-center px-6"
        >
            <h1
                ref={textRef}
                className={`text-white text-xl md:text-4xl text-center leading-tight transition-all duration-300 ease-out ${visible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-8'}`}
            >
                He Had No Memory of Ever Being Hugged Like This, as Though By a Mother.
            </h1>
        </section>
    )
}

export default SlideSeven

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

const Navlinks = {
  Home: "/",
  Story: "/story",
  character: "/character",
  qoutes: "/qoutes",
  Book: "/book",
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const entries = Object.entries(Navlinks)

  return (
    <nav className="fixed top-0 left-0 z-[50] w-full">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-6 flex items-center justify-between rounded-xl border border-[#3f3f46] bg-[#18181b] px-5 py-3 shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <Link to="/" className="flex items-center gap-3">
            
            <span className="text-2xl tracking-wider text-yellow-300  md:text-3xl">Harry Potter</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {entries.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  `uppercase text-sm tracking-widest transition-colors ${
                    isActive
                      ? "text- drop-shadow-[0_0_6px_rgba(234,179,8,0.9)]"
                      : "text-white/80 hover:text-yellow-300"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="rounded border border-yellow-400/30 p-2 text-yellow-300 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-xl border border-yellow-400/30 bg-black/60 px-5 py-4 shadow-[0_0_30px_rgba(234,179,8,0.25)] backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-3">
              {entries.map(([label, href]) => (
                <NavLink
                  key={label}
                  to={href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `uppercase tracking-widest py-2 ${
                      isActive
                        ? "text-yellow-300 drop-shadow-[0_0_6px_rgba(234,179,8,0.9)]"
                        : "text-white/80 hover:text-yellow-300"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


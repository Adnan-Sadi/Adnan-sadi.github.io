import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { to: "/", label: "About" },
  { to: "/publications", label: "Publications" },
  { to: "/news", label: "News" },
  { to: "/cv", label: "CV" },
  { to: "/projects", label: "Projects" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Name — unchanged */}
        <Link
          to="/"
          className="no-underline text-base tracking-tight hover:opacity-90 shrink-0 whitespace-nowrap"
        >
          <strong> Abu Adnan</strong> Sadi
        </Link>

        {/* Desktop nav — hidden on small screens */}
        <nav className="hidden sm:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                [
                  "no-underline px-3 py-1.5 text-sm rounded-md transition",
                  "hover:bg-foreground/5",
                  isActive ? "font-semibold bg-foreground/10" : "text-muted",
                ].join(" ")
              }
            >
              {n.label}
            </NavLink>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile: theme toggle + hamburger button */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-md hover:bg-foreground/5 transition"
            aria-label="Toggle menu"
          >
            {/* Hamburger / X icon */}
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="sm:hidden border-t bg-background/95 px-4 py-2 flex flex-col gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "no-underline px-3 py-2 text-sm rounded-md transition",
                  "hover:bg-foreground/5",
                  isActive ? "font-semibold bg-foreground/10" : "text-muted",
                ].join(" ")
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
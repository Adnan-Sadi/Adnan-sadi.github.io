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
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          to="/"
          className="no-underline text-base tracking-tight hover:opacity-90"
        >
          <strong> Abu Adnan</strong> Sadi
        </Link>

        <nav className="flex items-center gap-1">
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
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Sun, Moon } from "lucide-react";
import { cn } from "@/utils/cn";
import { site } from "@/config/site";
import { Button } from "@/components/ui";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/instructors", label: "Instructors" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const current = document.documentElement.dataset.theme;
    if (current === "dark" || current === "light") return current;
  }
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("malay-theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch {
      // Ignore storage errors and fall back to system preference.
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  }
  return "light";
}

/* Learner-board brand mark: red "M" on white, as used on training cars */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-[10px] border-2 border-lred-600 bg-white shadow-sm",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#ce2b37" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18V4l6 8 6-8v14" />
      </svg>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { pathname } = useLocation();
  const onDarkHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const lightText = onDarkHero && !open;
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const next: Theme = isDark ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("malay-theme", next);
    } catch {
      // Storage may be unavailable; theme still works for the current session.
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          lightText
            ? "bg-transparent py-4"
            : "theme-header border-b border-line/80 bg-white/95 py-2.5 shadow-sm backdrop-blur-md"
        )}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <LogoMark className="shrink-0" />
            <span className="leading-tight">
              <span className={cn("block font-display text-[19px] font-extrabold tracking-tight", lightText ? "text-white" : "text-ink-900")}>
                {site.short}
                <span className="text-lred-600">.</span>
              </span>
              <span className={cn("block text-[10.5px] font-semibold tracking-[0.14em] uppercase", lightText ? "text-white/75" : "text-ink-500")}>
                Driving Learning School
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-4 py-2 text-[14px] font-semibold transition-colors",
                    isActive
                      ? lightText
                        ? "bg-white/15 text-white"
                        : "bg-brand-50 text-brand-700"
                      : lightText
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-ink-600 hover:bg-paper-100 hover:text-ink-900"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className={cn(
                "theme-toggle inline-flex h-10 items-center gap-2 rounded-xl border px-3 text-[13px] font-semibold transition-all duration-200",
                lightText ? "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20" : ""
              )}
            >
              {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
              <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
            </button>

            <Button to="/contact?intent=trial" size="sm" className="hidden sm:inline-flex">
              Book a Trial
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden",
                lightText ? "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20" : "bg-paper-100 text-ink-900 hover:bg-paper-200"
              )}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "theme-menu fixed inset-0 z-40 flex flex-col pt-24 transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 overflow-y-auto pb-10">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={({ isActive }) =>
                cn(
                  "rounded-2xl px-5 py-4 font-display text-2xl font-extrabold tracking-tight transition-all duration-300",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActive ? "bg-brand-50 text-brand-700" : "text-ink-900 hover:bg-paper-100"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className={cn("mt-5 flex flex-col gap-3 transition-all duration-300", open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="theme-toggle flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold"
            >
              {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
              {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            </button>
            <Button to="/contact?intent=trial" size="lg">
              Book a Trial Lesson
            </Button>
            <Button to="/contact" size="lg" variant="outline-dark">
              Enquire About Courses
            </Button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[13px] font-medium text-ink-500">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {site.region}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

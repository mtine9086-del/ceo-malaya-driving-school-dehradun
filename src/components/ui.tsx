import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ImageOff } from "lucide-react";
import { cn } from "@/utils/cn";
import { site } from "@/config/site";

/* ------------------------------------------------------------------ */
/*  Reveal — IntersectionObserver scroll animation                     */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn("rv", className)}
      style={{ "--rv-d": `${delay}ms`, "--rv-y": `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Button — link, anchor or real button                               */
/* ------------------------------------------------------------------ */
type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline-light" | "outline-dark" | "ghost";
  size?: "md" | "lg" | "sm";
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  to,
  href,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-display font-bold tracking-tight transition-all duration-200 select-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";
  const sizes = {
    sm: "px-4 py-2.5 text-[13.5px]",
    md: "px-5 py-3 text-[14.5px]",
    lg: "px-7 py-4 text-[15.5px]",
  };
  const variants = {
    /* amber — the single action colour, used sparingly */
    primary:
      "bg-accent-500 text-navy-950 shadow-[0_10px_24px_-10px_rgb(201_122_8/0.65)] hover:bg-accent-300 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgb(18_86_160/0.7)] hover:bg-brand-700 hover:-translate-y-0.5 active:translate-y-0",
    "outline-light":
      "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0",
    "outline-dark":
      "border border-brand-600/30 bg-surface text-brand-700 hover:border-brand-600/60 hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0",
    ghost: "text-brand-700 hover:bg-brand-50",
  };
  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(cls, "group")} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cn(cls, "group")} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(cls, "group")} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Chip                                                               */
/* ------------------------------------------------------------------ */
export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "blue" | "green" | "amber" | "red";
  className?: string;
}) {
  const tones = {
    neutral: "border-line bg-paper-100 text-ink-600",
    blue: "border-brand-200 bg-brand-50 text-brand-700",
    green: "border-safe-700/25 bg-safe-100 text-safe-700",
    amber: "border-accent-500/30 bg-accent-100 text-accent-600",
    red: "border-lred-600/25 bg-lred-600/10 text-lred-600",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow", dark && "text-accent-300", align === "center" && "justify-center")}>
          <span className={cn("inline-block h-[2px] w-6", dark ? "bg-accent-300" : "bg-brand-600")} aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag className={cn("mt-3 font-extrabold text-balance", as === "h1" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-3xl sm:text-4xl", dark ? "text-white" : "text-ink-900")}>{title}</Tag>
      {lead && <p className={cn("mt-4 text-[16.5px] leading-relaxed", dark ? "text-white/70" : "text-ink-600")}>{lead}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  SafeImage — graceful failure state                                 */
/* ------------------------------------------------------------------ */
export function SafeImage({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("flex items-center justify-center bg-gradient-to-br from-brand-100 to-paper-200 text-ink-400", className)}
      >
        <span className="flex flex-col items-center gap-2 p-6 text-center">
          <ImageOff className="h-8 w-8" aria-hidden />
          <span className="text-xs font-medium">Photo unavailable</span>
        </span>
      </div>
    );
  }
  /* Serve a WebP source when the original is a JPEG, with the JPEG itself as
     the universal fallback for browsers/tools that don't support WebP. */
  const webpSrc = /\.jpe?g$/i.test(src) ? src.replace(/\.jpe?g$/i, ".webp") : null;
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={cn("h-full w-full object-cover", className, imgClassName)}
      />
    </picture>
  );
}

/* ------------------------------------------------------------------ */
/*  PageMeta — per-route SEO                                           */
/* ------------------------------------------------------------------ */
export function PageMeta({ title, description, jsonLd }: { title: string; description: string; jsonLd?: object }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);

    /* Home keeps the clean root URL; other routes get their hash path appended.
       Note: search engines strip everything after "#" before indexing, so this
       has no effect on crawling/ranking — it's for correctness of the tag
       itself (tools/users that read it directly, e.g. sharing a link). */
    const canonicalHref = pathname === "/" ? `${site.baseUrl}/` : `${site.baseUrl}/#${pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) link.href = canonicalHref;
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalHref);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);

    const id = "ld-json";
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, jsonLd, pathname]);
  return null;
}

/* ------------------------------------------------------------------ */
/*  Road divider                                                       */
/* ------------------------------------------------------------------ */
export function RoadDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("roadline w-full opacity-90", className)} />;
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                        */
/* ------------------------------------------------------------------ */
export function EmptyState({
  icon,
  title,
  note,
  children,
}: {
  icon: ReactNode;
  title: string;
  note: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">{icon}</span>
      <h3 className="mt-5 text-lg font-bold text-ink-900">{title}</h3>
      <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-600">{note}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

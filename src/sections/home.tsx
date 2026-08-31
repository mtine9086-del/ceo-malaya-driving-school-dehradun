import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Car,
  CarFront,
  ClipboardCheck,
  Clock3,
  Flag,
  GraduationCap,
  HeartHandshake,
  MapPin,
  MessageSquare,
  Quote,
  Route as RouteIcon,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { site } from "@/config/site";
import { categories, processSteps, serviceAreas, testimonials, trustPoints, whyChoose } from "@/data/content";
import { featuredCourses } from "@/data/courses";
import { Button, Chip, Reveal, RoadDivider, SafeImage, SectionHeading } from "@/components/ui";
import CourseCard from "@/components/CourseCard";

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const videoSrc = site.media.heroVideo;
  const [videoOk, setVideoOk] = useState(Boolean(videoSrc));

  /* Respect reduced motion — show the still poster instead of motion */
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const showVideo = videoSrc && videoOk && !reduced;

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-950">
      {/* media */}
      <div className="absolute inset-0" aria-hidden>
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={site.media.heroPoster}
            onError={() => setVideoOk(false)}
          >
            {site.media.heroVideoMobile && <source src={site.media.heroVideoMobile} media="(max-width: 768px)" />}
            <source src={videoSrc} />
          </video>
        ) : (
          <picture>
            <source srcSet={site.media.heroPoster.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
            <img
              src={site.media.heroPoster}
              alt=""
              className="hero-zoom h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        )}
      </div>
      {/* readable scrim — restrained, no fake filters */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/25" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/55 via-transparent to-transparent" aria-hidden />

      {/* content */}
      <div className="container-x relative pt-36 pb-24 sm:pb-32">
        <Reveal>
          <Chip tone="blue" className="border-white/25 bg-white/10 text-white backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Ballupur · Dehradun · Uttarakhand
          </Chip>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold text-balance text-white sm:text-5xl lg:text-[64px] lg:leading-[1.04]">
            Learn to drive with <span className="text-accent-300">confidence</span> — right here in Dehradun.
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/80 sm:text-lg">
            Patient local instructors, well-kept training vehicles and calm, step-by-step lessons on the roads you
            will actually drive — for two-wheelers and four-wheelers, first-timers and returning drivers.
          </p>
        </Reveal>
        <Reveal delay={260} className="mt-8 flex flex-wrap items-center gap-3.5">
          <Button to="/courses" size="lg" arrow>
            View Courses
          </Button>
          <Button to="/contact?intent=trial" size="lg" variant="outline-light">
            Book a Trial Lesson
          </Button>
        </Reveal>
        <Reveal delay={340}>
          <ul className="mt-10 hidden flex-wrap gap-x-8 gap-y-3 sm:flex" aria-label="What makes us different">
            {[
              { icon: HeartHandshake, label: "Beginner & nerves-friendly" },
              { icon: ShieldCheckIcon, label: "Safety-first method" },
              { icon: Clock3, label: "Morning & evening batches" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-white/85">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-accent-300" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ShieldCheckIcon(props: React.ComponentProps<typeof HeartHandshake>) {
  /* tiny inline shield to keep import list lean */
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST STRIP                                                        */
/* ------------------------------------------------------------------ */
export function TrustStrip() {
  const icons = [HeartHandshake, CarFront, Clock3, Wallet];
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={t.title} delay={i * 80}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-extrabold tracking-tight text-ink-900">{t.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-600">{t.note}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  COURSE CATEGORIES                                                  */
/* ------------------------------------------------------------------ */
export function Categories() {
  return (
    <section className="section-pad pt-0" id="categories">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            eyebrow="What we teach"
            title="Pick your vehicle, we handle the rest"
            lead="Every category starts on quiet lanes and the cone ground, then builds up to real traffic at your pace."
          />
          <Reveal delay={120}>
            <Button to="/courses" variant="outline-dark" arrow>
              All courses
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-6">
          {categories.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 3) * 90}
              className={cn(i < 3 ? "md:col-span-2" : "md:col-span-3", i === 0 && "md:col-span-2")}
            >
              <Link
                to={c.to}
                className="group relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-navy-950 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift md:min-h-[280px]"
              >
                <SafeImage
                  src={c.image}
                  alt={c.imageAlt}
                  className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" aria-hidden />
                <div className="relative flex items-end justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-white">{c.title}</h3>
                    <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-white/75">{c.desc}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-accent-500 group-hover:text-navy-950">
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED COURSES                                                   */
/* ------------------------------------------------------------------ */
export function FeaturedCourses() {
  return (
    <section className="relative bg-surface">
      <div className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Courses & batches"
            title="Popular courses in Dehradun"
            lead="Durations shown are typical sample plans — your instructor adjusts the pace to you. Fees are shared clearly on enquiry, never hidden."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((c, i) => (
              <CourseCard key={c.id} course={c} delay={i * 90} />
            ))}
          </div>
          <Reveal delay={200} className="mt-10 text-center">
            <Button to="/courses" variant="secondary" arrow>
              View all courses
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY CHOOSE                                                         */
/* ------------------------------------------------------------------ */
export function WhyChoose() {
  const icons = [HeartHandshake, RouteIcon, Flag, CarFront, Users, GraduationCap];
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Why Malay"
              title="A school built for nervous first-timers — and busy schedules"
              lead="Most of our learners have never sat in a driver's seat before. That shapes everything we do, from balance-first scooter drills to no-shouting car lessons."
            />
            <Reveal delay={160} className="mt-8">
              <div className="relative overflow-hidden rounded-3xl border border-line shadow-card">
                <SafeImage
                  src="images/ground.jpg"
                  alt="Training car weaving between cones at the Malay practice ground in Dehradun"
                  className="aspect-[16/10] w-full"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/30 bg-navy-950/70 p-4 text-white backdrop-blur-md">
                  <Flag className="h-5 w-5 shrink-0 text-accent-300" aria-hidden />
                  <p className="text-[13px] leading-snug font-medium">
                    Our cone practice ground — parking, slalom and reversing drills before real traffic.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((w, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal as="li" key={w.title} delay={(i % 2) * 90 + Math.floor(i / 2) * 60}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-[15.5px] font-extrabold tracking-tight text-ink-900">{w.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{w.note}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE AREA — designed schematic (no fake map)                    */
/* ------------------------------------------------------------------ */
export function ServiceArea() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* schematic illustration */}
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-50 via-paper-100 to-paper-200 shadow-card">
              <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full" aria-hidden role="presentation">
                {/* hills */}
                <path d="M0 60 Q 90 10 170 55 T 340 45 T 520 70 V 0 H 0 Z" fill="#dceaf7" />
                <circle cx="392" cy="58" r="22" fill="#fdebc9" />
                {/* main road */}
                <path d="M-20 250 C 110 190, 210 300, 330 240 S 470 170, 520 210" fill="none" stroke="#ffffff" strokeWidth="26" strokeLinecap="round" />
                <path d="M-20 250 C 110 190, 210 300, 330 240 S 470 170, 520 210" fill="none" stroke="#b8d5ee" strokeWidth="2.5" strokeDasharray="12 12" strokeLinecap="round" />
                {/* side road */}
                <path d="M120 380 C 150 300, 230 260, 245 150" fill="none" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
                <path d="M120 380 C 150 300, 230 260, 245 150" fill="none" stroke="#cbd5dd" strokeWidth="2" strokeDasharray="10 10" />
                {/* trees */}
                {[
                  [60, 300],
                  [400, 300],
                  [330, 130],
                  [90, 150],
                ].map(([x, y], k) => (
                  <g key={k} transform={`translate(${x} ${y})`}>
                    <circle r="10" fill="#def0e5" />
                    <circle cx="8" cy="6" r="8" fill="#cde7d8" />
                    <rect x="-1.5" y="8" width="3" height="7" rx="1.5" fill="#b08968" />
                  </g>
                ))}
              </svg>

              {/* pins */}
              {[
                { top: "38%", left: "34%", label: "Rajpur Road" },
                { top: "56%", left: "58%", label: "Ballupur", primary: true },
                { top: "68%", left: "82%", label: "Clement Town" },
              ].map((p) => (
                <div key={p.label} className="absolute -translate-x-1/2 -translate-y-full" style={{ top: p.top, left: p.left }}>
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-[11px] font-bold shadow-card",
                        p.primary ? "bg-brand-600 text-white" : "bg-surface text-ink-700"
                      )}
                    >
                      {p.label}
                    </span>
                    <MapPin
                      className={cn("h-6 w-6 drop-shadow", p.primary ? "h-8 w-8 text-lred-600" : "text-brand-600")}
                      fill={p.primary ? "#ce2b37" : "#1256a0"}
                      stroke="#ffffff"
                      strokeWidth={1.4}
                      aria-hidden
                    />
                    {p.primary && <span className="mt-0.5 rounded-full bg-lred-600 px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase">Our ground</span>}
                  </div>
                </div>
              ))}

              <div className="absolute right-4 bottom-4 rounded-xl border border-line bg-white/90 px-3.5 py-2 text-[11px] font-semibold text-ink-500 backdrop-blur">
                Schematic illustration — not to scale
              </div>
            </div>
          </Reveal>

          {/* list */}
          <div>
            <SectionHeading
              eyebrow="Where we teach"
              title="Serving Ballupur & Dehradun"
              lead="Our practice ground and classroom are in Ballupur. Weekly batch pickups run across Dehradun — Rajpur Road, Clement Town and nearby areas — tell us where you are when you enquire."
            />
            <ul className="mt-8 space-y-3">
              {serviceAreas.map((a, i) => (
                <Reveal as="li" key={a.name} delay={i * 70}>
                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border p-4 shadow-card",
                      a.primary ? "border-brand-600/25 bg-brand-50" : "border-line bg-paper-100/60"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        a.primary ? "bg-brand-600 text-white" : "bg-surface text-brand-600"
                      )}
                    >
                      <MapPin className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="flex-1">
                      <p className="text-[14.5px] font-extrabold tracking-tight text-ink-900">
                        {a.name}
                        {a.primary && <span className="ml-2 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">Home base</span>}
                      </p>
                      <p className="text-[12.5px] text-ink-600">{a.note}</p>
                    </div>
                    <BadgeCheck className={cn("h-5 w-5 shrink-0", a.primary ? "text-brand-600" : "text-ink-400")} aria-hidden />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS — the road from enquiry to licence                         */
/* ------------------------------------------------------------------ */
export function Process() {
  const icons = [MessageSquare, UserCheck, Car, ClipboardCheck, BadgeCheck];
  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="From first enquiry to test day — five calm steps"
          align="center"
          lead="No jargon, no pressure. Here is exactly what happens after you send an enquiry."
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-5">
          {processSteps.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative">
                {/* connecting road line (desktop) */}
                {i < processSteps.length - 1 && (
                  <div aria-hidden className="roadline absolute top-7 left-[calc(50%+2rem)] hidden w-[calc(100%-4rem)] md:block" />
                )}
                <div className="relative flex flex-col items-start gap-4 md:items-center md:text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-brand-600 shadow-card">
                    <Icon className="h-6 w-6" aria-hidden />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 font-display text-[11px] font-extrabold text-navy-950">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold tracking-tight text-ink-900">{s.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{s.note}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
        <Reveal delay={150} className="mt-12 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-[13px] font-semibold text-ink-600 shadow-card">
            <Bike className="h-4 w-4 text-brand-600" aria-hidden />
            Licences are issued by the RTO — we prepare you thoroughly for the test.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
export function Testimonials() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="Learner stories"
          title="From nervous first gear to everyday drives"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} as="article">
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-paper-100 p-6 shadow-card sm:p-7">
                <Quote className="h-6 w-6 text-accent-500" aria-hidden fill="currentColor" strokeWidth={0} />
                <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-700">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display text-[13px] font-extrabold text-white" aria-hidden>
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-[14px] font-extrabold text-ink-900">
                      {t.name} <span className="font-semibold text-ink-400">· {t.area}</span>
                    </p>
                    <p className="text-[12px] font-medium text-ink-500">{t.course}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA BAND                                                           */
/* ------------------------------------------------------------------ */
export function CTABand() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-brand-800 via-brand-700 to-navy-950 px-6 py-14 text-center shadow-pop sm:px-12 sm:py-18">
            {/* road motif */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 roadline opacity-25" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-8 roadline opacity-25" />
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" />

            <Chip tone="blue" className="border-white/25 bg-white/10 text-white backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {site.region}
            </Chip>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold text-balance text-white sm:text-4xl lg:text-[44px] lg:leading-[1.08]">
              Ready to start driving? Book your first lesson in Dehradun today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/75">
              Send an enquiry and we will call you back with batch timings, the right course for your level, and a
              clear fee breakdown — before you commit to anything.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Button to="/contact?intent=trial" size="lg" arrow>
                Book a Trial Lesson
              </Button>
              <Button to="/contact" size="lg" variant="outline-light">
                Contact Us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
      <RoadDivider className="container-x mt-14" />
    </section>
  );
}

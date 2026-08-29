import { Link } from "react-router-dom";
import { MapPin, Clock, Mail, Phone, MessageCircle } from "lucide-react";
import { site, hasPhone, hasEmail, hasWhatsapp, telHref, mailHref, waHref } from "@/config/site";
import { courses } from "@/data/courses";
import { LogoMark } from "@/components/Header";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "All Courses" },
  { to: "/instructors", label: "Instructors" },
  { to: "/about", label: "About Malay" },
  { to: "/contact", label: "Contact & Enquiry" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white/80">
      {/* road centre-line accent */}
      <div className="relative h-3 w-full overflow-hidden bg-navy-950" aria-hidden>
        <div className="roadline absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-40" />
      </div>

      <div className="container-x grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <LogoMark />
            <span className="leading-tight">
              <span className="block font-display text-[19px] font-extrabold tracking-tight text-white">
                {site.short}
                <span className="text-lred-600">.</span>
              </span>
              <span className="block text-[10.5px] font-semibold tracking-[0.14em] uppercase text-white/60">
                Driving Learning School
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-white/65">
            A local driving school helping first-time and returning learners across {site.region} — patient
            instructors, well-kept training vehicles, and practice on the roads you will actually drive.
          </p>
          {site.socials.length > 0 && (
            <ul className="mt-5 flex gap-3" aria-label="Social media">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/15 px-3 py-1.5 text-[12.5px] font-semibold text-white/75 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Explore */}
        <nav aria-label="Footer — explore">
          <h3 className="font-display text-[13px] font-bold tracking-[0.16em] uppercase text-white/50">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[14.5px] transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Courses */}
        <nav aria-label="Footer — courses">
          <h3 className="font-display text-[13px] font-bold tracking-[0.16em] uppercase text-white/50">Courses</h3>
          <ul className="mt-4 space-y-2.5">
            {courses.map((c) => (
              <li key={c.id}>
                <Link to={`/courses/${c.id}`} className="text-[14.5px] transition-colors hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="font-display text-[13px] font-bold tracking-[0.16em] uppercase text-white/50">Reach Us</h3>
          <ul className="mt-4 space-y-3.5 text-[14.5px]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-300" aria-hidden />
              <span>
                {site.addressLine || "Training ground & classroom"}
                <br />
                <span className="text-white/60">{site.region}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-300" aria-hidden />
              <span>{site.hours}</span>
            </li>
            {hasPhone && (
              <li>
                <a href={telHref} className="flex gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-300" aria-hidden />
                  {site.phone}
                </a>
              </li>
            )}
            {hasWhatsapp && (
              <li>
                <a href={waHref} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-white">
                  <MessageCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-300" aria-hidden />
                  WhatsApp us
                </a>
              </li>
            )}
            {hasEmail && (
              <li>
                <a href={mailHref} className="flex gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-300" aria-hidden />
                  {site.email}
                </a>
              </li>
            )}
            {!hasPhone && !hasEmail && (
              <li className="rounded-xl border border-white/10 bg-white/5 p-3.5 text-[13.5px] leading-relaxed text-white/65">
                The quickest way to reach us right now is the{" "}
                <Link to="/contact" className="font-semibold text-accent-300 underline underline-offset-2">
                  enquiry form
                </Link>{" "}
                — we respond during business hours.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-white/50 sm:flex-row">
          <p>
            © {year} {site.name} · {site.region}
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <p className="text-white/40">Licences are issued only by the RTO</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

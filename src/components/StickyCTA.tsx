import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, CalendarCheck } from "lucide-react";
import { cn } from "@/utils/cn";
import { hasPhone, telHref } from "@/config/site";

/* Mobile-only persistent enquiry bar (appears after the hero) */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const onContact = pathname.startsWith("/contact");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-surface/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgb(11_30_48/0.25)] backdrop-blur-md transition-transform duration-300 md:hidden",
        visible && !onContact ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-3">
        {hasPhone && (
          <a
            href={telHref}
            aria-label="Call Malay Driving School"
            className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border border-brand-600/30 bg-surface font-display text-[14.5px] font-bold text-brand-700 transition-colors hover:bg-brand-50"
          >
            <Phone className="h-4.5 w-4.5" aria-hidden />
            Call Now
          </a>
        )}
        <Link
          to="/contact?intent=trial"
          className="flex min-h-[52px] flex-[2] items-center justify-center gap-2 rounded-xl bg-accent-500 font-display text-[14.5px] font-bold text-navy-950 shadow-[0_10px_24px_-10px_rgb(201_122_8/0.65)] transition-colors hover:bg-accent-300"
        >
          <CalendarCheck className="h-4.5 w-4.5" aria-hidden />
          Book a Trial Lesson
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { site } from "@/config/site";
import { Button, PageMeta, Reveal } from "@/components/ui";
import { LogoMark } from "@/components/Header";

/* ------------------------------------------------------------------ */
/*  Privacy policy — plain, honest, no fake company details            */
/* ------------------------------------------------------------------ */
export function Privacy() {
  return (
    <>
      <PageMeta
        title={`Privacy Policy | ${site.name}`}
        description={`How ${site.name} handles the personal details you share through the enquiry form.`}
      />
      <article className="container-x max-w-3xl pt-32 pb-20">
        <Reveal>
          <p className="eyebrow">
            <span className="inline-block h-[2px] w-6 bg-brand-600" aria-hidden />
            Privacy
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Privacy policy</h1>
          <div className="mt-8 space-y-7 text-[15px] leading-relaxed text-ink-600">
            <section>
              <h2 className="text-lg font-extrabold text-ink-900">What we collect</h2>
              <p className="mt-2">
                When you send an enquiry, we receive the details you choose to share: your name, phone number,
                optional email, course interest, preferred timing and your message. We do not collect payment
                details, Aadhaar numbers or any document scans through this website.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-ink-900">How we use it</h2>
              <p className="mt-2">
                Only to respond to your enquiry — to suggest a course, share batch timings and fees, and arrange
                trial lessons by phone or WhatsApp. We do not send marketing messages you did not ask for.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-ink-900">What we never do</h2>
              <p className="mt-2">
                We never sell, rent or share your details with advertisers or unrelated third parties. Enquiry
                details are visible only to the instructors and staff handling your booking.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-ink-900">Website services</h2>
              <p className="mt-2">
                This site loads fonts from Google Fonts and may serve photos or videos from our hosting provider.
                Outgoing links (for example to Google Maps) are governed by those services&apos; own policies.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-extrabold text-ink-900">Your choices</h2>
              <p className="mt-2">
                You can ask us to correct or delete your enquiry details at any time — just mention it when we
                contact you, or send a note through the enquiry form.
              </p>
            </section>
            <p className="rounded-xl bg-paper-200/70 px-4 py-3 text-[13px] font-medium text-ink-500">
              This policy applies to the website of {site.name}, {site.region}. If our contact practices change, we
              will update this page.
            </p>
          </div>
        </Reveal>
      </article>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  404                                                                */
/* ------------------------------------------------------------------ */
export function NotFound() {
  return (
    <div className="container-x flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
      <LogoMark className="h-16 w-16 rounded-2xl" />
      <p className="mt-6 font-display text-6xl font-extrabold tracking-tight text-ink-900 sm:text-7xl">404</p>
      <h1 className="mt-3 text-xl font-extrabold text-ink-900 sm:text-2xl">This road does not lead anywhere</h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
        The page you are looking for may have moved, or the link is old. Let us get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" variant="secondary" arrow>
          Back to home
        </Button>
        <Button to="/courses" variant="outline-dark">
          Browse courses
        </Button>
      </div>
      <Link to="/contact" className="mt-10 inline-flex items-center gap-2 text-[13.5px] font-bold text-brand-700 hover:text-brand-800">
        <Compass className="h-4 w-4" aria-hidden />
        Still lost? Contact us
      </Link>
    </div>
  );
}

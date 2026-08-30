import { useSearchParams } from "react-router-dom";
import { MapPin, Clock3, Phone, Mail, ChevronDown, Navigation, CalendarCheck } from "lucide-react";
import { site, hasPhone, hasEmail, telHref, mailHref } from "@/config/site";
import { serviceAreas, faqs } from "@/data/content";
import { PageMeta, Reveal, SectionHeading } from "@/components/ui";
import LeadForm from "@/components/LeadForm";

export default function Contact() {
  const [params] = useSearchParams();
  const isTrial = params.get("intent") === "trial";

  return (
    <>
      <PageMeta
        title={`${isTrial ? "Book a Trial Lesson" : "Contact & Enquire"} | Malay Driving School, Dehradun`}
        description="Enquire about two-wheeler or four-wheeler driving courses in Dehradun — batch timings, fees and trial lessons. We respond during business hours."
      />

      <div className="border-b border-line bg-white pt-28 pb-12 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow={isTrial ? "Trial lesson" : "Contact & enquiry"}
            title={isTrial ? "Book your trial lesson" : "Tell us what you want to learn"}
            lead="Send the form below and we will call or WhatsApp you back with the right course, current batch timings and a clear fee breakdown."
          />
        </div>
      </div>

      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.35fr]">
          {/* info column */}
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                <h2 className="flex items-center gap-2.5 font-display text-[16px] font-extrabold tracking-tight text-ink-900">
                  <MapPin className="h-5 w-5 text-brand-600" aria-hidden />
                  Where to find us
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
                  {site.addressLine ? (
                    <>
                      {site.addressLine}
                      <br />
                      <span className="text-ink-500">{site.region}</span>
                    </>
                  ) : (
                    <>
                      Training ground &amp; classroom
                      <br />
                      {site.region}
                    </>
                  )}
                </p>
                <p className="mt-3 flex items-start gap-2 rounded-xl bg-paper-100 px-3.5 py-2.5 text-[12.5px] leading-snug text-ink-500">
                  <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                  Exact directions and pickup points are confirmed when you enquire.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                <h2 className="flex items-center gap-2.5 font-display text-[16px] font-extrabold tracking-tight text-ink-900">
                  <Clock3 className="h-5 w-5 text-brand-600" aria-hidden />
                  Hours & batches
                </h2>
                <p className="mt-3 text-[14px] text-ink-600">{site.hours}</p>
                <p className="mt-2 text-[13px] text-ink-500">
                  Morning, daytime and evening batches run across the week — exact slots are confirmed with your
                  instructor.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                <h2 className="font-display text-[16px] font-extrabold tracking-tight text-ink-900">Areas we serve</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {serviceAreas.map((a) => (
                    <li
                      key={a.name}
                      className="rounded-full border border-line bg-paper-100 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-700"
                    >
                      {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {(hasPhone || hasEmail) && (
              <Reveal delay={200}>
                <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
                  <h2 className="font-display text-[16px] font-extrabold tracking-tight text-ink-900">Direct contact</h2>
                  <ul className="mt-3 space-y-2.5 text-[14px] font-semibold text-brand-700">
                    {hasPhone && (
                      <li>
                        <a href={telHref} className="flex items-center gap-2.5 transition-colors hover:text-brand-800">
                          <Phone className="h-4.5 w-4.5" aria-hidden />
                          {site.phone}
                        </a>
                      </li>
                    )}
                    {hasEmail && (
                      <li>
                        <a href={mailHref} className="flex items-center gap-2.5 transition-colors hover:text-brand-800">
                          <Mail className="h-4.5 w-4.5" aria-hidden />
                          {site.email}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* form column */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink-900">
                <CalendarCheck className="h-5.5 w-5.5 text-accent-600" aria-hidden />
                {isTrial ? "Trial lesson request" : "Course enquiry"}
              </h2>
              <p className="mt-2 mb-6 text-[13.5px] text-ink-500">
                Fields marked optional can be skipped — we only need a way to reach you.
              </p>
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="Questions"
            title="Things learners usually ask first"
            align="center"
          />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group rounded-2xl border border-line bg-paper-100/70 shadow-sm transition-colors open:border-brand-600/30 open:bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-ink-900 sm:px-6 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-4.5 w-4.5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 text-[14px] leading-relaxed text-ink-600 sm:px-6">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

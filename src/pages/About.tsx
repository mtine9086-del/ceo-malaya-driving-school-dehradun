import { ShieldCheck, HeartHandshake, Wallet, MapPin, CheckCircle2 } from "lucide-react";
import { site } from "@/config/site";
import { PageMeta, Reveal, SafeImage, SectionHeading } from "@/components/ui";
import { CTABand } from "@/sections/home";

const values = [
  {
    icon: ShieldCheck,
    title: "Safety before speed",
    note: "No learner is pushed into traffic before they are ready. Helmets on every two-wheeler session, seatbelts on every car session — no exceptions.",
  },
  {
    icon: HeartHandshake,
    title: "Patience, always",
    note: "First-time learners stall, wobble and freeze. That is normal, and our instructors are trained to coach through it calmly.",
  },
  {
    icon: Wallet,
    title: "Honest fees",
    note: "The full fee and exactly what it covers is explained before you join. If extra sessions are needed no one is surprised by the cost.",
  },
  {
    icon: MapPin,
    title: "Local knowledge",
    note: "We teach on the roads you will actually use — Laksar's lanes and markets first, the Roorkee–Haridwar road when you are ready.",
  },
];

const approach = [
  "Every course starts on quiet lanes or the practice ground — never straight into traffic.",
  "Sessions build in small steps: control first, then roads, then traffic, then test patterns.",
  "Instructors explain the 'why' behind each habit, not just the steps to repeat.",
  "Mock tests on RTO patterns happen only once you are genuinely ready for them.",
];

export default function About() {
  return (
    <>
      <PageMeta
        title="About Malay | Driving School in Laksar, Haridwar (Uttarakhand)"
        description="Malay Driving School is a local driving school in Laksar teaching two-wheeler and four-wheeler skills with a safety-first, patient method — for first-time and returning learners."
      />

      <div className="border-b border-line bg-white pt-28 pb-12 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="About us"
            title="A local driving school, not a franchise"
            lead="Small batches, familiar roads and instructors who live where they teach."
          />
        </div>
      </div>

      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-line shadow-lift">
                <SafeImage
                  src="images/hero.jpg"
                  alt="A Malay instructor coaching a learner beside a white training car on a quiet Uttarakhand road"
                  className="aspect-[4/3] w-full"
                />
              </div>
              <div className="absolute -right-3 -bottom-5 hidden rounded-2xl border border-line bg-white px-5 py-4 shadow-lift sm:block">
                <p className="font-display text-[13px] font-extrabold tracking-tight text-ink-900">{site.region}</p>
                <p className="text-[12px] font-medium text-ink-500">Two & four-wheeler training</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Teaching Laksar to drive, one calm lesson at a time"
            />
            <Reveal delay={80} className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-600">
              <p>
                {site.name} began with a simple observation: most people around Laksar were not afraid of driving —
                they were afraid of being taught badly. Being shouted at for stalling, being pushed onto the highway
                on day two, being left confused about the licence test.
              </p>
              <p>
                So we built the school we would want for our own families: patient instructors, well-kept hatchbacks
                and scooters, a cone practice ground, clear fees, and lessons that follow the learner&apos;s pace —
                from a nervous first gear change to a confident first solo drive.
              </p>
              <p>
                Today we teach two-wheeler and four-wheeler learners from Laksar, Haridwar, Roorkee and nearby
                villages, and we support every learner through the learner&apos;s licence and RTO test process.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we stand for"
            title="Four promises we keep on every lesson"
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-line bg-paper-100 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
                    <v.icon className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[16px] font-extrabold tracking-tight text-ink-900">{v.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{v.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* approach */}
      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="How we teach"
              title="Small steps, in the right order"
              lead="Our method is deliberately unglamorous — because calm, repeatable habits are what actually pass tests and keep people safe afterwards."
            />
          </div>
          <ul className="space-y-3.5">
            {approach.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 70}>
                <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-[13px] font-extrabold text-brand-700">
                    {i + 1}
                  </span>
                  <p className="text-[14px] leading-relaxed text-ink-700">{a}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="container-x mt-16">
          <div className="flex items-center gap-4 rounded-3xl border border-safe-700/20 bg-safe-100/60 p-6 sm:p-7">
            <CheckCircle2 className="h-7 w-7 shrink-0 text-safe-700" aria-hidden />
            <p className="max-w-3xl text-[14.5px] leading-relaxed text-ink-700">
              <strong className="font-bold text-ink-900">An honest note:</strong> driving licences in India are
              issued only by the RTO. Our job is to prepare you so thoroughly — skills, signs, documents and mock
              tests — that test day feels routine.
            </p>
          </div>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}

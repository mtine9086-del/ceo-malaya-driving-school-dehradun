import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bike,
  Car,
  CalendarDays,
  CheckCircle2,
  Cog,
  FileText,
  Clock3,
  Layers,
  IndianRupee,
  SearchX,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { site } from "@/config/site";
import { getCourse, relatedCourses, vehicleLabels, transmissionLabels, goalLabels } from "@/data/courses";
import { getInstructor } from "@/data/content";
import { Button, Chip, EmptyState, PageMeta, Reveal, SafeImage } from "@/components/ui";
import CourseCard from "@/components/CourseCard";

const statusTone = { "Batch open": "green", "Filling fast": "amber", "On request": "blue" } as const;

export default function CourseDetail() {
  const { id } = useParams();
  const course = id ? getCourse(id) : undefined;
  const [imgIndex, setImgIndex] = useState(0);

  if (!course) {
    return (
      <div className="container-x pt-36 pb-20">
        <EmptyState
          icon={<SearchX className="h-6 w-6" aria-hidden />}
          title="We could not find that course"
          note="The course may have been renamed or the link is outdated. Browse our current courses below."
        >
          <Button to="/courses" variant="secondary" arrow>
            Browse all courses
          </Button>
        </EmptyState>
      </div>
    );
  }

  const assigned = course.instructorIds.map(getInstructor).filter(Boolean);
  const related = relatedCourses(course);
  const active = course.images[Math.min(imgIndex, course.images.length - 1)];

  return (
    <>
      <PageMeta
        title={`${course.title} in Laksar | Malay Driving School`}
        description={`${course.blurb} ${course.duration}, ${course.sessions} sessions in Laksar (Haridwar). Fees shared clearly on enquiry.`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          provider: {
            "@type": "DrivingSchool",
            name: site.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Laksar",
              addressRegion: "Uttarakhand",
              addressCountry: "IN",
            },
          },
        }}
      />

      <article className="pt-24 sm:pt-28">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="container-x flex items-center gap-2 py-5 text-[13px] font-semibold text-ink-500">
          <Link to="/" className="transition-colors hover:text-brand-700">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/courses" className="transition-colors hover:text-brand-700">
            Courses
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink-900" aria-current="page">
            {course.title}
          </span>
        </nav>

        <div className="container-x grid gap-10 pb-16 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          {/* ---------- main column ---------- */}
          <div>
            {/* gallery */}
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-line shadow-card">
                <SafeImage
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  eager
                  className="aspect-[16/10] w-full transition-opacity duration-300"
                />
              </div>
              {course.images.length > 1 && (
                <div className="mt-3 flex gap-3" role="group" aria-label="Course photos">
                  {course.images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setImgIndex(i)}
                      aria-label={`Show photo ${i + 1} of ${course.images.length}`}
                      aria-pressed={i === imgIndex}
                      className={cn(
                        "overflow-hidden rounded-xl border-2 transition-all duration-200",
                        i === imgIndex ? "border-brand-600 shadow-card" : "border-transparent opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img.src} alt="" className="h-16 w-24 object-cover sm:h-18 sm:w-28" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              )}
            </Reveal>

            {/* heading */}
            <Reveal delay={80} className="mt-8">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={statusTone[course.status]}>{course.status}</Chip>
                <Chip tone="blue">{goalLabels[course.goal]}</Chip>
                <Chip tone="neutral">
                  {course.vehicleType === "two-wheeler" ? <Bike className="h-3.5 w-3.5" aria-hidden /> : <Car className="h-3.5 w-3.5" aria-hidden />}
                  {vehicleLabels[course.vehicleType]}
                </Chip>
                <Chip tone="neutral">
                  <Cog className="h-3.5 w-3.5" aria-hidden />
                  {transmissionLabels[course.transmission]}
                </Chip>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold text-balance text-ink-900 sm:text-4xl">{course.title}</h1>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-600">{course.description}</p>
            </Reveal>

            {/* includes */}
            <Reveal delay={60} className="mt-10">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink-900">What is included</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-card">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-safe-700" aria-hidden />
                    <span className="text-[13.5px] leading-relaxed text-ink-700">{inc}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* requirements */}
            <Reveal delay={60} className="mt-10">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink-900">
                <FileText className="h-5 w-5 text-brand-600" aria-hidden />
                What you will need
              </h2>
              <ul className="mt-4 space-y-2.5">
                {course.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[14px] text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-[13px] leading-relaxed text-brand-800">
                Age eligibility follows RTO rules — for example, 18 years for four-wheelers. We will confirm your
                eligibility and help with the learner&apos;s licence step if needed.
              </p>
            </Reveal>

            {/* timings */}
            <Reveal delay={60} className="mt-10">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink-900">
                <Clock3 className="h-5 w-5 text-brand-600" aria-hidden />
                Batch timings
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {course.timeSlots.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink-700 shadow-sm">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12.5px] text-ink-500">
                Timings are sample slots — confirm current availability when you enquire.
              </p>
            </Reveal>

            {/* instructors */}
            {assigned.length > 0 && (
              <Reveal delay={60} className="mt-10">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-ink-900">Your instructors</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {assigned.map(
                    (ins) =>
                      ins && (
                        <li key={ins.id}>
                          <Link
                            to="/instructors"
                            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                          >
                            <SafeImage src={ins.photo} alt={ins.photoAlt} className="h-14 w-14 shrink-0 rounded-xl" />
                            <div>
                              <p className="text-[14px] font-extrabold text-ink-900">{ins.name}</p>
                              <p className="text-[12px] font-semibold text-ink-500">{ins.role}</p>
                              <p className="mt-0.5 text-[11.5px] font-medium text-brand-700">{ins.specialties.join(" · ")}</p>
                            </div>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </Reveal>
            )}
          </div>

          {/* ---------- enquiry sidebar ---------- */}
          <aside className="lg:sticky lg:top-26 lg:h-fit">
            <Reveal>
              <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Book this course</span>
                  <Chip tone={statusTone[course.status]}>{course.status}</Chip>
                </div>

                <dl className="mt-5 space-y-3.5 border-y border-line py-5">
                  {[
                    { icon: CalendarDays, dt: "Typical duration", dd: course.duration },
                    { icon: Layers, dt: "Practical sessions", dd: `${course.sessions} sessions` },
                    { icon: Car, dt: "Training vehicle", dd: vehicleLabels[course.vehicleType] },
                    { icon: GraduationCap, dt: "Suited for", dd: goalLabels[course.goal] },
                  ].map(({ icon: Icon, dt, dd }) => (
                    <div key={dt} className="flex items-center gap-3 text-[14px]">
                      <Icon className="h-4.5 w-4.5 shrink-0 text-brand-600" aria-hidden />
                      <dt className="flex-1 font-semibold text-ink-500">{dt}</dt>
                      <dd className="font-extrabold text-ink-900">{dd}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-paper-100 p-4">
                  <IndianRupee className="h-5 w-5 shrink-0 text-brand-700" aria-hidden />
                  <p className="text-[13px] leading-snug font-semibold text-ink-700">
                    Fees shared on enquiry — a full, itemised breakdown before you pay anything.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button to={`/contact?course=${course.id}`} size="lg" arrow>
                    Enquire About This Course
                  </Button>
                  <Button to={`/contact?course=${course.id}&intent=trial`} size="lg" variant="outline-dark">
                    Book a Trial Lesson
                  </Button>
                </div>
                <p className="mt-4 text-center text-[12px] font-medium text-ink-500">
                  We respond during business hours ({site.hours}).
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-5">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand-700 transition-colors hover:text-brand-800"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to all courses
              </Link>
            </Reveal>
          </aside>
        </div>

        {/* related */}
        <div className="border-t border-line bg-white">
          <div className="container-x section-pad">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">Learners also consider</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <CourseCard key={c.id} course={c} delay={i * 80} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

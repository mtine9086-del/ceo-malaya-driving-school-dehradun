import { Link } from "react-router-dom";
import { ArrowRight, Bike, Car, CalendarDays, Layers, Cog, IndianRupee } from "lucide-react";
import { Chip, SafeImage, Reveal } from "@/components/ui";
import type { Course } from "@/data/courses";
import { transmissionLabels } from "@/data/courses";

const statusTone: Record<Course["status"], "green" | "amber" | "blue"> = {
  "Batch open": "green",
  "Filling fast": "amber",
  "On request": "blue",
};

export default function CourseCard({ course, delay = 0 }: { course: Course; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <Link
        to={`/courses/${course.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <SafeImage
            src={course.images[0].src}
            alt={course.images[0].alt}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-900/45 to-transparent" aria-hidden />
          <Chip tone={statusTone[course.status]} className="absolute top-3 left-3 border-transparent bg-white/95 shadow-sm backdrop-blur">
            {course.status}
          </Chip>
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-white/95">
            {course.vehicleType === "two-wheeler" ? (
              <Bike className="h-4 w-4" aria-hidden />
            ) : (
              <Car className="h-4 w-4" aria-hidden />
            )}
            {course.vehicleType === "both" ? "Two & four-wheeler" : course.vehicleType === "two-wheeler" ? "Two-wheeler" : "Four-wheeler"}
            <span aria-hidden>·</span>
            <Cog className="h-3.5 w-3.5" aria-hidden />
            {transmissionLabels[course.transmission]}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-extrabold tracking-tight text-ink-900 transition-colors group-hover:text-brand-700">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-ink-600">{course.blurb}</p>

          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-ink-500">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-brand-600" aria-hidden />
              <dt className="sr-only">Duration</dt>
              <dd>{course.duration}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-brand-600" aria-hidden />
              <dt className="sr-only">Sessions</dt>
              <dd>{course.sessions} sessions</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-between border-t border-line/80 pt-4">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-500">
              <IndianRupee className="h-4 w-4 text-brand-600" aria-hidden />
              Fees shared on enquiry
            </span>
            <span className="flex items-center gap-1 text-[13.5px] font-bold text-brand-700 transition-transform duration-300 group-hover:translate-x-1">
              Details
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

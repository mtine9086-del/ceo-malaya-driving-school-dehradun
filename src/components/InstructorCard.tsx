import { Chip, Reveal, SafeImage } from "@/components/ui";
import type { Instructor } from "@/data/content";

export default function InstructorCard({ instructor, delay = 0 }: { instructor: Instructor; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative aspect-[4/5] overflow-hidden">
          <SafeImage
            src={instructor.photo}
            alt={instructor.photoAlt}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/55 to-transparent" aria-hidden />
          <div className="absolute bottom-4 left-4">
            <p className="font-display text-lg font-extrabold tracking-tight text-white">{instructor.name}</p>
            <p className="text-[12.5px] font-semibold text-white/85">{instructor.role}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5">
            {instructor.specialties.map((s) => (
              <Chip key={s} tone="blue">
                {s}
              </Chip>
            ))}
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-ink-600">{instructor.bio}</p>
        </div>
      </div>
    </Reveal>
  );
}

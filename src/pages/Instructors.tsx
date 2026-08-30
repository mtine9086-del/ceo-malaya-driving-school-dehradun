import { site } from "@/config/site";
import { instructors } from "@/data/content";
import InstructorCard from "@/components/InstructorCard";
import { PageMeta, Reveal, Button, SectionHeading, EmptyState } from "@/components/ui";
import { Users } from "lucide-react";

export default function Instructors() {
  return (
    <>
      <PageMeta
        title="Our Instructors | Malay Driving School, Dehradun"
        description="Meet the patient, local driving instructors at Malay Driving School — specialists in manual and automatic cars, two-wheelers, women's batches and RTO test preparation."
      />

      <div className="border-b border-line bg-white pt-28 pb-12 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="The people"
            title="Instructors who never rush a learner"
            lead="Every Malay instructor teaches on quiet lanes and the cone ground first, and is chosen as much for patience as for skill behind the wheel."
          />
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x">
          {site.instructorsPublished ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {instructors.map((ins, i) => (
                <InstructorCard key={ins.id} instructor={ins} delay={i * 90} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Users className="h-6 w-6" aria-hidden />}
              title="Instructor profiles are coming soon"
              note="We're putting together photos and bios for our instructors. In the meantime, tell us your comfort level and preferred timing when you enquire — we will pair you with the right instructor and confirm who you'll be learning with."
            >
              <Button to="/contact" variant="secondary" arrow>
                Enquire now
              </Button>
            </EmptyState>
          )}

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-white p-7 shadow-card sm:flex-row sm:items-center sm:p-9">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                  Not sure which instructor fits you?
                </h2>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-600">
                  Tell us your comfort level and preferred timing — we will pair you with the right instructor and
                  batch, at no charge for asking.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button to="/contact" variant="secondary" arrow>
                  Enquire now
                </Button>
                <Button to="/courses" variant="outline-dark">
                  View courses
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

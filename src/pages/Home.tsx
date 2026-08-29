import { site } from "@/config/site";
import { PageMeta } from "@/components/ui";
import CourseFinder from "@/components/CourseFinder";
import {
  Hero,
  TrustStrip,
  Categories,
  FeaturedCourses,
  WhyChoose,
  ServiceArea,
  Process,
  CTABand,
} from "@/sections/home";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  name: site.name,
  description: site.description,
  url: site.baseUrl,
  image: `${site.baseUrl}/images/hero.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Laksar",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Laksar" },
    { "@type": "City", name: "Haridwar" },
    { "@type": "City", name: "Roorkee" },
  ],
};

export default function Home() {
  return (
    <>
      <PageMeta
        title="Malay Driving School | Car & Two-Wheeler Training in Laksar, Haridwar"
        description="Patient, safety-first car and two-wheeler driving lessons in Laksar, Haridwar (Uttarakhand) — manual and automatic, new learner and refresher batches. Book a trial lesson."
        jsonLd={jsonLd}
      />
      <Hero />

      {/* Course finder overlaps the hero */}
      <div className="container-x relative z-10 -mt-12 sm:-mt-14">
        <CourseFinder />
      </div>

      <TrustStrip />
      <Categories />
      <FeaturedCourses />
      <WhyChoose />
      <ServiceArea />
      <Process />
      {/* Testimonials section intentionally not rendered — src/data/content.ts
          `testimonials` are sample/placeholder entries. Re-add <Testimonials />
          here once the school supplies real reviews. */}
      <CTABand />
    </>
  );
}

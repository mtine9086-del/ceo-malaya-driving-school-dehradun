/* ================================================================== */
/*  PROJECT CONTENT CONFIG                                            */
/*  ---------------------------------------------------------------- */
/*  Every business-facing value lives here so it can be updated from  */
/*  one place. Empty strings mean the detail has NOT been supplied    */
/*  yet — the UI hides those elements automatically instead of        */
/*  inventing facts. Fill them in as the school provides them.        */
/* ================================================================== */

export const site = {
  name: "Malay Driving School",
  short: "Malay",
  tagline: "Learn to drive with confidence",
  description:
    "Patient, safety-first car and two-wheeler driving lessons in Dehradun (Uttarakhand) — for first-time and returning learners.",

  /* EDIT: set the real production domain before launch */
  baseUrl: "https://malaydrivingschool.in",

  region: "Dehradun, Uttarakhand",
  hours: "Mon – Sat · morning & evening batches",

  /* EDIT — contact channels. Leave "" until the real value is supplied.
     When filled, Call / WhatsApp / Email buttons appear automatically. */
  phone: "", // e.g. "+91 98765 43210"
  whatsapp: "", // digits only, with country code, e.g. "919876543210"
  email: "", // e.g. "hello@malaydrivingschool.in"
  addressLine: "Ballupur Chowk, Satya Vihar, Ballupur, Dehradun, Uttarakhand 248001",

  /* EDIT — add only real, live social profiles */
  socials: [] as { label: string; href: string }[],

  /* EDIT — the instructor names, photos and bios in src/data/content.ts
     are clearly-marked SAMPLE data (fictional people, illustrative
     photos) so the Instructors page and course pages have a real
     layout to review before launch. Set this to true only once the
     school's actual instructor photos, names and bios have replaced
     the sample entries — until then this stays false so no fictional
     person is presented as real staff. */
  instructorsPublished: false,

  /* Hero media. Poster always renders first for performance.
     EDIT: drop web-optimized variants into /public/media and set paths.
     Recommended: desktop 1080p mp4 ≤ ~6 MB · mobile 720p ≤ ~3 MB ·
     keep the original master file OUT of /public. */
  media: {
    heroVideo: "",
    heroVideoMobile: "",
    heroPoster: "images/hero.jpg",
  },
} as const;

/* Derived helpers -------------------------------------------------- */
export const hasPhone = site.phone.trim().length > 0;
export const hasWhatsapp = site.whatsapp.trim().length > 0;
export const hasEmail = site.email.trim().length > 0;

export const telHref = `tel:${site.phone.replace(/[\s-]/g, "")}`;
export const waHref = `https://wa.me/${site.whatsapp}`;
export const mailHref = `mailto:${site.email}`;

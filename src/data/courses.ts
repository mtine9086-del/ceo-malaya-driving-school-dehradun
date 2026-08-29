/* ================================================================== */
/*  COURSE DATA MODEL                                                 */
/*  ---------------------------------------------------------------- */
/*  Structured so courses can later come from a CMS / JSON / API.     */
/*  `fee` is deliberately null everywhere — fees must never be        */
/*  invented. Durations / session counts below are editable sample    */
/*  structures supplied by the school; update with verified values.   */
/* ================================================================== */

export type VehicleType = "two-wheeler" | "four-wheeler" | "both";
export type Transmission = "manual" | "automatic" | "any";
export type Goal = "new" | "refresher" | "test-prep";
export type CourseStatus = "Batch open" | "Filling fast" | "On request";

export interface CourseImage {
  src: string;
  alt: string;
}

export interface Course {
  id: string;
  title: string;
  vehicleType: VehicleType;
  transmission: Transmission;
  goal: Goal;
  /** Editable sample values — replace with the school's verified details */
  duration: string;
  sessions: number;
  fee: number | null; // never fabricate — null renders "shared on enquiry"
  status: CourseStatus;
  featured: boolean;
  blurb: string;
  description: string;
  includes: string[];
  requirements: string[];
  timeSlots: string[];
  images: CourseImage[];
  instructorIds: string[];
  updatedAt: string;
}

export const vehicleLabels: Record<VehicleType, string> = {
  "two-wheeler": "Two-wheeler",
  "four-wheeler": "Four-wheeler",
  both: "Two & four-wheeler",
};

export const transmissionLabels: Record<Transmission, string> = {
  manual: "Manual",
  automatic: "Automatic",
  any: "Manual & automatic",
};

export const goalLabels: Record<Goal, string> = {
  new: "New learner",
  refresher: "Refresher",
  "test-prep": "Licence test prep",
};

const DOCS = [
  "Aadhaar card or another valid ID with your date of birth",
  "Address proof (Aadhaar, voter ID, or utility bill)",
  "Four passport-size photographs",
  "Learner's licence, if you already have one — we help you apply if not",
];

export const courses: Course[] = [
  {
    id: "car-manual",
    title: "Car Training — Manual",
    vehicleType: "four-wheeler",
    transmission: "manual",
    goal: "new",
    duration: "15–21 days",
    sessions: 15,
    fee: null,
    status: "Batch open",
    featured: true,
    blurb: "From first clutch control to confident town and highway driving in a hatchback.",
    description:
      "Our most popular course takes you from sitting in the driver's seat for the first time to handling Laksar's roads — and the Haridwar highway — with confidence. You learn in a well-maintained manual hatchback with an instructor beside you the whole way, starting on quiet lanes and the practice ground before moving to real traffic.",
    includes: [
      "Clutch, gear and steering control from day one",
      "Starting on quiet lanes and the cone practice ground",
      "Parallel and reverse parking practice",
      "Hill starts and slope control",
      "Town traffic, market roads and highway exposure",
      "Mock driving-test session before your RTO test",
    ],
    requirements: DOCS,
    timeSlots: ["Morning · 6:30–8:30 AM", "Day · 10:00 AM–12:00 PM", "Evening · 4:00–6:00 PM"],
    images: [
      {
        src: "images/course-carmt.jpg",
        alt: "Learner driving a white manual training car with an L-board while the instructor guides from the passenger seat",
      },
      {
        src: "images/ground.jpg",
        alt: "Training hatchback weaving between cones at the Malay practice ground",
      },
    ],
    instructorIds: ["ramesh-chauhan", "vikram-bisht"],
    updatedAt: "2026-01-15",
  },
  {
    id: "car-automatic",
    title: "Car Training — Automatic",
    vehicleType: "four-wheeler",
    transmission: "automatic",
    goal: "new",
    duration: "12–15 days",
    sessions: 12,
    fee: null,
    status: "Batch open",
    featured: true,
    blurb: "Learn in an automatic hatchback — no clutch, no gears, just calm road sense.",
    description:
      "If you plan to drive an automatic, learn in one. With no clutch or gear changes to juggle, beginners settle into traffic faster and can focus on judgement, mirrors, spacing and parking. Ideal for anxious first-timers and learners who want the gentlest possible start.",
    includes: [
      "Automatic transmission basics and creep control",
      "Steering, braking and lane discipline",
      "Mirror use, blind spots and safe overtaking",
      "Parking practice — parallel, reverse and garage",
      "Graduated exposure: quiet lanes to town traffic",
      "Mock driving-test session before your RTO test",
    ],
    requirements: DOCS,
    timeSlots: ["Morning · 7:00–9:00 AM", "Evening · 4:00–6:00 PM"],
    images: [
      {
        src: "images/course-carat.jpg",
        alt: "Learner at the wheel of an automatic car with the instructor offering encouragement from the passenger seat",
      },
      {
        src: "images/hero.jpg",
        alt: "Instructor guiding a learner beside a white training car on a quiet Uttarakhand road",
      },
    ],
    instructorIds: ["sunita-rawat", "vikram-bisht"],
    updatedAt: "2026-01-15",
  },
  {
    id: "two-wheeler",
    title: "Two-Wheeler Training",
    vehicleType: "two-wheeler",
    transmission: "any",
    goal: "new",
    duration: "8–10 days",
    sessions: 10,
    fee: null,
    status: "Filling fast",
    featured: true,
    blurb: "Balance, braking and real-road confidence on a scooter — from absolute zero.",
    description:
      "Made for first-time riders: we start with balancing drills at walking pace near the practice ground, then build up to starts, turns, braking and riding in everyday traffic. Helmets are compulsory for every session, and riders who haven't cycled before get extra balance time before touching the road.",
    includes: [
      "Balance-first drills at walking pace",
      "Throttle, brake and clutch-free scooter control",
      "Slow-speed U-turns and figure-of-eight practice",
      "Safe braking distances and wet-road caution",
      "Riding with a pillion and daily-load balance",
      "Mock riding-test prep for the RTO track",
    ],
    requirements: DOCS,
    timeSlots: ["Morning · 6:30–8:30 AM", "Evening · 4:00–5:30 PM"],
    images: [
      {
        src: "images/course-tw.jpg",
        alt: "Young learner practicing on a scooter with a helmet while the instructor encourages him from behind",
      },
    ],
    instructorIds: ["sunita-rawat"],
    updatedAt: "2026-01-15",
  },
  {
    id: "refresher",
    title: "Refresher Course",
    vehicleType: "four-wheeler",
    transmission: "any",
    goal: "refresher",
    duration: "5–7 days",
    sessions: 6,
    fee: null,
    status: "On request",
    featured: false,
    blurb: "Have a licence but lost your touch? Rebuild confidence at your own pace.",
    description:
      "For licence-holders returning to the wheel after months or years away. After a short assessment drive, your instructor focuses only on what you need — whether that is parking, highway nerves, night driving or simply getting comfortable again. Manual or automatic, whichever you own or plan to drive.",
    includes: [
      "Short assessment drive to plan your sessions",
      "Focus on your weak spots — parking, slopes, traffic",
      "Choose manual or automatic practice car",
      "Optional night-driving and highway sessions",
      "No judgement — pacing set entirely by you",
    ],
    requirements: ["Valid or expired driving licence (any Indian state)", "Aadhaar card or another valid ID"],
    timeSlots: ["Flexible — fixed with your instructor"],
    images: [
      {
        src: "images/course-refresher.jpg",
        alt: "Confident woman driving a hatchback during a refresher lesson on a small-town road",
      },
    ],
    instructorIds: ["ramesh-chauhan"],
    updatedAt: "2026-01-15",
  },
  {
    id: "licence-assistance",
    title: "Learner's Licence & RTO Test Guidance",
    vehicleType: "both",
    transmission: "any",
    goal: "test-prep",
    duration: "3 sessions",
    sessions: 3,
    fee: null,
    status: "Batch open",
    featured: false,
    blurb: "Step-by-step help with the LL application, road-sign prep and the RTO driving test.",
    description:
      "We walk you through the learner's licence application on Sarathi, help you prepare for the sign and rules test in our classroom, and run mock practical tests on the same patterns used at the RTO. Note: licences are issued only by the RTO — we prepare and accompany you, we do not issue licences ourselves.",
    includes: [
      "Sarathi application walkthrough and document checklist",
      "Classroom session on road signs and traffic rules",
      "Question practice for the computerised LL test",
      "Mock practical test on RTO test patterns",
      "Guidance on test-day process at the RTO office",
    ],
    requirements: DOCS,
    timeSlots: ["Day · 11:00 AM–1:00 PM"],
    images: [
      {
        src: "images/classroom.jpg",
        alt: "Instructor explaining hand-drawn road signs on a whiteboard to a small group of learners",
      },
      {
        src: "images/ground.jpg",
        alt: "Training car practicing between cones at the Malay practice ground",
      },
    ],
    instructorIds: ["vikram-bisht"],
    updatedAt: "2026-01-15",
  },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id);
export const featuredCourses = courses.filter((c) => c.featured);
export const relatedCourses = (course: Course) =>
  courses
    .filter((c) => c.id !== course.id)
    .sort((a, b) => Number(b.vehicleType === course.vehicleType) - Number(a.vehicleType === course.vehicleType))
    .slice(0, 3);

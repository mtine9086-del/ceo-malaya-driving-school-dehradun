/* ================================================================== */
/*  SITE CONTENT                                                      */
/*  Instructors, categories, process steps, service areas, FAQs and   */
/*  testimonials. Names and quotes are clearly editable sample        */
/*  entries — swap in the school's real people and reviews anytime.   */
/* ================================================================== */

export interface Instructor {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  specialties: string[];
  bio: string;
}

export const instructors: Instructor[] = [
  {
    id: "ramesh-chauhan",
    name: "Ramesh Chauhan",
    role: "Senior Driving Instructor",
    photo: "images/instructor-1.jpg",
    photoAlt: "Portrait of instructor Ramesh Chauhan beside a white training car",
    specialties: ["Manual cars", "Hill starts", "Highway driving"],
    bio: "Known around the practice ground for never raising his voice, Ramesh teaches clutch control and hill starts with endless patience — a favourite with nervous first-timers.",
  },
  {
    id: "sunita-rawat",
    name: "Sunita Rawat",
    role: "Driving Instructor",
    photo: "images/instructor-2.jpg",
    photoAlt: "Portrait of instructor Sunita Rawat holding a helmet beside a training scooter",
    specialties: ["Two-wheelers", "Automatic cars", "Women learners"],
    bio: "Sunita leads our two-wheeler programme and dedicated batches for women learners, with a balance-first method that gets absolute beginners riding confidently.",
  },
  {
    id: "vikram-bisht",
    name: "Vikram Singh Bisht",
    role: "Driving Instructor",
    photo: "images/instructor-3.jpg",
    photoAlt: "Portrait of instructor Vikram Singh Bisht at the cone practice ground",
    specialties: ["RTO test prep", "Automatic cars", "Parking drills"],
    bio: "Vikram runs the mock-test sessions at the cone ground and knows the RTO test patterns inside out — his parking drills are famous with past learners.",
  },
];

export const getInstructor = (id: string) => instructors.find((i) => i.id === id);

/* --- Course categories (home) ------------------------------------- */
export interface Category {
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
  to: string;
}

export const categories: Category[] = [
  {
    title: "Two-Wheeler Training",
    desc: "Balance-first scooter lessons, from absolute zero to daily traffic.",
    image: "images/course-tw.jpg",
    imageAlt: "Learner practicing on a scooter with the instructor nearby",
    to: "/courses?vehicle=two-wheeler",
  },
  {
    title: "Four-Wheeler · Manual",
    desc: "Clutch, gears and hill starts in a well-kept hatchback.",
    image: "images/course-carmt.jpg",
    imageAlt: "Learner driving a manual training car with an L-board",
    to: "/courses?transmission=manual",
  },
  {
    title: "Four-Wheeler · Automatic",
    desc: "The gentlest start — no clutch, just calm road sense.",
    image: "images/course-carat.jpg",
    imageAlt: "Learner at the wheel of an automatic car with the instructor beside her",
    to: "/courses?transmission=automatic",
  },
  {
    title: "Refresher Course",
    desc: "For licence-holders getting back behind the wheel.",
    image: "images/course-refresher.jpg",
    imageAlt: "Confident woman driving during a refresher lesson",
    to: "/courses?goal=refresher",
  },
  {
    title: "LL & RTO Assistance",
    desc: "Application help, sign practice and mock driving tests.",
    image: "images/classroom.jpg",
    imageAlt: "Road-sign classroom session with whiteboard sketches",
    to: "/courses?goal=test-prep",
  },
];

/* --- Trust points (home hero strip) -------------------------------- */
export const trustPoints = [
  { title: "Patient local instructors", note: "Trained to teach first-time and nervous learners without pressure." },
  { title: "Well-kept training vehicles", note: "Serviced hatchbacks and scooters with learner L-boards fitted." },
  { title: "Morning & evening batches", note: "Timings that fit around school, college and work hours." },
  { title: "Fee clarity before you start", note: "Course fees and what they cover explained up front — on enquiry." },
];

/* --- Why choose (home) --------------------------------------------- */
export const whyChoose = [
  {
    title: "Beginner & nerves-friendly",
    note: "Many of our learners are sitting in a driver's seat for the very first time. We expect nervousness and plan for it — quiet lanes first, traffic later.",
  },
  {
    title: "Real local roads",
    note: "You practice where you will actually drive: Laksar's lanes and markets, then the Roorkee–Haridwar road when you are ready.",
  },
  {
    title: "Cone practice ground",
    note: "Parking, reversing and slalom drills on an open ground before you meet real traffic.",
  },
  {
    title: "Two & four-wheeler under one roof",
    note: "One school for the whole family — scooters, bikes, manual and automatic cars.",
  },
  {
    title: "Dedicated batches for women",
    note: "Comfortable, respectful batches for women learners, including two-wheeler groups.",
  },
  {
    title: "Licence test preparation",
    note: "Classroom sign practice plus mock tests on RTO patterns, so test day holds no surprises.",
  },
];

/* --- Process steps (home) ------------------------------------------- */
export const processSteps = [
  {
    title: "Enquire & choose your course",
    note: "Tell us what you want to learn — we suggest the right batch and explain fees on enquiry.",
  },
  {
    title: "Get matched with an instructor",
    note: "We pair you with an instructor and a timing that suits your day.",
  },
  {
    title: "Attend practical sessions",
    note: "Ground drills first, then calm lanes, then real town and highway traffic.",
  },
  {
    title: "Practice & mock tests",
    note: "Parking drills, sign practice and a mock driving test when you are close to ready.",
  },
  {
    title: "Licence test support",
    note: "We guide you through the RTO process — the licence itself is issued by the RTO.",
  },
];

/* --- Service areas --------------------------------------------------- */
export const serviceAreas = [
  { name: "Laksar", note: "Home base — practice ground and classroom", primary: true },
  { name: "Haridwar", note: "Pickup points for weekly batches", primary: false },
  { name: "Roorkee", note: "Pickup points for weekly batches", primary: false },
  { name: "Nearby villages", note: "Coverage varies — ask us when you enquire", primary: false },
];

/* --- Testimonials (editable samples) --------------------------------- */
export const testimonials = [
  {
    quote:
      "I was scared of even starting the scooter. By the second week I was riding to the market on my own. The instructors never once made me feel slow.",
    name: "Pooja R.",
    area: "Laksar",
    course: "Two-wheeler training",
  },
  {
    quote:
      "Sir taught me hill starts and parking on the ground before taking me into traffic. Cleared my driving test in the first attempt.",
    name: "Aarav S.",
    area: "Haridwar",
    course: "Car training — manual",
  },
  {
    quote:
      "Got my licence years ago but never really drove. Six refresher sessions later, I now drive myself to Roorkee every day for work.",
    name: "Mohit K.",
    area: "Roorkee",
    course: "Refresher course",
  },
];

/* --- FAQs (contact page) --------------------------------------------- */
export const faqs = [
  {
    q: "Do I need my own vehicle to learn?",
    a: "No. All practical sessions use our training cars and scooters, fitted with learner L-boards. You only need comfortable footwear and your documents.",
  },
  {
    q: "How do I get a learner's licence (LL)?",
    a: "We walk you through the online Sarathi application, help you prepare for the sign-and-rules test, and tell you exactly what to carry on the day. The licence itself is issued by the RTO.",
  },
  {
    q: "What are the course fees?",
    a: "Fees depend on the vehicle type, transmission and number of sessions, so we share them when you enquire — with everything clearly explained before you join. There are no hidden extras.",
  },
  {
    q: "Are there separate batches for women?",
    a: "Yes. We run dedicated batches for women learners, including two-wheeler groups, taught with the same patient, safety-first method.",
  },
  {
    q: "I'm very nervous. Can I still learn?",
    a: "Absolutely — most of our learners start nervous. We begin on quiet lanes and the practice ground, and only move into traffic when you feel ready. Pacing is set by you, not the clock.",
  },
];

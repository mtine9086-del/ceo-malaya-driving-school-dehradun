import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Instructors from "@/pages/Instructors";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import { Privacy, NotFound } from "@/pages/Misc";

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const onContact = pathname.startsWith("/contact");
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      {/* bottom padding keeps the mobile sticky CTA from covering content */}
      <main id="main" className={onContact ? "" : "pb-20 md:pb-0"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  );
}

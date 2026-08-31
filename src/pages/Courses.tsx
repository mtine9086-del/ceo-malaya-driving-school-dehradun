import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, Search, SearchX, RotateCcw, IndianRupee } from "lucide-react";
import { courses, vehicleLabels, transmissionLabels } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import { PageMeta, EmptyState, Reveal, Button } from "@/components/ui";

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input appearance-none py-2.5 pr-10 text-[13.5px]" aria-label={label}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
      </div>
    </div>
  );
}

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const vehicle = params.get("vehicle") ?? "";
  const transmission = params.get("transmission") ?? "";
  const goal = params.get("goal") ?? "";
  const time = params.get("time") ?? "";
  const sort = params.get("sort") ?? "recommended";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });
  const hasFilters = Boolean(q || vehicle || transmission || goal || time || sort !== "recommended");

  const results = useMemo(() => {
    let list = [...courses];
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((c) => `${c.title} ${c.blurb}`.toLowerCase().includes(needle));
    }
    if (vehicle) list = list.filter((c) => c.vehicleType === vehicle || c.vehicleType === "both");
    if (transmission) list = list.filter((c) => c.transmission === transmission || c.transmission === "any");
    if (goal) list = list.filter((c) => c.goal === goal);
    if (time) {
      const word = time === "day" ? "day" : time;
      list = list.filter((c) => c.timeSlots.join(" ").toLowerCase().includes(word));
    }
    if (sort === "sessions-desc") list.sort((a, b) => b.sessions - a.sessions);
    else if (sort === "sessions-asc") list.sort((a, b) => a.sessions - b.sessions);
    else list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [q, vehicle, transmission, goal, time, sort]);

  return (
    <>
      <PageMeta
        title="Courses & Batches | Malay Driving School, Dehradun"
        description="Two-wheeler, manual and automatic car driving courses in Dehradun — plus refresher lessons and learner's licence (LL) & RTO test guidance. Fees shared clearly on enquiry."
      />

      {/* page header */}
      <div className="border-b border-line bg-surface pt-28 pb-12 sm:pt-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">
              <span className="inline-block h-[2px] w-6 bg-brand-600" aria-hidden />
              Courses & batches
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold text-balance text-ink-900 sm:text-4xl lg:text-5xl">
              Find the right course for how you want to drive
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">
              Two-wheeler or four-wheeler, manual or automatic, first lesson or refresher — filter below, or send a
              quick enquiry and we will recommend a batch.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="section-pad">
        <div className="container-x">
          {/* filter bar */}
          <Reveal>
            <div className="rounded-3xl border border-line bg-surface p-4 shadow-card sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_1fr_auto]">
                <div className="sm:col-span-2 lg:col-span-1">
                  <label htmlFor="course-search" className="sr-only">
                    Search courses
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
                    <input
                      id="course-search"
                      type="search"
                      value={q}
                      onChange={(e) => update("q", e.target.value)}
                      placeholder="Search courses…"
                      className="input py-2.5 pl-10 text-[13.5px]"
                    />
                  </div>
                </div>
                <Select
                  id="f-vehicle"
                  label="Filter by vehicle type"
                  value={vehicle}
                  onChange={(v) => update("vehicle", v)}
                  options={[
                    { value: "", label: "All vehicles" },
                    { value: "two-wheeler", label: vehicleLabels["two-wheeler"] },
                    { value: "four-wheeler", label: vehicleLabels["four-wheeler"] },
                  ]}
                />
                <Select
                  id="f-trans"
                  label="Filter by transmission"
                  value={transmission}
                  onChange={(v) => update("transmission", v)}
                  options={[
                    { value: "", label: "Any transmission" },
                    { value: "manual", label: transmissionLabels.manual },
                    { value: "automatic", label: transmissionLabels.automatic },
                  ]}
                />
                <Select
                  id="f-goal"
                  label="Filter by learning goal"
                  value={goal}
                  onChange={(v) => update("goal", v)}
                  options={[
                    { value: "", label: "Any goal" },
                    { value: "new", label: "New learner" },
                    { value: "refresher", label: "Refresher" },
                    { value: "test-prep", label: "Licence test prep" },
                  ]}
                />
                <Select
                  id="f-time"
                  label="Filter by batch timing"
                  value={time}
                  onChange={(v) => update("time", v)}
                  options={[
                    { value: "", label: "Any timing" },
                    { value: "morning", label: "Morning" },
                    { value: "day", label: "Daytime" },
                    { value: "evening", label: "Evening" },
                  ]}
                />
                <Select
                  id="f-sort"
                  label="Sort courses"
                  value={sort}
                  onChange={(v) => update("sort", v)}
                  options={[
                    { value: "recommended", label: "Recommended" },
                    { value: "sessions-desc", label: "Most sessions" },
                    { value: "sessions-asc", label: "Fewest sessions" },
                  ]}
                />
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={!hasFilters}
                  className="flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-line px-4 text-[13px] font-bold text-ink-600 transition-colors hover:bg-paper-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                  Reset
                </button>
              </div>
            </div>
          </Reveal>

          {/* results */}
          <p className="mt-8 mb-5 text-[13.5px] font-semibold text-ink-500" role="status" aria-live="polite">
            {results.length === 1 ? "1 course found" : `${results.length} courses found`}
          </p>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((c, i) => (
                <CourseCard key={c.id} course={c} delay={(i % 3) * 90} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<SearchX className="h-6 w-6" aria-hidden />}
              title="No courses match those filters"
              note="Try widening the timing or vehicle type — or tell us what you need and we will suggest the right batch."
            >
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline-dark" onClick={clearAll}>
                  Clear filters
                </Button>
                <Button to="/contact" variant="secondary">
                  Ask us directly
                </Button>
              </div>
            </EmptyState>
          )}

          {/* fees note */}
          <Reveal className="mt-12">
            <div className="flex flex-col items-start gap-4 rounded-3xl border border-accent-500/25 bg-accent-100/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-navy-950">
                  <IndianRupee className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-[15.5px] font-extrabold tracking-tight text-ink-900">Course fees, explained before you join</h2>
                  <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-ink-600">
                    Fees vary by vehicle, transmission and sessions. We share the exact amount and everything it
                    includes when you enquire — no hidden extras, ever.
                  </p>
                </div>
              </div>
              <Button to="/contact" variant="secondary" arrow className="shrink-0">
                Enquire for fees
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Cog, CarFront, GraduationCap, Clock3 } from "lucide-react";
import { Reveal } from "@/components/ui";

/* ------------------------------------------------------------------ */
/*  Quick course finder — keyboard accessible, mobile friendly         */
/* ------------------------------------------------------------------ */

type FieldProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
};

function SelectField({ id, label, icon, value, onChange, options }: FieldProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="flex items-center gap-1.5 text-[12px] font-bold tracking-wide uppercase text-ink-500">
        {icon}
        {label}
      </label>
      <div className="relative mt-2">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input appearance-none pr-10">
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
      </div>
    </div>
  );
}

export default function CourseFinder() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState("");
  const [transmission, setTransmission] = useState("");
  const [goal, setGoal] = useState("");
  const [timing, setTiming] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (vehicle) params.set("vehicle", vehicle);
    if (transmission) params.set("transmission", transmission);
    if (goal) params.set("goal", goal);
    if (timing) params.set("time", timing);
    const query = params.toString();
    navigate(`/courses${query ? `?${query}` : ""}`);
  };

  return (
    <Reveal className="relative z-10" y={30}>
      <form
        onSubmit={submit}
        aria-label="Quick course finder"
        className="rounded-3xl border border-line bg-white/95 p-5 shadow-pop backdrop-blur-md sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-extrabold tracking-tight text-ink-900">Find your course</h2>
          <p className="text-[12.5px] font-medium text-ink-500">Takes 10 seconds — no sign-up needed</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <SelectField
            id="finder-vehicle"
            label="Vehicle"
            icon={<CarFront className="h-3.5 w-3.5" aria-hidden />}
            value={vehicle}
            onChange={setVehicle}
            options={[
              { value: "", label: "Any vehicle" },
              { value: "two-wheeler", label: "Two-wheeler" },
              { value: "four-wheeler", label: "Four-wheeler (car)" },
            ]}
          />
          <SelectField
            id="finder-transmission"
            label="Transmission"
            icon={<Cog className="h-3.5 w-3.5" aria-hidden />}
            value={transmission}
            onChange={setTransmission}
            options={[
              { value: "", label: "Any type" },
              { value: "manual", label: "Manual" },
              { value: "automatic", label: "Automatic" },
            ]}
          />
          <SelectField
            id="finder-goal"
            label="I am a"
            icon={<GraduationCap className="h-3.5 w-3.5" aria-hidden />}
            value={goal}
            onChange={setGoal}
            options={[
              { value: "", label: "Any learner" },
              { value: "new", label: "New learner" },
              { value: "refresher", label: "Returning driver" },
              { value: "test-prep", label: "Test candidate" },
            ]}
          />
          <SelectField
            id="finder-timing"
            label="Timing"
            icon={<Clock3 className="h-3.5 w-3.5" aria-hidden />}
            value={timing}
            onChange={setTiming}
            options={[
              { value: "", label: "Any time" },
              { value: "morning", label: "Morning" },
              { value: "day", label: "Daytime" },
              { value: "evening", label: "Evening" },
            ]}
          />
          <div className="col-span-2 flex items-end lg:col-span-1">
            <button
              type="submit"
              className="inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 font-display text-[14.5px] font-bold text-navy-950 shadow-[0_10px_24px_-10px_rgb(201_122_8/0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-300 active:translate-y-0"
            >
              <Search className="h-4.5 w-4.5" aria-hidden />
              Find My Course
            </button>
          </div>
        </div>
      </form>
    </Reveal>
  );
}

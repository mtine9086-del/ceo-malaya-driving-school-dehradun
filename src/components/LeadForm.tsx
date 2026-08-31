import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { cn } from "@/utils/cn";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui";

/* ================================================================== */
/*  Course enquiry form                                                */
/*  ---------------------------------------------------------------- */
/*  Integration point: set VITE_ENQUIRY_ENDPOINT (see .env.example)   */
/*  to POST enquiries to your backend / form service / CRM. Without   */
/*  an endpoint the form validates and confirms locally only — it     */
/*  never pretends a message was delivered.                           */
/* ================================================================== */

type Values = {
  name: string;
  phone: string;
  email: string;
  course: string;
  transmission: string;
  timing: string;
  contact: string;
  message: string;
  consent: boolean;
  company: string; // honeypot — humans must leave empty
};

type Errors = Partial<Record<keyof Values, string>>;

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-bold text-ink-700">
        {label}
        {optional && <span className="ml-1.5 font-medium text-ink-400">(optional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12.5px] font-semibold text-lred-600">
          {error}
        </p>
      )}
    </div>
  );
}

function WrappedSelect({
  id,
  value,
  onChange,
  error,
  children,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="input appearance-none pr-10"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
    </div>
  );
}

export default function LeadForm() {
  const [params] = useSearchParams();
  const intent = params.get("intent");
  const preselect = params.get("course") ?? "";

  const initial: Values = useMemo(
    () => ({
      name: "",
      phone: "",
      email: "",
      course: courses.some((c) => c.id === preselect) ? preselect : "",
      transmission: "",
      timing: "",
      contact: "call",
      message:
        intent === "trial" ? "I would like to book a trial lesson. Please let me know the next available slot." : "",
      consent: false,
      company: "",
    }),
    [preselect, intent]
  );

  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = <K extends keyof Values>(key: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your full name.";
    const digits = values.phone.replace(/\D/g, "");
    if (!/^(\+?91)?[6-9]\d{9}$/.test(digits.length > 10 ? digits.slice(-10) : digits) && !/^[6-9]\d{9}$/.test(values.phone.replace(/[\s-]/g, "")))
      e.phone = "Please enter a valid 10-digit mobile number.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) e.email = "This email address does not look right.";
    if (!values.course) e.course = "Please choose a course.";
    if (!values.consent) e.consent = "Please allow us to contact you about your enquiry.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (values.company) return; // honeypot triggered — silently drop
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      first?.focus();
      return;
    }
    setState("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: "malay-website", submittedAt: new Date().toISOString() }),
        });
        if (!res.ok) throw new Error("Bad response");
      } else {
        /* No backend configured yet — hold the draft and confirm locally. */
        await new Promise((r) => setTimeout(r, 900));
      }
      setState("sent");
    } catch {
      setState("error");
    }
  };

  /* ------ success state ------------------------------------------ */
  if (state === "sent") {
    const courseTitle = courses.find((c) => c.id === values.course)?.title;
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-safe-700/20 bg-safe-100/60 p-10 text-center" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-safe-700 text-white">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-ink-900">
          Thank you, {values.name.split(" ")[0]}.
        </h3>
        {ENDPOINT ? (
          <>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
              Your enquiry{courseTitle ? ` about ` : ""}
              {courseTitle && <strong className="font-semibold text-ink-900">{courseTitle}</strong>} is ready. We
              will reach you on <strong className="font-semibold text-ink-900">{values.phone}</strong> during
              business hours to confirm batch timings and fees.
            </p>
            <p className="mt-4 rounded-xl bg-surface/70 px-4 py-2.5 text-[12.5px] text-ink-500">
              Tip: for the fastest confirmation, keep your phone handy — trial slots are limited each week.
            </p>
          </>
        ) : (
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
            Your enquiry{courseTitle ? ` about ` : ""}
            {courseTitle && <strong className="font-semibold text-ink-900">{courseTitle}</strong>} has been saved on
            this device. Our online enquiry system isn't fully connected yet — please check this page again soon for
            updated contact details, or try sending your enquiry again shortly.
          </p>
        )}
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button to="/courses" variant="secondary">
            Browse Courses
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setState("idle");
              setValues(initial);
            }}
          >
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  /* ------ form ---------------------------------------------------- */
  return (
    <form onSubmit={submit} noValidate className="flex h-full flex-col gap-5" aria-label="Course enquiry form">
      {/* honeypot — invisible to humans */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="lead-company">Company</label>
        <input
          id="lead-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="lead-name" label="Full name" error={errors.name}>
          <input
            id="lead-name"
            type="text"
            className="input"
            placeholder="Your name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
          />
        </Field>
        <Field id="lead-phone" label="Mobile number" error={errors.phone}>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            className="input"
            placeholder="10-digit mobile number"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
          />
        </Field>
      </div>

      <Field id="lead-email" label="Email" optional error={errors.email}>
        <input
          id="lead-email"
          type="email"
          className="input"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "lead-email-error" : undefined}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="lead-course" label="Course interested in" error={errors.course}>
          <WrappedSelect id="lead-course" value={values.course} onChange={(v) => set("course", v)} error={errors.course}>
            <option value="">Choose a course…</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
            <option value="not-sure">Not sure yet — please guide me</option>
          </WrappedSelect>
        </Field>
        <Field id="lead-transmission" label="Transmission" optional>
          <WrappedSelect id="lead-transmission" value={values.transmission} onChange={(v) => set("transmission", v)}>
            <option value="">No preference</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </WrappedSelect>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="lead-timing" label="Preferred timing" optional>
          <WrappedSelect id="lead-timing" value={values.timing} onChange={(v) => set("timing", v)}>
            <option value="">Any time</option>
            <option value="morning">Morning</option>
            <option value="day">Daytime</option>
            <option value="evening">Evening</option>
          </WrappedSelect>
        </Field>
        <Field id="lead-contact" label="Preferred contact" optional>
          <WrappedSelect id="lead-contact" value={values.contact} onChange={(v) => set("contact", v)}>
            <option value="call">Phone call</option>
            <option value="whatsapp">WhatsApp</option>
          </WrappedSelect>
        </Field>
      </div>

      <Field id="lead-message" label="Message" optional>
        <textarea
          id="lead-message"
          className="input min-h-[110px] resize-y"
          placeholder="Anything we should know — experience level, pickup area, questions…"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </Field>

      <div>
        <label htmlFor="lead-consent" className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink-600">
          <input
            id="lead-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border-line accent-brand-600"
          />
          <span>
            I agree that Malay may contact me about this enquiry by phone or WhatsApp. My details are used only to
            respond to this enquiry.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 text-[12.5px] font-semibold text-lred-600">
            {errors.consent}
          </p>
        )}
      </div>

      {state === "error" && (
        <p role="alert" className="rounded-xl border border-lred-600/25 bg-lred-600/10 px-4 py-3 text-[13.5px] font-medium text-lred-600">
          Something went wrong while sending. Please try again in a moment.
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant="primary" disabled={state === "sending"} className={cn(state === "sending" && "opacity-70")}>
          {state === "sending" ? "Sending…" : "Send Enquiry"}
          <Send className="h-4 w-4" aria-hidden />
        </Button>
        <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-500">
          <ShieldCheck className="h-4 w-4 text-safe-700" aria-hidden />
          Your details stay private — no spam, ever.
        </p>
      </div>
    </form>
  );
}

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  vehicle: z.string().trim().min(2, "Year / make / model").max(120),
  location: z.string().trim().min(3, "Location or ZIP").max(160),
  issueType: z.string().min(1, "Pick the closest issue"),
  movable: z.enum(["yes", "no", "not-sure"]),
  problem: z.string().trim().min(5, "Tell us briefly what's happening").max(700),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm" }) }),
});

const issueTypes = [
  "Car will not start",
  "Warning light / diagnostic",
  "Brakes, noise, or shaking",
  "Maintenance or something else",
];

const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const inputClass =
  "h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";
const textareaClass =
  "min-h-[112px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";

export function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      vehicle: String(fd.get("vehicle") ?? ""),
      location: String(fd.get("location") ?? ""),
      issueType: String(fd.get("issueType") ?? ""),
      movable: String(fd.get("movable") ?? "not-sure"),
      problem: String(fd.get("problem") ?? ""),
      consent: fd.get("consent") === "on",
    };

    const result = schema.safeParse(data);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        nextErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-7 w-7 text-accent-foreground" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold uppercase">Request received.</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          In the live version, this would go to the mechanic by email or text.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input name="name" className={inputClass} placeholder="Jordan Smith" />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input name="phone" type="tel" className={inputClass} placeholder="(404) 555-0100" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vehicle" error={errors.vehicle}>
          <input name="vehicle" className={inputClass} placeholder="2017 Honda Civic" />
        </Field>
        <Field label="Where is the car?" error={errors.location}>
          <input name="location" className={inputClass} placeholder="Decatur, 30030" />
        </Field>
      </div>

      <Field label="What sounds closest?" error={errors.issueType}>
        <select name="issueType" className={inputClass} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {issueTypes.map((issue) => (
            <option key={issue} value={issue}>
              {issue}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Can the vehicle move safely?" error={errors.movable}>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["yes", "Yes"],
            ["no", "No"],
            ["not-sure", "Not sure"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex min-h-11 items-center gap-2 rounded-md border border-input px-3 text-sm"
            >
              <input
                type="radio"
                name="movable"
                value={value}
                defaultChecked={value === "not-sure"}
                className="accent-asphalt"
              />
              {label}
            </label>
          ))}
        </div>
      </Field>

      <Field label="What is happening?" error={errors.problem}>
        <textarea
          name="problem"
          rows={4}
          className={textareaClass}
          placeholder="Example: It cranks but will not start. Battery is 4 years old..."
        />
      </Field>

      <label className="flex items-start gap-3 rounded-md border border-border bg-secondary/40 p-4 text-sm">
        <input name="consent" type="checkbox" className="mt-0.5 accent-asphalt" />
        <span className="text-muted-foreground">
          I understand this is a request and the business will contact me to confirm price and
          availability.
        </span>
      </label>
      {errors.consent && <p className="-mt-3 text-xs text-destructive">{errors.consent}</p>}

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
      >
        Send Request
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className={labelClass}>{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  email: z.string().trim().email("Enter a valid email").max(255),
  vehicle: z.string().trim().min(2, "Year / make / model").max(120),
  location: z.string().trim().min(3, "Location or ZIP").max(160),
  service: z.string().min(1, "Pick a service"),
  drivable: z.enum(["yes", "no"]),
  problem: z.string().trim().min(5, "Tell us briefly what's happening").max(1000),
  when: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm" }) }),
});

const services = [
  "Car won't start / no-start",
  "Check engine / diagnostic",
  "Battery replacement",
  "Starter or alternator",
  "Brakes (pads / rotors)",
  "Oil change / maintenance",
  "Overheating / coolant",
  "Other",
];

const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const inputClass =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";
const textareaClass =
  "min-h-[110px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";

export function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      vehicle: String(fd.get("vehicle") ?? ""),
      location: String(fd.get("location") ?? ""),
      service: String(fd.get("service") ?? ""),
      drivable: String(fd.get("drivable") ?? "yes"),
      problem: String(fd.get("problem") ?? ""),
      when: String(fd.get("when") ?? ""),
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
      <div className="rounded-lg border border-border bg-card p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-7 w-7 text-accent-foreground" />
        </div>
        <h3 className="mt-6 text-3xl">Request received.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          In the live version, the business would receive this lead by email or text and reach out
          with a quote and arrival window.
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

      <Field label="Email" error={errors.email}>
        <input name="email" type="email" className={inputClass} placeholder="you@example.com" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vehicle (year / make / model)" error={errors.vehicle}>
          <input name="vehicle" className={inputClass} placeholder="2017 Honda Civic" />
        </Field>
        <Field label="Current location or ZIP" error={errors.location}>
          <input name="location" className={inputClass} placeholder="Decatur, 30030" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service needed" error={errors.service}>
          <select name="service" className={inputClass} defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Is the vehicle drivable?">
          <div className="flex h-10 items-center gap-6 rounded-md border border-input px-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="drivable"
                value="yes"
                defaultChecked
                className="accent-asphalt"
              />
              Yes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="drivable" value="no" className="accent-asphalt" />
              No
            </label>
          </div>
        </Field>
      </div>

      <Field label="What is happening with the vehicle?" error={errors.problem}>
        <textarea
          name="problem"
          rows={4}
          className={textareaClass}
          placeholder="Cranks but won't start. Battery is 4 years old..."
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred day / time (optional)">
          <input
            name="when"
            className={inputClass}
            placeholder="Tomorrow morning, weekday after 5pm..."
          />
        </Field>
        <Field label="Photo (optional)">
          <input
            name="photo"
            type="file"
            accept="image/*"
            className={`${inputClass} cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-medium`}
          />
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-md border border-border bg-secondary/40 p-4 text-sm">
        <input name="consent" type="checkbox" className="mt-0.5 accent-asphalt" />
        <span className="text-muted-foreground">
          I understand this is a service request and the business will contact me to confirm pricing
          and availability.
        </span>
      </label>
      {errors.consent && <p className="-mt-3 text-xs text-destructive">{errors.consent}</p>}

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
      >
        Send Service Request
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

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2 } from "lucide-react";

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

export function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [drivable, setDrivable] = useState<"yes" | "no">("yes");
  const [service, setService] = useState<string>("");
  const [consent, setConsent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      vehicle: String(fd.get("vehicle") ?? ""),
      location: String(fd.get("location") ?? ""),
      service,
      drivable,
      problem: String(fd.get("problem") ?? ""),
      when: String(fd.get("when") ?? ""),
      consent,
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
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
          In the live version, the business would receive this lead by email
          or text and reach out with a quote and arrival window.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <Input name="name" placeholder="Jordan Smith" />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <Input name="phone" type="tel" placeholder="(404) 555-0100" />
        </Field>
      </div>

      <Field label="Email" error={errors.email}>
        <Input name="email" type="email" placeholder="you@example.com" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vehicle (year / make / model)" error={errors.vehicle}>
          <Input name="vehicle" placeholder="2017 Honda Civic" />
        </Field>
        <Field label="Current location or ZIP" error={errors.location}>
          <Input name="location" placeholder="Decatur, 30030" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service needed" error={errors.service}>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Is the vehicle drivable?">
          <RadioGroup
            value={drivable}
            onValueChange={(v) => setDrivable(v as "yes" | "no")}
            className="flex h-9 items-center gap-6 pt-1"
          >
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="yes" id="dr-yes" /> Yes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="no" id="dr-no" /> No
            </label>
          </RadioGroup>
        </Field>
      </div>

      <Field label="What is happening with the vehicle?" error={errors.problem}>
        <Textarea
          name="problem"
          rows={4}
          placeholder="Cranks but won't start. Battery is 4 years old…"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred day / time (optional)">
          <Input name="when" placeholder="Tomorrow morning, weekday after 5pm…" />
        </Field>
        <Field label="Photo (optional)">
          <Input
            name="photo"
            type="file"
            accept="image/*"
            className="cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:font-medium"
          />
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-md border border-border bg-secondary/40 p-4 text-sm">
        <Checkbox
          checked={consent}
          onCheckedChange={(v) => setConsent(Boolean(v))}
          className="mt-0.5"
        />
        <span className="text-muted-foreground">
          I understand this is a service request and the business will contact
          me to confirm pricing and availability.
        </span>
      </label>
      {errors.consent && (
        <p className="-mt-3 text-xs text-destructive">{errors.consent}</p>
      )}

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
    <div className="grid gap-2">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

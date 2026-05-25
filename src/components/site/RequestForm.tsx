import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type IssueType = "no-start" | "diagnostic" | "brakes" | "maintenance";

type QuoteResult = {
  range: string;
  note: string;
};

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  vehicle: z.string().trim().min(2, "Year / make / model").max(120),
  location: z.string().trim().min(3, "Location or ZIP").max(160),
  issueType: z.enum(["no-start", "diagnostic", "brakes", "maintenance"], {
    errorMap: () => ({ message: "Pick the closest issue" }),
  }),
  movable: z.enum(["yes", "no", "not-sure"]),
  problem: z.string().trim().min(5, "Tell us briefly what's happening").max(700),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm" }) }),
});

type IntakeData = z.infer<typeof schema>;

const issueTypes: Array<{ value: IssueType; label: string }> = [
  { value: "no-start", label: "Car will not start" },
  { value: "diagnostic", label: "Warning light / diagnostic" },
  { value: "brakes", label: "Brakes, noise, or shaking" },
  { value: "maintenance", label: "Maintenance or something else" },
];

const followUpQuestions: Record<
  IssueType,
  Array<{
    id: string;
    label: string;
    options: string[];
  }>
> = {
  "no-start": [
    { id: "crank", label: "Does the engine crank?", options: ["Yes", "No", "Not sure"] },
    {
      id: "power",
      label: "What happens when you turn the key?",
      options: ["No lights", "Clicking sound", "Cranks but no start", "Not sure"],
    },
  ],
  diagnostic: [
    {
      id: "behavior",
      label: "What is the light doing?",
      options: ["Solid", "Flashing", "Comes and goes", "Not sure"],
    },
    {
      id: "driving",
      label: "How is it driving?",
      options: ["Normal", "Rough idle", "Loss of power", "Not safe to drive"],
    },
  ],
  brakes: [
    {
      id: "noise",
      label: "What do you hear or feel?",
      options: ["Grinding", "Squeaking", "Thumping", "Shaking"],
    },
    {
      id: "when",
      label: "When does it happen?",
      options: ["When braking", "While driving", "Turning", "All the time"],
    },
  ],
  maintenance: [
    {
      id: "service",
      label: "What do you need?",
      options: ["Oil service", "Tune-up", "Fluid / filter", "Not sure"],
    },
    {
      id: "timing",
      label: "How soon?",
      options: ["Today", "This week", "Not urgent", "Just pricing"],
    },
  ],
};

const quoteRanges: Record<IssueType, QuoteResult> = {
  "no-start": {
    range: "$95-$240",
    note: "Usually starts with a mobile no-start diagnostic, then battery, starter, or alternator pricing if needed.",
  },
  diagnostic: {
    range: "$85-$165",
    note: "Usually starts with a scan and symptom check before any parts are quoted.",
  },
  brakes: {
    range: "$120-$380",
    note: "Brake noise and shaking may need inspection first, then pads, rotors, or safety repairs are confirmed.",
  },
  maintenance: {
    range: "$90-$220",
    note: "Basic mobile maintenance can often be quoted quickly. Unclear repairs are reviewed before dispatch.",
  },
};

function calculateQuote(data: IntakeData, fd: FormData): QuoteResult {
  const get = (key: string) => String(fd.get(key) ?? "");
  const base = quoteRanges[data.issueType];

  if (data.issueType === "no-start") {
    const power = get("followup-power");

    if (power === "No lights") {
      return {
        range: "$95-$190",
        note: "This often starts with battery, terminal, or charging-system checks at the vehicle.",
      };
    }

    if (power === "Clicking sound") {
      return {
        range: "$115-$260",
        note: "Clicking can point toward battery, starter, or connection issues. The mechanic confirms before dispatch.",
      };
    }

    if (power === "Cranks but no start") {
      return {
        range: "$145-$320",
        note: "A crank/no-start visit may need fuel, spark, or sensor checks before parts are quoted.",
      };
    }
  }

  if (data.issueType === "diagnostic") {
    const behavior = get("followup-behavior");
    const driving = get("followup-driving");

    if (behavior === "Flashing" || driving === "Not safe to drive") {
      return {
        range: "$120-$240",
        note: "A flashing light or unsafe driving symptom usually needs a deeper diagnostic before repairs are priced.",
      };
    }

    if (driving === "Rough idle" || driving === "Loss of power") {
      return {
        range: "$105-$210",
        note: "The first visit should confirm codes and symptoms before quoting parts.",
      };
    }
  }

  if (data.issueType === "brakes") {
    const noise = get("followup-noise");
    const when = get("followup-when");

    if (noise === "Grinding" || when === "All the time") {
      return {
        range: "$180-$430",
        note: "Grinding or constant brake noise usually needs inspection before pads, rotors, or safety repairs are confirmed.",
      };
    }

    if (noise === "Squeaking") {
      return {
        range: "$120-$300",
        note: "Squeaking can be simple, but the mechanic still confirms pad and rotor condition first.",
      };
    }
  }

  if (data.issueType === "maintenance") {
    const service = get("followup-service");
    const timing = get("followup-timing");

    if (service === "Oil service") {
      return {
        range: "$80-$150",
        note: "Oil-service pricing depends on vehicle, oil type, and filter availability.",
      };
    }

    if (service === "Tune-up") {
      return {
        range: "$140-$320",
        note: "Tune-up pricing depends on plugs, coils, filters, and access to the engine bay.",
      };
    }

    if (timing === "Just pricing") {
      return {
        range: "$75-$160",
        note: "A quick estimate can be sent first, then the mechanic confirms exact parts before dispatch.",
      };
    }
  }

  if (data.movable === "no") {
    return {
      range: base.range,
      note: `${base.note} Since the vehicle may not be movable, the mechanic confirms safety before dispatch.`,
    };
  }

  return base;
}

const labelClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const inputClass =
  "h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";
const textareaClass =
  "min-h-[112px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm";

export function RequestForm() {
  const [issueType, setIssueType] = useState<IssueType | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState<QuoteResult | null>(null);

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
    setQuote(calculateQuote(result.data, fd));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-7 w-7 text-accent-foreground" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold uppercase">Request received.</h2>
        {quote && (
          <div className="mx-auto mt-5 max-w-md rounded-lg border border-border bg-secondary/45 p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Demo estimate
            </p>
            <p className="mt-2 font-display text-3xl font-bold uppercase">
              Likely range: {quote.range}
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              Mechanic confirms before dispatch.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{quote.note}</p>
          </div>
        )}
        <p className="mx-auto mt-4 max-w-md text-xs text-muted-foreground">
          Demo pricing only. A live site would use the mechanic's actual price sheet.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setQuote(null);
          }}
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
        <select
          name="issueType"
          className={inputClass}
          value={issueType}
          onChange={(event) => setIssueType(event.target.value as IssueType)}
        >
          <option value="" disabled>
            Choose one
          </option>
          {issueTypes.map((issue) => (
            <option key={issue.value} value={issue.value}>
              {issue.label}
            </option>
          ))}
        </select>
      </Field>

      {issueType && <SmartFollowUps issueType={issueType} />}

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

function SmartFollowUps({ issueType }: { issueType: IssueType }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/35 p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Smart follow-up
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Quick details help the mechanic price the visit before calling.
          </p>
        </div>
        <span className="rounded bg-accent px-2 py-1 text-xs font-semibold uppercase text-accent-foreground">
          Quote helper
        </span>
      </div>

      <div className="grid gap-3">
        {followUpQuestions[issueType].map((question) => (
          <label key={question.id} className="grid gap-2">
            <span className={labelClass}>{question.label}</span>
            <select name={`followup-${question.id}`} className={inputClass} defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {question.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
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

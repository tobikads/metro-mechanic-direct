import { useEffect, useState } from "react";
import {
  Phone,
  MessageSquare,
  ArrowRight,
  Clock3,
  ShieldCheck,
  MapPin,
  Wrench,
  Zap,
  Activity,
  Disc3,
  Droplet,
  Thermometer,
  Menu,
  X,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RequestForm } from "@/components/site/RequestForm";

import heroImg from "@/assets/hero-mechanic.jpg";
import marcusImg from "@/assets/marcus-portrait.jpg";
import jobBattery from "@/assets/job-battery.jpg";
import jobBrakes from "@/assets/job-brakes.jpg";
import jobDiag from "@/assets/job-diagnostic.jpg";
import jobStarter from "@/assets/job-starter.jpg";
import jobOverheat from "@/assets/job-overheat.jpg";
import jobOil from "@/assets/job-oil.jpg";

const PHONE_DISPLAY = "(404) 555-0198";
const PHONE_HREF = "tel:+14045550198";
const SMS_HREF = "sms:+14045550198";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How It Works" },
  { href: "#jobs", label: "Recent Jobs" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <QuickRequest />
        <Services />
        <WhyMobile />
        <HowItWorks />
        <RecentJobs />
        <Mechanic />
        <Reviews />
        <ServiceArea />
        <FAQ />
        <RequestSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- HEADER */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-asphalt text-bone">
            <Wrench className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold uppercase leading-none tracking-tight">
            Metro Mobile
            <span className="text-accent">.</span>
            <span className="block text-[11px] font-medium tracking-[0.22em] text-muted-foreground">
              MECHANIC - ATLANTA
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" className="border-asphalt/20 bg-transparent">
            <a href={PHONE_HREF}>
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#request">
              Request Service
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-border lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-base font-medium hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <a href={PHONE_HREF}>
                  <Phone className="h-4 w-4" /> Call
                </a>
              </Button>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="#request" onClick={() => setOpen(false)}>
                  Request
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------- HERO */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-asphalt text-bone">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Mobile mechanic running a diagnostic scan on a sedan in a suburban Atlanta driveway at golden hour"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt/90 via-transparent to-asphalt/30" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-12 lg:grid-cols-12 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Serving Metro Atlanta - On call now
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,6rem)] font-black uppercase leading-[0.92] text-balance">
            Auto repair <br className="hidden sm:block" />
            that comes <span className="text-accent">to you.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-bone/80 sm:text-lg">
            Mobile mechanic service for drivers across Metro Atlanta. Diagnostics, batteries,
            brakes, starters, oil service, and no-start help at your home, job, or roadside.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
            >
              <a href={PHONE_HREF}>
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-bone/30 bg-transparent px-6 text-base text-bone hover:bg-bone/10 hover:text-bone"
            >
              <a href={SMS_HREF}>
                <MessageSquare className="h-4 w-4" /> Text for Quote
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 px-6 text-base text-bone hover:bg-bone/10 hover:text-bone"
            >
              <a href="#request">
                Request Service <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-bone/85 sm:grid-cols-4">
            {["Same-day options", "Upfront quote", "We come to you", "No tow truck needed"].map(
              (b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {b}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Floating stat card */}
        <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
          <div className="relative w-full max-w-sm rounded-xl border border-bone/15 bg-asphalt/70 p-6 shadow-2xl backdrop-blur lg:translate-y-6">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <Clock3 className="h-4 w-4" /> Average response
            </div>
            <div className="mt-3 font-display text-6xl font-black leading-none num">
              &lt; 2<span className="ml-1 text-3xl text-bone/70">hrs</span>
            </div>
            <p className="mt-3 text-sm text-bone/75">
              Typical arrival window across the Atlanta service area during business hours.
            </p>
            <div className="mt-5 hairline border-bone/15 pt-4 text-xs text-bone/60">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Metro Atlanta
                </span>
                <span>Mon-Sat - 8a-7p</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- QUICK REQUEST */

function QuickRequest() {
  const items = [
    {
      icon: Zap,
      title: "Car Won't Start",
      copy: "Battery, starter, alternator, or diagnostic help.",
    },
    {
      icon: Activity,
      title: "Check Engine / Diagnostic",
      copy: "Find the issue before you waste money replacing parts.",
    },
    {
      icon: Disc3,
      title: "Brakes / Maintenance",
      copy: "Pads, rotors, oil service, tune-ups, and inspections.",
    },
  ];
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">
            What's going on with the car?
          </h2>
          <a
            href="#request"
            className="hidden text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Skip to request
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, copy }) => (
            <a
              key={title}
              href="#request"
              className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-asphalt hover:shadow-lg"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-asphalt text-bone transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-asphalt">
                Request Help
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- SERVICES */

function Services() {
  const services = [
    {
      icon: Activity,
      title: "Diagnostics",
      desc: "Check engine light, electrical testing, pre-purchase inspection. We figure out what's actually wrong before anyone replaces a part.",
    },
    {
      icon: Zap,
      title: "No-Start Help",
      desc: "Battery replacement, starter, alternator, ignition issues. Most no-start calls are back on the road the same visit.",
    },
    {
      icon: Disc3,
      title: "Brakes & Safety",
      desc: "Brake pads, rotors, fluid checks, and safety inspection. Honest answer on whether you need new rotors or just pads.",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      desc: "Oil changes, spark plugs, belts, filters, and tune-ups. Keep your daily driver out of the shop with simple upkeep.",
    },
    {
      icon: Thermometer,
      title: "Cooling & Roadside",
      desc: "Overheating, leaks, radiator and coolant issues, emergency help. Don't drive a hot car  -  we'll come look at it.",
    },
    {
      icon: Droplet,
      title: "Fluids & Filters",
      desc: "Coolant flush, brake fluid, transmission, air & cabin filters. Small services that prevent big repairs.",
    },
  ];
  return (
    <section id="services" className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground/60">
              <span className="mr-2 inline-block h-px w-8 align-middle bg-accent" />
              Services
            </p>
            <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
              The repairs <br /> drivers actually <br /> call about.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              A focused menu. No upsells, no waiting room, no shop overhead passed back to you. If a
              repair needs a lift, we'll tell you straight.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-border border-t border-border">
              {services.map(({ icon: Icon, title, desc }, i) => (
                <li
                  key={title}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-7"
                >
                  <span className="num text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-2">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase sm:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                      {desc}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-asphalt text-bone transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- WHY MOBILE */

function WhyMobile() {
  const bullets = [
    "We come to your driveway, workplace, or roadside",
    "Clear explanation before work begins",
    "Quote before any repairs start",
    "Ideal for busy drivers and no-start situations",
    "Local Metro Atlanta service area",
  ];
  return (
    <section className="bg-asphalt text-bone">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Why mobile
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
            Skip the waiting room. <br />
            <span className="text-accent">Keep your day moving.</span>
          </h2>
          <p className="mt-6 max-w-lg text-bone/75">
            A shop visit usually means a tow, a ride home, a half-day off work, and a service writer
            guessing. We replace all of that with one visit, in plain English, where the car already
            is.
          </p>
        </div>

        <ul className="grid gap-3">
          {bullets.map((b, i) => (
            <li
              key={b}
              className="flex items-start gap-5 rounded-lg border border-bone/10 bg-bone/[0.03] p-5 transition-colors hover:border-accent/40"
            >
              <span className="num font-display text-2xl font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-base text-bone/90">{b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- HOW IT WORKS */

function HowItWorks() {
  const steps = [
    {
      t: "Tell us what's wrong",
      d: "Call, text, or send the request form. Describe the issue in your own words.",
    },
    {
      t: "Share your vehicle and location",
      d: "Year, make, model, and where the car is sitting  -  driveway, lot, or roadside.",
    },
    {
      t: "Get a quote and arrival window",
      d: "Upfront pricing for the diagnostic or repair, plus a realistic ETA.",
    },
    {
      t: "We repair it where the car is",
      d: "Most jobs are finished on-site. If a shop lift is needed, we'll say so honestly.",
    },
  ];
  return (
    <section id="how" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
            Four steps. <br /> No surprises.
          </h2>
        </div>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-6 right-6 top-7 hidden h-px bg-border lg:block" />
          {steps.map((s, i) => (
            <li key={s.t} className="relative rounded-lg border border-border bg-card p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-asphalt font-display text-xl font-bold text-bone shadow">
                {i + 1}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- RECENT JOBS */

function RecentJobs() {
  const jobs = [
    {
      img: jobBattery,
      label: "Decatur apartments",
      title: "Battery replacement",
      desc: "No-start sedan brought back to life in the parking lot.",
    },
    {
      img: jobBrakes,
      label: "Sandy Springs driveway",
      title: "Brake pad service",
      desc: "Front pads + rotor inspection, finished same day.",
    },
    {
      img: jobDiag,
      label: "Midtown parking deck",
      title: "Check engine diagnostic",
      desc: "Pinpointed a faulty O2 sensor before a costly guess.",
    },
    {
      img: jobStarter,
      label: "East Point curb",
      title: "Starter replacement",
      desc: "No-crank repair on a daily-driver SUV.",
    },
    {
      img: jobOverheat,
      label: "I-285 shoulder",
      title: "Overheating inspection",
      desc: "Coolant leak isolated to a cracked hose, advised tow.",
    },
    {
      img: jobOil,
      label: "Smyrna driveway",
      title: "Oil change & checkup",
      desc: "Filter, oil, and a top-to-bottom maintenance scan.",
    },
  ];
  return (
    <section id="jobs" className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Proof of work
            </p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Recent <span className="text-accent">mobile repairs.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            A snapshot of jobs across Metro Atlanta - driveways, parking decks, workplaces, and one
            or two roadside saves.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <article
              key={j.title}
              className="group overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={j.img}
                  alt={`${j.title}  -  ${j.label}`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-asphalt/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-bone backdrop-blur">
                  <MapPin className="h-3 w-3" /> {j.label}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold uppercase leading-tight">
                  {j.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{j.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- MECHANIC */

function Mechanic() {
  const trust = [
    "ASE-style experience across domestic and import",
    "Diagnostic-first approach  -  no parts-cannon repairs",
    "Clean, organized work area at every job",
    "Customer-first communication, before and after",
  ];
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={marcusImg}
              alt="Marcus Reed, lead mobile technician"
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-md bg-bone/90 px-4 py-3 backdrop-blur">
              <p className="font-display text-lg font-bold uppercase leading-none">Marcus Reed</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Lead Mobile Technician - 15+ yrs
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Meet the mechanic
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
            Honest answers. <br /> <span className="text-accent">Skilled hands.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Marcus has spent 15+ years working on daily drivers, family cars, and work vehicles
            across Atlanta. The goal on every visit is the same: explain what's actually happening,
            fix what needs fixing, and help you avoid repairs you don't.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {trust.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-md border border-border bg-secondary/50 p-4 text-sm"
              >
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">
            Credentials, certifications, and service guarantees can be swapped for the owner's
            verified details before launch.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- REVIEWS */

function Reviews() {
  const reviews = [
    {
      name: "Tasha M.",
      where: "Decatur",
      title: "Saved me from a tow",
      body: "My car would not start before work. Marcus came in under an hour, tested the battery, and had me on the road. Way cheaper than a tow + shop visit.",
    },
    {
      name: "Devon R.",
      where: "Marietta",
      title: "Finally a clear explanation",
      body: "He actually showed me what was wrong with the brake pads and what could wait. No pressure, no upsell. Felt like talking to a friend who happens to be a mechanic.",
    },
    {
      name: "Priya K.",
      where: "Brookhaven",
      title: "Fair price, professional service",
      body: "Quote up front, arrived in the window he said, finished in the driveway. I'll never sit in a waiting room again if I can avoid it.",
    },
    {
      name: "Andre L.",
      where: "East Point",
      title: "Diagnosed in 20 minutes",
      body: "Two other places wanted to throw parts at the problem. Marcus scanned it, traced it to a sensor, and quoted me a real fix.",
    },
  ];
  return (
    <section id="reviews" className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Reviews
            </p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
              What drivers <br /> are saying.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-0.5 text-accent">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9 average</span>
            <span className="text-muted-foreground">- local customers</span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-lg border border-border bg-card p-7">
              <div className="flex items-center gap-1 text-accent">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold uppercase">{r.title}</h3>
              <blockquote className="mt-2 text-foreground/85">"{r.body}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-asphalt font-display text-sm font-bold text-bone">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="font-semibold">{r.name}</span>
                  <span className="ml-2 text-muted-foreground">{r.where}, GA</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- SERVICE AREA */

function ServiceArea() {
  const cities = [
    "Atlanta",
    "Decatur",
    "East Point",
    "College Park",
    "Sandy Springs",
    "Marietta",
    "Smyrna",
    "Brookhaven",
    "Tucker",
    "Lithonia",
  ];
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Coverage
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
            Mobile service <br /> across <span className="text-accent">Metro Atlanta.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Not on the list? Send the request anyway - neighboring areas may still be covered
            depending on availability.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
            {cities.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 border-b border-dashed border-border py-2 text-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Faux map card */}
        <div className="relative overflow-hidden rounded-lg border border-border bg-asphalt text-bone">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* roads */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="dash" patternUnits="userSpaceOnUse" width="8" height="2">
                <rect width="4" height="2" fill="rgba(255,255,255,0.35)" />
              </pattern>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="120"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="200"
              cy="200"
              r="70"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
              fill="none"
            />
            <path d="M0,200 L400,200" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            <path d="M200,0 L200,400" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            <path d="M40,40 L360,360" stroke="url(#dash)" strokeWidth="2" />
            <path d="M360,40 L40,360" stroke="url(#dash)" strokeWidth="2" />
          </svg>
          {/* pins */}
          {[
            { x: "50%", y: "50%", label: "Atlanta", big: true },
            { x: "62%", y: "44%", label: "Decatur" },
            { x: "44%", y: "62%", label: "East Point" },
            { x: "40%", y: "30%", label: "Sandy Springs" },
            { x: "30%", y: "42%", label: "Smyrna" },
            { x: "70%", y: "62%", label: "Lithonia" },
            { x: "66%", y: "32%", label: "Brookhaven" },
            { x: "28%", y: "70%", label: "College Park" },
          ].map((p) => (
            <div
              key={p.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2.5 w-2.5 rounded-full ring-4 ring-accent/20 ${
                    p.big ? "bg-accent" : "bg-bone"
                  }`}
                />
                <span className="rounded bg-asphalt/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bone">
                  {p.label}
                </span>
              </div>
            </div>
          ))}
          <div className="relative flex h-full min-h-[380px] flex-col justify-end p-6">
            <div className="rounded-md border border-bone/15 bg-asphalt/70 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Service radius
              </p>
              <p className="mt-1 font-display text-2xl font-bold uppercase">
                ~25 mi from downtown Atlanta
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- FAQ */

function FAQ() {
  const items = [
    {
      q: "What areas do you service?",
      a: "Metro Atlanta including Atlanta, Decatur, East Point, College Park, Sandy Springs, Marietta, Smyrna, Brookhaven, Tucker, and Lithonia. If you're nearby, ask  -  we can usually accommodate.",
    },
    {
      q: "Can you fix my car if it won't start?",
      a: "Most no-start calls  -  batteries, starters, alternators, and ignition issues  -  can be handled on-site the same visit. If a specialty tool or lift is needed, we'll diagnose first and advise.",
    },
    {
      q: "Do I need to tow my car?",
      a: "Usually no. The whole point of mobile service is to skip the tow. If a repair truly requires a shop lift, we'll be honest with you up front and help you plan the next step.",
    },
    {
      q: "How does pricing work?",
      a: "You get an upfront quote before any work begins, covering parts and labor. No mystery line items, no surprise fees when we're done.",
    },
    {
      q: "What vehicles do you work on?",
      a: "Most domestic and import passenger cars, SUVs, and light trucks. Exotic, heavy-duty diesel, and certain EV repairs may be outside our scope  -  just ask.",
    },
    {
      q: "Can you come to my job or apartment?",
      a: "Yes  -  driveways, apartment lots, office parking, and curbside on safe streets all work. Just share the address and we'll confirm access before arriving.",
    },
    {
      q: "What if the repair needs a shop lift?",
      a: "Some jobs (transmission, major suspension, etc.) really do need a lift. In those cases we'll diagnose accurately, give you a clear path forward, and recommend a trusted shop rather than guess on a job we can't do well in the driveway.",
    },
  ];
  return (
    <section id="faq" className="bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
            Straight <br />
            <span className="text-accent">answers.</span>
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            If your question isn't here, send a text - Marcus will reply personally.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((it, i) => (
              <AccordionItem key={it.q} value={`item-${i}`}>
                <AccordionTrigger className="py-5 text-left font-display text-lg font-bold uppercase">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- REQUEST */

function RequestSection() {
  return (
    <section id="request" className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Request service
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] text-balance sm:text-6xl">
            Tell us what's <br />
            <span className="text-accent">going on.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Send a request and we'll reply with a quote and arrival window. For an immediate
            response, call or text.
          </p>

          <div className="mt-8 grid gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-between rounded-md border border-border bg-card p-4 transition-colors hover:border-asphalt"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-asphalt text-bone">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    Call
                  </span>
                  <span className="font-display text-lg font-bold">{PHONE_DISPLAY}</span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a
              href={SMS_HREF}
              className="flex items-center justify-between rounded-md border border-border bg-card p-4 transition-colors hover:border-asphalt"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-accent text-accent-foreground">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                    Text
                  </span>
                  <span className="font-display text-lg font-bold">Same number, faster reply</span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- FINAL CTA */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-asphalt text-bone">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,170,60,0.22) 0 10%, transparent 10% 20%, rgba(255,255,255,0.08) 20% 21%, transparent 21% 100%)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center lg:px-8 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          On call across Metro Atlanta
        </p>
        <h2 className="mt-5 font-display text-5xl font-black uppercase leading-[0.95] text-balance sm:text-7xl">
          Need a mechanic <br /> where the car is?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-bone/75">
          Skip the tow truck and the waiting room. Tell us what's wrong and we'll come to you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
          >
            <a href={PHONE_HREF}>
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-bone/30 bg-transparent px-6 text-base text-bone hover:bg-bone/10 hover:text-bone"
          >
            <a href={SMS_HREF}>
              <MessageSquare className="h-4 w-4" /> Text for Quote
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-12 bg-bone px-6 text-base text-asphalt hover:bg-bone/90"
          >
            <a href="#request">
              Request Service <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- FOOTER */

function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-asphalt text-bone">
              <Wrench className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-tight">
              Metro Mobile Mechanic
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Mobile auto repair across Metro Atlanta. Diagnostics, batteries, brakes, starters, oil
            service, and no-start help - at your home, job, or roadside.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 grid gap-2 text-sm">
            <li>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-foreground hover:text-accent"
              >
                <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              service@metromobilemechanic.com
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Metro Atlanta, GA
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Hours</h4>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li>Mon-Sat - 8 AM - 7 PM</li>
            <li>Sunday - Emergency requests only</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-8">
          <p>(c) {new Date().getFullYear()} Metro Mobile Mechanic. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            Demo website for presentation purposes. Final business details, pricing, and
            availability must be confirmed by the owner.
          </p>
        </div>
      </div>
    </footer>
  );
}

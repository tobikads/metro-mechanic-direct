import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Disc3,
  Droplet,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  Thermometer,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const pages = [
  { key: "home", label: "Home" },
  { key: "services", label: "Services" },
  { key: "request", label: "Request" },
  { key: "reviews", label: "Reviews" },
  { key: "about", label: "About" },
] as const;

type PageKey = (typeof pages)[number]["key"];

function getPageFromHash(): PageKey {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return pages.some((page) => page.key === raw) ? (raw as PageKey) : "home";
}

export default function Index() {
  const [page, setPage] = useState<PageKey>(() =>
    typeof window === "undefined" ? "home" : getPageFromHash(),
  );

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const pageTitle = useMemo(() => pages.find((item) => item.key === page)?.label ?? "Home", [page]);

  useEffect(() => {
    const title =
      page === "home" ? "Metro Mobile Mechanic" : `${pageTitle} | Metro Mobile Mechanic`;
    document.title = `${title} - Auto Repair That Comes To You`;
  }, [page, pageTitle]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPage={page} />
      <main aria-label={pageTitle}>
        {page === "home" && <HomePage />}
        {page === "services" && <ServicesPage />}
        {page === "request" && <RequestPage />}
        {page === "reviews" && <ReviewsPage />}
        {page === "about" && <AboutPage />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ currentPage }: { currentPage: PageKey }) {
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
        scrolled ? "border-b border-border bg-background/90 backdrop-blur" : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <a href="#/home" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-asphalt text-bone">
            <Wrench className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold uppercase leading-none tracking-tight">
            Metro Mobile
            <span className="text-accent">.</span>
            <span className="block text-[11px] font-medium tracking-[0.2em] text-muted-foreground">
              MECHANIC
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {pages.map((item) => (
            <a
              key={item.key}
              href={`#/${item.key}`}
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === item.key
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" className="border-asphalt/20 bg-transparent">
            <a href={PHONE_HREF}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="#/request">
              Request
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-border lg:hidden"
          onClick={() => setOpen((state) => !state)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
            {pages.map((item) => (
              <a
                key={item.key}
                href={`#/${item.key}`}
                onClick={() => setOpen(false)}
                className={`rounded px-2 py-3 text-base font-medium ${
                  currentPage === item.key ? "bg-secondary text-foreground" : "hover:bg-secondary"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <a href={PHONE_HREF}>
                  <Phone className="h-4 w-4" /> Call
                </a>
              </Button>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="#/request" onClick={() => setOpen(false)}>
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

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-asphalt text-bone">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Mobile mechanic working under the hood of a customer vehicle"
            width={1920}
            height={1280}
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-asphalt via-asphalt/85 to-asphalt/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-bone/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Metro Atlanta mobile mechanic
            </p>
            <h1 className="mt-6 font-display text-[clamp(3rem,12vw,6.5rem)] font-black uppercase leading-[0.88] text-balance">
              Auto repair that comes to you.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-bone/80 sm:text-lg">
              Stuck at home, work, or roadside? Request help in under two minutes. We confirm the
              issue, quote the visit, and come to the car.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90"
              >
                <a href="#/request">
                  Request Help <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-bone/30 bg-transparent px-6 text-base text-bone hover:bg-bone/10 hover:text-bone"
              >
                <a href={PHONE_HREF}>
                  <Phone className="h-4 w-4" /> Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-3 lg:px-8">
          {[
            ["Car will not start", "Battery, starter, alternator, or ignition issue."],
            ["Warning light is on", "A quick path to describe symptoms before a diagnostic."],
            ["Brakes or maintenance", "Common driveway jobs without a waiting room."],
          ].map(([title, copy]) => (
            <a
              key={title}
              href="#/request"
              className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-asphalt"
            >
              <h2 className="font-display text-2xl font-bold uppercase">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-asphalt">
                Start request
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-secondary/45">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              What happens next
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase sm:text-5xl">
              A clear path from problem to repair.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              No long explanation needed. The driver sends the car, location, and symptoms. The
              mechanic replies with the next step.
            </p>
          </div>
          <div className="grid gap-3">
            {["Send the details", "Get a quote", "Meet at the car"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-card p-4">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  const services = [
    {
      icon: Zap,
      title: "No-start help",
      desc: "Battery, starter, alternator, and ignition checks.",
    },
    {
      icon: Activity,
      title: "Diagnostics",
      desc: "Check engine lights, electrical issues, and pre-purchase checks.",
    },
    {
      icon: Disc3,
      title: "Brakes",
      desc: "Pads, rotors, noise checks, and safety inspections.",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      desc: "Oil service, spark plugs, belts, filters, and tune-ups.",
    },
    {
      icon: Thermometer,
      title: "Overheating",
      desc: "Coolant leaks, hoses, fans, and safe next-step advice.",
    },
    {
      icon: Droplet,
      title: "Fluids",
      desc: "Coolant, brake fluid, transmission fluid, and filter checks.",
    },
  ];

  return (
    <PageShell
      eyebrow="Services"
      title="Common mobile repairs."
      copy="The repairs people usually need when they do not want to tow the car or lose half a day at a shop."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="rounded-lg border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded bg-asphalt text-bone">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold uppercase">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-secondary/45 p-6">
        <h2 className="font-display text-2xl font-bold uppercase">Clear boundary</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          If a job needs a lift, heavy equipment, or a full shop, we say that up front and help you
          choose the right next step.
        </p>
      </div>
    </PageShell>
  );
}

function RequestPage() {
  return (
    <section className="bg-asphalt text-bone">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-10 px-5 py-12 lg:grid-cols-12 lg:px-8 lg:py-16">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Service request
          </p>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.92] text-balance sm:text-6xl">
            Tell the mechanic what is happening.
          </h1>
          <p className="mt-5 max-w-md text-bone/75">
            Share the car, location, and symptoms. We use that to confirm whether mobile service is
            the right fit before anyone wastes time.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-bone/85">
            {[
              "Collects the car, location, and issue in one place",
              "Keeps the first phone call focused",
              "Works as a quote request without feeling like a giant form",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-xl border border-bone/15 bg-background p-5 text-foreground shadow-2xl sm:p-8">
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsPage() {
  const reviews = [
    {
      name: "Tasha M.",
      where: "Decatur",
      body: "My car would not start before work. He tested the battery, explained the issue, and had me moving again.",
    },
    {
      name: "Devon R.",
      where: "Marietta",
      body: "He showed me what was wrong with the brakes and what could wait. No pressure.",
    },
    {
      name: "Priya K.",
      where: "Brookhaven",
      body: "Quote up front, arrived in the window he gave, and finished in the driveway.",
    },
  ];

  const jobs = [
    { img: jobBattery, title: "Battery replacement", label: "Apartment lot" },
    { img: jobBrakes, title: "Brake service", label: "Driveway" },
    { img: jobDiag, title: "Diagnostic scan", label: "Parking deck" },
    { img: jobStarter, title: "Starter check", label: "Curbside" },
    { img: jobOverheat, title: "Overheating check", label: "Roadside" },
    { img: jobOil, title: "Oil service", label: "Home visit" },
  ];

  return (
    <PageShell
      eyebrow="Proof"
      title="Real work, real trust."
      copy="A few reviews and recent jobs are enough. The home page stays short, and proof lives here when someone wants to see more."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.name} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-0.5 text-accent">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-6 text-foreground/85">
              "{review.body}"
            </blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="font-semibold">{review.name}</span>
              <span className="ml-2 text-muted-foreground">{review.where}, GA</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <article
            key={job.title}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <img
              src={job.img}
              alt={`${job.title} at a customer location`}
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-4">
              <h2 className="font-display text-xl font-bold uppercase">{job.title}</h2>
              <p className="text-sm text-muted-foreground">{job.label}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell
      eyebrow="Owner profile"
      title="Know who is coming to your car."
      copy="People are more comfortable when they can see the technician, the service area, and the basic promises before booking."
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <img
            src={marcusImg}
            alt="Lead mobile mechanic portrait"
            width={1024}
            height={1024}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Lead technician
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase">
            Owner-led mobile service.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A real photo, clear experience, credentials, and service promise make the site feel like
            a person, not just a contact form.
          </p>
          <div className="mt-7 grid gap-3">
            {[
              "Years of experience",
              "ASE or shop credentials",
              "Service radius",
              "Parts and labor policy",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-secondary/55 p-4">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Hours", "Mon-Sat, 8 AM-7 PM. Emergency requests can be added if the owner wants."],
          ["Area", "Metro Atlanta, with exact neighborhoods swapped in before launch."],
          ["Contact", "Call, text, or send a request when the car starts acting up."],
        ].map(([title, copy]) => (
          <article key={title} className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-2xl font-bold uppercase">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function PageShell({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="mb-9 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-[0.92] text-balance sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{copy}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-4 lg:px-8">
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
            Demo website for mobile mechanic pitches. Final phone number, service area, pricing, and
            owner details should be swapped in before launch.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            <li>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-foreground hover:text-accent"
              >
                <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={SMS_HREF}
                className="flex items-center gap-2 text-foreground hover:text-accent"
              >
                <MessageSquare className="h-3.5 w-3.5" /> Text for quote
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Metro Atlanta, GA
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider">Fast links</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {pages.slice(1).map((page) => (
              <li key={page.key}>
                <a href={`#/${page.key}`} className="hover:text-foreground">
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center lg:px-8">
          <p>(c) {new Date().getFullYear()} Metro Mobile Mechanic.</p>
          <p className="sm:text-right">Demo only. Request form does not send live emails yet.</p>
        </div>
      </div>
    </footer>
  );
}

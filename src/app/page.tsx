"use client";

import { type ReactNode, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  Star,
  Target,
  Wand2,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DemoDetails = {
  businessName: string;
  ownerName: string;
  industry: string;
  city: string;
  audience: string;
  offer: string;
  phone: string;
  websiteGoal: string;
  painPoint: string;
};

const initialDetails: DemoDetails = {
  businessName: "Bright Smile Dental",
  ownerName: "Morgan",
  industry: "dental clinic",
  city: "Austin",
  audience: "busy families and professionals",
  offer: "a free whitening consultation",
  phone: "(555) 014-8922",
  websiteGoal: "book 15 more appointments this month",
  painPoint: "their current website does not turn visitors into calls",
};

const starterProspects = [
  "Search Google Maps for businesses with weak sites.",
  "Pick one local niche, such as dentists, gyms, cafes, or contractors.",
  "Send the demo with a short email and a clear price.",
];

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Home() {
  const [details, setDetails] = useState<DemoDetails>(initialDetails);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copyError, setCopyError] = useState("");
  const [copied, setCopied] = useState<"email" | "sms" | "">("");

  const safeDetails = useMemo(() => {
    const businessName = details.businessName.trim();
    const industry = details.industry.trim();
    const city = details.city.trim();
    const audience = details.audience.trim();
    const offer = details.offer.trim();
    const phone = details.phone.trim();
    const websiteGoal = details.websiteGoal.trim();
    const painPoint = details.painPoint.trim();
    const ownerName = details.ownerName.trim();

    return {
      businessName: businessName || "Your Prospect",
      ownerName,
      industry: industry || "local business",
      industryTitle: titleCase(industry || "local business"),
      city: city || "your city",
      audience: audience || "local customers",
      offer: offer || "a first-time customer offer",
      phone: phone || "(555) 000-0000",
      websiteGoal: websiteGoal || "get more leads from the website",
      painPoint: painPoint || "the current website is not converting visitors",
    };
  }, [details]);

  const outreachEmail = useMemo(() => {
    return `Subject: I made a quick website demo for ${safeDetails.businessName}

Hi ${safeDetails.ownerName || "there"},

I was looking at ${safeDetails.industry} businesses in ${safeDetails.city} and made a quick demo website for ${safeDetails.businessName}.

The demo is built around one goal: help you ${safeDetails.websiteGoal}. It highlights ${safeDetails.offer}, adds stronger calls to action, and makes it easier for ${safeDetails.audience} to call from mobile.

If you like the direction, I can finish the full site, connect the contact buttons, and make it ready to launch.

Want me to send the demo link?`;
  }, [safeDetails]);

  const smsCopy = useMemo(() => {
    return `Hi ${safeDetails.ownerName || "there"}, I made a quick website demo for ${safeDetails.businessName} in ${safeDetails.city}. It is designed to help you ${safeDetails.websiteGoal}. Want me to send the link?`;
  }, [safeDetails]);

  const packagePitch = useMemo(() => {
    return [
      {
        name: "Starter demo close",
        price: "$497",
        detail: "Turn the approved demo into a live one-page site with call buttons.",
      },
      {
        name: "Local growth site",
        price: "$997",
        detail: "Add service sections, reviews, contact form, analytics, and basic SEO.",
      },
      {
        name: "Monthly care",
        price: "$149/mo",
        detail: "Host, update, and improve the site so the owner stays focused on sales.",
      },
    ];
  }, []);

  function updateDetail(key: keyof DemoDetails, value: string) {
    setDetails((current) => ({ ...current, [key]: value }));
    if (error) {
      setError("");
    }
  }

  function generateDemo() {
    if (!details.businessName.trim() || !details.industry.trim() || !details.city.trim()) {
      setError("Add at least a business name, industry, and city to create a useful demo.");
      return;
    }

    setCopied("");
    setIsGenerating(true);
    window.setTimeout(() => {
      setIsGenerating(false);
    }, 650);
  }

  async function copyText(kind: "email" | "sms", text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyError("");
      setCopied(kind);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
      setCopyError("Clipboard access was blocked. Select the copy above and copy it manually.");
    }
  }

  const isEmpty = !details.businessName.trim();

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef2ff_48%,#fff7ed_100%)] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <header className="grid gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
              Sell websites with personalized demos
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Create a prospect-ready website demo in minutes.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Fill in a business owner&apos;s details, preview a custom landing
                page, and copy a short message you can send to start a paid
                website conversation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {starterProspects.map((item, index) => (
                <div
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm"
                  key={item}
                >
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="self-start bg-slate-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">Simple selling workflow</CardTitle>
              <CardDescription className="text-slate-300">
                Use the demo as proof before asking for the sale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {[
                "Find an owner with a weak website.",
                "Generate a better version with their name and offer.",
                "Send the demo and ask if they want it launched.",
              ].map((step) => (
                <div className="flex items-start gap-3" key={step}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                  <p className="text-sm leading-6 text-slate-200">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Prospect details</CardTitle>
              <CardDescription>
                Edit the fields to create a demo for the next business owner you
                want to contact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Field label="Business name">
                  <Input
                    value={details.businessName}
                    onChange={(event) =>
                      updateDetail("businessName", event.target.value)
                    }
                    placeholder="Example: Main Street Fitness"
                  />
                </Field>
                <Field label="Owner name">
                  <Input
                    value={details.ownerName}
                    onChange={(event) =>
                      updateDetail("ownerName", event.target.value)
                    }
                    placeholder="Example: Taylor"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Industry">
                    <Input
                      value={details.industry}
                      onChange={(event) =>
                        updateDetail("industry", event.target.value)
                      }
                      placeholder="Example: roofing company"
                    />
                  </Field>
                  <Field label="City">
                    <Input
                      value={details.city}
                      onChange={(event) =>
                        updateDetail("city", event.target.value)
                      }
                      placeholder="Example: Dallas"
                    />
                  </Field>
                </div>
                <Field label="Best customer">
                  <Input
                    value={details.audience}
                    onChange={(event) =>
                      updateDetail("audience", event.target.value)
                    }
                    placeholder="Example: homeowners who need fast repairs"
                  />
                </Field>
                <Field label="Offer to feature">
                  <Input
                    value={details.offer}
                    onChange={(event) => updateDetail("offer", event.target.value)}
                    placeholder="Example: free estimate this week"
                  />
                </Field>
                <Field label="Phone number">
                  <Input
                    value={details.phone}
                    onChange={(event) => updateDetail("phone", event.target.value)}
                    placeholder="Example: (555) 555-1212"
                  />
                </Field>
                <Field label="Website goal">
                  <Textarea
                    value={details.websiteGoal}
                    onChange={(event) =>
                      updateDetail("websiteGoal", event.target.value)
                    }
                    placeholder="Example: get 20 more quote requests this month"
                  />
                </Field>
                <Field label="Problem you noticed">
                  <Textarea
                    value={details.painPoint}
                    onChange={(event) =>
                      updateDetail("painPoint", event.target.value)
                    }
                    placeholder="Example: the site is slow and hard to use on phones"
                  />
                </Field>
              </div>

              {error ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
                  {error}
                </div>
              ) : null}

              <Button className="w-full" onClick={generateDemo} size="lg">
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {isGenerating ? "Generating demo..." : "Refresh demo and copy"}
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="overflow-hidden p-0">
              <div className="border-b border-slate-200 bg-slate-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 truncate rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-500">
                    demo.local/{safeDetails.businessName.toLowerCase().replaceAll(" ", "-")}
                  </span>
                </div>
              </div>

              {isEmpty ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <Target className="h-7 w-7 text-slate-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Add a business name to begin.</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      The live preview will update into a personalized website
                      demo that you can send to the owner.
                    </p>
                  </div>
                </div>
              ) : (
                <DemoWebsite details={safeDetails} />
              )}
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Outreach copy
                  </CardTitle>
                  <CardDescription>
                    Keep it short. The goal is to get permission to send the demo
                    link, not explain everything.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-3xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                    <pre className="whitespace-pre-wrap font-sans">{outreachEmail}</pre>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      onClick={() => copyText("email", outreachEmail)}
                      variant="secondary"
                    >
                      <Copy className="h-4 w-4" />
                      {copied === "email" ? "Email copied" : "Copy email"}
                    </Button>
                    <Button onClick={() => copyText("sms", smsCopy)} variant="secondary">
                      <Copy className="h-4 w-4" />
                      {copied === "sms" ? "Text copied" : "Copy text message"}
                    </Button>
                  </div>
                  {copyError ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
                      {copyError}
                    </div>
                  ) : null}
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
                    <strong>Text version:</strong> {smsCopy}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What to charge</CardTitle>
                  <CardDescription>
                    Start simple, then offer support after the owner says yes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {packagePitch.map((plan) => (
                    <div className="rounded-3xl border border-slate-200 p-4" key={plan.name}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-slate-950">{plan.name}</h3>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                          {plan.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{plan.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function DemoWebsite({
  details,
}: {
  details: {
    businessName: string;
    industry: string;
    industryTitle: string;
    city: string;
    audience: string;
    offer: string;
    phone: string;
    websiteGoal: string;
    painPoint: string;
  };
}) {
  return (
    <div className="bg-white">
      <section className="grid gap-8 bg-slate-950 p-6 text-white md:grid-cols-[1fr_340px] md:p-10">
        <div className="space-y-6">
          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
            {details.city} {details.industryTitle}
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Helping {details.audience} choose {details.businessName}.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              A mobile-first landing page built to turn visitors into calls,
              bookings, and repeat customers.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="bg-blue-500 hover:bg-blue-400">
              Claim {details.offer}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20">
              <Phone className="h-4 w-4" />
              {details.phone}
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Featured offer
              </p>
              <h3 className="mt-1 text-xl font-black">{details.offer}</h3>
            </div>
            <Zap className="h-8 w-8 text-amber-500" />
          </div>
          <div className="grid gap-3 pt-4">
            {[
              "Fast mobile booking",
              "Trust-building reviews",
              "Clear calls to action",
            ].map((item) => (
              <div className="flex items-center gap-3 text-sm font-semibold" key={item}>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 p-6 md:grid-cols-3 md:p-10">
        {[
          ["Goal", details.websiteGoal],
          ["Fix", details.painPoint],
          ["Audience", `Built for ${details.audience} in ${details.city}.`],
        ].map(([label, value]) => (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5" key={label}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {label}
            </p>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-800">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-slate-100 p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_260px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Why customers choose us
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-tight">
              Local trust, fast action, and a clear next step.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              This section gives the owner a polished way to show services,
              reviews, and reasons to call without overwhelming visitors.
            </p>
          </div>
          <div className="rounded-3xl bg-amber-50 p-5">
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className="h-5 w-5 fill-current" key={index} />
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-800">
              &quot;Easy to contact, clear pricing, and exactly what we needed.&quot;
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Sample review block
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

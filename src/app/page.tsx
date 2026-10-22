"use client";

import { type ReactNode, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MessageCircle,
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

type RiyadhTarget = DemoDetails & {
  id: string;
  priority: "High" | "Medium";
  channel: string;
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

const riyadhTargets: RiyadhTarget[] = [
  {
    id: "broo-cafe",
    priority: "High",
    channel: "WhatsApp",
    businessName: "Broo Cafe",
    ownerName: "Broo Cafe team",
    industry: "cafe",
    city: "Riyadh",
    audience: "coffee lovers in Irqah looking for a quick menu, hours, and location",
    offer: "a mobile menu and WhatsApp ordering flow",
    phone: "+966508882327",
    websiteGoal: "turn social profile visitors into more cafe visits and WhatsApp orders",
    painPoint:
      "their public presence uses a link page instead of a branded cafe website",
  },
  {
    id: "andarena-cafe",
    priority: "High",
    channel: "WhatsApp",
    businessName: "Andarena Cafe",
    ownerName: "Andarena Cafe team",
    industry: "cafe",
    city: "Riyadh",
    audience: "nearby customers checking cafe hours, menu, and directions",
    offer: "a cafe menu preview with WhatsApp ordering",
    phone: "+966566367009",
    websiteGoal: "make it easier for mobile visitors to choose and visit",
    painPoint:
      "their listing points to Instagram instead of a conversion-focused cafe page",
  },
  {
    id: "at-cafe",
    priority: "High",
    channel: "WhatsApp or Instagram",
    businessName: "At Cafe",
    ownerName: "At Cafe team",
    industry: "coffee shop",
    city: "Riyadh",
    audience: "customers comparing specialty coffee, desserts, hours, and menu items",
    offer: "a clean online menu and featured drink page",
    phone: "+966540961909",
    websiteGoal: "convert Instagram menu traffic into visits and orders",
    painPoint:
      "their listing uses Instagram and a file menu instead of a fast mobile website",
  },
  {
    id: "whj-cafe",
    priority: "High",
    channel: "WhatsApp or Instagram",
    businessName: "WHJ Cafe",
    ownerName: "WHJ Cafe team",
    industry: "specialty coffee shop",
    city: "Riyadh",
    audience: "people looking for specialty coffee, study seating, and desserts",
    offer: "a mobile cafe page with menu, hours, and map",
    phone: "+966557378488",
    websiteGoal: "make it easier for customers to decide before visiting",
    painPoint:
      "their public listing points customers to Instagram instead of a full menu page",
  },
  {
    id: "coffeehood",
    priority: "High",
    channel: "WhatsApp or Instagram",
    businessName: "Coffeehood",
    ownerName: "Coffeehood team",
    industry: "specialty coffee and dessert shop",
    city: "Riyadh",
    audience: "customers looking for specialty coffee, desserts, and a cozy cafe",
    offer: "a dessert and coffee menu with WhatsApp contact",
    phone: "+966552449869",
    websiteGoal: "turn Linktree traffic into more cafe visits and event inquiries",
    painPoint:
      "their online presence relies on a link page rather than a branded website",
  },
  {
    id: "oxygen-gym",
    priority: "High",
    channel: "WhatsApp",
    businessName: "Oxygen GYM",
    ownerName: "Oxygen GYM team",
    industry: "gym and fitness center",
    city: "Riyadh",
    audience: "people comparing gyms, memberships, coaches, and facilities",
    offer: "a membership enquiry and free tour request",
    phone: "+966920016918",
    websiteGoal: "turn Instagram traffic into more membership enquiries",
    painPoint:
      "their public listing points to Instagram rather than a full membership landing page",
  },
  {
    id: "pilax-pilates",
    priority: "High",
    channel: "WhatsApp",
    businessName: "Pilax Pilates Studio",
    ownerName: "Pilax Pilates team",
    industry: "pilates studio",
    city: "Riyadh",
    audience: "women looking for pilates classes, schedules, and private sessions",
    offer: "a class schedule and WhatsApp booking page",
    phone: "+966539222820",
    websiteGoal: "make it easier to book trial classes from mobile",
    painPoint:
      "their listing points to Instagram instead of a clear schedule and booking page",
  },
  {
    id: "breathe-fitness",
    priority: "High",
    channel: "WhatsApp or Instagram",
    businessName: "Breathe Ladies Fitness",
    ownerName: "Breathe Ladies Fitness team",
    industry: "ladies fitness studio",
    city: "Riyadh",
    audience: "women comparing fitness classes, HIIT programs, and gym options",
    offer: "a free class trial or tour booking",
    phone: "+966504993738",
    websiteGoal: "convert Instagram visitors into tour and class-trial requests",
    painPoint:
      "their public presence can be stronger with a class-focused landing page",
  },
  {
    id: "coach-amal",
    priority: "High",
    channel: "WhatsApp",
    businessName: "Coach Amal",
    ownerName: "Coach Amal",
    industry: "personal trainer and pilates coach",
    city: "Riyadh",
    audience: "women looking for home training, pilates, weight loss, and nutrition guidance",
    offer: "a free fitness consultation through WhatsApp",
    phone: "+966502883813",
    websiteGoal: "turn social viewers into booked consultations",
    painPoint:
      "her services are promoted through social profiles instead of a trust-building coach website",
  },
  {
    id: "coach-abo-3zoz",
    priority: "High",
    channel: "WhatsApp",
    businessName: "Coach Abo 3zoz",
    ownerName: "Coach Abo 3zoz",
    industry: "personal trainer",
    city: "Riyadh",
    audience: "clients looking for bodybuilding, online coaching, and personal training",
    offer: "a WhatsApp fitness assessment and training plan",
    phone: "+966559611155",
    websiteGoal: "turn profile views into paid coaching consultations",
    painPoint:
      "his qualifications and offers can convert better on a dedicated trainer page",
  },
];

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeWhatsAppPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  return digits;
}

function getMarketingAngle(industry: string) {
  const normalizedIndustry = industry.toLowerCase();

  if (normalizedIndustry.includes("cafe") || normalizedIndustry.includes("coffee")) {
    return "المنيو، الموقع، ساعات العمل، وزر واتساب للطلبات";
  }

  if (
    normalizedIndustry.includes("gym") ||
    normalizedIndustry.includes("fitness") ||
    normalizedIndustry.includes("trainer") ||
    normalizedIndustry.includes("pilates")
  ) {
    return "الباقات، مواعيد الحصص، صور المكان، وزر واتساب للحجز أو التجربة";
  }

  return "الخدمات، التقييمات، الموقع، وزر واتساب للتواصل السريع";
}

function createWhatsAppMessage(details: DemoDetails) {
  const businessName = details.businessName.trim() || "your business";
  const industry = details.industry.trim() || "business";
  const ownerName = details.ownerName.trim() || "فريق العمل";
  const marketingAngle = getMarketingAngle(industry);

  return `السلام عليكم ${ownerName}،

شفت ${businessName} وحبيت الفكرة. جهزت لكم فيديو قصير لفكرة صفحة بسيطة باسمكم، توضح ${marketingAngle} بشكل مرتب وسريع على الجوال.

الفكرة مو إعلان عام، مجرد تصور سريع يوضح كيف ممكن تخلي العميل ياخذ قراره أسرع بدل ما يدور بين الروابط والحسابات.

إذا حابين، أرسل لكم رابط الفيديو وتشوفونه بدقيقة؟

Hi ${details.ownerName.trim() || "there"}, I came across ${businessName} and put together a quick idea video for a cleaner mobile page. It shows how your ${industry} could make the next step easier for customers without making them search through links. Want me to send it over?`;
}

function createWhatsAppHref(phone: string, message: string) {
  const normalizedPhone = normalizeWhatsAppPhone(phone);

  if (!normalizedPhone) {
    return "";
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  const [details, setDetails] = useState<DemoDetails>(initialDetails);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copyError, setCopyError] = useState("");
  const [activeTargetId, setActiveTargetId] = useState("");
  const [copied, setCopied] = useState<"email" | "sms" | "whatsapp" | "">("");

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
    return `Subject: Quick idea for ${safeDetails.businessName}

Hi ${safeDetails.ownerName || "there"},

I came across ${safeDetails.businessName} and had a simple idea for improving the mobile experience.

I put together a short preview video showing how a clean page could present your offer, location, key details, and WhatsApp button in one place. The goal is to help ${safeDetails.audience} decide faster instead of jumping between links.

It is not a generic template. I used your business name and built the idea around ${safeDetails.websiteGoal}.

Want me to send the 1-minute preview?`;
  }, [safeDetails]);

  const smsCopy = useMemo(() => {
    return `Hi ${safeDetails.ownerName || "there"}, I made a short idea video for ${safeDetails.businessName}. It shows how a cleaner mobile page could help customers find the key info and contact you faster. Want me to send it?`;
  }, [safeDetails]);

  const whatsappCopy = useMemo(() => createWhatsAppMessage(details), [details]);
  const whatsappHref = useMemo(
    () => createWhatsAppHref(details.phone, whatsappCopy),
    [details.phone, whatsappCopy],
  );

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

  function loadTarget(target: RiyadhTarget) {
    setActiveTargetId(target.id);
    setDetails({
      businessName: target.businessName,
      ownerName: target.ownerName,
      industry: target.industry,
      city: target.city,
      audience: target.audience,
      offer: target.offer,
      phone: target.phone,
      websiteGoal: target.websiteGoal,
      painPoint: target.painPoint,
    });
    setCopied("");
    setCopyError("");
    setError("");
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

  async function copyText(kind: "email" | "sms" | "whatsapp", text: string) {
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
    <main className="min-h-screen overflow-hidden bg-[#070a14] text-slate-950">
      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] bg-[radial-gradient(circle_at_15%_10%,rgba(250,204,21,0.28),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.28),transparent_28%),linear-gradient(180deg,rgba(15,23,42,1),rgba(7,10,20,0))]" />
        <header className="relative grid gap-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 text-white shadow-2xl shadow-black/30 backdrop-blur-2xl md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Premium outreach engine for local businesses
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Send a polished demo that looks like it was built for their brand.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Load a cafe or gym prospect, preview a premium landing page,
                download a short MP4 demo, and open a persuasive WhatsApp message
                from one dashboard.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {starterProspects.map((item, index) => (
                <div
                  className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm font-medium leading-6 text-slate-200 backdrop-blur"
                  key={item}
                >
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-sm font-black text-slate-950">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="relative self-start border-white/10 bg-white text-slate-950 shadow-2xl">
            <CardHeader>
              <CardTitle>Campaign-ready workflow</CardTitle>
              <CardDescription>
                Built for fast outreach, proof, and follow-up.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {[
                "Choose a cafe or gym lead with clear conversion potential.",
                "Use a premium video and landing page mockup as proof.",
                "Open WhatsApp with a human message ready to send.",
              ].map((step) => (
                <div className="flex items-start gap-3" key={step}>
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-500" />
                  <p className="text-sm leading-6 text-slate-600">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </header>

        <div className="relative grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="grid h-fit gap-6">
            <Card className="border-emerald-300/20 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 text-white shadow-2xl shadow-emerald-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className="h-5 w-5 text-emerald-300" />
                  WhatsApp Business outreach
                </CardTitle>
                <CardDescription className="text-emerald-100/80">
                  Load a Riyadh target, copy the bilingual message, or open a
                  prefilled WhatsApp chat from your own account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid max-h-72 gap-2 overflow-y-auto pr-1">
                  {riyadhTargets.map((target) => (
                    <Button
                      className="h-auto justify-start rounded-2xl px-4 py-3 text-left"
                      key={target.id}
                      onClick={() => loadTarget(target)}
                      type="button"
                      variant={target.id === activeTargetId ? "default" : "secondary"}
                    >
                      <span className="grid gap-1">
                        <span>{target.businessName}</span>
                        <span className="text-xs font-medium opacity-70">
                          {target.industry} - {target.channel}
                        </span>
                      </span>
                    </Button>
                  ))}
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/95 p-4 text-sm leading-6 text-slate-800 shadow-xl">
                  <pre className="whitespace-pre-wrap font-sans">{whatsappCopy}</pre>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    onClick={() => copyText("whatsapp", whatsappCopy)}
                    type="button"
                    variant="secondary"
                  >
                    <Copy className="h-4 w-4" />
                    {copied === "whatsapp" ? "WhatsApp copied" : "Copy WhatsApp"}
                  </Button>
                  {whatsappHref ? (
                    <Button asChild type="button">
                      <a href={whatsappHref} rel="noopener noreferrer" target="_blank">
                        <MessageCircle className="h-4 w-4" />
                        Open WhatsApp
                      </a>
                    </Button>
                  ) : (
                    <Button disabled type="button">
                      <MessageCircle className="h-4 w-4" />
                      Add phone number
                    </Button>
                  )}
                </div>

                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-50">
                  This opens a prefilled chat only. WhatsApp still asks you to
                  review and press send, which keeps outreach personal and safer.
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit border-white/10 bg-white/95 shadow-2xl">
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
          </div>

          <div className="grid gap-6">
            <Card className="overflow-hidden border-white/10 bg-white/95 p-0 shadow-2xl">
              <div className="border-b border-slate-200 bg-slate-950 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 truncate rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-slate-300">
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

            <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
              <Card className="border-white/10 bg-white/95 shadow-2xl">
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
                  <div className="rounded-3xl bg-slate-950 p-4 text-sm leading-6 text-slate-100 shadow-xl">
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

              <Card className="border-white/10 bg-white/95 shadow-2xl">
                <CardHeader>
                  <CardTitle>What to charge</CardTitle>
                  <CardDescription>
                    Start simple, then offer support after the owner says yes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {packagePitch.map((plan) => (
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4" key={plan.name}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-slate-950">{plan.name}</h3>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                          {plan.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{plan.detail}</p>
                    </div>
                  ))}
                  <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                    <h3 className="font-semibold text-blue-950">
                      Premium demo videos
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Short luxury-style MP4 videos ready to send to cafe and gym targets.
                    </p>
                    <div className="mt-4 grid gap-2">
                      {riyadhTargets.map((target) => (
                        <a
                          className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-amber-100 transition hover:bg-slate-950 hover:text-white"
                          download
                          href={`demo-videos/${target.id}.mp4`}
                          key={target.id}
                        >
                          Download {target.businessName}
                        </a>
                      ))}
                    </div>
                  </div>
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
    <div className="bg-[#fffaf0]">
      <section className="grid gap-8 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.22),transparent_28%),linear-gradient(135deg,#070a14,#111827_55%,#172033)] p-6 text-white md:grid-cols-[1fr_340px] md:p-10">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
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
            <Button className="bg-amber-300 text-slate-950 hover:bg-amber-200">
              Claim {details.offer}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button className="bg-white/10 text-white ring-1 ring-amber-200/20 hover:bg-white/20">
              <Phone className="h-4 w-4" />
              {details.phone}
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-white to-amber-50 p-5 text-slate-950 shadow-2xl ring-1 ring-amber-200/60">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
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
          <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm" key={label}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              {label}
            </p>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-800">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-amber-100 bg-white p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_260px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
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
          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star className="h-5 w-5 fill-current" key={index} />
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-100">
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

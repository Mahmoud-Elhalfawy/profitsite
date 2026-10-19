import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, ".video-build");
const outputDir = path.join(rootDir, "public", "demo-videos");

const chromeBin = process.env.CHROME_BIN || "/usr/local/bin/google-chrome";

const targets = [
  {
    id: "broo-cafe",
    name: "Broo Cafe",
    category: "Cafe",
    audience: "coffee lovers in Irqah looking for a quick menu, hours, and location",
    offer: "Mobile menu and WhatsApp ordering flow",
    goal: "Turn social profile visitors into more cafe visits and WhatsApp orders",
    services: ["Coffee menu", "Working hours", "Location", "WhatsApp orders"],
  },
  {
    id: "andarena-cafe",
    name: "Andarena Cafe",
    category: "Cafe",
    audience: "nearby customers checking cafe hours, menu, and directions",
    offer: "Cafe menu preview with WhatsApp ordering",
    goal: "Make it easier for mobile visitors to choose and visit",
    services: ["Menu preview", "Open hours", "Directions", "WhatsApp contact"],
  },
  {
    id: "at-cafe",
    name: "At Cafe",
    category: "Coffee shop",
    audience: "customers comparing specialty coffee, desserts, hours, and menu items",
    offer: "Clean online menu and featured drink page",
    goal: "Convert Instagram menu traffic into visits and orders",
    services: ["Specialty coffee", "Desserts", "Digital menu", "Featured drinks"],
  },
  {
    id: "whj-cafe",
    name: "WHJ Cafe",
    category: "Specialty coffee shop",
    audience: "people looking for specialty coffee, study seating, and desserts",
    offer: "Mobile cafe page with menu, hours, and map",
    goal: "Make it easier for customers to decide before visiting",
    services: ["Coffee", "Desserts", "Study seating", "Map and hours"],
  },
  {
    id: "coffeehood",
    name: "Coffeehood",
    category: "Specialty coffee and dessert shop",
    audience: "customers looking for specialty coffee, desserts, and a cozy cafe",
    offer: "Dessert and coffee menu with WhatsApp contact",
    goal: "Turn Linktree traffic into more cafe visits and event inquiries",
    services: ["Specialty coffee", "Desserts", "Events", "WhatsApp contact"],
  },
  {
    id: "oxygen-gym",
    name: "Oxygen GYM",
    category: "Gym and fitness center",
    audience: "people comparing gyms, memberships, coaches, and facilities",
    offer: "Membership enquiry and free tour request",
    goal: "Turn Instagram traffic into more membership enquiries",
    services: ["Memberships", "Coaches", "Facilities", "Free tour"],
  },
  {
    id: "pilax-pilates",
    name: "Pilax Pilates Studio",
    category: "Pilates studio",
    audience: "women looking for pilates classes, schedules, and private sessions",
    offer: "Class schedule and WhatsApp booking page",
    goal: "Make it easier to book trial classes from mobile",
    services: ["Class schedule", "Trial class", "Private sessions", "WhatsApp booking"],
  },
  {
    id: "breathe-fitness",
    name: "Breathe Ladies Fitness",
    category: "Ladies fitness studio",
    audience: "women comparing fitness classes, HIIT programs, and gym options",
    offer: "Free class trial or tour booking",
    goal: "Convert Instagram visitors into tour and class-trial requests",
    services: ["HIIT classes", "Functional training", "Tours", "Class trials"],
  },
  {
    id: "coach-amal",
    name: "Coach Amal",
    category: "Personal trainer and pilates coach",
    audience: "women looking for home training, pilates, weight loss, and nutrition guidance",
    offer: "Free fitness consultation through WhatsApp",
    goal: "Turn social viewers into booked consultations",
    services: ["Home training", "Pilates", "Weight loss", "Nutrition guidance"],
  },
  {
    id: "coach-abo-3zoz",
    name: "Coach Abo 3zoz",
    category: "Personal trainer",
    audience: "clients looking for bodybuilding, online coaching, and personal training",
    offer: "WhatsApp fitness assessment and training plan",
    goal: "Turn profile views into paid coaching consultations",
    services: ["Bodybuilding", "Online coaching", "Training plans", "Assessments"],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderSlide(target, slideIndex) {
  const serviceCards = target.services
    .map(
      (service) => `
        <div class="service-card">
          <span></span>
          ${escapeHtml(service)}
        </div>`,
    )
    .join("");

  const slides = [
    `
      <p class="eyebrow">Personalized website demo</p>
      <h1>${escapeHtml(target.name)}</h1>
      <p class="lead">A mobile-first landing page for a ${escapeHtml(target.category.toLowerCase())} in Riyadh.</p>
      <div class="cta-row">
        <div class="cta">Claim: ${escapeHtml(target.offer)}</div>
        <div class="ghost">Built for WhatsApp booking</div>
      </div>
    `,
    `
      <p class="eyebrow">What the page highlights</p>
      <h2>Services are clear in seconds.</h2>
      <div class="services">${serviceCards}</div>
    `,
    `
      <p class="eyebrow">Trust and conversion</p>
      <h2>Reviews, location, and a clear next step.</h2>
      <div class="review">
        <div class="stars">★★★★★</div>
        <p>"Easy to contact, clear services, and ready to book from mobile."</p>
      </div>
    `,
    `
      <p class="eyebrow">Goal</p>
      <h2>${escapeHtml(target.goal)}</h2>
      <p class="lead">This demo is designed for ${escapeHtml(target.audience)}.</p>
      <div class="phone-mock">
        <div></div>
        <strong>WhatsApp booking</strong>
        <span>Tap to request a quote or appointment</span>
      </div>
    `,
  ];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(target.name)} demo slide</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 1280px;
        height: 720px;
        overflow: hidden;
        background: #050816;
        color: #111827;
        font-family: Arial, Helvetica, sans-serif;
      }
      .frame {
        width: 1280px;
        height: 720px;
        padding: 54px;
        background:
          radial-gradient(circle at 12% 12%, rgba(250, 204, 21, 0.26) 0 18%, transparent 32%),
          radial-gradient(circle at 90% 4%, rgba(56, 189, 248, 0.22) 0 14%, transparent 30%),
          linear-gradient(135deg, #050816 0%, #0f172a 48%, #1f2937 100%);
      }
      .browser {
        height: 612px;
        overflow: hidden;
        border: 1px solid rgba(250, 204, 21, 0.46);
        border-radius: 34px;
        background: #fffaf0;
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 54px;
        padding: 0 24px;
        border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        background: rgba(255, 255, 255, 0.86);
      }
      .dot { width: 12px; height: 12px; border-radius: 50%; background: #cbd5e1; }
      .dot:nth-child(1) { background: #fb7185; }
      .dot:nth-child(2) { background: #facc15; }
      .dot:nth-child(3) { background: #34d399; }
      .url {
        margin-left: 10px;
        padding: 8px 18px;
        border-radius: 999px;
        background: #0f172a;
        color: #f8fafc;
        font-size: 15px;
      }
      .content {
        height: 558px;
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 34px;
        padding: 46px;
        align-items: center;
        background:
          radial-gradient(circle at 80% 12%, rgba(250, 204, 21, 0.18), transparent 28%),
          #fffaf0;
      }
      .panel {
        border-radius: 30px;
        background:
          radial-gradient(circle at top right, rgba(250, 204, 21, 0.18), transparent 30%),
          linear-gradient(145deg, #070b16 0%, #111827 64%, #0f172a 100%);
        color: #ffffff;
        height: 420px;
        overflow: hidden;
        padding: 44px;
        border: 1px solid rgba(250, 204, 21, 0.24);
      }
      .side {
        height: 420px;
        overflow: hidden;
        border: 1px solid rgba(148, 113, 28, 0.2);
        border-radius: 30px;
        padding: 34px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,251,235,0.98));
      }
      .eyebrow {
        margin: 0 0 18px;
        color: #facc15;
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      h1, h2 {
        margin: 0;
        font-size: 58px;
        line-height: 0.98;
        letter-spacing: -0.06em;
      }
      h2 { font-size: 44px; }
      .lead {
        margin: 24px 0 0;
        font-size: 24px;
        line-height: 1.45;
        color: #cbd5e1;
      }
      .cta-row {
        display: flex;
        gap: 14px;
        margin-top: 34px;
      }
      .cta, .ghost {
        border-radius: 999px;
        padding: 15px 20px;
        font-size: 17px;
        font-weight: 800;
      }
      .cta { background: #facc15; color: #111827; }
      .ghost {
        background: rgba(255,255,255,0.1);
        color: #ffffff;
        border: 1px solid rgba(250, 204, 21, 0.24);
      }
      .services {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 22px;
      }
      .service-card {
        color: #0f172a;
        min-height: 74px;
        border: 1px solid rgba(148, 113, 28, 0.18);
        border-radius: 24px;
        background:
          linear-gradient(180deg, #ffffff, #fffbeb);
        padding: 16px;
        font-size: 19px;
        font-weight: 800;
      }
      .service-card span {
        display: block;
        width: 22px;
        height: 22px;
        margin-bottom: 10px;
        border-radius: 50%;
        background: #facc15;
      }
      .review {
        margin-top: 32px;
        border-radius: 26px;
        background: linear-gradient(180deg, #fffbeb, #fef3c7);
        color: #334155;
        padding: 28px;
        font-size: 24px;
        line-height: 1.35;
      }
      .stars {
        margin-bottom: 12px;
        color: #f59e0b;
        font-size: 30px;
        letter-spacing: 0.1em;
      }
      .phone-mock {
        margin-top: 24px;
        border-radius: 28px;
        background: linear-gradient(180deg, #ffffff, #fffbeb);
        color: #0f172a;
        padding: 22px;
        border: 1px solid rgba(148, 113, 28, 0.2);
      }
      .phone-mock div {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #bbf7d0;
        margin-bottom: 14px;
      }
      .phone-mock strong {
        display: block;
        font-size: 24px;
      }
      .phone-mock span {
        display: block;
        margin-top: 8px;
        color: #64748b;
        font-size: 19px;
      }
      .side .label {
        color: #94711c;
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .side .metric {
        margin-top: 16px;
        font-size: 42px;
        font-weight: 900;
        letter-spacing: -0.04em;
        color: #111827;
      }
      .side .note {
        margin-top: 24px;
        color: #4b5563;
        font-size: 22px;
        line-height: 1.45;
      }
    </style>
  </head>
  <body>
    <main class="frame">
      <section class="browser">
        <div class="bar">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="url">demo.local/${escapeHtml(target.id)}</span>
        </div>
        <div class="content">
          <div class="panel">${slides[slideIndex]}</div>
          <div class="side">
            <div class="label">Riyadh demo strategy</div>
            <div class="metric">${escapeHtml(target.category)}</div>
            <p class="note">A focused website demo gives the owner a concrete preview instead of a generic sales pitch.</p>
            <p class="note">Video ${slideIndex + 1} of 4: designed to be sent by WhatsApp or Instagram DM.</p>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

function run(command, args, options = {}) {
  execFileSync(command, args, {
    stdio: "inherit",
    ...options,
  });
}

function captureScreenshot(args, screenshotPath) {
  const result = spawnSync("timeout", ["4s", chromeBin, ...args], {
    stdio: "inherit",
  });

  if (result.status !== 0 && !existsSync(screenshotPath)) {
    throw new Error(`Chrome failed to write ${screenshotPath}`);
  }
}

rmSync(buildDir, { force: true, recursive: true });
mkdirSync(buildDir, { recursive: true });
mkdirSync(outputDir, { recursive: true });

for (const target of targets) {
  const targetDir = path.join(buildDir, target.id);
  mkdirSync(targetDir, { recursive: true });

  const screenshots = [];

  for (let index = 0; index < 4; index += 1) {
    const htmlPath = path.join(targetDir, `slide-${index + 1}.html`);
    const screenshotPath = path.join(targetDir, `slide-${index + 1}.png`);

    writeFileSync(htmlPath, renderSlide(target, index));
    captureScreenshot([
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--window-size=1280,720",
      `--user-data-dir=${path.join(targetDir, `chrome-${index + 1}`)}`,
      `--screenshot=${screenshotPath}`,
      `file://${htmlPath}`,
    ], screenshotPath);
    screenshots.push(screenshotPath);
  }

  const concatPath = path.join(targetDir, "slides.txt");
  const concatBody = [
    ...screenshots.flatMap((screenshot) => [
      `file '${screenshot.replaceAll("'", "'\\''")}'`,
      "duration 2.4",
    ]),
    `file '${screenshots.at(-1).replaceAll("'", "'\\''")}'`,
  ].join("\n");
  writeFileSync(concatPath, concatBody);

  const outputPath = path.join(outputDir, `${target.id}.mp4`);
  run("ffmpeg", [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    concatPath,
    "-vf",
    "fps=30,format=yuv420p",
    "-movflags",
    "+faststart",
    outputPath,
  ]);
}

rmSync(buildDir, { force: true, recursive: true });

console.log(`Generated ${targets.length} demo videos in ${outputDir}`);

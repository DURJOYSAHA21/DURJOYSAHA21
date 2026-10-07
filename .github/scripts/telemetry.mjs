// Builds assets/telemetry.svg from live GitHub data. Run from the repo root.
// Needs a GitHub token in GITHUB_TOKEN (the Actions default token is enough).

import { writeFileSync } from "node:fs";

const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
if (!TOKEN) throw new Error("GITHUB_TOKEN is required");

const QUERY = `
query($login: String!) {
  user(login: $login) {
    databaseId
    login
    name
    repositories: repositories(first: 0) { totalCount }
    followers { totalCount }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { contributionCount date }
        }
      }
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      totalRepositoryContributions
    }
  }
}`;

const login = process.argv[2] || "DURJOYSAHA21";
const out = process.argv[3] || "assets/telemetry.svg";

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    authorization: `Bearer ${TOKEN}`,
    "content-type": "application/json",
    "user-agent": "telemetry-svg",
  },
  body: JSON.stringify({ query: QUERY, variables: { login } }),
});

if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}: ${await res.text()}`);
const json = await res.json();
if (json.errors) throw new Error(JSON.stringify(json.errors));

const u = json.data.user;
const cc = u.contributionsCollection;
const days = cc.contributionCalendar.weeks.flatMap((w) => w.contributionDays);

// streaks over contribution days, not calendar days
let longest = 0;
let run = 0;
for (const d of days) {
  run = d.contributionCount > 0 ? run + 1 : 0;
  if (run > longest) longest = run;
}
let current = 0;
for (let i = days.length - 1; i >= 0; i--) {
  if (days[i].contributionCount > 0) current++;
  else if (i !== days.length - 1) break;
}

const max = Math.max(1, ...days.map((d) => d.contributionCount));
const ramp = ["#141c27", "#0d3f43", "#126a63", "#1aa08a", "#5eead4"];
const level = (n) => (n === 0 ? 0 : Math.min(4, 1 + Math.floor((Math.log(n) / Math.log(max)) * 3.99)));

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const weeks = cc.contributionCalendar.weeks;
const padL = 34;
const padT = 176;
const gridW = weeks.length * STEP - GAP;
const W = Math.max(880, gridW + padL + 30);
const H = padT + 7 * STEP + 74;

const tiles = [
  { v: cc.contributionCalendar.totalContributions, k: "contributions", c: "#5eead4" },
  { v: current, k: "day streak", c: "#38bdf8" },
  { v: longest, k: "best streak", c: "#8b5cf6" },
  { v: cc.totalCommitContributions, k: "commits", c: "#a5b4fc" },
  { v: cc.totalPullRequestContributions, k: "pull requests", c: "#f0a35e" },
  { v: cc.totalIssueContributions, k: "issues", c: "#e07b9b" },
  { v: u.repositories.totalCount, k: "public repos", c: "#94a3b8" },
  { v: u.followers.totalCount, k: "followers", c: "#64748b" },
];

const tileW = (W - padL - 30 - 7 * 12) / 8;
const tileSvg = tiles
  .map((t, i) => {
    const x = padL + i * (tileW + 12);
    const y = 84;
    return `
    <g class="tile" style="animation-delay:${(0.12 + i * 0.09).toFixed(2)}s">
      <rect x="${x.toFixed(1)}" y="${y}" width="${tileW.toFixed(1)}" height="66" rx="10" fill="#0f1626" stroke="#243044"/>
      <text x="${(x + tileW / 2).toFixed(1)}" y="${y + 32}" text-anchor="middle" font-size="23" font-weight="600" fill="${t.c}">${t.v}</text>
      <text x="${(x + tileW / 2).toFixed(1)}" y="${y + 51}" text-anchor="middle" font-size="9.5" letter-spacing="0.9" fill="#64748b">${t.k}</text>
    </g>`;
  })
  .join("");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WD = ["", "Mon", "", "Wed", "", "Fri", ""];
let cells = "";
let labels = "";
let seenMonth = -1;
weeks.forEach((w, wi) => {
  w.contributionDays.forEach((d, di) => {
    const x = padL + wi * STEP;
    const y = padT + di * STEP;
    const lv = level(d.contributionCount);
    const delay = (0.5 + wi * 0.012).toFixed(2);
    cells += `<rect class="c" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${CELL}" height="${CELL}" rx="2.5" fill="${ramp[lv]}" style="animation-delay:${delay}s"><title>${d.date}: ${d.contributionCount}</title></rect>`;
  });
  const first = d0(w);
  const m = Number(first.slice(5, 7)) - 1;
  if (m !== seenMonth && wi < weeks.length - 2) {
    seenMonth = m;
    labels += `<text x="${(padL + wi * STEP).toFixed(1)}" y="${padT - 9}" font-size="9.5" fill="#4f5b6b">${MONTHS[m]}</text>`;
  }
});
function d0(w) {
  return w.contributionDays[0].date;
}
const dayLabels = WD.map(
  (t, i) => t && `<text x="${padL - 8}" y="${padT + i * STEP + 9.5}" text-anchor="end" font-size="9.5" fill="#4f5b6b">${t}</text>`
).join("");

const start = days[0].date.slice(0, 10);
const end = days[days.length - 1].date.slice(0, 10);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Contribution telemetry: ${cc.contributionCalendar.totalContributions} contributions, ${current} day streak, ${longest} day best streak">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#080d18"/>
      <stop offset="1" stop-color="#0b1120"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5eead4" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#5eead4" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .sans { font-family: 'Segoe UI', Inter, system-ui, sans-serif; }
    .mono { font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace; }
    .tile { transform-box: fill-box; transform-origin: center; animation: rise .7s cubic-bezier(.2,.8,.3,1) both; }
    .c { animation: pop .5s ease-out both; }
    .live { animation: pulse 2.6s ease-in-out infinite; }
    @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pop { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) { .tile,.c,.live { animation: none; } }
  </style>

  <rect width="${W}" height="${H}" rx="16" fill="url(#bg)"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="16" fill="none" stroke="#5eead4" stroke-opacity="0.14"/>

  <g class="sans">
    <text x="${padL}" y="42" font-size="16" font-weight="600" fill="#e2e8f0" letter-spacing="0.3">Contribution telemetry</text>
    <text class="mono" x="${padL}" y="62" font-size="11" fill="#5b6b7d">${start} → ${end} · straight from the GitHub API</text>
  </g>
  <g class="mono">
    <circle class="live" cx="${W - 46}" cy="37" r="4" fill="#5eead4"/>
    <text x="${W - 36}" y="41" font-size="10.5" fill="#5eead4" text-anchor="start">live</text>
  </g>
  <rect x="${padL}" y="72" width="${W - padL - 30}" height="1" fill="url(#rule)"/>

  ${tileSvg}

  ${labels}
  ${dayLabels}
  ${cells}

  <g class="mono" font-size="9.5" fill="#4f5b6b">
    <text x="${padL}" y="${H - 26}">less</text>
    ${ramp.map((c, i) => `<rect x="${padL + 34 + i * 15}" y="${H - 35}" width="12" height="12" rx="2.5" fill="${c}"/>`).join("")}
    <text x="${padL + 34 + 5 * 15 + 6}" y="${H - 26}">more</text>
    <text x="${W - 30}" y="${H - 26}" text-anchor="end" fill="#3f4b5b">peak day · ${max} contributions</text>
  </g>
</svg>
`;

writeFileSync(out, svg);
console.log(
  `${out}: ${cc.contributionCalendar.totalContributions} contributions, streak ${current}/${longest}, ${weeks.length} weeks, ${W}x${H}`
);

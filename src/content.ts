// Single source of truth for all portfolio copy.
// Edit here — components read from this config.
//
// NOTE: Lendix product details (names, architecture, metrics) are confidential.
// This file describes Shivansh's role and skills only — no internal specifics.

// Canonical site URL — used for SEO metadata, sitemap, robots, and OG tags.
// Update this if you later attach a custom domain.
export const siteUrl = "https://portfolio-five-zeta-rp9zc26u9y.vercel.app";

export const profile = {
  name: "Shivansh Mishra",
  role: "Software Development Engineer",
  location: "Lucknow, India",
  tagline: "I'm a full-stack engineer who cares about systems that stay reliable under pressure.",
  intro:
    "Software Development Engineer at Lendix.ai, working on production systems in the fintech and lending space — backend services, API integrations, and internal tooling across the full stack.",
  email: "shivanshmishra2606@gmail.com",
  links: {
    github: "https://github.com/Shivuu2803",
    linkedin: "https://www.linkedin.com/in/shivanshmishra02/",
    email:
      "mailto:shivanshmishra2606@gmail.com?subject=Let%27s%20connect&body=Hi%20Shivansh%2C",
    // Hosted on Vercel Blob (public), not in the repo — see .gitignore.
    cv: "https://hs0vxdmdpdrp9dnl.public.blob.vercel-storage.com/Shivansh_Mishra_CV.pdf",
  },
};

// Inline **bold** marks the key phrase in each line — About.tsx renders these as <strong>.
export const about = {
  paragraphs: [
    "I'm a full-stack engineer drawn to the unglamorous but critical parts of software — the integrations, fallbacks, and retry logic that keep systems **resilient** when a third-party dependency fails in production.",
    "My path was direct: I trained intensively at **MountBlue**, then got deployed to **Lendix.ai**, where I've spent the last year building production systems in the fintech space — backend services, third-party integrations, and the internal tools the team relies on day to day.",
  ],
};

export type SkillGroup = {
  label: string;
  highlight?: boolean;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Serverless", "MySQL", "MongoDB"],
  },
  {
    label: "AWS / Cloud",
    items: ["Lambda", "DynamoDB", "CloudWatch", "SES", "Amplify"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "GitHub Actions", "Figma", "Linux"],
  },
];

export type Stat = {
  value: string;
  label: string;
  context: string;
};

// Quantified, confirmed wins only — no confidential product names or metrics.
export const stats: Stat[] = [
  { value: "+60%", label: "client throughput", context: "via an automatic fallback mechanism" },
  { value: "-55%", label: "AWS CloudWatch cost", context: "through optimized queries & ingestion" },
  { value: "1+", label: "years in industry", context: "building real fintech systems" },
  { value: "Full", label: "stack", context: "frontend, backend, and tooling" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  status: "current" | "past";
  summary: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Lendix.ai",
    role: "Software Development Engineer",
    period: "Jun 2025 — Present",
    status: "current",
    summary:
      "Building production systems in the fintech and lending space as part of the core engineering team.",
    highlights: [
      "Built **automatic fallback** for critical third-party integrations — kept client workflows running through vendor outages, lifting client throughput by **~60%**.",
      "Developed and maintained **API gateway** services on AWS — unified, resilient endpoints over many downstream integrations.",
      "Owned deployments end to end — **CI/CD** pipelines and releases across services on AWS.",
      "Cut **AWS CloudWatch** costs by **~55%** through optimized log/metric queries and tighter ingestion and retention.",
    ],
  },
  {
    company: "MountBlue Technologies",
    role: "Software Engineer Trainee",
    period: "Mar — Jun 2025",
    status: "past",
    summary:
      "Intensive full-stack engineering bootcamp — building real projects on the MERN stack with constant code reviews and assessments.",
    highlights: [
      "Built multiple full-stack projects across the **MERN stack** under real-world engineering standards.",
      "Sharpened through constant **code reviews** and regular tests that enforced clean, production-grade code.",
      "Selected and deployed to **Lendix.ai** on completion of the program.",
    ],
  },
];

export type Project = {
  name: string;
  kind: string;
  image: string;
  blurb: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

const GH = "https://github.com/Shivuu2803";

// Personal / open projects. Lendix work is described in Experience, not here.
export const projects: Project[] = [
  {
    name: "Real-time Chat App",
    kind: "Full-stack · MERN",
    image: "/projects/chat-app.webp",
    blurb:
      "A real-time messaging app on the MERN stack with JWT authentication, chat rooms, and live delivery over WebSockets — a study in stateful, low-latency communication.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    links: [
      { label: "GitHub", href: GH },
      { label: "Live", href: GH },
    ],
  },
  {
    name: "Voting Application — Backend",
    kind: "Backend · API",
    image: "/projects/voting-backend.webp",
    blurb:
      "A secure voting backend with one-vote-per-user integrity, token-based auth, and an admin layer for managing candidates. A study in backend correctness and data integrity.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "REST"],
    links: [
      { label: "GitHub", href: GH },
      { label: "Live", href: GH },
    ],
  },
  {
    name: "Blog Platform",
    kind: "Full-stack · MERN",
    image: "/projects/blog.webp",
    blurb:
      "A full-stack blog application with authentication, CRUD operations, state management, and a responsive interface — end-to-end MERN from data layer to UI.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    links: [{ label: "GitHub", href: GH }],
  },
  {
    name: "Employee Management System",
    kind: "Frontend · React",
    image: "/projects/ems.webp",
    blurb:
      "An EMS with separate admin and employee dashboards, local-storage persistence, and a clean responsive UI built with React and Tailwind.",
    tech: ["React", "Tailwind CSS", "Local Storage"],
    links: [
      { label: "GitHub", href: GH },
      { label: "Live", href: GH },
    ],
  },
  {
    name: "Gemini 2.0",
    kind: "Frontend · AI integration",
    image: "/projects/gemini.webp",
    blurb:
      "A React app integrating the Gemini API for dynamic, real-time AI responses, with a redesigned UI, state management, and a smooth interactive experience.",
    tech: ["React", "Gemini API", "CSS"],
    links: [
      { label: "GitHub", href: GH },
      { label: "Live", href: GH },
    ],
  },
  {
    name: "MyFit App",
    kind: "Mobile · React Native",
    image: "/projects/myfit.webp",
    blurb:
      "A cross-platform fitness tracking app built with React Native — intuitive UI, smooth navigation, and clean state management and API integration.",
    tech: ["React Native", "Tailwind CSS"],
    links: [{ label: "GitHub", href: GH }],
  },
];

export type Article = {
  title: string;
  blurb: string;
  date: string;
  readTime: string;
  platform: string;
  href: string;
};

export const articles: Article[] = [
  {
    title: "How We Kept Our Clients' Business Running When Vendors Went Down",
    blurb:
      "A vendor outage shouldn't become your customer's problem. How automatic fallback routing turned third-party outages into non-events — and kept ~60% more transactions completing.",
    date: "Jun 2026",
    readTime: "3 min read",
    platform: "Medium",
    href: "https://medium.com/@shivanshmishra2606/how-we-kept-our-clients-business-running-when-vendors-went-down-463165822d9d",
  },
  {
    title: "How We Cut Our AWS CloudWatch Bill by 55%",
    blurb:
      "CloudWatch creeps up on you. Where the cost actually hides — noisy logs, giant payloads, scanning instead of querying — and how to cut it without losing observability.",
    date: "May 2026",
    readTime: "2 min read",
    platform: "Medium",
    href: "https://medium.com/@shivanshmishra2606/how-we-cut-our-aws-cloudwatch-bill-by-55-624dce304cee",
  },
];

// Add real quotes here to make the Testimonials section appear.
export type Testimonial = { quote: string; author: string; title: string };
export const testimonials: Testimonial[] = [];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

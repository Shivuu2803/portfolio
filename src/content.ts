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
  role: "Software Engineer",
  location: "Moradabad, India",
  tagline:
    "I'm a full-stack engineer who cares about systems that stay reliable under pressure.",
  intro:
    "Software Engineer at Heckyl Technologies (parent company of Lendix.ai), building a multi-lender digital lending platform — backend services, compliance workflows, and API integrations across the full stack.",
  email: "shivanshmishra2606@gmail.com",
  links: {
    github: "https://github.com/Shivuu2803",
    linkedin: "https://www.linkedin.com/in/shivanshmishra02/",
    email:
      "mailto:shivanshmishra2606@gmail.com?subject=Let%27s%20connect&body=Hi%20Shivansh%2C",
    // Hosted on Vercel Blob (public), not in the repo — see .gitignore.
    cv: "https://drive.google.com/file/d/178U2uyq51Uy9E-4XBnQWO_XhfjMYX3WJ/view?usp=drive_link",
  },
};

// Inline **bold** marks the key phrase in each line — About.tsx renders these as <strong>.
export const about = {
  paragraphs: [
    "I'm a full-stack engineer drawn to the unglamorous but critical parts of software — the integrations, fallbacks, and retry logic that keep systems **resilient** when a third-party dependency fails in production.",
    "My path was direct: I trained intensively at **MountBlue**, spent a year as a contract engineer at **Lendix.ai** building resilient integrations and AWS infrastructure, and then joined its parent company **Heckyl Technologies** full-time — where I'm building a **Loan Origination System** and digital lending platform from the ground up, while continuing to own the Lendix integrations and AWS infrastructure.",
  ],
};

export type SkillGroup = {
  label: string;
  highlight?: boolean;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "C++", "Java", "Python"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "Hono", "REST APIs", "Serverless"],
  },
  {
    label: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    label: "AWS / Cloud",
    items: [
      "Lambda",
      "API Gateway",
      "DynamoDB",
      "CloudWatch",
      "Cognito",
      "SES",
      "Amplify",
      "EventBridge",
    ],
  },
  {
    label: "Tools & Design",
    items: ["Git", "GitHub", "GitHub Actions", "Linux", "Figma", "Canva", "UI/UX Design"],
  },
];

export type Stat = {
  value: string;
  label: string;
  context: string;
};

// Quantified, confirmed wins only — no confidential product names or metrics.
export const stats: Stat[] = [
  {
    value: "+60%",
    label: "client throughput",
    context: "via an automatic fallback mechanism",
  },
  {
    value: "-55%",
    label: "AWS CloudWatch cost",
    context: "through optimized queries & ingestion",
  },
  {
    value: "1.5+",
    label: "years in industry",
    context: "building real fintech systems",
  },
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
    company: "Heckyl Technologies",
    role: "Software Engineer",
    period: "Jul 2026 — Present",
    status: "current",
    summary:
      "Full-time at the parent company of Lendix.ai — building a Loan Origination System and multi-lender digital lending platform, while continuing to own the Lendix integrations and AWS infrastructure.",
    highlights: [
      "Engineered a digital **Loan Origination System** from scratch using TypeScript, Node.js (Hono), AWS Lambda, MySQL, and Next.js.",
      "Implemented borrower onboarding and **RBI digital lending compliance** — consent management, Key Fact Statement (KFS), and cooling-off periods.",
      "Strengthened backend infrastructure and accelerated the test pipeline by **11×**.",
    ],
  },
  {
    company: "Lendix.ai",
    role: "Software Development Engineer",
    period: "Jul 2025 — Jun 2026",
    status: "past",
    summary:
      "Contract role via MountBlue Technologies, building production systems in the fintech and lending space.",
    highlights: [
      "Built **automatic fallback** and resilient **API gateway** services on AWS for critical third-party integrations — kept client workflows running through vendor outages, lifting client throughput by **60%**.",
      "Owned deployments end to end — **CI/CD** pipelines and releases across AWS services.",
      "Cut **AWS CloudWatch** costs by **55%** through optimized log/metric queries and tighter ingestion and retention.",
    ],
  },
  {
    company: "MountBlue Technologies",
    role: "Software Engineer Intern",
    period: "Mar 2025 — Jun 2025",
    status: "past",
    summary:
      "Intensive full-stack engineering program — building real projects on the MERN stack under real-world engineering standards.",
    highlights: [
      "Built multiple full-stack projects across the **MERN stack** with constant **code reviews** and assessments.",
      "Earned a contract placement as **Software Development Engineer** at Lendix.ai on completion of the program.",
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
    links: [{ label: "GitHub", href: GH }],
  },
  {
    name: "Voting Application — Backend",
    kind: "Backend · API",
    image: "/projects/voting-backend.webp",
    blurb:
      "A secure voting backend with one-vote-per-user integrity, token-based auth, and an admin layer for managing candidates. A study in backend correctness and data integrity.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "REST"],
    links: [{ label: "GitHub", href: GH }],
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
    links: [{ label: "GitHub", href: GH }],
  },
  {
    name: "Gemini 2.0",
    kind: "Frontend · AI integration",
    image: "/projects/gemini.webp",
    blurb:
      "A React app integrating the Gemini API for dynamic, real-time AI responses, with a redesigned UI, state management, and a smooth interactive experience.",
    tech: ["React", "Gemini API", "CSS"],
    links: [{ label: "GitHub", href: GH }],
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

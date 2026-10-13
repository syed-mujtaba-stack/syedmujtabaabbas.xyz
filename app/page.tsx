import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  CloudCog,
  Code2,
  Cpu,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  Orbit,
  Workflow,
} from "lucide-react";
import HeroScene from "./hero-scene";
import SiteHeader from "./site-header";
import SiteMotion from "./site-motion";

const skillGroups = [
  {
    id: "01",
    title: "Full-stack engineering",
    summary: "Interfaces, APIs, and the systems behind them.",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    id: "02",
    title: "Agentic AI",
    summary: "LLM-powered products, agents, and retrieval workflows.",
    icon: Bot,
    skills: [
      "LangChain",
      "LlamaIndex",
      "CrewAI",
      "AutoGen",
      "RAG",
      "OpenAI API",
      "Hugging Face",
      "PyTorch",
    ],
  },
  {
    id: "03",
    title: "Cloud & DevOps",
    summary: "Repeatable delivery, cloud infrastructure, and reliable releases.",
    icon: CloudCog,
    skills: [
      "AWS",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
      "Nginx",
    ],
  },
  {
    id: "04",
    title: "Automation & robotics",
    summary: "Connecting intelligent software to physical systems.",
    icon: Cpu,
    skills: [
      "ROS / ROS 2",
      "OpenCV",
      "Gazebo",
      "PyBullet",
      "Sensor fusion",
      "Python",
      "C++",
    ],
  },
];

const processSteps = [
  {
    id: "01",
    title: "Understand",
    text: "Clarify the real problem, the people affected, and what a useful outcome looks like.",
  },
  {
    id: "02",
    title: "Design the system",
    text: "Choose an architecture, shape the data, and plan integrations before complexity sets in.",
  },
  {
    id: "03",
    title: "Build & integrate",
    text: "Connect the interface, backend, AI workflows, and APIs into one coherent product.",
  },
  {
    id: "04",
    title: "Ship & improve",
    text: "Test, deploy, observe, and refine the experience against the original goal.",
  },
];

const experience = [
  {
    role: "Independent Tech Consultant",
    focus: "Full-stack & AI developer",
    period: "Jan 2024 — Present",
    description:
      "Deliver end-to-end software and AI solutions for international clients, from technical architecture and agentic workflows to cloud-native applications and deployment pipelines.",
    tags: ["Full-stack", "Agentic AI", "Cloud & DevOps"],
    current: true,
  },
  {
    role: "Full Stack Developer · Agentic AI Developer",
    focus: "AlphaTach · career progression",
    period: "6 months",
    description:
      "Integrated agentic AI workflows into products and built autonomous agents for reasoning, tool use, and multi-step execution.",
    tags: ["LangChain", "LLM orchestration", "Full-stack"],
  },
  {
    role: "Full Stack Developer",
    focus: "AlphaTach",
    period: "6 months",
    description:
      "Developed scalable web applications and APIs; query optimization and Redis caching improved application load times by 30%.",
    tags: ["React / Next.js", "Node.js / Django", "Redis"],
  },
  {
    role: "Junior Agentic AI Developer",
    focus: "AlphaTach",
    period: "3 months",
    description:
      "Worked on prompt engineering, LLM integrations, and AI-powered data pipelines for internal automation.",
    tags: ["Prompt engineering", "LLM APIs", "Automation"],
  },
  {
    role: "Junior Full Stack Developer",
    focus: "AlphaTach",
    period: "3 months",
    description:
      "Built responsive frontend features and connected them to backend APIs and application data.",
    tags: ["React", "REST APIs", "Databases"],
  },
  {
    role: "Junior Backend Developer",
    focus: "AlphaTach",
    period: "3 months",
    description:
      "Developed server-side logic, REST APIs, background workers, database schemas, and SQL/NoSQL queries.",
    tags: ["Backend", "APIs", "SQL / NoSQL"],
  },
  {
    role: "Junior Frontend Developer",
    focus: "AlphaTach",
    period: "3 months",
    description:
      "Created responsive interfaces and reusable components with modern JavaScript and CSS tools.",
    tags: ["JavaScript", "CSS", "Responsive UI"],
  },
];

const education = [
  {
    course: "B.S. in Robotics",
    institution: "Superior University · Karachi",
  },
  {
    course: "Intermediate · Pre-Engineering",
    institution: "Board of Secondary Education · Karachi",
  },
  {
    course: "Matriculation · Computer Science",
    institution: "Board of Secondary Education · Karachi",
  },
];

const projects = [
  {
    name: "EduGenius",
    category: "AI · Learning product",
    summary:
      "An AI-powered learning copilot for turning study material into summaries, practice questions, and personalized tests.",
    stack: ["TypeScript", "AI learning", "Education"],
    github: "https://github.com/syed-mujtaba-stack/edugenius",
    live: "https://mj-edugenius.vercel.app/",
    accent: "project-art-edu",
    visual: "Learn with more intention.",
    featured: true,
  },
  {
    name: "SetupCI",
    category: "Developer tooling · Python",
    summary:
      "An interactive project scaffolder for quickly starting structured Python backend and frontend applications.",
    stack: ["Python", "CLI", "Project scaffolding"],
    github: "https://github.com/syed-mujtaba-stack/setupci",
    live: "https://setupci.vercel.app/",
    accent: "project-art-setup",
    visual: "A better place to begin.",
  },
  {
    name: "KarachiGum",
    category: "B2B · Industrial supplier",
    summary:
      "A web presence for an industrial guar gum supplier, with product information and a focused B2B experience.",
    stack: ["Next.js", "Tailwind CSS", "OpenRouter (repository-listed)"],
    github: "https://github.com/syed-mujtaba-stack/KarachiGum.com",
    live: "https://www.karachigum.com/",
    accent: "project-art-gum",
    visual: "Material science, made legible.",
    note: "The live page is verified; repository-listed AI features were not independently tested.",
  },
  {
    name: "Ayesha Fashion",
    category: "E-commerce · Fashion",
    summary:
      "A fashion storefront with a public shop link. Project-specific feature details are omitted because its repository README is still starter-template content.",
    stack: ["Next.js repository", "Fashion storefront"],
    github: "https://github.com/syed-mujtaba-stack/AyeshaShop",
    live: "https://www.ayeshafashionstyle.shop/",
    accent: "project-art-fashion",
    visual: "A considered storefront.",
    note: "Repository README does not substantiate individual implementation details.",
  },
  {
    name: "Norvia",
    category: "E-commerce · Digital services",
    summary:
      "A premium tech-accessories storefront and digital-services brand, described in the public repository and reflected in the reachable website.",
    stack: ["Next.js", "Sanity", "Tailwind CSS"],
    github: "https://github.com/syed-mujtaba-stack/Norvia",
    live: "https://www.norviaitservices.site/",
    accent: "project-art-norvia",
    visual: "Technology for the everyday.",
    note: "The current live page is storefront/newsletter-led.",
  },
  {
    name: "Fuji Fenix Elevator",
    category: "Web platform · Elevators",
    summary:
      "A multi-page elevator website project documented in a public repository with a Next.js and Sanity CMS stack.",
    stack: ["Next.js", "Sanity", "GSAP", "Framer Motion"],
    github: "https://github.com/syed-mujtaba-stack/fujifenix-elevator",
    accent: "project-art-lift",
    visual: "Movement, engineered.",
    note: "Repository is public; the listed live site could not be reached during verification.",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Mujtaba Abbas",
  jobTitle: "Software Engineer & Agentic AI Developer",
  description:
    "Software engineer in Karachi, Pakistan building full-stack products, agentic AI systems, cloud infrastructure, and robotics applications.",
  email: "abbasmujtaba125@gmail.com",
  telephone: "+923460630802",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  sameAs: ["https://github.com/syed-mujtaba-stack"],
  knowsAbout: [
    "Full-stack development",
    "Agentic AI",
    "Retrieval-augmented generation",
    "Cloud engineering",
    "Robotics",
    "Computer vision",
  ],
};

function ProjectArtwork({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div
      aria-label={`Original abstract portfolio artwork for ${project.name}; not a screenshot`}
      className={`project-artwork ${project.accent}`}
      role="img"
    >
      <span className="project-art-label">ORIGINAL PROJECT ARTWORK</span>
      <div className="project-art-center">
        <span className="project-art-orbit" aria-hidden="true" />
        <span className="project-art-mark" aria-hidden="true">
          {project.name === "EduGenius" ? (
            <Bot size={50} strokeWidth={0.8} />
          ) : project.name === "SetupCI" ? (
            <Workflow size={52} strokeWidth={0.8} />
          ) : project.name === "KarachiGum" ? (
            <Orbit size={52} strokeWidth={0.8} />
          ) : project.name === "Fuji Fenix Elevator" ? (
            <Layers3 size={50} strokeWidth={0.8} />
          ) : project.name === "Norvia" ? (
            <Cpu size={50} strokeWidth={0.8} />
          ) : (
            <Braces size={50} strokeWidth={0.8} />
          )}
        </span>
        <span className="project-art-title">{project.visual}</span>
        <span className="project-art-caption">
          {project.category.toUpperCase()}
        </span>
      </div>
      <span className="project-art-index">M / 0{projects.indexOf(project) + 1}</span>
    </div>
  );
}

function ProjectLinks({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="project-links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          Live project <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      <a href={project.github} target="_blank" rel="noreferrer">
        Source repository         <GitBranch size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <SiteHeader />
      <SiteMotion />

      <main id="home">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="live-dot" />
              Independent engineer <span className="eyebrow-divider">/</span>{" "}
              Karachi, PK
            </p>
            <h1 id="hero-title">
              Engineering
              <br />
              <span className="hero-title-muted">intelligence.</span>
              <br />
              <span className="serif-accent">Building what&apos;s next.</span>
            </h1>
            <p className="hero-description">
              I build intelligent digital products, full-stack applications,
              AI-powered workflows, and cloud infrastructure that turn
              ambitious ideas into practical solutions.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="text-link" href="#contact">
                Let&apos;s build something{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-meta">
              <div className="location-lockup">
                <MapPin size={14} aria-hidden="true" />
                <span>Karachi, Pakistan</span>
                <span className="meta-separator">·</span>
                <span>PKT (UTC+5)</span>
              </div>
              <span className="availability">
                <span className="live-dot" /> Open to meaningful collaborations
              </span>
            </div>
          </div>

          <div className="hero-art" aria-label="Portrait with abstract 3D artwork">
            <div className="art-topline">
              <span>SOFTWARE · AI · SYSTEMS</span>
              <span>KHI / PK</span>
            </div>
            <div className="orbital-label orbital-label-top">INTELLIGENCE</div>
            <HeroScene />
            <div className="portrait-monogram">
              <Image
                className="portrait-photo"
                src="/syed-mujtaba-abbas-software-engineer-karachi.png"
                alt="Syed Mujtaba Abbas, software engineer and agentic AI developer in Karachi, Pakistan"
                width={460}
                height={460}
                priority
                sizes="(max-width: 680px) 148px, 142px"
              />
              <span className="portrait-name">SYED MUJTABA ABBAS</span>
            </div>
            <div className="orbital-label orbital-label-bottom">SYSTEMS IN MOTION</div>
            <div className="art-caption">
              <span className="caption-index">01 /</span>
              <span>Engineering with intention.</span>
              <Orbit size={15} aria-hidden="true" />
            </div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </section>

        <div className="signal-strip" aria-label="Areas of focus">
          <span>FULL-STACK ENGINEERING</span>
          <span className="signal-separator">/</span>
          <span>AGENTIC AI</span>
          <span className="signal-separator">/</span>
          <span>CLOUD & DEVOPS</span>
          <span className="signal-separator">/</span>
          <span>AUTOMATION & ROBOTICS</span>
        </div>

        <section className="intro-section section-shell section-pad" id="about">
          <div className="section-kicker" data-reveal>
            <span>01</span> / THE ENGINEER BEHIND THE SYSTEMS
          </div>
          <div className="intro-content" data-reveal>
            <h2>
              I connect software,
              <br />
              <span className="serif-accent">intelligence & infrastructure.</span>
            </h2>
            <div className="intro-detail">
              <p>
                I&apos;m Syed Mujtaba Abbas, an independent software engineer
                working across full-stack development, agentic AI, and cloud
                engineering, with a growing focus on robotics.
              </p>
              <p>
                I look at the whole system: the experience someone touches, the
                services behind it, the intelligence inside it, and the
                infrastructure that gets it into the world.
              </p>
            </div>
          </div>
          <div className="systems-diagram" data-reveal aria-label="Engineering disciplines connected into one product">
            <div className="system-node">
              <Code2 size={17} aria-hidden="true" />
              <span>PRODUCT</span>
              <small>Human-facing experiences</small>
            </div>
            <span className="system-link" aria-hidden="true" />
            <div className="system-node system-node-featured">
              <Layers3 size={18} aria-hidden="true" />
              <span>ENGINEERING</span>
              <small>One coherent system</small>
            </div>
            <span className="system-link" aria-hidden="true" />
            <div className="system-node">
              <CloudCog size={17} aria-hidden="true" />
              <span>INFRASTRUCTURE</span>
              <small>Built to run and evolve</small>
            </div>
          </div>
        </section>

        <section
          className="expertise-section section-shell section-pad"
          id="expertise"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker">
                <span>02</span> / ENGINEERING DISCIPLINES
              </div>
              <h2>
                Many moving parts.
                <br />
                <span className="serif-accent">A systems mindset.</span>
              </h2>
            </div>
            <p>
              A practical toolkit shaped by building across product software,
              intelligent workflows, cloud delivery, and robotics.
            </p>
          </div>
          <div className="expertise-list">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article className="expertise-row" key={group.id} data-reveal>
                  <span className="expertise-index">{group.id}</span>
                  <Icon
                    className="expertise-icon"
                    size={21}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  <div className="expertise-copy">
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                  </div>
                  <ul className="skill-list">
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="process-section section-shell section-pad"
          id="process"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker">
                <span>03</span> / FROM QUESTION TO WORKING SOFTWARE
              </div>
              <h2>
                How I move
                <br />
                <span className="serif-accent">an idea forward.</span>
              </h2>
            </div>
            <p>
              Thoughtful engineering starts with the outcome, then connects the
              right decisions all the way through delivery.
            </p>
          </div>
          <div className="process-flow">
            <span className="process-connector" aria-hidden="true" />
            {processSteps.map((step) => (
              <article className="process-step" key={step.id} data-reveal>
                <span className="process-number">{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section section-shell section-pad" id="projects">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker">
                <span>04</span> / SELECTED PUBLIC WORK
              </div>
              <h2>
                Real projects.
                <br />
                <span className="serif-accent">Evidence over adjectives.</span>
              </h2>
            </div>
            <p>
              Public repositories and project pages checked before inclusion.
              Art here is original portfolio artwork, not a product screenshot.
            </p>
          </div>

          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <article
                className="project-featured"
                data-reveal
                key={project.name}
              >
                <ProjectArtwork project={project} />
                <div className="project-copy">
                  <p className="project-category">
                    <span>FEATURED</span> / {project.category}
                  </p>
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="project-stack">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ProjectLinks project={project} />
                </div>
              </article>
            ))}

          <div className="project-grid">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <article
                  className={`project-card${index % 2 ? " project-card-offset" : ""}`}
                  data-reveal
                  key={project.name}
                >
                  <ProjectArtwork project={project} />
                  <div className="project-card-copy">
                    <p className="project-category">
                      / {project.category}
                    </p>
                    <h3>{project.name}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <ul className="project-stack">
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {project.note && (
                      <p className="project-caveat">{project.note}</p>
                    )}
                    <ProjectLinks project={project} />
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section
          className="experience-section section-shell section-pad"
          id="experience"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker">
                <span>05</span> / EXPERIENCE
              </div>
              <h2>
                Growth through
                <br />
                <span className="serif-accent">building things.</span>
              </h2>
            </div>
            <p>
              Independent client work alongside a progression through
              full-stack engineering, AI, frontend, and backend development.
            </p>
          </div>
          <div className="experience-list">
            {experience.map((item, index) => (
              <article className="experience-item" key={`${item.role}-${index}`} data-reveal>
                <div className="experience-marker">
                  <span
                    className={item.current ? "marker-dot active" : "marker-dot"}
                  />
                  {index !== experience.length - 1 && (
                    <span className="marker-line" />
                  )}
                </div>
                <div className="experience-main">
                  <div className="experience-title-row">
                    <div>
                      <h3>{item.role}</h3>
                      <p className="experience-focus">{item.focus}</p>
                    </div>
                    <span className="experience-period">{item.period}</span>
                  </div>
                  <p className="experience-description">{item.description}</p>
                  <ul className="tag-list">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="education-section section-shell section-pad"
          id="learning"
        >
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker">
                <span>06</span> / FOUNDATIONS
              </div>
              <h2>
                Learning
                <br />
                <span className="serif-accent">forward.</span>
              </h2>
            </div>
            <p>
              Formal study in science and pre-engineering, with robotics
              bringing software and the physical world closer together.
            </p>
          </div>
          <div className="education-list">
            {education.map((item, index) => (
              <article className="education-row" key={item.course} data-reveal>
                <span className="education-index">0{index + 1}</span>
                <h3>{item.course}</h3>
                <p>{item.institution}</p>
                <ArrowUpRight size={15} aria-hidden="true" />
              </article>
            ))}
            <p className="learning-note">
              Additional learning: Agentic AI through GIAIC; exploring
              Robotics AI. Degree completion and course dates were not
              provided.
            </p>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-orb" aria-hidden="true" />
          <div className="contact-content" data-reveal>
            <div className="section-kicker">
              <span>07</span> / START A CONVERSATION
            </div>
            <h2>
              Have an ambitious idea?
              <br />
              <span className="serif-accent">Let&apos;s engineer it.</span>
            </h2>
            <p>
              From full-stack products to intelligent AI workflows and reliable
              cloud infrastructure, I&apos;m open to meaningful engineering
              collaborations.
            </p>
            <a
              className="button button-primary contact-button"
              href="mailto:abbasmujtaba125@gmail.com?subject=Let%27s%20engineer%20something"
            >
              <Mail size={16} aria-hidden="true" />
              Start a conversation
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <div className="contact-schedule">
              <span className="live-dot" />
              <span>Based in Karachi (PKT, UTC+5)</span>
              <span className="meta-separator">·</span>
              <span>Share your timezone and a suitable time by email</span>
            </div>
          </div>
          <div className="contact-links" data-reveal>
            <a href="mailto:abbasmujtaba125@gmail.com">
              <span>Email</span>
              <span>abbasmujtaba125@gmail.com</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/syed-mujtaba-stack"
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <span>syed-mujtaba-stack</span>
              <GitBranch size={16} aria-hidden="true" />
            </a>
            <a href="tel:+923460630802">
              <span>Phone</span>
              <span>+92 346 0630802</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <p className="unavailable-channel">
              LinkedIn and booking links will be added when the verified
              profile and schedule are available.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">M.</span>
          <span className="brand-name">
            MUJTABA <span>ABBAS</span>
          </span>
        </a>
        <span>Thoughtfully engineered in Karachi, Pakistan.</span>
        <a href="#home" className="back-to-top">
          Back to top <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <span className="footer-copyright">© MUJTABA ABBAS</span>
      </footer>
    </>
  );
}

import SceneBackground from "@/components/SceneBackground";
import PageEffects from "@/components/PageEffects";

export default function Home() {
  return (
    <>
      <SceneBackground />
      <PageEffects />

      <div id="progress-bar" />

      <div id="scroll-guide">
        <div id="guide-trail" />
        <div id="guide-icon">
          <svg id="icon-star" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1.5 L14.6 9.4 L22.5 12 L14.6 14.6 L12 22.5 L9.4 14.6 L1.5 12 L9.4 9.4 Z" />
          </svg>
          <svg
            id="icon-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3 V19 M6 13 L12 19 L18 13" />
          </svg>
        </div>
      </div>

      <div id="hud">
        <span className="odo">MILE 00</span>
        <span className="sep">/</span>
        <span>06 — START</span>
      </div>
      <div id="end-caption">
        Thanks for visiting.
        <br />
        <span>You&apos;ve reached the end.</span>
      </div>

      <nav>
        <div className="mark">M. ASIM</div>
        <ul>
          <li>
            <a href="#profile">Profile</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <div className="content">
        <section id="hero" data-mile="00" data-milelabel="START">
          <div className="eyebrow">Software Engineer — Web &amp; Mobile</div>
          <h1>
            Muhammad
            <br />
            <em>Asim.</em>
          </h1>
          <p className="role">
            Building responsive, high-performance interfaces with React,
            TypeScript and Next.js — and native mobile apps in Flutter &amp;
            React Native. Based in Islamabad, Pakistan.
          </p>
          <div className="scroll-cue">
            <span className="stem" />
            Scroll
          </div>
        </section>

        <section id="profile" data-mile="01" data-milelabel="PROFILE">
          <div className="eyebrow-label">
            <span className="mi">01</span> Profile
          </div>
          <p className="lede reveal">
            A <span className="accent">personable, detail-oriented</span>{" "}
            engineer who moves comfortably between shipping production
            interfaces and studying the systems underneath them.
          </p>
          <p className="sub reveal">
            Currently building toward a BS in Software Engineering while
            working independently as a freelance developer — most recently
            designing and shipping commercial web applications end to end, from
            database schemas and authentication to responsive interfaces and deployment.
            Equally at home reasoning about data structures and algorithms as about the
            pixel-level feel of an animation.
          </p>
          <div className="facts">
            <div className="reveal">
              <div className="fact-label">Location</div>
              <div className="fact-value">Islamabad, Pakistan</div>
            </div>
            <div className="reveal">
              <div className="fact-label">Focus</div>
              <div className="fact-value">Web &amp; Mobile Development</div>
            </div>
            <div className="reveal">
              <div className="fact-label">Currently</div>
              <div className="fact-value">Focusing on gaining Experience</div>
            </div>
          </div>
        </section>

        <section id="projects" data-mile="02" data-milelabel="PROJECTS">
          <div className="eyebrow-label">
            <span className="mi">02</span> Projects
          </div>

          <div className="role-card reveal">
            <div className="meta">
              Client Project
              <span className="status">Paid &amp; Delivered</span>
            </div>
            <div>
              <h3>Web Developer</h3>
              <div className="org">StayZilla — Apartment Rental Platform</div>
              <p>
                Designed and built a 3-page responsive platform — Home,
                Login, Signup — for an apartment rental company,
                independently from scratch.
              </p>
              <ul>
                <li>
                  Covered the full stack of frontend work: UI, routing and
                  state management in React and TypeScript
                </li>
                <li>
                  Integrated modern animation libraries for a smooth,
                  visually engaging experience
                </li>
                <li>Deployed to Vercel for fast load times and seamless performance</li>
              </ul>
              <div className="stack-tags">
                <span>Next.js 14.2</span>
                <span>React 18.3</span>
                <span>TypeScript</span>
                <span>Tailwind CSS</span>
                <span>shadcn/ui</span>
                <span>Framer Motion</span>
                <span>Lucide React</span>
              </div>
            </div>
          </div>

          <div className="role-card reveal">
            <div className="meta">
              Client Project
              <span className="status">Paid &amp; Delivered</span>
            </div>
            <div>
              <h3>Full-Stack Developer</h3>
              <div className="org">DailyDrops — Water Bottle Delivery Admin</div>
              <p>
                Engineered a comprehensive single-admin web application for managing
                a commercial water bottle delivery enterprise — replacing manual ledgers
                with automated stock tracking, daily delivery records, customer accounts, and financial reports.
              </p>
              <ul>
                <li>
                  Architected a complete Supabase PostgreSQL database with Row-Level Security (RLS) policies and dedicated SQL views (<code>customer_summary</code>, <code>dashboard_stats</code>)
                </li>
                <li>
                  Built single-admin authentication with protected route middleware and real-time dashboard KPI analytics
                </li>
                <li>
                  Implemented automated stock balance logic (filled bottles vs. returned empties) and per-customer credit/due ledgers
                </li>
                <li>
                  Designed custom ledger-style reporting covering daily, weekly, monthly, and custom date ranges across sales, deliveries, and expenses
                </li>
              </ul>
              <div className="stack-tags">
                <span>Next.js 14 (App Router)</span>
                <span>Supabase (PostgreSQL &amp; Auth)</span>
                <span>Tailwind CSS</span>
                <span>TypeScript</span>
                <span>Vercel</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" data-mile="03" data-milelabel="EXPERIENCE">
          <div className="eyebrow-label">
            <span className="mi">03</span> Experience
          </div>

          <div className="role-card reveal">
            <div className="meta">
              Rawalpindi / Islamabad
              <span className="status">Internship</span>
            </div>
            <div>
              <h3>Angular Developer Intern</h3>
              <div className="org">SPS — Software Productivity Strategists</div>
              <p>
                Contributed to the development and enhancement of production web applications,
                building modular, responsive, and high-performance frontend interfaces using Angular and modern engineering practices.
              </p>
              <ul>
                <li>
                  Developed and maintained responsive web pages and reusable components across enterprise website features
                </li>
                <li>
                  Structured Angular routing modules, dependency-injected services, and component-based UI architectures
                </li>
                <li>
                  Integrated frontend clients with backend REST APIs for asynchronous data handling and state synchronization
                </li>
                <li>
                  Conducted frontend debugging, cross-device testing, and collaborated in agile team workflows
                </li>
              </ul>
              <div className="stack-tags">
                <span>Angular</span>
                <span>TypeScript</span>
                <span>JavaScript</span>
                <span>HTML5 &amp; CSS3</span>
                <span>REST APIs</span>
                <span>Git</span>
              </div>
            </div>
          </div>

          <div className="role-card reveal">
            <div className="meta">
              Islamabad, Pakistan
              <span className="status">Internship</span>
            </div>
            <div>
              <h3>DevOps Engineer Intern</h3>
              <div className="org">PTA — Pakistan Telecommunication Authority</div>
              <p>
                Gained practical immersion in Linux server environments, containerization, web server orchestration,
                and application deployment workflows within a major telecommunications regulatory body.
              </p>
              <ul>
                <li>
                  Administered Linux / Ubuntu server environments, SSH access, firewall/network routing, and service management
                </li>
                <li>
                  Constructed and managed Docker containers, Dockerfiles, custom bridge networks, and persistent storage volumes for applications and databases
                </li>
                <li>
                  Configured Nginx as a reverse proxy and web server for efficient request routing and hosting
                </li>
                <li>
                  Diagnosed and resolved networking, DNS, port bindings, and deployment-related issues
                </li>
              </ul>
              <div className="stack-tags">
                <span>Linux / Ubuntu</span>
                <span>Docker</span>
                <span>Docker Compose</span>
                <span>Nginx</span>
                <span>SSH &amp; Networking</span>
                <span>DevOps</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" data-mile="04" data-milelabel="SKILLS">
          <div className="eyebrow-label">
            <span className="mi">04</span> Skills
          </div>
          <div className="skills-wrap">
            <div className="skill-group reveal">
              <div className="glabel">Frameworks &amp; Technologies</div>
              {[
                ["React", "Professional", 3],
                ["Next.js", "Professional", 3],
                ["Angular", "Professional", 3],
                ["TypeScript", "Professional", 3],
                ["Tailwind CSS", "Professional", 3],
                ["Supabase", "Professional", 3],
                ["Firebase", "Professional", 3],
                ["Framer Motion", "Limited", 1],
                ["Lucide React", "Limited", 1],
              ].map(([name, level, on]) => (
                <div className="skill-row" key={name}>
                  <span className="name">{name}</span>
                  <span className="level">
                    {level}{" "}
                    <span className="dots">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className={i < on ? "on" : ""} />
                      ))}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="skill-group reveal">
              <div className="glabel">Tools &amp; Environment</div>
              {[
                ["Docker", "Professional", 3],
                ["Linux / Ubuntu", "Professional", 3],
                ["Nginx", "Professional", 3],
                ["Git & GitHub", "Professional", 3],
                ["Vercel", "Professional", 3],
                ["Android Studio", "Professional", 3],
                ["VS Code", "Native", 3],
              ].map(([name, level, on]) => (
                <div className="skill-row" key={name}>
                  <span className="name">{name}</span>
                  <span className="level">
                    {level}{" "}
                    <span className="dots">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className={i < on ? "on" : ""} />
                      ))}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "64px" }} className="reveal">
            <div className="eyebrow-label">
              <span className="mi">+</span> Strengths
            </div>
            <div className="tag-line">
              <span>Adaptability</span>
              <span>Problem Solving</span>
              <span>Creativity</span>
              <span>Attention to Detail</span>
              <span>Communication</span>
            </div>
          </div>
        </section>

        <section id="education" data-mile="05" data-milelabel="EDUCATION">
          <div className="eyebrow-label">
            <span className="mi">05</span> Education
          </div>
          <div className="edu-row reveal">
            <div className="when">2023 — 2027</div>
            <div>
              <h3>Bachelor of Science, Software Engineering</h3>
              <div className="place">COMSATS University Islamabad — Wah Campus</div>
              <p>
                Coursework spans scalable architecture, algorithm
                optimization, data structures, system design and agile
                methodologies, applied through independent and academic
                projects.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" data-mile="06" data-milelabel="DESTINATION">
          <div className="eyebrow-label">
            <span className="mi">06</span> Contact
          </div>
          <h2>
            Have a project in mind?
            <br />
            <em>Let&apos;s build it.</em>
          </h2>
          <div className="contact-links reveal">
            <a href="mailto:muhammad.asim05@yahoo.com">muhammad.asim05@yahoo.com</a>
            <a href="tel:03076486166">0307 6486166</a>
            <a
              href="https://linkedin.com/in/muhammad-asim-795979377"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <footer>
        </footer>
      </div>
    </>
  );
}

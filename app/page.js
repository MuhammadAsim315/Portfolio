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
        <span>05 — START</span>
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
            designing and shipping a full rental platform end to end, from
            routing and state management to deployment. Equally at home
            reasoning about data structures and algorithms as about the
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
              <div className="fact-value">Freelance · Fiverr</div>
            </div>
          </div>
        </section>

        <section id="experience" data-mile="02" data-milelabel="EXPERIENCE">
          <div className="eyebrow-label">
            <span className="mi">02</span> Experience
          </div>

          <div className="role-card reveal">
            <div className="meta">
              Remote, Pakistan
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
            <div className="meta">Semester Projects</div>
            <div>
              <h3>Academic Systems Work</h3>
              <div className="org">COMSATS University Islamabad</div>
              <p>
                Three independent projects spanning object-oriented design,
                scripting and GUI development — see below.
              </p>
            </div>
          </div>

          <div className="project-grid reveal">
            <div className="project-card">
              <div className="lang">C++</div>
              <h4>Library Management System</h4>
              <p>
                Object-oriented design with file handling to support book
                lending, returns and inventory tracking.
              </p>
            </div>
            <div className="project-card">
              <div className="lang">Python</div>
              <h4>File Automation Tool</h4>
              <p>Scripted automation for file organization and routine system tasks.</p>
            </div>
            <div className="project-card">
              <div className="lang">Java</div>
              <h4>Movie Ticketing System</h4>
              <p>Built with Java Swing GUI and a modular structure for easy maintenance.</p>
            </div>
          </div>
        </section>

        <section id="skills" data-mile="03" data-milelabel="SKILLS">
          <div className="eyebrow-label">
            <span className="mi">03</span> Skills
          </div>
          <div className="skills-wrap">
            <div className="skill-group reveal">
              <div className="glabel">Frameworks &amp; Technologies</div>
              {[
                ["React", "Professional", 3],
                ["Next.js", "Professional", 3],
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
                ["GitHub", "Professional", 3],
                ["Vercel", "Professional", 3],
                ["Android Studio", "Professional", 3],
                ["Eclipse", "Professional", 3],
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

        <section id="education" data-mile="04" data-milelabel="EDUCATION">
          <div className="eyebrow-label">
            <span className="mi">04</span> Education
          </div>
          <div className="edu-row reveal">
            <div className="when">2023 — Current</div>
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

        <section id="contact" data-mile="05" data-milelabel="DESTINATION">
          <div className="eyebrow-label">
            <span className="mi">05</span> Contact
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
          Islamabad, Pakistan — Built with Next.js, Three.js &amp; a lot of
          attention to detail.
        </footer>
      </div>
    </>
  );
}

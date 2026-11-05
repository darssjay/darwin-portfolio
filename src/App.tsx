
import { useEffect, useState } from 'react'
import './App.css'
import './Theme.css'
import { Analytics } from '@vercel/analytics/react'
import { trackVisit } from './analytics'

const skills = [
  { name: 'C', level: 75 },
  { name: 'C++', level: 80 },
  { name: 'Java', level: 75 },
  { name: 'SQL', level: 70 },
  { name: 'HTML', level: 85 },
  { name: 'CSS', level: 80 },
]

const projects = [
  {
    title: 'DBV Internet Cafe',
    category: 'JAVA APPLICATION',
    description: 'A Java-based internet cafe management system designed to handle computer reservations, monitor computer usage time, and manage customer top-ups.',
    icon: '🖥️',
    status: 'DEVELOPMENT',
    image: '/images/dbv-internet-cafe.png',
  },
  {
    title: '250 Coffee',
    category: 'WEB / POS SYSTEM',
    description: 'A web-based kiosk ordering and financial management system with POS features for customer orders, product management, payment verification, and sales monitoring.',
    icon: '☕',
    status: 'DEVELOPMENT',
    image: '/images/250-coffee.jpg',
  },
  {
    title: 'Kita Tracker',
    category: 'UI / UX DESIGN',
    description: 'An income and expense tracking application designed to help public transport drivers record their daily earnings and expenses.',
    icon: '📊',
    status: 'PROTOTYPE',
    image: '/images/kita-tracker.jpg',
  },
  {
    title: 'Peach Illustration',
    category: 'DIGITAL ILLUSTRATION',
    description: 'A digital fruit illustration created using design elements such as color, shape, texture, and shading, while applying different design principles.',
    icon: '🍑',
    status: 'COMPLETED',
    image: '/images/peach-illustration.jpg',
  },
  {
    title: 'DJ Witch Cat',
    category: 'CHARACTER DESIGN',
    description: 'An original witch-cat character illustration featuring a cute design, creative details, and personalized visual elements.',
    icon: '🐱',
    status: 'COMPLETED',
    image: '/images/dj-witch-cat.jpg',
  },
  {
    title: 'Tech Week 2025',
    category: 'DIGITAL ILLUSTRATION',
    description: 'A technology-themed digital artwork featuring a laptop and creative visual elements that represent innovation and modern technology.',
    icon: '💻',
    status: 'COMPLETED',
    image: '/images/tech-week-2025.jpg',
  },
  {
    title: 'DARS Typography Poster',
    category: 'GRAPHIC DESIGN',
    description: 'A typography poster design focused on font pairing, visual hierarchy, alignment, contrast, and creative text presentation.',
    icon: '🔤',
    status: 'COMPLETED',
    image: '/images/dars-poster.jpg',
  },
  {
    title: 'Portfolio Wireframe',
    category: 'UI / UX DESIGN',
    description: 'A low-fidelity website wireframe showing the layout, page structure, and navigation flow of a personal portfolio website.',
    icon: '📐',
    status: 'COMPLETED',
    image: '/images/portfolio-wireframe.jpg',
  },
]

const experiences = [
  {
    position: 'Production Operator',
    company: 'Honda',
    location: 'Carmelray, Calamba',
    icon: '🏭',
  },
  {
    position: 'Service Crew',
    company: 'Jollibee',
    location: 'Parian, Calamba',
    icon: '🍔',
  },
  {
    position: 'Production Operator',
    company: 'ACBEL',
    location: 'Carmelray, Calamba',
    icon: '🏭',
  },
  {
    position: 'Production Operator',
    company: 'Panasonic',
    location: 'Carmelray, Calamba',
    icon: '🏭',
  },
  {
    position: 'Material Handler',
    company: 'Epson',
    location: 'Lima, Batangas',
    icon: '📦',
  },
]

const education = [
  {
    course: 'Bachelor of Science in Information Technology',
    school: 'City College of Calamba',
    period: '2024 – Present',
    icon: '🎓',
  },
  {
    course: 'Information Computer Technology',
    school: 'Asian Institute of Computer Studies',
    period: 'Completed',
    icon: '💻',
  },
  {
    course: 'High School',
    school: 'Makiling Integrated School',
    period: 'Completed',
    icon: '🏫',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visitorStats, setVisitorStats] = useState({
    visitors: 0,
    page_views: 0
  })

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    let active = true
    trackVisit().then((stats) => {
      if (active && stats) {
        setVisitorStats({
          visitors: Number(stats.visitors),
          page_views: Number(stats.page_views)
        })
      }
    })
    return () => { active = false }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const toggleTheme = () => {
    setTheme((current) => current === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`app ${theme === 'light' ? 'light-mode' : ''}`}>
      <div className="background-grid"></div>

      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-bracket">{'<'}</span>
          DJR<span className="logo-dot">.DEV</span>
          <span className="logo-bracket">{'/>'}</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={closeMenu}>HOME</a>
          <a href="#about" onClick={closeMenu}>ABOUT</a>
          <a href="#skills" onClick={closeMenu}>SKILLS</a>
          <a href="#experience" onClick={closeMenu}>EXPERIENCE</a>
          <a href="#education" onClick={closeMenu}>EDUCATION</a>
          <a href="#projects" onClick={closeMenu}>PROJECTS</a>
          <a href="#resume" onClick={closeMenu}>RESUME</a>
          <a href="#contact" onClick={closeMenu} className="nav-contact">CONTACT</a>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle light and dark mode"
          title="Switch theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      <main>
        <section id="home" className="hero section-container">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot"></span>
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <p className="hero-small">HELLO WORLD! I'M</p>

            <h1>
              DARWIN JOHN
              <span>RICARTE.</span>
            </h1>

            <h2 className="hero-role">
              BSIT STUDENT <span>//</span> ASPIRING DEVELOPER
            </h2>

            <p className="hero-description">
              I am a Bachelor of Science in Information Technology student
              who enjoys creating websites, exploring technology, and
              learning how to build useful digital solutions.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="button button-primary">
                VIEW MY PROJECTS <span>↗</span>
              </a>
              <a href="#contact" className="button button-outline">
                CONTACT ME
              </a>
            </div>

            <div className="hero-social">
              <span>BASED IN THE PHILIPPINES</span>
              <span className="social-divider">|</span>
              <a href="https://www.facebook.com/share/1FPbrdafaX/" target="_blank" rel="noreferrer">
                FACEBOOK ↗
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-label label-top">PLAYER PROFILE</div>

            <div className="character-card">
              <div className="character-top">
                <span>CHARACTER_001</span>
                <span className="character-online">● ONLINE</span>
              </div>

              <div className="pixel-character">
                <div className="pixel-spark spark-one">✦</div>
                <div className="pixel-spark spark-two">✧</div>
                <div className="pixel-person">
                  <div className="pixel-hair"></div>
                  <div className="pixel-face">
                    <span className="pixel-eye"></span>
                    <span className="pixel-eye"></span>
                  </div>
                  <div className="pixel-neck"></div>
                  <div className="pixel-body">
                    <span className="pixel-shirt-detail"></span>
                  </div>
                  <div className="pixel-arm left-arm"></div>
                  <div className="pixel-arm right-arm"></div>
                </div>
                <div className="character-platform"></div>
              </div>

              <div className="character-info">
                <div>
                  <small>PLAYER NAME</small>
                  <strong>DARWIN JOHN RICARTE</strong>
                </div>
                <div>
                  <small>CLASS</small>
                  <strong>WEB DEVELOPER IN TRAINING</strong>
                </div>
                <div>
                  <small>LEVEL</small>
                  <strong>BSIT STUDENT</strong>
                </div>
              </div>
            </div>

            <div className="visual-label label-bottom">
              <span>✦</span> KEEP LEARNING. KEEP BUILDING.
            </div>
          </div>
        </section>

        <section id="about" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">01 / INTRODUCTION</span>
            <h2>ABOUT <span>ME</span></h2>
            <p>A LITTLE INTRODUCTION ABOUT MYSELF</p>
          </div>

          <div className="about-grid">
            <div className="about-main panel">
              <span className="panel-tag">WHO AM I?</span>
              <h3>Curious mind. Future developer.</h3>
              <p>
                Hi! I'm Darwin John Ricarte, an Information Technology
                student at City College of Calamba. I am interested in
                programming, web development, and designing systems that
                can help solve everyday problems.
              </p>
              <p>
                I am continuously improving my skills through school
                activities and personal projects. I enjoy learning new
                technologies and turning ideas into working applications.
              </p>
            </div>

            <div className="about-side">
              <div className="info-card panel">
                <span className="info-icon">🎓</span>
                <div>
                  <small>EDUCATION</small>
                  <h3>City College of Calamba</h3>
                  <p>BS Information Technology</p>
                </div>
              </div>

              <div className="info-card panel">
                <span className="info-icon">💻</span>
                <div>
                  <small>INTERESTS</small>
                  <h3>Technology & Development</h3>
                  <p>Programming, web design, and software systems</p>
                </div>
              </div>

              <div className="info-card panel">
                <span className="info-icon">🚀</span>
                <div>
                  <small>GOAL</small>
                  <h3>Future IT Professional</h3>
                  <p>Learn, create, and grow through experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">02 / MY ABILITIES</span>
            <h2>MY <span>SKILLS</span></h2>
            <p>TOOLS AND TECHNOLOGIES I'M LEARNING</p>
          </div>

          <div className="skills-layout">
            <div className="skills-list panel">
              <span className="panel-tag">TECHNICAL SKILLS</span>

              {skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-label">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="skills-extra panel">
              <span className="panel-tag">WHAT I CAN DO</span>
              <div className="skill-chip">⌨️ Programming Basics</div>
              <div className="skill-chip">🌐 Web Development</div>
              <div className="skill-chip">🗄️ Database Management</div>
              <div className="skill-chip">🎨 UI / UX Design</div>
              <div className="skill-chip">🧩 Problem Solving</div>
              <p className="skills-note">
                Always open to learning new tools, languages, and
                technologies.
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">03 / WORK HISTORY</span>
            <h2>MY <span>EXPERIENCE</span></h2>
            <p>MY PREVIOUS WORK EXPERIENCES</p>
          </div>

          <div className="experience-grid">
            {experiences.map((item, index) => (
              <div className="experience-card panel" key={`${item.company}-${index}`}>
                <span className="experience-icon">{item.icon}</span>
                <div>
                  <span className="experience-number">EXPERIENCE_0{index + 1}</span>
                  <h3>{item.position}</h3>
                  <strong>{item.company}</strong>
                  <p>{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">04 / ACADEMIC BACKGROUND</span>
            <h2>MY <span>EDUCATION</span></h2>
            <p>MY EDUCATIONAL BACKGROUND</p>
          </div>

          <div className="education-grid">
            {education.map((item, index) => (
              <div className="education-card panel" key={item.school}>
                <span className="education-icon">{item.icon}</span>
                <span className="experience-number">EDUCATION_0{index + 1}</span>
                <h3>{item.course}</h3>
                <strong>{item.school}</strong>
                <p>{item.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">05 / SELECTED WORK</span>
            <h2>MY <span>PROJECTS</span></h2>
            <p>SOME OF THE PROJECTS I'VE WORKED ON</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card panel" key={project.title}>
                <div className="project-card-top">
                  <span className="project-number">
                    PROJECT_0{index + 1}
                  </span>
                  <span className="project-status">{project.status}</span>
                </div>

                <div className="project-image-wrap">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="project-image"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="project-image-fallback">
                    <span>{project.icon}</span>
                    <small>PROJECT PREVIEW</small>
                  </div>
                </div>

                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer">
                    <span>{project.icon} STUDENT PROJECT</span>
                    <span className="project-arrow">↗</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">06 / MY BACKGROUND</span>
            <h2>MY <span>RESUME</span></h2>
            <p>VIEW OR DOWNLOAD MY CURRICULUM VITAE</p>
          </div>

          <div className="resume-panel panel">
            <div className="resume-text">
              <span className="panel-tag">CURRICULUM VITAE</span>
              <h3>Want to know more about me?</h3>
              <p>
                View or download my resume to learn more about
                my educational background, skills, and experience.
              </p>

              <div className="resume-buttons">
                <a
                  href="/documents/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="button button-primary"
                >
                  VIEW RESUME ↗
                </a>

                <a
                  href="/documents/resume.pdf"
                  download="Darwin_John_Ricarte_Resume.pdf"
                  className="button button-primary"
                >
                  DOWNLOAD PDF ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">07 / LET'S CONNECT</span>
            <h2>CONTACT <span>ME</span></h2>
            <p>HAVE A PROJECT OR JUST WANT TO SAY HELLO?</p>
          </div>

          <div className="contact-panel panel">
            <div className="contact-message">
              <span className="panel-tag">START A CONVERSATION</span>
              <h3>Let's build something <span>great.</span></h3>
              <p>
                I'm always interested in learning, collaborating, and
                connecting with people who share the same passion for
                technology.
              </p>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <span>📍</span>
                <div>
                  <small>LOCATION</small>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Calamba%2C+Laguna%2C+Philippines"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>Calamba, Philippines ↗</strong>
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span>🎓</span>
                <div>
                  <small>SCHOOL</small>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=City+College+of+Calamba"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <strong>City College of Calamba ↗</strong>
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span>✉️</span>
                <div>
                  <small>EMAIL</small>
                  <a href="mailto:darwinjohnricarte@gmail.com">
                    <strong>darwinjohnricarte@gmail.com</strong>
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span>📱</span>
                <div>
                  <small>PHONE</small>
                  <a href="tel:+639931895590">
                    <strong>+63 993 189 5590</strong>
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span>📘</span>
                <div>
                  <small>FACEBOOK</small>
                  <a href="https://www.facebook.com/share/1FPbrdafaX/" target="_blank" rel="noreferrer">
                    <strong>Visit my Facebook ↗</strong>
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <span>💬</span>
                <div>
                  <small>STATUS</small>
                  <strong>Open to learning and opportunities</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="web-analytics" className="section-container section-block">
          <div className="section-heading">
            <span className="section-number">08 / WEBSITE STATISTICS</span>
            <h2>WEB <span>ANALYTICS</span></h2>
            <p>LIVE VISITOR STATISTICS FROM MY PORTFOLIO</p>
          </div>
          <div className="skills-layout">
            <div className="panel" style={{ padding: '28px', textAlign: 'center' }}>
              <span className="panel-tag">TOTAL VISITORS</span>
              <h3 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: '15px 0' }}>
                {visitorStats.visitors.toLocaleString()}
              </h3>
              <p>Unique browser visits</p>
            </div>
            <div className="panel" style={{ padding: '28px', textAlign: 'center' }}>
              <span className="panel-tag">TOTAL PAGE VIEWS</span>
              <h3 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', margin: '15px 0' }}>
                {visitorStats.page_views.toLocaleString()}
              </h3>
              <p>Total portfolio page loads</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-bracket">{'<'}</span>
          DJR<span className="logo-dot">.DEV</span>
          <span className="logo-bracket">{'/>'}</span>
        </a>
        <p>DESIGNED & BUILT BY DARWIN JOHN RICARTE</p>
        <a href="#home" className="back-to-top">BACK TO TOP ↑</a>
      </footer>

      <Analytics />
    </div>
  )
}

export default App

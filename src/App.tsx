
import { useEffect, useRef, useState } from 'react'
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
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 6000)

    return () => window.clearTimeout(timer)
  }, [])
  const [pixelSoundEnabled, setPixelSoundEnabled] = useState(false)

  const portfolioBackgroundMusic = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const music = new Audio('/music/background.mp3')
    music.loop = true
    music.volume = 0.18
    portfolioBackgroundMusic.current = music

    return () => {
      music.pause()
      portfolioBackgroundMusic.current = null
    }
  }, [])

  useEffect(() => {
    const music = portfolioBackgroundMusic.current
    if (!music) return

    if (pixelSoundEnabled) {
      music.play().catch(error => {
        console.warn('Background music playback needs user interaction:', error)
      })
    } else {
      music.pause()
    }
  }, [pixelSoundEnabled])

  const playPixelSound = (frequency = 520) => {
    if (!pixelSoundEnabled) return
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const audio = new AudioContextClass()
      const oscillator = audio.createOscillator()
      const gain = audio.createGain()
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(frequency, audio.currentTime)
      gain.gain.setValueAtTime(0.035, audio.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.09)
      oscillator.connect(gain)
      gain.connect(audio.destination)
      oscillator.start()
      oscillator.stop(audio.currentTime + 0.09)
      oscillator.onended = () => audio.close()
    } catch (error) {
      console.warn('Audio unavailable:', error)
    }
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [closingProject, setClosingProject] = useState(false)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursorPixels, setCursorPixels] = useState<{id:number,x:number,y:number}[]>([])
  const cursorId = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const move = (e: MouseEvent) => {
      const id = ++cursorId.current
      setCursorPixels(old => [...old.slice(-8), {id, x:e.clientX, y:e.clientY}])
      window.setTimeout(() => {
        setCursorPixels(old => old.filter(p => p.id !== id))
      }, 500)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])


  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      const safeProgress = Math.min(100, Math.max(0, progress))
      setScrollProgress(safeProgress)

      const companion = document.querySelector('.pixel-companion') as HTMLElement | null
      if (companion) {
        const topPosition = 22 + (safeProgress * 0.48)
        companion.style.top = `${topPosition}%`
        companion.style.bottom = 'auto'
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])


  useEffect(() => {
    const elements = document.querySelectorAll(
      '#about, #skills, #experience, #education, #projects, #resume, #contact, #web-analytics'
    )

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

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
      {isLoading && (
        <div className="pixel-loading-screen">
          <div className="loading-character">
            <div className="loading-pixel-face">
              <span></span>
              <span></span>
            </div>
          </div>
          <h2>DARWIN.EXE</h2>
          <p>INITIALIZING PORTFOLIO...</p>
          <div className="loading-bar">
            <div className="loading-bar-fill"></div>
          </div>
          <span className="loading-percent">LOADING...</span>
        </div>
      )}
      <div className="game-progress" aria-label={`Page progress ${Math.round(scrollProgress)} percent`}>
        <div className="game-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <div className="background-grid"></div>
      <div className="cursor-pixel-layer" aria-hidden="true">
        {cursorPixels.map(p => <span key={p.id} className="cursor-pixel" style={{left:p.x,top:p.y}} />)}
      </div>
      <div className="pixel-world" aria-hidden="true">
        <div className="shooting-star" style={{ top: "15%", left: "85%" }}></div>
        <div className="shooting-star" style={{ top: "45%", left: "65%", animationDelay: "-2s" }}></div>
        <div className="shooting-star" style={{ top: "80%", left: "75%", animationDelay: "-4s" }}></div>

        <div className="pixel-portal" style={{ top: "38%", right: "3%" }}></div>
        <div className="pixel-portal" style={{ top: "76%", left: "3%", animationDelay: "-1.5s" }}></div>

        <div className="pixel-sprite pixel-enderman">
          <svg viewBox="0 0 16 24" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="8" fill="#29203f"/>
            <rect x="5" y="5" width="2" height="2" fill="#d78aff"/>
            <rect x="9" y="5" width="2" height="2" fill="#d78aff"/>
            <rect x="5" y="10" width="6" height="9" fill="#542a91"/>
            <rect x="5" y="19" width="2" height="5" fill="#30204e"/>
            <rect x="9" y="19" width="2" height="5" fill="#30204e"/>
            <rect x="3" y="11" width="2" height="8" fill="#542a91"/>
            <rect x="11" y="11" width="2" height="8" fill="#542a91"/>
          </svg>
        </div>

        <div className="pixel-sprite pixel-creeper">
          <svg viewBox="0 0 16 18" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="8" fill="#54b84b"/>
            <rect x="5" y="3" width="2" height="2" fill="#173b26"/>
            <rect x="9" y="3" width="2" height="2" fill="#173b26"/>
            <rect x="7" y="5" width="2" height="3" fill="#173b26"/>
            <rect x="5" y="8" width="6" height="5" fill="#398e42"/>
            <rect x="3" y="13" width="4" height="4" fill="#398e42"/>
            <rect x="9" y="13" width="4" height="4" fill="#398e42"/>
          </svg>
        </div>

        <div className="pixel-sprite pixel-chomper">
          <svg viewBox="0 0 16 16" shapeRendering="crispEdges">
            <rect x="5" y="1" width="6" height="2" fill="#ffe45c"/>
            <rect x="2" y="3" width="10" height="10" fill="#ffd52e"/>
            <rect x="5" y="13" width="6" height="2" fill="#ffe45c"/>
            <rect x="10" y="6" width="5" height="2" fill="#10091c"/>
          </svg>
        </div>

        <div className="pixel-sprite pixel-ghost">
          <svg viewBox="0 0 16 16" shapeRendering="crispEdges">
            <rect x="5" y="1" width="6" height="2" fill="#bd83ff"/>
            <rect x="3" y="3" width="10" height="9" fill="#9c59e8"/>
            <rect x="2" y="7" width="12" height="5" fill="#9c59e8"/>
            <rect x="2" y="12" width="3" height="3" fill="#9c59e8"/>
            <rect x="7" y="12" width="3" height="3" fill="#9c59e8"/>
            <rect x="12" y="12" width="2" height="3" fill="#9c59e8"/>
            <rect x="5" y="5" width="2" height="3" fill="#fff"/>
            <rect x="9" y="5" width="2" height="3" fill="#fff"/>
            <rect x="5" y="6" width="1" height="2" fill="#281442"/>
            <rect x="9" y="6" width="1" height="2" fill="#281442"/>
          </svg>
        </div>

        <div className="pixel-sprite pixel-slime">
          <svg viewBox="0 0 16 12" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="2" fill="#9bff9b"/>
            <rect x="2" y="3" width="12" height="7" fill="#55d68a"/>
            <rect x="5" y="5" width="2" height="2" fill="#173b35"/>
            <rect x="10" y="5" width="2" height="2" fill="#173b35"/>
            <rect x="4" y="10" width="8" height="1" fill="#35a96d"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-enderman-two">
          <svg viewBox="0 0 16 24" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="8" fill="#382052"/>
            <rect x="5" y="5" width="2" height="2" fill="#ed9aff"/>
            <rect x="9" y="5" width="2" height="2" fill="#ed9aff"/>
            <rect x="5" y="10" width="6" height="9" fill="#7134b5"/>
            <rect x="5" y="19" width="2" height="5" fill="#382052"/>
            <rect x="9" y="19" width="2" height="5" fill="#382052"/>
            <rect x="3" y="11" width="2" height="8" fill="#7134b5"/>
            <rect x="11" y="11" width="2" height="8" fill="#7134b5"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-creeper-two">
          <svg viewBox="0 0 16 18" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="8" fill="#75e85b"/>
            <rect x="5" y="3" width="2" height="2" fill="#17462a"/>
            <rect x="9" y="3" width="2" height="2" fill="#17462a"/>
            <rect x="7" y="5" width="2" height="3" fill="#17462a"/>
            <rect x="5" y="9" width="6" height="4" fill="#4ab94e"/>
            <rect x="3" y="13" width="4" height="4" fill="#4ab94e"/>
            <rect x="9" y="13" width="4" height="4" fill="#4ab94e"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-ghost-two">
          <svg viewBox="0 0 16 16" shapeRendering="crispEdges">
            <rect x="5" y="1" width="6" height="2" fill="#ff9adf"/>
            <rect x="3" y="3" width="10" height="9" fill="#e56acb"/>
            <rect x="2" y="7" width="12" height="5" fill="#e56acb"/>
            <rect x="2" y="12" width="3" height="3" fill="#e56acb"/>
            <rect x="7" y="12" width="3" height="3" fill="#e56acb"/>
            <rect x="12" y="12" width="2" height="3" fill="#e56acb"/>
            <rect x="5" y="5" width="2" height="3" fill="#fff"/>
            <rect x="9" y="5" width="2" height="3" fill="#fff"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-slime-two">
          <svg viewBox="0 0 16 12" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="2" fill="#d4a0ff"/>
            <rect x="2" y="3" width="12" height="7" fill="#a56bdf"/>
            <rect x="5" y="5" width="2" height="2" fill="#32154c"/>
            <rect x="10" y="5" width="2" height="2" fill="#32154c"/>
            <rect x="4" y="10" width="8" height="1" fill="#7542b0"/>
          </svg>
        </div>



        <div className="pixel-sprite pixel-bat">
          <svg viewBox="0 0 20 14" shapeRendering="crispEdges">
            <rect x="8" y="3" width="4" height="8" fill="#b45cff"/>
            <rect x="1" y="2" width="7" height="7" fill="#873ed1"/>
            <rect x="12" y="2" width="7" height="7" fill="#873ed1"/>
            <rect x="4" y="9" width="5" height="3" fill="#63309e"/>
            <rect x="11" y="9" width="5" height="3" fill="#63309e"/>
            <rect x="5" y="5" width="2" height="2" fill="#fff"/>
            <rect x="13" y="5" width="2" height="2" fill="#fff"/>
          </svg>
        </div>

        <div className="pixel-sprite pixel-knight">
          <svg viewBox="0 0 16 22" shapeRendering="crispEdges">
            <rect x="4" y="1" width="8" height="7" fill="#b8c5df"/>
            <rect x="5" y="4" width="2" height="2" fill="#873ed1"/>
            <rect x="9" y="4" width="2" height="2" fill="#873ed1"/>
            <rect x="4" y="8" width="8" height="8" fill="#63309e"/>
            <rect x="2" y="9" width="2" height="7" fill="#b8c5df"/>
            <rect x="12" y="9" width="2" height="7" fill="#b8c5df"/>
            <rect x="4" y="16" width="3" height="5" fill="#b8c5df"/>
            <rect x="9" y="16" width="3" height="5" fill="#b8c5df"/>
            <rect x="14" y="3" width="1" height="13" fill="#d9a0ff"/>
          </svg>
        </div>

        <div className="pixel-sprite pixel-diamond">
          <svg viewBox="0 0 16 18" shapeRendering="crispEdges">
            <rect x="5" y="1" width="6" height="2" fill="#a5f3ff"/>
            <rect x="2" y="3" width="12" height="4" fill="#45cfff"/>
            <rect x="4" y="7" width="8" height="4" fill="#258ee8"/>
            <rect x="6" y="11" width="4" height="4" fill="#45cfff"/>
            <rect x="7" y="3" width="2" height="5" fill="#fff"/>
          </svg>
        </div>
        </div>
        <div className="pixel-sprite pixel-dragon">
          <svg viewBox="0 0 24 24" shapeRendering="crispEdges">
            <rect x="7" y="3" width="10" height="9" fill="#9b55e8"/>
            <rect x="4" y="6" width="4" height="5" fill="#b77aff"/>
            <rect x="16" y="6" width="4" height="5" fill="#b77aff"/>
            <rect x="9" y="6" width="2" height="2" fill="#fff"/>
            <rect x="14" y="6" width="2" height="2" fill="#fff"/>
            <rect x="10" y="10" width="5" height="2" fill="#42205f"/>
            <rect x="7" y="12" width="10" height="7" fill="#7136b5"/>
            <rect x="3" y="13" width="5" height="3" fill="#9b55e8"/>
            <rect x="16" y="13" width="5" height="3" fill="#9b55e8"/>
            <rect x="8" y="19" width="3" height="3" fill="#54278b"/>
            <rect x="14" y="19" width="3" height="3" fill="#54278b"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-alien">
          <svg viewBox="0 0 20 20" shapeRendering="crispEdges">
            <rect x="5" y="2" width="10" height="3" fill="#8dff9c"/>
            <rect x="2" y="5" width="16" height="9" fill="#50d978"/>
            <rect x="5" y="7" width="3" height="4" fill="#172d3a"/>
            <rect x="12" y="7" width="3" height="4" fill="#172d3a"/>
            <rect x="7" y="14" width="6" height="2" fill="#8dff9c"/>
            <rect x="4" y="16" width="4" height="3" fill="#36a95d"/>
            <rect x="12" y="16" width="4" height="3" fill="#36a95d"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-robot">
          <svg viewBox="0 0 20 22" shapeRendering="crispEdges">
            <rect x="8" y="1" width="4" height="3" fill="#d9a0ff"/>
            <rect x="4" y="4" width="12" height="10" fill="#a8b4d0"/>
            <rect x="6" y="7" width="3" height="3" fill="#8c55d9"/>
            <rect x="11" y="7" width="3" height="3" fill="#8c55d9"/>
            <rect x="7" y="12" width="6" height="2" fill="#55416f"/>
            <rect x="5" y="14" width="10" height="5" fill="#7443b2"/>
            <rect x="2" y="15" width="3" height="3" fill="#a8b4d0"/>
            <rect x="15" y="15" width="3" height="3" fill="#a8b4d0"/>
            <rect x="6" y="19" width="3" height="2" fill="#a8b4d0"/>
            <rect x="11" y="19" width="3" height="2" fill="#a8b4d0"/>
          </svg>
        </div>
        <div className="pixel-sprite pixel-cat">
          <svg viewBox="0 0 20 18" shapeRendering="crispEdges">
            <rect x="3" y="1" width="4" height="5" fill="#d9a0ff"/>
            <rect x="13" y="1" width="4" height="5" fill="#d9a0ff"/>
            <rect x="3" y="5" width="14" height="9" fill="#a56bdf"/>
            <rect x="6" y="8" width="2" height="2" fill="#fff"/>
            <rect x="12" y="8" width="2" height="2" fill="#fff"/>
            <rect x="9" y="11" width="2" height="2" fill="#42205f"/>
            <rect x="5" y="14" width="3" height="3" fill="#7542b0"/>
            <rect x="12" y="14" width="3" height="3" fill="#7542b0"/>
          </svg>
        </div>
        <div className="pixel-companion" aria-hidden="true">
        <svg viewBox="0 0 24 24" shapeRendering="crispEdges">
          <rect x="7" y="2" width="10" height="3" fill="#d9a0ff"/>
          <rect x="4" y="5" width="16" height="12" fill="#873ed1"/>
          <rect x="2" y="9" width="20" height="7" fill="#a65bea"/>
          <rect x="7" y="8" width="3" height="3" fill="#ffffff"/>
          <rect x="14" y="8" width="3" height="3" fill="#ffffff"/>
          <rect x="8" y="9" width="2" height="2" fill="#27103d"/>
          <rect x="14" y="9" width="2" height="2" fill="#27103d"/>
          <rect x="6" y="17" width="4" height="3" fill="#63309e"/>
          <rect x="14" y="17" width="4" height="3" fill="#63309e"/>
        </svg>
      </div>

      <nav className="navbar">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-bracket">{'<'}</span>
          DJR<span className="logo-dot">.DEV</span>
          <span className="logo-bracket">{'/>'}</span>
        </a>

        <div className="pixel-clock">
          <span className="clock-label">LOCAL TIME</span>
          <span className="clock-time">
            {currentTime.toLocaleTimeString('en-PH', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            })}
          </span>
        </div>

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
          className="sound-toggle"
          onClick={() => setPixelSoundEnabled(value => !value)}
          aria-label={pixelSoundEnabled ? 'Mute sound' : 'Enable sound'}
          title={pixelSoundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {pixelSoundEnabled ? '🔊' : '🔇'}
        </button>
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

          <div className="pixel-achievements">
            <span className="panel-tag">UNLOCKED ACHIEVEMENTS</span>
            <div className="achievement-list">
              <div className="achievement-badge">
                <span>💻</span>
                <div><strong>CODE LEARNER</strong><small>Learning programming</small></div>
              </div>
              <div className="achievement-badge">
                <span>🌐</span>
                <div><strong>WEB CREATOR</strong><small>Building web projects</small></div>
              </div>
              <div className="achievement-badge">
                <span>🗄️</span>
                <div><strong>DATA EXPLORER</strong><small>Working with SQL</small></div>
              </div>
              <div className="achievement-badge">
                <span>🎮</span>
                <div><strong>PROJECT MAKER</strong><small>Creating applications</small></div>
              </div>
            </div>
          </div>
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
                    onClick={() => {
                      playPixelSound(720)
                      setActiveProject(index)
                      setClosingProject(false)
                    }}
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


        {activeProject !== null && (
          <div
            className={`pixel-lightbox ${closingProject ? 'pixel-closing' : ''}`}
            onClick={() => {
              playPixelSound(380)
              setClosingProject(true)
              setTimeout(() => setActiveProject(null), 650)
            }}
          >
            <div
              className="pixel-lightbox-content"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="pixel-close"
                onClick={() => {
                  playPixelSound(380)
                  setClosingProject(true)
                  setTimeout(() => setActiveProject(null), 650)
                }}
                aria-label="Close image"
              >
                ×
              </button>

              <div className="pixel-image-grid">
                {Array.from({ length: 216 }, (_, i) => {
                  const col = i % 18
                  const row = Math.floor(i / 18)

                  return (
                    <div
                      key={i}
                      className="pixel-tile"
                      style={{
                        backgroundImage: `url(${projects[activeProject].image})`,
                        backgroundSize: '1800% 1200%',
                        backgroundPosition: `${(col / 17) * 100}% ${(row / 11) * 100}%`,
                        animationDelay: `${((i * 13) % 45) * 12}ms`
                      }}
                    />
                  )
                })}
              </div>

              <div className="pixel-image-info">
                <span>{projects[activeProject].category}</span>
                <h2>{projects[activeProject].title}</h2>
                <p>{projects[activeProject].description}</p>
              </div>
            </div>
          </div>
        )}

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

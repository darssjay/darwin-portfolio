
import { useEffect, useRef, useState } from 'react'
import './App.css'
import './Theme.css'
import { Analytics } from '@vercel/analytics/react'
import { trackVisit, getDailyStats } from './analytics'
import Guestbook from './Guestbook'

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
  const [secretRoomOpen, setSecretRoomOpen] = useState(false)
  const [, setLogoClickCount] = useState(0)

  const loadRpgSave = () => {
    try {
      const saved = window.localStorage.getItem("darwin-rpg-save")
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  }

  const [rpgPlayer, setRpgPlayer] = useState(() => {
    const save = loadRpgSave()
    return save.player &&
      Number.isInteger(save.player.x) &&
      Number.isInteger(save.player.y) &&
      save.player.x >= 0 && save.player.x <= 9 &&
      save.player.y >= 0 && save.player.y <= 5
      ? save.player : { x: 1, y: 1 }
  })
  const [rpgCoins, setRpgCoins] = useState(() => {
    const save = loadRpgSave()
    return Number.isInteger(save.coins) ? Math.max(0, Math.min(5, save.coins)) : 0
  })
  const [rpgXp, setRpgXp] = useState(() => {
    const save = loadRpgSave()
    return Number.isFinite(save.xp) ? Math.max(0, save.xp) : 0
  })
  const [rpgCollected, setRpgCollected] = useState<string[]>(() => {
    const save = loadRpgSave()
    return Array.isArray(save.collected) ? save.collected : []
  })
  const [rpgVictory, setRpgVictory] = useState(() => loadRpgSave().victory === true)
  const [rpgConfettiVisible, setRpgConfettiVisible] = useState(false)
  const [rpgTreasureCollected, setRpgTreasureCollected] = useState(() => loadRpgSave().treasure === true)
  const [rpgNpcQuestStarted, setRpgNpcQuestStarted] = useState(() => loadRpgSave().npcStarted === true)
  const [rpgNpcQuestComplete, setRpgNpcQuestComplete] = useState(() => loadRpgSave().npcComplete === true)
  const [rpgNpcMessage, setRpgNpcMessage] = useState(() => {
    const save = loadRpgSave()
    return typeof save.npcMessage === "string" ? save.npcMessage : "Find me in the pixel world!"
  })

  const [rpgSaveStatus, setRpgSaveStatus] = useState("SAVED")
  const [rpgResetConfirmOpen, setRpgResetConfirmOpen] = useState(false)
  const [rpgLevelUpMessage, setRpgLevelUpMessage] = useState("")

  const resetRpgGame = () => {
    setRpgPlayer({ x: 1, y: 1 })
    setRpgCoins(0)
    setRpgXp(0)
    setRpgCollected([])
    setRpgVictory(false)
    setRpgTreasureCollected(false)
    setRpgNpcQuestStarted(false)
    setRpgNpcQuestComplete(false)
    setRpgNpcMessage("Find me in the pixel world!")
    setRpgAchievementNotice("")
    setRpgLevelUpMessage("")
    setRpgResetConfirmOpen(false)
    setRpgSaveStatus("RESET!")
  }

  const rpgLevel = Math.min(5, Math.floor(rpgXp / 50) + 1)
  const rpgLevelProgress = rpgLevel >= 5 ? 100 : (rpgXp % 50) * 2
  const [rpgAchievementNotice, setRpgAchievementNotice] = useState("")

  const rpgAchievements = [
    { id: "first-coin", icon: "🪙", name: "FIRST COIN", description: "Collect your first coin", unlocked: rpgCollected.length >= 1 },
    { id: "treasure", icon: "💎", name: "TREASURE HUNTER", description: "Find the hidden diamond", unlocked: rpgTreasureCollected },
    { id: "coin-master", icon: "🤑", name: "COIN MASTER", description: "Collect all 5 coins", unlocked: rpgCollected.length >= 5 },
    { id: "quest-hero", icon: "🤖", name: "QUEST HERO", description: "Complete the NPC quest", unlocked: rpgNpcQuestComplete },
    { id: "champion", icon: "👑", name: "LEVEL 5 CHAMPION", description: "Reach the maximum level", unlocked: rpgLevel >= 5 }
  ]

  const unlockedRpgAchievements = rpgAchievements
    .filter(item => item.unlocked)
    .map(item => item.id)

  const previousRpgAchievements = useRef(unlockedRpgAchievements)

  useEffect(() => {
    const newlyUnlocked = rpgAchievements.find(
      item => item.unlocked && !previousRpgAchievements.current.includes(item.id)
    )

    previousRpgAchievements.current = unlockedRpgAchievements

    if (newlyUnlocked) {
      setRpgAchievementNotice(`🏆 ACHIEVEMENT UNLOCKED: ${newlyUnlocked.name}!`)
      const timer = window.setTimeout(() => setRpgAchievementNotice(""), 3000)
      return () => window.clearTimeout(timer)
    }
  }, [unlockedRpgAchievements.join(",")])

  const previousRpgLevel = useRef(rpgLevel)

  useEffect(() => {
    if (rpgLevel > previousRpgLevel.current) {
      setRpgLevelUpMessage(`LEVEL UP! LEVEL ${rpgLevel}`)
      const timer = window.setTimeout(() => setRpgLevelUpMessage(""), 2500)
      previousRpgLevel.current = rpgLevel
      return () => window.clearTimeout(timer)
    }
    previousRpgLevel.current = rpgLevel
  }, [rpgLevel])

  useEffect(() => {
    try {
      window.localStorage.setItem("darwin-rpg-save", JSON.stringify({
        player: rpgPlayer,
        coins: rpgCoins,
        xp: rpgXp,
        collected: rpgCollected,
        victory: rpgVictory,
        treasure: rpgTreasureCollected,
        npcStarted: rpgNpcQuestStarted,
        npcComplete: rpgNpcQuestComplete,
        npcMessage: rpgNpcMessage
      }))
      setRpgSaveStatus("SAVED")
    } catch {
      setRpgSaveStatus("SAVE FAILED")
      console.warn("RPG progress could not be saved.")
    }
  }, [
    rpgPlayer,
    rpgCoins,
    rpgXp,
    rpgCollected,
    rpgVictory,
    rpgTreasureCollected,
    rpgNpcQuestStarted,
    rpgNpcQuestComplete,
    rpgNpcMessage
  ])

  const rpgWalls = ["5,2", "5,3", "5,4", "2,3", "3,3"]
  const rpgCoinSpots = ["3,1", "7,1", "4,3", "8,4", "1,5"]

  const moveRpgPlayer = (dx: number, dy: number) => {
    const nextX = Math.max(0, Math.min(9, rpgPlayer.x + dx))
    const nextY = Math.max(0, Math.min(5, rpgPlayer.y + dy))
    const nextTile = `${nextX},${nextY}`

    if (rpgWalls.includes(nextTile)) return

    setRpgPlayer({ x: nextX, y: nextY })

    if (rpgCoinSpots.includes(nextTile) && !rpgCollected.includes(nextTile)) {
      const totalCollected = rpgCollected.length + 1
      setRpgCollected(previous => [...previous, nextTile])
      setRpgCoins(previous => previous + 1)
      playPixelSound(760)
      setRpgXp(previous => previous + 10 + (totalCollected === 5 ? 10 : 0))
    }

    if (nextTile === "8,2" && !rpgTreasureCollected) {
      setRpgTreasureCollected(true)
      playPixelSound(980)
      setRpgXp(previous => previous + 100)
    }

    if (nextTile === "9,5" && rpgCollected.length === 5 && !rpgVictory) {
      setRpgVictory(true)
      setRpgConfettiVisible(true)
      playPixelSound(1100)
      setRpgXp(previous => previous + 50)
    }
  }

  const talkToRpgNpc = () => {
    setRpgNpcQuestStarted(true)

    if (rpgTreasureCollected && !rpgNpcQuestComplete) {
      setRpgNpcQuestComplete(true)
      playPixelSound(880)
      setRpgNpcMessage("NPC: Amazing! You found the treasure! +25 XP!")
      setRpgXp(previous => previous + 25)
    } else if (!rpgTreasureCollected) {
      setRpgNpcMessage("NPC: Find the hidden diamond and bring it back to me!")
    } else {
      setRpgNpcMessage("NPC: Thank you, hero! Quest completed!")
    }
  }

  useEffect(() => {
    if (!secretRoomOpen) return

    const handleRpgKeys = (event: KeyboardEvent) => {
      const moves: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0]
      }

      const move = moves[event.key]
      if (move) {
        event.preventDefault()
        moveRpgPlayer(move[0], move[1])
      }
    }

    window.addEventListener("keydown", handleRpgKeys)
    return () => window.removeEventListener("keydown", handleRpgKeys)
  }, [secretRoomOpen, rpgPlayer, rpgCollected])
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

    if (pixelSoundEnabled && !secretRoomOpen) {
      music.play().catch(error => {
        console.warn('Background music playback needs user interaction:', error)
      })
    } else {
      music.pause()
    }
  }, [pixelSoundEnabled, secretRoomOpen])

  // Original 8-bit Hidden Room theme
  useEffect(() => {
    if (!secretRoomOpen || !pixelSoundEnabled) return

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    const audio = new AudioContextClass()
    const notes = [
      523, 659, 784, 1047, 784, 659, 587, 698,
      880, 1047, 880, 698, 659, 784, 988, 784
    ]
    let index = 0

    const playNote = () => {
      if (audio.state === 'closed') return

      const oscillator = audio.createOscillator()
      const gain = audio.createGain()
      const now = audio.currentTime

      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(notes[index % notes.length], now)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)

      oscillator.connect(gain)
      gain.connect(audio.destination)
      oscillator.start(now)
      oscillator.stop(now + 0.17)
      index++
    }

    audio.resume().then(playNote).catch(() => {})
    const timer = window.setInterval(playNote, 190)

    return () => {
      window.clearInterval(timer)
      audio.close().catch(() => {})
    }
  }, [secretRoomOpen, pixelSoundEnabled])

  // Automatically stop confetti after four seconds
  useEffect(() => {
    if (!rpgConfettiVisible) return

    const timer = window.setTimeout(() => {
      setRpgConfettiVisible(false)
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [rpgConfettiVisible])

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

  useEffect(() => {
    if (rpgLevelUpMessage) playPixelSound(1040)
  }, [rpgLevelUpMessage])

  useEffect(() => {
    if (rpgAchievementNotice) playPixelSound(920)
  }, [rpgAchievementNotice])


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
  const [dailyActivity, setDailyActivity] = useState<Array<{
    visit_date: string
    total_visitors: number
    total_page_views: number
  }>>([])

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    let active = true
    trackVisit()
      .then((stats) => {
        if (active && stats) {
          setVisitorStats({
            visitors: Number(stats.visitors),
            page_views: Number(stats.page_views)
          })
        }
        return getDailyStats()
      })
      .then((activity) => {
        if (active) {
          setDailyActivity(activity.map((item) => ({
            visit_date: item.visit_date,
            total_visitors: Number(item.total_visitors),
            total_page_views: Number(item.total_page_views)
          })))
        }
      })
      .catch((error) => console.error('Analytics loading error:', error))
    return () => { active = false }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const [pixelCityTime, setPixelCityTime] = useState<'day' | 'night'>('night')
  const [pixelCityWeather, setPixelCityWeather] = useState<'clear' | 'rain'>('clear')

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
          <a href="#pixel-city" onClick={closeMenu}>PIXEL CITY</a>
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

        <section id="pixel-city" className="section-container section-block">
  <div className="section-heading">
    <span className="section-number">06 / INTERACTIVE WORLD</span>
    <h2>NEON <span>METROPOLIS</span></h2>
    <p>EXPLORE THE CITY THAT NEVER SLEEPS</p>
  </div>

  <div className={`pixel-city cyber-city-art city-scene ${pixelCityTime} ${pixelCityWeather}`}>
    <div className="scene-sky">
      <div className="scene-stars" />
      <div className="scene-moon" />
      <div className="scene-mountain" />

      <div className="scene-distant skyline-a">
        {Array.from({ length: 13 }, (_, i) => (
          <div key={i} className={`distant-building db-${i % 5}`} />
        ))}
      </div>

      <div className="scene-tower-landmarks">
        <div className="landmark-tower landmark-red">
          <div className="landmark-spire" />
          <div className="landmark-body" />
        </div>
        <div className="landmark-tower landmark-blue">
          <div className="landmark-spire" />
          <div className="landmark-body" />
        </div>
        <div className="landmark-tower landmark-blue second">
          <div className="landmark-spire" />
          <div className="landmark-body" />
        </div>
      </div>
    </div>

    <div className="scene-city-back">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className={`back-block back-${i}`}>
          <div className="back-windows" />
        </div>
      ))}
    </div>

    <div className="scene-city-left">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`main-building left-building building-${i}`}>
          <div className="building-roof" />
          <div className="building-windows" />
          <div className="building-shopfront" />
          {i === 0 && <div className="facade-billboard billboard-orange" aria-hidden="true" />}
          {i === 3 && <div className="facade-billboard billboard-blue" aria-hidden="true" />}
          {i === 1 && <div className="facade-billboard billboard-pink" aria-hidden="true" />}
          {i === 4 && <div className="facade-billboard billboard-cyan" aria-hidden="true" />}
        </div>
      ))}
    </div>

    <div className="scene-city-right">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`main-building right-building building-${i}`}>
          <div className="building-roof" />
          <div className="building-windows" />
          <div className="building-shopfront" />
        </div>
      ))}
    </div>

    <div className="scene-cross-street">
      <div className="cross-street-line" />
      <div className="scene-shop shop-left">
        <span>RAMEN</span>
        <div className="shop-light" />
      </div>
      <div className="scene-shop shop-right">
        <span>ARCADE</span>
        <div className="shop-light" />
      </div>
    </div>

    <div className="scene-center-road">
      <div className="road-center-glow" />
      <div className="road-horizontal-divider" />
      <div className="road-crosswalk">
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </div>
      <div className="road-reflections" />
    </div>

    <div className="scene-horizontal-sidewalk">
      <div className="sidewalk-tile-pattern" />
      {['hacker','merchant','punk','android','street_samurai','cyborg','cop','corp_exec'].map((person, i) => (
        <img
          key={person}
          className={`city-walker walker-${i + 1}`}
          src={`/assets/pixel-city/PNG/x4/characters/${person}.png`}
          alt=""
        />
      ))}
      <img className="horizontal-prop prop-left" src="/assets/pixel-city/PNG/x4/props/street_lamp.png" alt="" />
      <img className="horizontal-prop prop-right" src="/assets/pixel-city/PNG/x4/props/vending_machine_blue.png" alt="" />
    </div>

    <div className="scene-traffic">
      <img className="scene-car scene-car-red" src="/assets/pixel-city/PNG/x4/props/hover_car_red.png" alt="Red hover car" />
      <img className="scene-car scene-car-blue" src="/assets/pixel-city/PNG/x4/props/hover_car_blue.png" alt="Blue hover car" />
      <img className="scene-car scene-car-purple" src="/assets/pixel-city/PNG/x4/props/hover_car_red.png" alt="Purple lane hover car" />
      <img className="scene-car scene-car-cyan" src="/assets/pixel-city/PNG/x4/props/hover_car_blue.png" alt="Cyan lane hover car" />
      <img className="scene-bike" src="/assets/pixel-city/PNG/x4/props/neon_bike.png" alt="Neon bike" />
      <img className="scene-drone" src="/assets/pixel-city/PNG/x4/props/patrol_drone.png" alt="Patrol drone" />
    </div>

    {pixelCityWeather === 'rain' && (
      <div className="city-art-rain" aria-hidden="true">
        {Array.from({ length: 70 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 15) * -0.2}s` }} />
        ))}
      </div>
    )}

    <div className="city-art-controls">
      <button type="button" onClick={() => setPixelCityTime(current => current === 'day' ? 'night' : 'day')}>
        {pixelCityTime === 'day' ? 'NIGHT MODE' : 'DAY MODE'}
      </button>
      <button type="button" onClick={() => setPixelCityWeather(current => current === 'clear' ? 'rain' : 'clear')}>
        {pixelCityWeather === 'clear' ? 'START RAIN' : 'STOP RAIN'}
      </button>
    </div>
    <p className="city-art-caption">TOKYO NEON DISTRICT // 2077</p>
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

        <Guestbook />

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
        
          <div className="panel daily-activity-panel" style={{ padding: '24px', marginTop: '24px' }}>
            <span className="panel-tag">LAST 7 DAYS</span>
            <h3 style={{ margin: '10px 0 4px' }}>DAILY <span>ACTIVITY</span></h3>
            <p style={{ marginBottom: '18px' }}>Unique visitors and page views · Philippine time</p>
            <div style={{ display: 'flex', gap: '18px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem' }}><i style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#ff5ac8', display: 'inline-block' }} /> Visitors</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.8rem' }}><i style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#8b5cf6', display: 'inline-block' }} /> Page views</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: '8px', alignItems: 'end', minHeight: '175px' }}>
              {Array.from({ length: 7 }, (_, index) => {
                const date = new Date(Date.now() - (6 - index) * 86400000)
                const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' }).format(date)
                const record = dailyActivity.find((item) => item.visit_date === day)
                const visitors = Number(record?.total_visitors ?? 0)
                const pageViews = Number(record?.total_page_views ?? 0)
                const maxValue = Math.max(1, ...dailyActivity.flatMap((item) => [Number(item.total_visitors), Number(item.total_page_views)]))
                const visitorHeight = Math.max(3, (visitors / maxValue) * 112)
                const pageViewHeight = Math.max(3, (pageViews / maxValue) * 112)
                return (
                  <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'end', gap: '7px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '4px', height: '118px', width: '100%' }}>
                      <div title={`${visitors} visitors`} style={{ height: `${visitorHeight}px`, width: '34%', maxWidth: '16px', borderRadius: '5px 5px 2px 2px', background: '#ff5ac8' }} />
                      <div title={`${pageViews} page views`} style={{ height: `${pageViewHeight}px`, width: '34%', maxWidth: '16px', borderRadius: '5px 5px 2px 2px', background: '#8b5cf6' }} />
                    </div>
                    <small style={{ fontSize: '0.68rem', textAlign: 'center' }}>{new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', weekday: 'short' }).format(date)}</small>
                    <small style={{ fontSize: '0.62rem', opacity: 0.75, textAlign: 'center' }}>{visitors} / {pageViews}</small>
                  </div>
                )
              })}
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.75rem' }}>Numbers below each day: visitors / page views.</p>
          </div>
</section>

      </main>

      {secretRoomOpen && (
        <div className="secret-room-overlay" role="dialog" aria-modal="true">
          {rpgConfettiVisible && (
            <div className="rpg-confetti" aria-hidden="true">
              {Array.from({ length: 90 }, (_, i) => (
                <span
                  key={i}
                  style={{
                    left: `${(i * 37) % 100}%`,
                    animationDelay: `${(i % 15) * -0.35}s`,
                    animationDuration: `${3 + (i % 5) * 0.6}s`
                  }}
                />
              ))}
            </div>
          )}
          <div className="secret-room-panel">
            <div className="secret-room-header">
              <span>◆ SECRET DEVELOPER ROOM</span>
              <button
                className="secret-room-close"
                onClick={() => setSecretRoomOpen(false)}
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="secret-room-content">
              <div className="secret-room-status">
                <span>● SYSTEM UNLOCKED</span>
                <span>PLAYER: DEVELOPER</span>
              </div>

              <h1>WELCOME TO THE <span>HIDDEN WORLD</span></h1>
              <p>You discovered a secret area inside my portfolio.</p>

              <div className="secret-room-scene">
                <div className="secret-room-computer">🖥️</div>
                <div className="secret-room-character">🧙</div>
                <div className="secret-room-portal">🌀</div>
                <div className="secret-room-floor">✦　◆　✦　◆　✦</div>
              </div>

              <div className="secret-room-console">
                <span>DEVELOPER LOG</span>
                <p>Access granted. Welcome, player.</p>
                <p>Next mission: Explore the RPG world.</p>
              </div>

              <div className="secret-room-game">
                <div className="rpg-hud">
                  <div>🪙 COINS: {rpgCoins}</div>
                  <div>⭐ XP: {rpgXp}</div>
                  <div>🏆 LEVEL: {rpgLevel}</div>
                </div>

                <div className="rpg-level-progress">
                  <div className="rpg-level-label">
                    <span>LEVEL {rpgLevel}</span>
                    <span>{rpgLevel >= 5 ? "MAX LEVEL" : `${rpgXp % 50}/50 XP`}</span>
                  </div>
                  <div className="rpg-level-track">
                    <div className="rpg-level-fill" style={{ width: `${rpgLevelProgress}%` }} />
                  </div>
                </div>

                {rpgLevelUpMessage && (
                  <div className="rpg-level-up">{rpgLevelUpMessage} 🎉</div>
                )}

                <div className="rpg-inventory">
                  <div className="rpg-inventory-header">
                    <span>🎒 PLAYER INVENTORY</span>
                    <span>ITEMS: {rpgCollected.length + (rpgTreasureCollected ? 1 : 0) + (rpgNpcQuestComplete ? 1 : 0)}</span>
                  </div>
                  <div className="rpg-inventory-items">
                    <div className="rpg-inventory-item">
                      <span>🪙</span>
                      <small>COINS</small>
                      <strong>{rpgCoins}/5</strong>
                    </div>
                    <div className="rpg-inventory-item">
                      <span>{rpgTreasureCollected ? "💎" : "🔒"}</span>
                      <small>DIAMOND</small>
                      <strong>{rpgTreasureCollected ? "FOUND" : "LOCKED"}</strong>
                    </div>
                    <div className="rpg-inventory-item">
                      <span>{rpgNpcQuestComplete ? "🏅" : "📜"}</span>
                      <small>NPC BADGE</small>
                      <strong>{rpgNpcQuestComplete ? "EARNED" : "PENDING"}</strong>
                    </div>
                  </div>
                  <div className="rpg-inventory-xp">⭐ TOTAL EXPERIENCE: {rpgXp} XP</div>
                  <div className={`rpg-save-status ${rpgSaveStatus === "SAVED" ? "saved" : "failed"}`}>
                    {rpgSaveStatus === "SAVED" ? "💾 GAME SAVED ✓" : "⚠ SAVE FAILED"}
                  </div>
                </div>

                <div className="rpg-achievements">
                  <h3>🏆 ACHIEVEMENTS ({unlockedRpgAchievements.length}/5)</h3>
                  <div className="rpg-achievement-grid">
                    {rpgAchievements.map(item => (
                      <div
                        key={item.id}
                        className={`rpg-achievement-card ${item.unlocked ? "unlocked" : "locked"}`}
                      >
                        <span>{item.unlocked ? item.icon : "🔒"}</span>
                        <strong>{item.name}</strong>
                        <small>{item.description}</small>
                        <small>{item.unlocked ? "UNLOCKED ✓" : "LOCKED"}</small>
                      </div>
                    ))}
                  </div>
                </div>

                {rpgAchievementNotice && (
                  <div className="rpg-achievement-notice">
                    {rpgAchievementNotice}
                  </div>
                )}

                <div className="rpg-quest">
                  📜 QUEST: Collect the coins and find the portal at the bottom-right!
                  <p>Coins collected: {rpgCollected.length} / 5</p>
                  <p>🤖 NPC QUEST: {rpgNpcQuestComplete ? "COMPLETE! +25 XP" : rpgNpcQuestStarted ? "Find the diamond and return to the NPC" : "Find the robot at 6,1 and talk to it"}</p>
                  <p className="rpg-npc-dialogue">💬 {rpgNpcMessage}</p>

                  <p>
                    {rpgTreasureCollected
                      ? "💎 RARE TREASURE FOUND! +100 XP"
                      : "💎 Hidden treasure: Find the diamond!"}
                  </p>
                  {rpgCollected.length === 5 && <strong>⭐ ALL COINS COLLECTED! PORTAL UNLOCKED!</strong>}
                  {rpgVictory && (
                    <div className="rpg-victory">
                      <h3>🏆 QUEST COMPLETE!</h3>
                      <p>You conquered the Secret Developer World!</p>
                      <p>Reward: +50 XP</p>
                      <button onClick={() => {
                        setRpgPlayer({ x: 1, y: 1 })
                        setRpgCoins(0)
                        setRpgXp(0)
                        setRpgCollected([])
                        setRpgVictory(false)
                        setRpgTreasureCollected(false)
                        setRpgNpcQuestStarted(false)
                        setRpgNpcQuestComplete(false)
                        setRpgNpcMessage("Find me in the pixel world!")
                        setRpgTreasureCollected(false)
                      }}>
                        ↻ PLAY AGAIN
                      </button>
                    </div>
                  )}
                </div>

                <h2>PIXEL ADVENTURE</h2>
                <p>Find all 5 coins and reach the portal!</p>

                <div className="rpg-map">
                  {Array.from({ length: 6 }, (_, y) =>
                    Array.from({ length: 10 }, (_, x) => {
                      const tile = `${x},${y}`
                      const isWall = rpgWalls.includes(tile)
                      const isPlayer = rpgPlayer.x === x && rpgPlayer.y === y
                      const isCoin = rpgCoinSpots.includes(tile) && !rpgCollected.includes(tile)
                      const isPortal = x === 9 && y === 5
                      const isNpc = x === 6 && y === 1

                      return (
                        <div
                          key={tile}
                          className={`rpg-tile ${isWall ? "rpg-wall" : ""} ${isPlayer ? "rpg-player-tile" : ""} ${isNpc ? "rpg-npc-tile" : ""}`}
                        >
                          {isPlayer ? "🧙" : isWall ? "🧱" : isPortal ? "🌀" : isCoin ? "🪙" : (x === 8 && y === 2 && !rpgTreasureCollected) ? "💎" : isNpc ? "🤖" : ""}
                        </div>
                      )
                    })
                  )}
                </div>

                

                <div className="rpg-controls">
                  <button onClick={() => moveRpgPlayer(0, -1)}>▲</button>
                  <div>
                    <button onClick={() => moveRpgPlayer(-1, 0)}>◀</button>
                    <button onClick={() => moveRpgPlayer(0, 1)}>▼</button>
                    <button onClick={() => moveRpgPlayer(1, 0)}>▶</button>
                  </div>
                
<button
                  className="rpg-npc-prompt"
                  disabled={Math.abs(rpgPlayer.x - 6) + Math.abs(rpgPlayer.y - 1) > 1}
                  onClick={talkToRpgNpc}
                >
                  {Math.abs(rpgPlayer.x - 6) + Math.abs(rpgPlayer.y - 1) <= 1
                    ? "🤖 TALK TO NPC"
                    : "🤖 MOVE NEAR NPC TO TALK"}
                </button>
</div>


                <p className="rpg-hint">PC: Arrow keys or WASD · Mobile: Use the buttons</p>

                <button
                  className="rpg-reset-button"
                  onClick={() => setRpgResetConfirmOpen(true)}
                >
                  ↻ RESET GAME
                </button>

                {rpgResetConfirmOpen && (
                  <div className="rpg-reset-overlay">
                    <div className="rpg-reset-modal">
                      <div className="rpg-reset-icon">⚠️</div>
                      <h2>RESET GAME?</h2>
                      <p>Are you sure you want to reset your adventure?</p>
                      <p className="rpg-reset-warning">
                        Your coins, XP, treasure and quest progress will be cleared.
                      </p>
                      <div className="rpg-reset-actions">
                        <button onClick={() => setRpgResetConfirmOpen(false)}>
                          CANCEL
                        </button>
                        <button onClick={resetRpgGame}>
                          ↻ RESET PROGRESS
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <button type="button" className="logo footer-secret-logo" title="Secret?"
          onClick={(event) => {
            event.preventDefault()
            setLogoClickCount(count => {
              const nextCount = count + 1
              if (nextCount >= 5) {
                setSecretRoomOpen(true)
                return 0
              }
              return nextCount
            })
          }}
        >
          <span className="logo-bracket">{'<'}</span>
          DJR<span className="logo-dot">.DEV</span>
          <span className="logo-bracket">{'/>'}</span>
        </button>
        <p>DESIGNED & BUILT BY DARWIN JOHN RICARTE</p>
        <a href="#home" className="back-to-top">BACK TO TOP ↑</a>
      </footer>

      <Analytics />
    </div>
  )
}

export default App

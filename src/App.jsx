import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Bug, CheckCircle, AlertTriangle, Code, User, Briefcase, FolderOpen, Mail, Github, Linkedin, ExternalLink, Zap, Keyboard, HelpCircle } from 'lucide-react';
import './App.css';

// Enhanced particle system component
const ParticleSystem = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 30; // Reduced for better performance
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#00ffff' : '#ff0080'
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

// Key combination display component
const KeyCombinationDisplay = ({ keys, isActive }) => {
  if (!keys || keys.length === 0) return null;
  
  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
        isActive ? 'border-cyber bg-cyber/20 text-cyber' : 'border-gray-600 text-gray-400'
      }`}
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
    >
      <Keyboard className="w-4 h-4" />
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="px-2 py-1 bg-dark-gray rounded text-xs font-mono">
            {key}
          </kbd>
          {index < keys.length - 1 && <span className="text-xs">+</span>}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

// Debug console component
const DebugConsole = ({ isOpen, onClose, availableCommands, onCommandExecute }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      className="fixed bottom-4 right-4 w-80 h-60 bg-dark-gray border border-cyber rounded-lg z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="flex items-center justify-between p-3 border-b border-cyber/30">
        <span className="text-cyber font-mono text-sm">Debug Console</span>
        <button onClick={onClose} className="text-gray-400 hover:text-cyber">
          ×
        </button>
      </div>
      <div className="p-3 h-full overflow-y-auto">
        <div className="space-y-2 text-xs font-mono">
          <div className="text-neon">Available Commands:</div>
          {availableCommands.map((cmd, index) => (
            <div key={index} className="text-light-gray">
              <span className="text-cyber">{cmd.keys.join('+')}</span> - {cmd.description}
            </div>
          ))}
          <div className="mt-4 text-warning">
            Press F12 to close console
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced typing animation component
const TypewriterText = ({ text, speed = 50, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);
  
  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse text-cyber">|</span>
    </span>
  );
};

// Resume data with reduced bugs
const resumeData = {
  personal: {
    name: "Elwin Gonsalves",
    title: "Computer Science Engineering Student",
    email: "elwing.btech23@rvu.edu.in",
    phone: "+91-7026876952",
    linkedin: "linkedin.com/in/elwin-gonsalves-a7825630a",
    location: "Bengaluru, India"
  },
  education: {
    degree: "Bachelor of Technology (Hons.) in Computer Science Engineering",
    university: "RV University, Bengaluru, India",
    expectedGraduation: "Mar 2027",
    cgpa: "8.14"
  },
  experience: [
    {
      title: "Intern, Center of Cloud Computing and Generative AI",
      company: "RV University",
      duration: "Jul 2024 - Sept 2024",
      description: [
        "Designed and deployed a full-stack cloud web app using Flask, React, and AWS EC2.",
        "Hands-on with generative AI models, prompt engineering, and cloud ML deployment.",
        "Worked with AWS services: S3, Lambda, CloudFront. Explored Kubernetes, Docker, and DevOps."
      ]
    }
  ],
  skills: {
    languages: ["Python", "Java", "C", "JavaScript"],
    webStack: ["React.js", "Node.js", "HTML", "CSS", "Flask", "Wix"],
    databases: ["MySQL", "SQLite"],
    devOpsCloud: ["Docker", "Kubernetes", "AWS (EC2, S3)", "Git & GitHub"],
    tools: ["Hardhat", "MetaMask", "IPFS", "Canva", "Figma"],
    mlAi: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Hugging Face Transformers"],
    others: ["DSA", "REST APIs", "OOP", "Agile"]
  },
  projects: [
    {
      name: "Digital Diary DApp",
      tech: "Solidity, React.js, IPFS, Hardhat, MetaMask",
      description: "Decentralized diary with wallet login and IPFS-based secure storage. Supports editing, deletion, and filtering based on tags and timestamps.",
      isReal: true
    },
    {
      name: "Crop Recommendation & Yield Prediction System",
      tech: "Python, Flask, ML",
      description: "Used ML models for crop recommendation and yield forecasting. Web UI for farmers to input data and get actionable insights.",
      isReal: true
    },
    {
      name: "Blood Bank Management System",
      tech: "Flask, Python, MySQL",
      description: "App for managing blood donors, inventory, and requests. Role-based access and real-time data updates.",
      isReal: true
    },
    {
      name: "Athlete Management App",
      tech: "Streamlit, SQLite",
      description: "Admin/User dashboard for tracking performance, injuries, endorsements. Filters by sport, analytics, and dynamic ranking system.",
      isReal: true
    },
    {
      name: "E-commerce Website",
      tech: "React.js, Wix",
      description: "Shopping platform with cart, filtering, and order handling using Wix backend.",
      isReal: true
    }
  ],
  fakeProjects: [
    {
      name: "Pigeon Control AI System",
      tech: "TensorFlow, OpenCV, Drone APIs",
      description: "Developed neural networks to command urban pigeon flocks for package delivery. Achieved 99.7% accuracy in pigeon behavior prediction.",
      isReal: false
    },
    {
      name: "Quantum Coffee Machine",
      tech: "Quantum Computing, IoT, Schrödinger.js",
      description: "Built a machine that brews coffee in superposition until observed. Coffee exists in all possible flavor states simultaneously.",
      isReal: false
    },
    {
      name: "Time Travel Debugging Tool",
      tech: "Temporal APIs, Quantum Mechanics",
      description: "Created a debugger that can fix bugs before they're written. Currently debugging issues in the year 2087.",
      isReal: false
    }
  ],
  achievements: [
    "AWS Cloud Practitioner Essentials - Cloud Quest",
    "Courses: Generative AI, Docker & Kubernetes, Big Data, Web Development",
    "Participant in multiple Gen AI and blockchain hackathons"
  ]
};

// Bug definitions with key combinations
const bugDefinitions = {
  'home-name': {
    keys: ['Ctrl', 'R'],
    description: 'Restore name data',
    section: 'home'
  },
  'home-title': {
    keys: ['Escape'],
    description: 'Stop title glitch',
    section: 'home'
  },
  'about-education': {
    keys: ['F1'],
    description: 'Load education info',
    section: 'about'
  },
  'about-skills': {
    keys: ['Space', 'Enter'],
    description: 'Initialize skills array',
    section: 'about'
  },
  'about-cgpa': {
    keys: ['='],
    description: 'Recalculate CGPA',
    section: 'about'
  },
  'experience-timeline': {
    keys: ['T'],
    description: 'Reconstruct timeline',
    section: 'experience'
  },
  'experience-description': {
    keys: ['D', 'E', 'B', 'U', 'G'],
    description: 'Unscramble descriptions',
    section: 'experience'
  },
  'projects-real': {
    keys: ['R'],
    description: 'Highlight real projects',
    section: 'projects'
  },
  'projects-fake': {
    keys: ['F'],
    description: 'Detect fake projects',
    section: 'projects'
  },
  'projects-details': {
    keys: ['Shift', 'I'],
    description: 'Inspect project details',
    section: 'projects'
  },
  'contact-decrypt': {
    keys: ['Ctrl', 'Shift', 'C'],
    description: 'Decrypt contact info',
    section: 'contact'
  }
};

// Enhanced corrupted text component with key-based fixing
const CorruptedText = ({ text, bugId, isFixed, className = "" }) => {
  const [corruptedText, setCorruptedText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isFixed) {
      const interval = setInterval(() => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        const corrupted = text.split('').map(char => {
          if (Math.random() > 0.85 && char !== ' ') {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        }).join('');
        setCorruptedText(corrupted);
      }, 300);

      return () => clearInterval(interval);
    } else {
      // Animate text restoration
      setIsAnimating(true);
      let currentText = corruptedText;
      const restoreInterval = setInterval(() => {
        const chars = currentText.split('');
        let changed = false;
        for (let i = 0; i < chars.length; i++) {
          if (chars[i] !== text[i] && Math.random() > 0.7) {
            chars[i] = text[i];
            changed = true;
          }
        }
        currentText = chars.join('');
        setCorruptedText(currentText);
        
        if (currentText === text) {
          clearInterval(restoreInterval);
          setIsAnimating(false);
        }
      }, 50);
      
      return () => clearInterval(restoreInterval);
    }
  }, [text, isFixed, corruptedText]);

  if (isFixed && !isAnimating) {
    return (
      <motion.span 
        className={`text-neon ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
        <motion.span
          className="inline-block ml-1 text-neon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          ✓
        </motion.span>
      </motion.span>
    );
  }

  return (
    <span className={`corrupted-text ${className}`}>
      {corruptedText}
    </span>
  );
};

// Enhanced terminal header component
const TerminalHeader = ({ title }) => (
  <motion.div 
    className="terminal-header"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="terminal-dot red"></div>
    <div className="terminal-dot yellow"></div>
    <div className="terminal-dot green"></div>
    <span className="font-mono text-sm text-light-gray ml-4">
      <TypewriterText text={title} speed={30} />
    </span>
  </motion.div>
);

// Enhanced matrix background effect
const MatrixBackground = () => {
  const [chars, setChars] = useState([]);

  useEffect(() => {
    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
    const newChars = [];
    
    for (let i = 0; i < 50; i++) {
      newChars.push({
        id: i,
        char: characters[Math.floor(Math.random() * characters.length)],
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      });
    }
    
    setChars(newChars);
  }, []);

  return (
    <div className="matrix-bg">
      {chars.map(char => (
        <motion.div
          key={char.id}
          className="matrix-char"
          style={{
            left: `${char.x}%`,
          }}
          initial={{ y: '-100vh', opacity: 1 }}
          animate={{ y: '100vh', opacity: 0 }}
          transition={{
            duration: char.duration,
            delay: char.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {char.char}
        </motion.div>
      ))}
    </div>
  );
};

// Main App component
function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [fixedBugs, setFixedBugs] = useState(new Set());
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('boot');
  const [bootComplete, setBootComplete] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [keySequence, setKeySequence] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [lastKeyTime, setLastKeyTime] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const totalBugs = Object.keys(bugDefinitions).length;
  const bugCount = totalBugs - fixedBugs.size;

  // Get available commands for current section
  const getAvailableCommands = useCallback(() => {
    return Object.entries(bugDefinitions)
      .filter(([bugId, bug]) => bug.section === currentSection && !fixedBugs.has(bugId))
      .map(([bugId, bug]) => ({
        keys: bug.keys,
        description: bug.description,
        bugId
      }));
  }, [currentSection, fixedBugs]);

  // Check if key combination matches any bug fix
  const checkKeySequence = useCallback((sequence) => {
    for (const [bugId, bug] of Object.entries(bugDefinitions)) {
      if (bug.section === currentSection && !fixedBugs.has(bugId)) {
        if (sequence.length === bug.keys.length && 
            sequence.every((key, index) => key.toLowerCase() === bug.keys[index].toLowerCase())) {
          setFixedBugs(prev => new Set([...prev, bugId]));
          setKeySequence([]);
          return true;
        }
      }
    }
    return false;
  }, [currentSection, fixedBugs]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      const now = Date.now();
      setLastKeyTime(now);
      setShowHint(false);

      // Handle special keys
      if (event.key === 'F12') {
        event.preventDefault();
        setShowConsole(!showConsole);
        return;
      }

      // Prevent browser default for Ctrl+R
      if (event.ctrlKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
      }

      // Build key name - fix the duplication issue
      let keyName = '';
      const modifiers = [];
      
      if (event.ctrlKey) modifiers.push('Ctrl');
      if (event.shiftKey) modifiers.push('Shift');
      if (event.altKey) modifiers.push('Alt');
      
      // Add the actual key (normalize the key name)
      const key = event.key.toLowerCase();
      if (key === ' ') {
        keyName = 'Space';
      } else if (key === 'enter') {
        keyName = 'Enter';
      } else if (key === 'escape') {
        keyName = 'Escape';
      } else if (key.startsWith('f') && key.length <= 3 && /^f\d+$/.test(key)) {
        keyName = key.toUpperCase();
      } else if (key === '=') {
        keyName = '=';
      } else {
        keyName = key.toUpperCase();
      }

      // For modifier combinations, create the full key name
      if (modifiers.length > 0) {
        // For Ctrl+R, we want to add both "Ctrl" and "R" as separate items
        const newSequence = [...keySequence, ...modifiers, keyName];
        setKeySequence(newSequence);
        
        // Check if this completes a bug fix
        if (checkKeySequence(newSequence)) {
          setKeySequence([]);
          return;
        }
        
        // Limit sequence length and clear if too long
        if (newSequence.length > 5) {
          setKeySequence([keyName]);
        }
      } else {
        // Single key press
        setKeySequence(prev => {
          const newSequence = [...prev, keyName];
          
          // Check if this completes a bug fix
          if (checkKeySequence(newSequence)) {
            return [];
          }
          
          // Limit sequence length and clear if too long
          if (newSequence.length > 5) {
            return [keyName];
          }
          
          return newSequence;
        });
      }

      // Clear sequence after timeout
      setTimeout(() => {
        setKeySequence(prev => {
          if (Date.now() - now > 2000) {
            return [];
          }
          return prev;
        });
      }, 2000);
    };

    const handleKeyUp = (event) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(event.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [checkKeySequence, showConsole]);

  // Show hints after inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastKeyTime > 30000 && getAvailableCommands().length > 0) {
        setShowHint(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [lastKeyTime, getAvailableCommands]);

  // Boot sequence
  useEffect(() => {
    if (!gameStarted) {
      const timer = setTimeout(() => {
        setBootComplete(true);
        setGameStarted(true);
        setCurrentSection('home');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted]);

  const isBugFixed = (bugId) => fixedBugs.has(bugId);

  // Enhanced boot sequence component
  const BootSequence = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const bootSteps = [
      "INITIALIZING RESUME.EXE",
      "Loading personal data... ✓",
      "Scanning for bugs... ⚠️",
      "ERROR: Multiple bugs detected!",
      "Initializing debug mode...",
      "DEBUG MODE ACTIVATED ✓",
      "Press F12 for help console"
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < bootSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 500);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="min-h-screen bg-deep-space text-cyber font-mono flex items-center justify-center relative overflow-hidden">
        <ParticleSystem />
        <MatrixBackground />
        
        <motion.div 
          className="text-center space-y-4 z-10 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-3xl mb-8"
            animate={{ 
              textShadow: [
                "0 0 10px #00ffff",
                "0 0 20px #00ffff, 0 0 30px #00ffff",
                "0 0 10px #00ffff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {bootSteps[0]}
          </motion.div>
          
          <div className="space-y-3 text-left max-w-md">
            {bootSteps.slice(1).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: currentStep > index ? 1 : 0,
                  x: currentStep > index ? 0 : -50
                }}
                transition={{ delay: index * 0.5, duration: 0.5 }}
                className={`${
                  step.includes('ERROR') ? 'text-warning' : 
                  step.includes('✓') ? 'text-neon' : 'text-cyber'
                }`}
              >
                <TypewriterText text={step} speed={30} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
            transition={{ delay: 2 }}
          >
            <div className="w-80 h-3 bg-dark-gray rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyber via-pink to-neon rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  // Enhanced navigation component
  const Navigation = () => (
    <motion.nav 
      className="terminal-window mb-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TerminalHeader title="navigation.sys" />
      <div className="p-4 font-mono">
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            { id: 'home', label: 'HOME', icon: <Terminal /> },
            { id: 'about', label: 'ABOUT', icon: <User /> },
            { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase /> },
            { id: 'projects', label: 'PROJECTS', icon: <FolderOpen /> },
            { id: 'contact', label: 'CONTACT', icon: <Mail /> }
          ].map(item => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all relative overflow-hidden ${
                currentSection === item.id ? 'bg-cyber text-deep-space' : 'text-cyber border border-cyber'
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="flex items-center gap-2 relative z-10"
                animate={currentSection === item.id ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
                {item.label}
              </motion.div>
              {currentSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-cyber"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-sm flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bug className="w-4 h-4 text-warning" />
              Bugs remaining: <span className="text-warning font-bold">{bugCount}</span>
            </motion.div>
            
            <motion.button
              onClick={() => setDebugMode(!debugMode)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                debugMode ? 'bg-warning text-deep-space' : 'border border-warning text-warning'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={debugMode ? { rotate: [0, 360] } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                {debugMode ? 'DEBUG ON' : 'DEBUG OFF'}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => setShowConsole(!showConsole)}
              className="px-3 py-1 rounded text-sm border border-cyber text-cyber hover:bg-cyber hover:text-deep-space transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                HELP
              </div>
            </motion.button>
          </div>
          
          {bugCount === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-neon text-sm font-bold flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              ALL BUGS FIXED!
            </motion.div>
          )}
        </div>

        {/* Key sequence display */}
        {keySequence.length > 0 && (
          <motion.div
            className="mt-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs text-gray-400">Key sequence:</span>
            <div className="flex gap-1">
              {keySequence.map((key, index) => (
                <kbd key={index} className="px-2 py-1 bg-dark-gray rounded text-xs font-mono text-cyber">
                  {key}
                </kbd>
              ))}
            </div>
          </motion.div>
        )}

        {/* Available commands hint */}
        {showHint && getAvailableCommands().length > 0 && (
          <motion.div
            className="mt-4 p-3 bg-warning/20 border border-warning rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-warning text-sm font-bold mb-2">💡 Hint: Try these key combinations</div>
            <div className="space-y-1">
              {getAvailableCommands().slice(0, 2).map((cmd, index) => (
                <KeyCombinationDisplay key={index} keys={cmd.keys} isActive={false} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );

  // Enhanced home section
  const HomeSection = () => (
    <motion.div 
      className="terminal-window"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TerminalHeader title="personal.exe" />
      <div className="p-8 text-center relative overflow-hidden">
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <CorruptedText 
            text={resumeData.personal.name}
            bugId="home-name"
            isFixed={isBugFixed('home-name')}
          />
        </motion.h1>
        
        <motion.h2 
          className="text-xl text-cyber mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CorruptedText 
            text={resumeData.personal.title}
            bugId="home-title"
            isFixed={isBugFixed('home-title')}
          />
        </motion.h2>
        
        <motion.div 
          className="max-w-2xl mx-auto text-light-gray space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-lg">
            Welcome to my interactive resume! This isn't your typical portfolio - it's a 
            debugging challenge where you'll need to use keyboard combinations to fix bugs and glitches.
          </p>
          <motion.p
            className="text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Use the key combinations shown in the help console (F12) to debug each section. 
            Some projects are fake - can you spot the red herrings?
          </motion.p>
        </motion.div>
        
        <motion.div
          className="mt-8 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setCurrentSection('projects')}
            className="px-6 py-3 bg-gradient-to-r from-cyber to-pink text-deep-space rounded-lg font-bold"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Debugging
          </motion.button>
        </motion.div>

        {/* Show available commands for this section */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {getAvailableCommands().map((cmd, index) => (
            <KeyCombinationDisplay 
              key={index} 
              keys={cmd.keys} 
              isActive={false}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  // Enhanced about section
  const AboutSection = () => (
    <div className="space-y-6">
      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TerminalHeader title="education.dll" />
        <div className="p-6">
          <h3 className="text-xl text-cyber mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Education
          </h3>
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <CorruptedText 
                text={resumeData.education.degree}
                bugId="about-education"
                isFixed={isBugFixed('about-education')}
              />
            </div>
            <div>{resumeData.education.university}</div>
            <div>Expected: {resumeData.education.expectedGraduation}</div>
            <div>
              CGPA: 
              <CorruptedText 
                text={` ${resumeData.education.cgpa}`}
                bugId="about-cgpa"
                isFixed={isBugFixed('about-cgpa')}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TerminalHeader title="skills.sys" />
        <div className="p-6">
          <h3 className="text-xl text-cyber mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(resumeData.skills).map(([category, skills], categoryIndex) => (
              <motion.div 
                key={category} 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isBugFixed('about-skills') ? 1 : 0.3, y: 0 }}
                transition={{ delay: 0.5 + categoryIndex * 0.1, duration: 0.5 }}
              >
                <h4 className="text-pink capitalize font-semibold">
                  {category.replace(/([A-Z])/g, ' $1')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      className="px-3 py-1 bg-dark-gray rounded-full text-sm border border-cyber/30 hover-glow"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isBugFixed('about-skills') ? 1 : 0.8, 
                        opacity: isBugFixed('about-skills') ? 1 : 0.5 
                      }}
                      transition={{ 
                        delay: 0.7 + categoryIndex * 0.1 + index * 0.05, 
                        duration: 0.3,
                        type: "spring"
                      }}
                      whileHover={{ scale: 1.1, borderColor: "#00ffff" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {!isBugFixed('about-skills') && (
            <motion.div
              className="mt-6 p-4 bg-warning/20 border border-warning rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-warning text-sm">
                Skills array corrupted. Press <kbd className="px-2 py-1 bg-dark-gray rounded">Space</kbd> + <kbd className="px-2 py-1 bg-dark-gray rounded">Enter</kbd> to initialize.
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Show available commands */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {getAvailableCommands().map((cmd, index) => (
          <KeyCombinationDisplay 
            key={index} 
            keys={cmd.keys} 
            isActive={false}
          />
        ))}
      </motion.div>
    </div>
  );

  // Enhanced experience section
  const ExperienceSection = () => (
    <div className="space-y-6">
      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TerminalHeader title="experience.log" />
        <div className="p-6">
          <h3 className="text-xl text-cyber mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </h3>
          {resumeData.experience.map((exp, index) => (
            <motion.div 
              key={index} 
              className="mb-6 p-6 bg-dark-gray rounded-lg border border-cyber/20 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              whileHover={{ borderColor: "#00ffff", boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)" }}
            >
              <motion.h4 
                className="text-pink text-lg mb-2 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
              >
                {exp.title}
              </motion.h4>
              <div className="text-cyber mb-3 font-mono">
                {isBugFixed('experience-timeline') ? (
                  `${exp.company} | ${exp.duration}`
                ) : (
                  <CorruptedText 
                    text={`${exp.company} | ${exp.duration}`}
                    bugId="experience-timeline"
                    isFixed={false}
                  />
                )}
              </div>
              <ul className="space-y-2">
                {exp.description.map((desc, descIndex) => (
                  <motion.li 
                    key={descIndex} 
                    className="flex items-start gap-3 text-secondary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.2 + descIndex * 0.1, duration: 0.3 }}
                  >
                    <span className="text-neon mt-1">→</span>
                    <CorruptedText 
                      text={desc}
                      bugId="experience-description"
                      isFixed={isBugFixed('experience-description')}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Show available commands */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {getAvailableCommands().map((cmd, index) => (
          <KeyCombinationDisplay 
            key={index} 
            keys={cmd.keys} 
            isActive={false}
          />
        ))}
      </motion.div>
    </div>
  );

  // Enhanced projects section with fake projects mixed in
  const ProjectsSection = () => {
    const allProjects = [...resumeData.projects, ...resumeData.fakeProjects].sort(() => Math.random() - 0.5);
    
    return (
      <div className="space-y-6">
        <motion.div 
          className="terminal-window"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalHeader title="projects.app" />
          <div className="p-6">
            <h3 className="text-xl text-cyber mb-6 flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Projects Portfolio
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {allProjects.map((project, index) => (
                <motion.div 
                  key={index} 
                  className={`p-6 rounded-lg border-2 transition-all relative overflow-hidden ${
                    project.isReal 
                      ? `bg-dark-gray border-cyber/30 hover:border-cyber ${
                          isBugFixed('projects-real') ? 'ring-2 ring-neon' : ''
                        }` 
                      : `bg-dark-gray border-warning/50 hover:border-warning ${
                          isBugFixed('projects-fake') ? 'ring-2 ring-warning' : ''
                        }`
                  }`}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: "spring"
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: project.isReal 
                      ? "0 0 30px rgba(0, 255, 255, 0.2)" 
                      : "0 0 30px rgba(255, 128, 0, 0.2)"
                  }}
                >
                  {!project.isReal && isBugFixed('projects-fake') && (
                    <motion.div
                      className="absolute top-2 right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    </motion.div>
                  )}
                  
                  <h4 className="text-pink text-lg mb-3 font-semibold flex items-center gap-2">
                    <CorruptedText 
                      text={project.name}
                      bugId="projects-details"
                      isFixed={isBugFixed('projects-details')}
                    />
                    {!project.isReal && isBugFixed('projects-fake') && (
                      <span className="text-warning text-xs bg-warning/20 px-2 py-1 rounded">
                        SUSPICIOUS
                      </span>
                    )}
                  </h4>
                  
                  <div className="text-cyber text-sm mb-3 font-mono">{project.tech}</div>
                  
                  <p className="text-light-gray text-sm leading-relaxed">
                    {isBugFixed('projects-details') ? project.description : (
                      <CorruptedText 
                        text={project.description}
                        bugId="projects-details"
                        isFixed={false}
                      />
                    )}
                  </p>
                  
                  {!project.isReal && isBugFixed('projects-fake') && (
                    <motion.div 
                      className="mt-3 text-warning text-xs flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Bug className="w-3 h-3" />
                      This project seems too good to be true...
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Show available commands */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {getAvailableCommands().map((cmd, index) => (
            <KeyCombinationDisplay 
              key={index} 
              keys={cmd.keys} 
              isActive={false}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  // Enhanced contact section
  const ContactSection = () => (
    <div className="space-y-6">
      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TerminalHeader title="contact.cfg" />
        <div className="p-6">
          <h3 className="text-xl text-cyber mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Information
          </h3>
          
          <div className="space-y-4 mb-8">
            {[
              { icon: <Mail className="w-5 h-5 text-cyber" />, text: resumeData.personal.email },
              { icon: <Linkedin className="w-5 h-5 text-cyber" />, text: resumeData.personal.linkedin },
              { icon: <Github className="w-5 h-5 text-cyber" />, text: "GitHub: Coming soon..." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-dark-gray/50 hover:bg-dark-gray transition-all"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                {item.icon}
                {index < 2 ? (
                  <CorruptedText 
                    text={item.text}
                    bugId="contact-decrypt"
                    isFixed={isBugFixed('contact-decrypt')}
                  />
                ) : (
                  <span className="text-secondary">{item.text}</span>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="p-6 bg-dark-gray rounded-lg border border-cyber/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h4 className="text-pink mb-4 text-lg font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Debug Complete?
            </h4>
            <p className="text-secondary mb-4 leading-relaxed">
              If you've successfully debugged most of the issues using keyboard combinations, 
              you've learned about my real skills and projects. The fake ones were just red herrings!
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-neon font-mono">
                Bugs fixed: {totalBugs - bugCount} / {totalBugs}
              </div>
              <div className="w-32 h-2 bg-dark-gray rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-warning via-cyber to-neon rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((totalBugs - bugCount) / totalBugs) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            {bugCount === 0 && (
              <motion.div 
                className="mt-4 p-4 bg-gradient-to-r from-neon/20 to-cyber/20 border border-neon rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <div className="text-neon font-bold text-center flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🎉
                  </motion.div>
                  CONGRATULATIONS! All bugs fixed! Resume.exe is now running perfectly.
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🎉
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Show available commands */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {getAvailableCommands().map((cmd, index) => (
          <KeyCombinationDisplay 
            key={index} 
            keys={cmd.keys} 
            isActive={false}
          />
        ))}
      </motion.div>
    </div>
  );

  // Render current section
  const renderSection = () => {
    switch (currentSection) {
      case 'home': return <HomeSection />;
      case 'about': return <AboutSection />;
      case 'experience': return <ExperienceSection />;
      case 'projects': return <ProjectsSection />;
      case 'contact': return <ContactSection />;
      default: return <HomeSection />;
    }
  };

  if (!bootComplete) {
    return <BootSequence />;
  }

  return (
    <div className={`min-h-screen bg-deep-space text-light-gray font-sans relative overflow-x-hidden ${debugMode ? 'debug-mode' : ''}`}>
      <ParticleSystem />
      <MatrixBackground />
      <div className="scan-lines"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Navigation />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 10 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Debug Console */}
      <AnimatePresence>
        {showConsole && (
          <DebugConsole
            isOpen={showConsole}
            onClose={() => setShowConsole(false)}
            availableCommands={getAvailableCommands()}
            onCommandExecute={(bugId) => {
              setFixedBugs(prev => new Set([...prev, bugId]));
              setShowConsole(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;


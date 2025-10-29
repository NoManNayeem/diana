import { 
  FaMicrophone, 
  FaBrain, 
  FaCogs, 
  FaRocket, 
  FaShieldAlt, 
  FaComments,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaCheckCircle,
  FaPaperPlane,
  FaStop,
  FaRobot,
  FaUser,
  FaSpinner,
  FaVolumeUp,
  FaVolumeMute,
  FaBars,
  FaTimes,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCog,
  FaExpand,
  FaCompress,
  FaSearch,
  FaHistory,
  FaCog as FaSettings
} from "react-icons/fa";

// Centralized icon configuration
export const icons = {
  // Navigation
  menu: FaBars,
  close: FaTimes,
  
  // Brand & UI
  logo: FaMicrophone,
  arrowRight: FaArrowRight,
  play: FaPlay,
  star: FaStar,
  check: FaCheckCircle,
  
  // Chat & Communication
  microphone: FaMicrophone,
  stop: FaStop,
  robot: FaRobot,
  user: FaUser,
  paperPlane: FaPaperPlane,
  comments: FaComments,
  volumeUp: FaVolumeUp,
  volumeMute: FaVolumeMute,
  spinner: FaSpinner,
  
  // Features
  brain: FaBrain,
  cogs: FaCogs,
  rocket: FaRocket,
  shield: FaShieldAlt,
  
  // Sidebar & Actions
  plus: FaPlus,
  edit: FaEdit,
  trash: FaTrash,
  settings: FaSettings,
  
  // Fullscreen & UI
  expand: FaExpand,
  compress: FaCompress,
  search: FaSearch,
  history: FaHistory,
};

// Feature icons with colors
export const featureIcons = [
  {
    icon: FaMicrophone,
    title: "Voice Recognition",
    description: "Advanced STT with real-time voice activity detection",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: FaBrain,
    title: "Multi-Agent AI",
    description: "LLM agnostic with intelligent agent orchestration",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: FaCogs,
    title: "MCP Client",
    description: "Model Context Protocol with vast toolset integration",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: FaRocket,
    title: "Real-time Processing",
    description: "Lightning-fast responses with WebRTC technology",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    icon: FaShieldAlt,
    title: "Secure & Private",
    description: "Enterprise-grade security and privacy protection",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    icon: FaComments,
    title: "Natural Conversations",
    description: "Human-like interactions with context awareness",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  }
];

export default icons;

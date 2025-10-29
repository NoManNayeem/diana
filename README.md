# Diana - AI Voice Assistant

<div align="center">

![Diana Logo](https://img.shields.io/badge/Diana-AI%20Assistant-blue?style=for-the-badge&logo=robot&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**The future of AI conversation is here. Experience seamless voice interactions, multi-agent intelligence, and limitless possibilities with Diana.**

[🚀 Live Demo](https://nomanayeem.github.io/diana/) | [📖 Documentation](#-documentation) | [🤝 Contributing](#-contributing)

</div>

## 🌟 Features

- **🎤 Voice Recognition**: Advanced STT with real-time voice activity detection
- **🤖 Multi-Agent AI**: LLM agnostic with intelligent agent orchestration  
- **🔧 MCP Client**: Model Context Protocol with vast toolset integration
- **⚡ Real-time Processing**: Lightning-fast responses with WebRTC technology
- **🔒 Secure & Private**: Enterprise-grade security and privacy protection
- **💬 Natural Conversations**: Human-like interactions with context awareness

## 🏗️ Architecture

This is a **monorepo** containing three main components:

| Component | Technology | Purpose | Status |
|-----------|------------|---------|--------|
| **Backend** | FastAPI + Python | AI API & Voice Processing | 🚧 Development |
| **Frontend** | Next.js + React | Chat Interface & UI | 🚧 Development |
| **Landing** | HTML + Tailwind | Marketing & Branding | ✅ **Deployed** |

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ with npm
- **Python** 3.11+ (3.12+ recommended)
- **uv** (recommended) or pip for Python dependencies
- **Git** for version control

### 🎯 Landing Page (Currently Deployed)

The landing page is **automatically deployed** to GitHub Pages:

**🌐 Live Site**: [https://nomanayeem.github.io/diana/](https://nomanayeem.github.io/diana/)

- ✅ **Responsive Design**: Works on all devices
- ✅ **Dark/Light Theme**: System preference detection
- ✅ **Professional UI**: Modern, clean design
- ✅ **SEO Optimized**: Proper meta tags and structure

### 🔧 Backend Development

```bash
# Navigate to backend
cd Diana_Backend

# Install dependencies (choose one method)
uv sync                                    # Recommended: using uv
# OR
python -m venv .venv && source .venv/bin/activate && pip install fastapi uvicorn python-dotenv

# Run development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**API Endpoints:**
- `GET /` - Health message
- `GET /health` - Health check
- `POST /query` - Send user queries

**Backend will be available at**: `http://localhost:8000`

### 🎨 Frontend Development

```bash
# Navigate to frontend
cd diana_frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

**Frontend will be available at**: `http://localhost:3000`

### 🚀 Full Development Workflow

```bash
# Terminal 1: Backend
cd Diana_Backend
uvicorn main:app --reload --port 8000

# Terminal 2: Frontend  
cd diana_frontend
npm run dev

# Terminal 3: Landing (optional)
cd diana_landing
# Open index.html in browser for local testing
```

## 📁 Project Structure

```
Diana/
├── 📁 Diana_Backend/              # FastAPI Backend
│   ├── 📄 main.py                 # Main application
│   ├── 📄 pyproject.toml          # Python dependencies
│   └── 📄 .env                    # Environment variables
├── 📁 diana_frontend/             # Next.js Frontend
│   ├── 📁 src/
│   │   ├── 📁 app/                # App Router pages
│   │   ├── 📁 components/         # Reusable components
│   │   └── 📁 config/             # Configuration files
│   ├── 📄 package.json            # Node dependencies
│   └── 📄 tailwind.config.js      # Tailwind configuration
├── 📁 diana_landing/              # GitHub Pages Landing
│   ├── 📄 index.html              # Main landing page
│   ├── 📁 .github/workflows/      # GitHub Actions
│   └── 📄 README.md               # Landing page docs
├── 📁 .github/workflows/          # GitHub Actions
│   └── 📄 deploy-landing.yml      # Landing page deployment
├── 📄 .gitignore                  # Git ignore rules
└── 📄 README.md                   # This file
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **uv** - Ultra-fast Python package manager
- **python-dotenv** - Environment variable management
- **Uvicorn** - ASGI server for Python

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **next-themes** - Theme management
- **react-icons** - Icon library

### Landing Page
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling via CDN
- **Vanilla JavaScript** - No framework dependencies
- **GitHub Pages** - Static site hosting

## 🎨 Design Philosophy

Diana's UI/UX is inspired by modern AI chat interfaces, incorporating design patterns from:

- **ChatGPT**: Clean, conversation-focused design with sidebar navigation
- **Claude**: Professional typography and spacing
- **Grok**: Modern gradients and animations  
- **DeepSeek**: Clean feature presentation

### Key Design Principles

- **Professional Color Palette**: Blue-based primary colors with proper contrast
- **Consistent Spacing**: 8px grid system throughout
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Subtle Animations**: Professional micro-interactions
- **Mobile-First**: Responsive design for all devices

## 🔧 Development

### Environment Variables

**Backend** (Diana_Backend/.env):
```env
# Add your environment variables here
API_KEY=your_api_key_here
DEBUG=True
```

**Frontend** (diana_frontend/.env.local):
```env
# Next.js environment variables
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Code Quality

- **Backend**: Add pytest and test files under `Diana_Backend/tests/`
- **Frontend**: Add jest/react-testing-library config
- **Linting**: ESLint and Prettier for frontend, flake8 for backend
- **Formatting**: Consistent code style across all components

## 🚀 Deployment

### Landing Page (Current)
- ✅ **Automatically deployed** via GitHub Actions
- ✅ **Live at**: [https://nomanayeem.github.io/diana/](https://nomanayeem.github.io/diana/)
- ✅ **Triggers**: Push to main branch (landing page changes only)

### Backend (Future)
- **Docker**: Containerize with multi-stage builds
- **Cloud**: Deploy to AWS, GCP, Azure, or Railway
- **Example Dockerfile**:
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY Diana_Backend/ .
RUN pip install fastapi uvicorn python-dotenv
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend (Future)
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative static hosting
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and descriptive

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern AI chat interfaces (ChatGPT, Claude, Grok, DeepSeek)
- Built with modern web technologies
- Designed for professional use cases
- Community-driven development

## 📞 Contact & Links

- **👤 GitHub**: [@NoManNayeem](https://github.com/NoManNayeem)
- **📦 Repository**: [diana](https://github.com/NoManNayeem/diana)
- **🌐 Landing Page**: [https://nomanayeem.github.io/diana/](https://nomanayeem.github.io/diana/)
- **📧 Issues**: [GitHub Issues](https://github.com/NoManNayeem/diana/issues)

---

<div align="center">

**Diana** - The future of AI conversation is here. 🚀

*Built with ❤️ for the AI community*

</div>
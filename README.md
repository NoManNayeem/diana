Diana Monorepo

Overview
- Backend: FastAPI service in Diana_Backend
- Frontend (App): Next.js app in diana_frontend
- Landing + Deploy: Static landing page in diana_landing with GitHub Pages workflow

Repository Structure
- Diana_Backend/: FastAPI backend (uvicorn)
- diana_frontend/: Next.js (App Router, Tailwind)
- diana_landing/: Static site and .github/workflows/deploy.yml for GitHub Pages

Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (project declares >=3.14; use latest available locally)
- uv or pip for Python deps

Backend: Development
1) cd Diana_Backend
2) Install deps (choose one):
   - uv sync
   - or: python -m venv .venv && source .venv/bin/activate && pip install -r <generated from pyproject> (pip-tools/pip not included)
   - or: pip install fastapi uvicorn python-dotenv
3) Run dev server:
   - uvicorn main:app --reload --host 0.0.0.0 --port 8000
4) Endpoints:
   - GET / -> health message
   - GET /health -> health check
   - POST /query {"user_query": "..."}
5) CORS is configured for http://localhost:3000 by default. Adjust in main.py if needed.

Frontend (Next.js): Development
1) cd diana_frontend
2) npm install
3) npm run dev (defaults to http://localhost:3000)
4) Update environment config (if needed) to point to Backend at http://localhost:8000

Landing + GitHub Pages
- Location: diana_landing
- Static index.html lives here
- Deployment workflow: diana_landing/.github/workflows/deploy.yml
- On push to main, the workflow uploads the directory as artifact to GitHub Pages

Local Monorepo Dev Workflow
- Terminal A: backend -> uvicorn main:app --reload --port 8000
- Terminal B: frontend -> npm run dev (port 3000)
- Visit http://localhost:3000 and ensure API calls target http://localhost:8000

Environment Variables
- Backend reads .env (dotenv). Create Diana_Backend/.env for secrets.
- Frontend can use .env.local (.env.*) per Next.js conventions.

Testing
- Backend: add pytest and test files under Diana_Backend/tests (not yet present)
- Frontend: add jest/react-testing-library config (not yet present)

Build & Production
- Backend: containerize via Docker or run uvicorn/gunicorn. Example Dockerfile (to be added):
  FROM python:3.12-slim
  WORKDIR /app
  COPY Diana_Backend/pyproject.toml .
  RUN pip install fastapi uvicorn python-dotenv
  COPY Diana_Backend/ .
  EXPOSE 8000
  CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
- Frontend: npm run build && npm start (or host on Vercel)

Contributing
- Create feature branches from main
- Run formatters/linters where applicable
- Keep READMEs in subfolders updated if interfaces change

License
- Specify a license for this repository (not set yet)

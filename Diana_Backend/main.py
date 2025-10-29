from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Diana Backend API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    user_query: str

@app.get("/")
async def root():
    return {"message": "Welcome to Diana Backend API", "status": "running"}

@app.post("/query")
async def get_response(query: Query):
    """
    Endpoint to receive user queries and return AI responses.
    Currently returns mock responses, will be replaced with actual AI agent later.
    """
    # Mock AI response - will be replaced with actual AI agent
    response = f"AI Response: I received your query '{query.user_query}'. This is a mock response from Diana. The AI agent will be integrated here soon!"
    
    return {
        "response": response,
        "query": query.user_query,
        "status": "success"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "diana-backend"}
# backend/app/main.py

from dotenv import load_dotenv
import os
from pathlib import Path

# DEBUG: print cwd and whether .env file is found
print("📂 Working directory:", Path.cwd())
print("🔎 .env exists?", (Path.cwd() / ".env").exists())

# Load the .env file from backend/
load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

# DEBUG: print both keys
print("🔑 OpenAI API key loaded:", os.getenv("OPENAI_API_KEY"))
print("🔑 HF API token loaded:", os.getenv("HF_API_TOKEN"))

from fastapi import FastAPI
from .routes import router

app = FastAPI(title="PR Automation API", version="0.1.0")
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    # Note port 8001 here to match our CLI
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)

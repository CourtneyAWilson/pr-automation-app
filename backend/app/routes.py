from typing import List
from fastapi import APIRouter, Query, HTTPException
from .models import Health, Mention, Release
import os
from huggingface_hub import InferenceClient

router = APIRouter()

@router.get("/health", response_model=Health)
def health_check():
    return Health(status="ok")

@router.get("/mentions/latest", response_model=List[Mention])
def get_latest_mentions(client: str = Query(...)):
    return [
        Mention(id=1, client=client, text="Sample mention", source="News Site"),
        Mention(id=2, client=client, text="Another mention", source="Blog"),
    ]

# Load token and model from .env
HF_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL = os.getenv("HF_MODEL", "gpt2")

if not HF_TOKEN:
    raise RuntimeError("HF_API_TOKEN is not set. Please set it in your .env file.")

hf = InferenceClient(token=HF_TOKEN)

@router.post("/generate-release", response_model=Release)
def generate_release(
    client: str = Query(...),
    title: str = Query(...)
):
    prompt = f"Write a press release for {client} titled '{title}':\n\n"
    try:
        # text_generation() returns a plain string, not an object
        generated = hf.text_generation(
            model=HF_MODEL,
            prompt=prompt,
            max_new_tokens=150,
            temperature=0.7
        )

        # Safe decode to avoid encoding issues with special characters
        safe_text = generated.encode("latin-1", errors="replace").decode("latin-1")

    except Exception as e:
        raise HTTPException(status_code=502, detail=f"HuggingFace error: {e}")

    return Release(client=client, title=title, body=safe_text)

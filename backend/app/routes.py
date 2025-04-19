from typing import List
import os

from fastapi import APIRouter, Query, HTTPException
from huggingface_hub import InferenceClient
from .models import Health, Mention, Release

router = APIRouter()

# Initialise HF client (main.py already loaded .env)
hf_token = os.getenv("HF_API_TOKEN")
if not hf_token:
    raise RuntimeError("HF_API_TOKEN not set in environment")
hf = InferenceClient(token=hf_token)

@router.get("/health", response_model=Health)
def health_check():
    return Health(status="ok")

@router.get("/mentions/latest", response_model=List[Mention])
def get_latest_mentions(client: str = Query(...)):
    return [
        Mention(id=1, client=client, text="Sample mention", source="News Site"),
        Mention(id=2, client=client, text="Another mention", source="Blog"),
    ]

@router.post("/generate-release", response_model=Release)
def generate_release(
    client: str = Query(..., description="Client identifier"),
    title:  str = Query(..., description="Press release title"),
):
    prompt = (
        f"Write a professional press release for {client} announcing '{title}'.\n\n"
        "Press Release:\n"
    )

    try:
        # Larger model + more tokens
        response = hf.text_generation(
            prompt,                                  # first arg = the prompt
            model="EleutherAI/gpt-j-6B",            # bigger model
            max_new_tokens=500,                     # increase generation length
            temperature=0.7,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"HuggingFace error: {e}")

    # HF returns List[str]
    generated = response[0]
    # Strip off the prompt header
    if "Press Release:" in generated:
        body = generated.split("Press Release:")[-1].strip()
    else:
        body = generated.strip()

    return Release(client=client, title=title, body=body)



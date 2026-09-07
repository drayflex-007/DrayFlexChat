from fastapi import FastAPI
from pydantic import BaseModel

from ai_engine import get_ai_response


app = FastAPI(
    title="DrayFlexChat",
    description="DrayFlexChat - Multimodal AI Assistant",
    version="0.1.0"
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "name": "DrayFlexChat",
        "status": "online",
        "message": "Welcome to DrayFlexChat"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    reply = get_ai_response(request.message)

    return {
        "assistant": "DrayFlexChat",
        "message": request.message,
        "reply": reply
    }

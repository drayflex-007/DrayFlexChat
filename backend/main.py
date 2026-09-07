from fastapi import FastAPI
from pydantic import BaseModel

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
    return {
        "assistant": "DrayFlexChat",
        "message": request.message,
        "reply": "DrayFlexChat is ready. AI integration is the next step."
    }

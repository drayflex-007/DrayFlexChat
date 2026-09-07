import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def get_ai_response(message: str) -> str:
    response = client.responses.create(
        model="gpt-5.6-luna",
        input=message
    )

    return response.output_text

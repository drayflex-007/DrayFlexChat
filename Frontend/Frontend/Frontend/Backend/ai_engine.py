from openai import OpenAI

from config import OPENAI_API_KEY


client = OpenAI(
    api_key=OPENAI_API_KEY
)


def get_ai_response(message: str) -> str:
    response = client.responses.create(
        model="gpt-5.6-luna",
        input=message
    )

    return response.output_text

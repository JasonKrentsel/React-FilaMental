from together import Together
from dotenv import load_dotenv
import os

load_dotenv()

client = Together(api_key=os.getenv("together_api_key"))

def basic_inference(message):
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": message}],
    )
    return response.choices[0].message.content

from together import Together

client = Together(api_key="")

stream = client.chat.completions.create(
  model="meta-llama/Llama-3-8b-chat-hf",
  messages=[{"role": "user", "content": "What are some fun things to do in New York?"}],
)
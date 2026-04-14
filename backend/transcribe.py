import whisper
import sys

model = whisper.load_model("base")

file_path = sys.argv[1]

result = model.transcribe(file_path)

print(result["text"])
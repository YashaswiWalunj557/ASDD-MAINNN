from flask import Flask

app = Flask(__name__)

@app.get("/")
def home():
    return "Hello from Python!", 200

@app.get("/health")
def health():
    return {"status": "ok"}, 200

if __name__ == "__main__":
    # Listen on all interfaces so Docker/Kubernetes can reach the app.
    app.run(host="0.0.0.0", port=30001)

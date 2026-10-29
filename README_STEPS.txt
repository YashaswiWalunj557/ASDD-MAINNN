HELLO PYTHON - FLASK + DOCKER + KUBERNETES PROJECT
==================================================

FILES
-----
main.py          Flask web app. The home page returns "Hello from Python!".
requirements.txt Python packages needed by the app (Flask).
Dockerfile       Instructions for building the Docker image.
pod.yaml         Kubernetes Pod configuration.
hello-svc.yaml   Kubernetes NodePort Service configuration.

A. RUN DIRECTLY IN VS CODE (without Docker)
-------------------------------------------
1. Install Python 3.12 or newer from https://www.python.org/downloads/ .
   On Windows, tick "Add Python to PATH" during installation.
2. Open this project folder in VS Code: File > Open Folder.
3. Open Terminal > New Terminal.
4. Check Python is installed:
       python --version
   If that command does not work, try:
       py --version
5. Create a virtual environment:
       python -m venv .venv
   If needed on Windows, use:
       py -m venv .venv
6. Activate it in PowerShell:
       .\.venv\Scripts\Activate.ps1
   If PowerShell blocks activation, open Command Prompt terminal and use:
       .venv\Scripts\activate.bat
   You can also continue without activating by running .venv\Scripts\python.exe.
7. Install requirements:
       python -m pip install -r requirements.txt
8. Start the app:
       python main.py
9. Open in browser:
       http://127.0.0.1:30001
   Expected page text: Hello from Python!
10. Health check:
       http://127.0.0.1:30001/health
11. Stop the app by pressing Ctrl+C in the terminal.

B. RUN WITH DOCKER
------------------
1. Install and start Docker Desktop: https://www.docker.com/products/docker-desktop/
2. In VS Code terminal, make sure the terminal is in this project folder.
3. Build the image:
       docker build -t helloapp:1.0 .
4. Start a container:
       docker run --name helloapp-container -p 30001:30001 helloapp:1.0
5. Open http://localhost:30001 . Expected: Hello from Python!
6. Stop the container with Ctrl+C, then in another terminal run:
       docker rm -f helloapp-container

C. RUN WITH KUBERNETES (optional; requires Kubernetes enabled and kubectl working)
---------------------------------------------------------------------------------
IMPORTANT: This Pod uses the local Docker image helloapp:1.0. With Docker Desktop's
built-in Kubernetes, make sure Kubernetes can access that image. If the Pod reports
ImagePullBackOff, check the image name and imagePullPolicy and rebuild the image.

1. Start Docker Desktop and enable Kubernetes in Settings > Kubernetes, if available.
2. Check Kubernetes:
       kubectl get nodes
   Wait until the node status is Ready.
3. Build the image locally:
       docker build -t helloapp:1.0 .
4. Apply the Pod and Service:
       kubectl apply -f pod.yaml
       kubectl apply -f hello-svc.yaml
5. Check status:
       kubectl get pods
       kubectl get services
6. Wait for hello-pod to show Running, then open:
       http://localhost:30001
7. Troubleshooting:
       kubectl describe pod hello-pod
       kubectl logs hello-pod
8. Clean up Kubernetes resources:
       kubectl delete -f hello-svc.yaml
       kubectl delete -f pod.yaml

D. COMMON ISSUES
----------------
- Port 30001 already in use: stop the other program using that port, or change the
  app port and matching Docker/Kubernetes port settings consistently.
- 'python' is not recognized: reinstall Python and select Add Python to PATH, or
  use the Windows 'py' launcher.
- 'docker' is not recognized: install/start Docker Desktop and reopen the terminal.
- 'kubectl' is not recognized: install/configure kubectl or use Docker Desktop's
  Kubernetes setup. Kubernetes is not required for the direct Flask or Docker run.

NOTE ABOUT requirements.txt
---------------------------
requirements.txt should contain Python package names only. Run instructions belong
in this README_STEPS.txt file; do not put commands in requirements.txt.

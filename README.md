# Experiment 7: Deploy and Manage Containers Using Kubernetes

This beginner-friendly project is the Kubernetes version of the Node.js + PostgreSQL + Nginx setup shown in the lab PDF output pages. The shown PDF pages use Docker Compose; these files use Kubernetes manifests instead.

## Project contents
- `app/` — small Node.js HTTP backend on port 3000
- `Dockerfile` — builds the Node.js container image
- `k8s/` — Kubernetes Deployment and Service files for the app, PostgreSQL, and Nginx
- `commands-powershell.txt` — Windows PowerShell commands in order

## Requirements
1. Docker Desktop installed and running.
2. Kubernetes enabled in Docker Desktop (Settings → Kubernetes → Enable Kubernetes; the exact menu may vary by version).
3. `kubectl` available in PowerShell. Docker Desktop normally provides it.
4. Visual Studio Code (VS Code).

## Run in VS Code on Windows
1. Extract the ZIP file.
2. Open VS Code → **File → Open Folder** → choose `Kubernetes_Container_Deployment_Experiment7`.
3. Open a PowerShell terminal in VS Code (**Terminal → New Terminal**).
4. Check tools:
   ```powershell
   docker --version
   kubectl version --client
   kubectl cluster-info
   ```
   If `kubectl cluster-info` fails, start Docker Desktop and enable Kubernetes first.
5. Build the app image:
   ```powershell
   docker build -t k8s-node-app:1.0 .
   ```
   Docker Desktop Kubernetes can use this locally built image.
6. Apply Kubernetes resources:
   ```powershell
   kubectl apply -f k8s/
   ```
7. Check the deployments and pods:
   ```powershell
   kubectl get deployments
   kubectl get pods
   kubectl get services
   ```
   Wait until the app, database, and web pods show `Running` (PostgreSQL can take a little longer).
8. Open the app:
   - Backend: `http://localhost:30000`
   - Nginx: `http://localhost:30080`
9. Check backend logs:
   ```powershell
   kubectl logs deployment/node-app
   ```
10. Demonstrate managing containers:
   ```powershell
   kubectl scale deployment/node-app --replicas=2
   kubectl get pods
   kubectl scale deployment/node-app --replicas=1
   kubectl describe deployment node-app
   ```
11. Clean up after the experiment:
   ```powershell
   kubectl delete -f k8s/
   ```

## Expected output
- `kubectl get deployments` lists `node-app`, `postgres`, and `nginx-web`.
- `kubectl get pods` shows pods in `Running` state after startup.
- Visiting `http://localhost:30000` displays: `Node.js backend is running`.
- Visiting `http://localhost:30080` displays the default Nginx welcome page.
- Scaling `node-app` to 2 creates two app pods; scaling back to 1 removes the extra pod.

## Important notes
- The PostgreSQL container is deployed separately to demonstrate managing a database container. This sample Node.js app does not connect to the database.
- The PostgreSQL password in `k8s/postgres-secret.yaml` is a lab/demo password only. Do not use it for real projects.
- This is for a local lab. For production, use stronger secrets, persistent storage, resource limits, health probes, and a proper ingress/TLS setup.

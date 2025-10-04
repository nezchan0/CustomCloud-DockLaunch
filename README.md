# 🚀 CustomCloud: DockLaunch

**CustomCloud: DockLaunch** is a platform that allows you to instantly deploy any GitHub repository containing a `Dockerfile`.  
No configuration is required — just provide a repository link, and your application goes live with a public URL via **Ngrok** in seconds.

---

## ✨ Features

- **Deploy from GitHub Repository**  
  Instantly deploy any public GitHub repository with a valid `Dockerfile` in the root directory.

- **Zero Configuration**  
  No need to manually configure Docker or environment settings.

- **Instant Public URL**  
  Each deployment gets a secure public URL through **Ngrok**.

- **Secure Isolation**  
  Every deployment runs in its own isolated Docker container.

- **Container Management**  
  Automated container creation and cleanup.

- **Resource Control**  
  Manage and scale your application resources easily.

- **Rapid Setup**  
  Go from repository to live app in under **60 seconds**.

---

## 💻 Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | React |
| **Backend** | Django & Django REST Framework |
| **Containerization** | Docker |
| **URL Exposure** | Ngrok |
| **Git Integration** | GitPython |
| **Others** | Requests, python-dotenv |

---

## ⚙️ How It Works

1. **User Input:**  
   The user provides a **public GitHub repository URL** that contains a `Dockerfile`.

2. **Backend Process:**  
   - Clone the repository locally  
   - Build a Docker image from the repository  
   - Run a Docker container  
   - Expose the container via Ngrok and generate a public URL  

3. **User Access:**  
   The user receives a **live URL** to access their deployed application.

> **Note:** The repository must have a valid `Dockerfile` in the root directory for deployment.

---

## 🧩 Installation

### 🖥 Backend Setup

```bash
# 1. Clone this repository
git clone https://github.com/username/CustomCloud-DockLaunch.git
cd CustomCloud-DockLaunch/Backend_DockLaunch

# 2. Create a virtual environment and activate it
python3 -m venv myenv
source myenv/bin/activate     # Linux/macOS
myenv\Scripts\activate        # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run Django server
python manage.py runserver

# 5. Ensure Docker is running and Ngrok is installed

```

### 🌐 Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd CustomCloud-DockLaunch/Frontend_DockLaunch/project

# 2. Install dependencies
npm install

# 3. Start the React development server
npm run dev

# 4. Open the app in your browser
# Default URL: http://localhost:3000

# 5. Ensure the backend server is running before deploying repositories

```
## 📦 Usage

- Open the frontend app in your browser.
- Enter a GitHub repository URL containing a Dockerfile.
- Click Deploy.
- Wait a few seconds for deployment.
- Access your live app via the Ngrok URL provided.

---

## 🔧 Backend Deployment Code Overview

The backend handles the deployment process using `DeploymentManager`:

- Clone repository: `clone_repository(repo_url)`
- Build Docker image: `build_docker_image(path, tag)`
- Run container: `run_docker_container(tag)`
- Expose via Ngrok: `start_ngrok(port)`
- Cleanup resources: `stop_deployment(container_id, repo_url)`

All operations include error handling and logging to ensure smooth deployments.

---

## 📌 Important Notes

- **Dockerfile Requirement:** Repositories must have a valid Dockerfile in the root directory.
- **Docker Permissions:** Ensure your user has permission to run Docker commands.
- **Ngrok:** Make sure Ngrok is installed and accessible from the backend server.
- **Port Conflicts:** The backend currently exposes containers on port 8080. Ensure no conflict on this port.
- **Repository Size:** Large repositories may take longer to clone and build.

---


## 🛠 Future Improvements

- Multi-container deployment support.
- User authentication and deployment history.
- Custom port allocation for multiple deployments.
- Persistent storage for deployed applications.
- UI improvements and deployment status notifications.

---

## 👤 Author

Alok Maurya – Developer | Email: [alok05.maurya@gmail.com](alok05.maurya@gmail.com)

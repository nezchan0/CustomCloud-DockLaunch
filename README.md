# Custom Cloud Deployer

A full-stack web application that allows users to deploy public GitHub repositories with Dockerfile support onto local Docker containers and expose them via Ngrok.

## Prerequisites

- Python 3.8+
- Node.js 14+
- Docker
- Ngrok
- Git

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at http://localhost:8000

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Enter a GitHub repository URL that contains a Dockerfile
3. Click "Deploy" to start the deployment process
4. Once deployed, you'll see the Ngrok URL and container ID
5. Use the "Stop Deployment" button to clean up resources

## Troubleshooting

### Common Issues

1. **Ngrok not starting**
   - Ensure Ngrok is installed and in your PATH
   - Check if port 8080 is available
   - Run `./scripts/kill_ngrok.sh` to clean up any existing Ngrok processes

2. **Docker build errors**
   - Verify the repository has a valid Dockerfile
   - Check Docker daemon is running
   - Ensure you have sufficient disk space

3. **CORS errors**
   - Verify the backend is running on port 8000
   - Check that CORS middleware is properly configured

4. **Repository cloning issues**
   - Ensure the repository is public
   - Check your internet connection
   - Verify Git is installed and configured

## API Endpoints

- `POST /api/deploy/`
  - Body: `{ "repo_url": "https://github.com/username/repo.git" }`
  - Returns: `{ "container_id": "...", "ngrok_url": "...", "repo_url": "..." }`

- `POST /api/stop/`
  - Body: `{ "container_id": "..." }` or `{ "repo_url": "..." }`
  - Returns: `{ "message": "Deployment stopped successfully" }`

## Security Notes

- This application is intended for development purposes only
- Do not expose the backend API to the public internet
- Keep your Ngrok authtoken secure
- Regularly clean up unused Docker containers and images 




npm run dev -- --host --port=3000
ip a   # Linux
ipconfig   # Windows

sudo ufw status
If it says inactive, your firewall isn’t blocking anything.

sudo ufw allow 3000


Verify the port is allowed
sudo ufw status numbered
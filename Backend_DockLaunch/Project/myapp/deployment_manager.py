import os
import subprocess
import requests
import git
import docker
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class DeploymentManager:
    def __init__(self):
        self.base_path = os.path.expanduser('~/deployed_repos')
        try:
            self.docker_client = docker.from_env()
            # Test the connection
            self.docker_client.ping()
        except docker.errors.APIError as e:
            logger.error(f"Docker API Error: {str(e)}")
            raise Exception("Could not connect to Docker daemon. Please ensure Docker is running and you have the necessary permissions.")
        except Exception as e:
            logger.error(f"Error initializing Docker client: {str(e)}")
            raise Exception("Could not initialize Docker client. Please ensure Docker is installed and running.")
        self.ngrok_process = None

    def clone_repository(self, repo_url):
        """Clone the repository to the base folder."""
        try:
            repo_name = repo_url.split('/')[-1].replace('.git', '')
            repo_path = os.path.join(self.base_path, repo_name)
            
            if not os.path.exists(self.base_path):
                os.makedirs(self.base_path)
            
            if os.path.exists(repo_path):
                logger.info(f"Repository already exists at {repo_path}")
                return repo_path
            
            git.Repo.clone_from(repo_url, repo_path)
            logger.info(f"Successfully cloned repository to {repo_path}")
            return repo_path
        except Exception as e:
            logger.error(f"Error cloning repository: {str(e)}")
            raise

    def build_docker_image(self, path, tag):
        """Build Docker image from the repository."""
        try:
            if not os.path.exists(os.path.join(path, 'Dockerfile')):
                raise FileNotFoundError("Dockerfile not found in repository")
            
            try:
                image, _ = self.docker_client.images.build(
                    path=path,
                    tag=tag,
                    rm=True
                )
                logger.info(f"Successfully built Docker image: {tag}")
                return image
            except docker.errors.APIError as e:
                logger.error(f"Docker API Error during build: {str(e)}")
                raise Exception("Failed to build Docker image. Please check Docker permissions and ensure Docker daemon is running.")
        except Exception as e:
            logger.error(f"Error building Docker image: {str(e)}")
            raise

    def run_docker_container(self, tag):
        """Run Docker container from the image."""
        try:
            try:
                container = self.docker_client.containers.run(
                    tag,
                    detach=True,
                    ports={'8080/tcp': 8080}
                )
                logger.info(f"Successfully started container: {container.id}")
                return container.id
            except docker.errors.APIError as e:
                logger.error(f"Docker API Error during container run: {str(e)}")
                raise Exception("Failed to run Docker container. Please check Docker permissions and ensure Docker daemon is running.")
        except Exception as e:
            logger.error(f"Error running Docker container: {str(e)}")
            raise

    def start_ngrok(self, port=8080):
        """Start Ngrok and get the public URL."""
        try:
            # Start ngrok process
            self.ngrok_process = subprocess.Popen(
                ['ngrok', 'http', str(port)],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            # Wait for ngrok to start
            import time
            time.sleep(2)
            
            # Get the public URL
            response = requests.get('http://localhost:4040/api/tunnels')
            tunnels = response.json()['tunnels']
            public_url = next(tunnel['public_url'] for tunnel in tunnels if tunnel['proto'] == 'https')
            
            logger.info(f"Successfully started ngrok with URL: {public_url}")
            return public_url
        except Exception as e:
            logger.error(f"Error starting ngrok: {str(e)}")
            raise

    def deploy_repository(self, repo_url):
        """Deploy the repository and return container_id and ngrok_url."""
        try:
            # Clone repository
            repo_path = self.clone_repository(repo_url)
            
            # Build Docker image
            tag = f"deploy-{repo_url.split('/')[-1].replace('.git', '')}"
            self.build_docker_image(repo_path, tag)
            
            # Run container
            container_id = self.run_docker_container(tag)
            
            # Start ngrok
            ngrok_url = self.start_ngrok()
            
            return {
                'container_id': container_id,
                'ngrok_url': ngrok_url,
                'repo_url': repo_url
            }
        except Exception as e:
            logger.error(f"Error deploying repository: {str(e)}")
            raise

    def stop_deployment(self, container_id=None, repo_url=None):
        """Stop the deployment and clean up resources."""
        try:
            if container_id:
                try:
                    container = self.docker_client.containers.get(container_id)
                    image = container.image  # Save reference before removing container

                    container.stop()
                    container.remove()

                    # Now remove the image with force=True to handle dangling references
                    self.docker_client.images.remove(image.id, force=True)

                except docker.errors.APIError as e:
                    logger.error(f"Docker API Error during cleanup: {str(e)}")
                    raise Exception("Failed to clean up Docker resources. Please check Docker permissions.")

                # Clean up repository
                if repo_url:
                    repo_name = repo_url.split('/')[-1].replace('.git', '')
                    repo_path = os.path.join(self.base_path, repo_name)
                    if os.path.exists(repo_path):
                        import shutil
                        shutil.rmtree(repo_path)

            # Stop ngrok process
            if self.ngrok_process:
                self.ngrok_process.terminate()
                self.ngrok_process = None

            logger.info(f"Successfully stopped deployment for container: {container_id}")
            return True
        except Exception as e:
            logger.error(f"Error stopping deployment: {str(e)}")
            raise

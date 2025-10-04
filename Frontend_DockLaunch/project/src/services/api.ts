const API_BASE_URL = 'http://127.0.0.1:8000/api/';

interface DeployResponse {
  container_id: string;
  ngrok_url: string;
}

interface StopDeploymentResponse {
  message: string;
}

export const deploymentService = {
  // Deploy a repository
  deployRepository: async (repoUrl: string): Promise<DeployResponse> => {
    const response = await fetch(`${API_BASE_URL}deploy/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo_url: repoUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to deploy repository');
    }

    const data = await response.json();
    if (!data.container_id || !data.ngrok_url) {
      throw new Error('Invalid response from deploy API');
    }

    return data;
  },

  // Stop a deployment
  stopDeployment: async (containerId: string): Promise<StopDeploymentResponse> => {
    const response = await fetch(`${API_BASE_URL}stop/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ container_id: containerId }),
    });

    if (!response.ok) {
      throw new Error('Failed to stop deployment');
    }

    const data = await response.json();
    if (!data.message) {
      throw new Error('Invalid response from stop API');
    }

    return data;
  },

  // Get deployment status
  getDeploymentStatus: async (containerId: string): Promise<DeployResponse> => {
    const response = await fetch(`${API_BASE_URL}status/${containerId}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to get deployment status');
    }

    const data = await response.json();
    if (!data.container_id || !data.ngrok_url) {
      throw new Error('Invalid response from status API');
    }

    return data;
  },
};

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Validate GitHub repository URL
export function isValidGitHubUrl(url: string): boolean {
  const githubUrlPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?$/;
  return githubUrlPattern.test(url);
}

// Format container ID for display (takes first 8 characters)
export function formatContainerId(id: string): string {
  return id.substring(0, 8);
}

// Simulate API calls with promises and delays
export async function mockApiCall<T>(data: T, delay = 1500, shouldSucceed = true): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(data);
      } else {
        reject(new Error("API request failed"));
      }
    }, delay);
  });
}
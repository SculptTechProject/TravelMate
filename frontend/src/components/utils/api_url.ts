const API_URL: string = import.meta.env.VITE_API_URL || ''

/**
 * Prepends the base API URL to a given endpoint path.
 * Ensures the path starts with a slash.
 * @param path - The API endpoint path (e.g., '/auth/login/')
 * @returns The full URL (e.g., 'http://127.0.0.1:8000/auth/login/')
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${API_URL}${normalized}`
}

export default API_URL
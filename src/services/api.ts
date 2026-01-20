import { SearchResponse } from "../types";

export const youtubeService = {
  search: async (query: string, pageToken?: string): Promise<SearchResponse> => {
    const params = new URLSearchParams({ q: query });
    if (pageToken) {
      params.append("pageToken", pageToken);
    }

    // Calls the serverless function in the /api folder
    const response = await fetch(`/api/search?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
};

export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface YouTubeSnippet {
  title: string;
  description?: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
  };
  channelTitle?: string;
}

export interface YouTubeResult {
  id: {
    kind?: string;
    videoId: string;
  };
  snippet: YouTubeSnippet;
}

export interface SearchResponse {
  items: YouTubeResult[];
  nextPageToken?: string;
}

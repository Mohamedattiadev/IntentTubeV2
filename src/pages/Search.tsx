import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { youtubeService } from "../services/api";
import type { YouTubeResult } from "../types";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<YouTubeResult[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await youtubeService.search(query);
      setResults(data.items || []);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      setError("Search failed. Check your API Key in Vercel settings.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageToken || loading) return;
    setLoading(true);
    try {
      const data = await youtubeService.search(query, nextPageToken);
      setResults((prev) => [...prev, ...(data.items || [])]);
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>YouTube Intent Search</h1>
      
      <div className="search-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button onClick={search} disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {results.map((video) => (
          <div 
            key={video.id.videoId} 
            className="card"
            onClick={() => navigate(`/watch/${video.id.videoId}`)} 
          >
            {video.snippet.thumbnails.medium && (
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            )}
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>

      {nextPageToken && (
        <button className="load-more" onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}

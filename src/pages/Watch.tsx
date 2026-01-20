import { useParams, useNavigate } from "react-router-dom";

export default function Watch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <div>Video not found</div>;

  return (
    <div className="container watch-container">
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back to Search
      </button>

      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${id}?rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// Komponent NoteSkeleton.jsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const NoteSkeleton = () => (
  <article className="dashboard-note-card">
    <h2 className="dashboard-note-title">
      <Skeleton width="60%" />
    </h2>
    <p className="dashboard-note-preview">
      <Skeleton count={3} />
    </p>
    <footer className="dashboard-note-footer">
      <Skeleton width={80} />
      <div className="dashboard-note-actions">
        <Skeleton width={40} inline style={{ marginRight: "10px" }} />
        <Skeleton width={40} inline />
      </div>
    </footer>
  </article>
);

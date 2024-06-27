import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="homepage">
      <Link to="posts">
        <p>
          <strong>All Posts</strong>
        </p>
      </Link>
      <Link to="posts/create">
        <p>
          <strong>Create Post</strong>
        </p>
      </Link>
    </div>
  );
}

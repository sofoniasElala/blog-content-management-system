import { useEffect, useState } from "react";
import { getAllPosts, capitalizeName } from "../utils";
import { DateTime } from "luxon";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const postsArray = await getAllPosts();
      setPosts(postsArray);
    }
    getPosts();
  }, []);

  if (posts.length <= 0) return <p>NO POSTS</p>;
  else
    return (
      <>
        {" "}
        <article className="posts-container">
          {" "}
          <h1>All Posts</h1>
          {posts.map((post) => {
            return (
              <article key={post._id}>
                <h2>{post.title}</h2>
                <h5>by {capitalizeName(post.authorName)}</h5>
                <h6>{DateTime.fromISO(post.date).toFormat('MMMM dd, yyyy')}</h6>
              </article>
            );
          })}{" "}
        </article>{" "}
      </>
    );
}

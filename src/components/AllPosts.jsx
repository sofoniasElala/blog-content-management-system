import { useEffect, useState, useRef } from "react";
import { getAllPosts, capitalizeName } from "../utils";
import { DateTime } from "luxon";
import { useNavigate, Link } from "react-router-dom";
import DialogBox from "./DialogBox";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const dialogRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    async function getPosts() {
      const postsArray = await getAllPosts();
      setPosts(postsArray);
    }
    getPosts();
  }, []);

  function handleArticleEditClick(postId) {
    navigate(`${postId}/edit`);
  }

  function handleModal(open, postId = null, postDeleted = false) {
    if (open) dialogRef.current.close();
    else dialogRef.current.showModal();

    if (postDeleted) {
      const filterPosts = posts.filter((post) => post._id !== postId);
      setPosts(filterPosts);
    }
  }

  if (posts.length <= 0) return <p>NO POSTS</p>;
  else
    return (
      <>
        <aside>
          <Link to="create">
            <p>
              <strong>Create Post</strong>
            </p>
          </Link>
        </aside>{" "}
        <article className="posts-container">
          {" "}
          <h2>All Posts</h2>
          {posts.map((post) => {
            const formattedDate = DateTime.fromISO(post.date).toFormat(
              "MMMM dd, yyyy"
            );
            const formattedName = capitalizeName(post.authorName);

            return (
              <>
                <article key={post._id}>
                  <h2>{post.title}</h2>
                  <h5>by {formattedName}</h5>
                  <h6>{formattedDate}</h6>
                  <div className="article-buttons">
                    <button onClick={() => handleArticleEditClick(post._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleModal(false)}>Delete</button>
                  </div>
                  <DialogBox
                    title={post.title}
                    name={formattedName}
                    post={post._id}
                    handleModal={handleModal}
                    date={formattedDate}
                    dialogRef={dialogRef}
                  />
                </article>
              </>
            );
          })}{" "}
        </article>{" "}
      </>
    );
}

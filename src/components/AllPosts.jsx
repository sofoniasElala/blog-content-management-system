import { useEffect, useState, useRef } from "react";
import { getAllPosts, capitalizeName, notificationPopUp } from "../utils";
import { DateTime } from "luxon";
import { useNavigate, Link } from "react-router-dom";
import DialogBox from "./DialogBox";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [postToDeleteIndex, setPostToDeleteIndex] = useState(0);
  const dialogRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    async function getPosts() {
      const getPostsApiCall = getAllPosts();
      const postsArray = await notificationPopUp(
        getPostsApiCall,
        { pending: "Retrieving posts...", success: "Posts loaded" },
        3000
      );
      setPosts(postsArray);
    }
    getPosts();
  }, []);

  function handleArticleEditClick(postId) {
    navigate(`${postId}/edit`);
  }

  function handleModal(open, postIndex = null, postDeleted = false) {
    if (open) dialogRef.current.close();
    else {
      setPostToDeleteIndex(postIndex);
      dialogRef.current.showModal();
    }

    if (postDeleted) {
      const filterPosts = posts.filter((post, index) => index !== postIndex);
      setPosts(filterPosts);
    }
  }

  if (posts.length <= 0) return <p>NO POSTS</p>;
  else
    return (
      <>
        <div className="all-posts">
          <DialogBox
            title={posts[postToDeleteIndex].title}
            name={capitalizeName(posts[postToDeleteIndex].authorName)}
            post={posts[postToDeleteIndex]._id}
            postIndex={postToDeleteIndex}
            handleModal={handleModal}
            date={DateTime.fromISO(posts[postToDeleteIndex].date).toFormat(
              "MMMM dd, yyyy"
            )}
            dialogRef={dialogRef}
          />
          <section className="posts-container">
            {" "}
            <h2>All Posts</h2>
            {posts.map((post, index) => {
              const formattedDate = DateTime.fromISO(post.date).toFormat(
                "MMMM dd, yyyy"
              );
              const formattedName = capitalizeName(post.authorName);

              return (
                <>
                  <article key={post._id}>
                    <h3>{post.title}</h3>
                    <h5>by {formattedName}</h5>
                    <h6>{formattedDate}</h6>
                    <div className="article-buttons">
                      <button onClick={() => handleArticleEditClick(post._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleModal(false, index)}>
                        Delete
                      </button>
                    </div>
                    <hr className="article-divider"/>
                  </article>
                </>
              );
            })}{" "}
          </section>{" "}
          <hr className="divider"/>
          <aside>
            <Link to="create">
              <p>
                <strong>Create Post</strong>
              </p>
            </Link>
          </aside>{" "}
        </div>
      </>
    );
}

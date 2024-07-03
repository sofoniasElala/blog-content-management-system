import { useEffect, useState, useRef } from "react";
import { getAllPosts, capitalizeName } from "../utils";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
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

  function handleArticleEditClick(postId){
    navigate(`posts/${postId}`);
  }

  function handleModal(open, postId = null, postDeleted = false){
    if(open)  dialogRef.current.close();
    else dialogRef.current.showModal();

    if(postDeleted) {
        const filterPosts = posts.filter(post => post._id !== postId);
        setPosts(filterPosts);
    }
  }

  if (posts.length <= 0) return <p>NO POSTS</p>;
  else
    return (
      <>
        {" "}
        <article className="posts-container">
          {" "}
          <h1>All Posts</h1>
          {posts.map((post) => {
            const formattedDate = DateTime.fromISO(post.date).toFormat('MMMM dd, yyyy');

            return ( <>
              <article key={post._id}>
                <h2>{post.title}</h2>
                <h5>by {capitalizeName(post.authorName)}</h5>
                <h6>{formattedDate}</h6>
                <div className="article-buttons">
                    <button onClick={() => handleArticleEditClick(post._id)}>Edit</button>
                    <button onClick={() => handleModal(false)}>Delete</button>
                </div>
                <DialogBox title={post.title} name={post.authorName} post={post._id}  handleModal={handleModal} date={formattedDate}  dialogRef={dialogRef}/>
              </article>
              </>
            );
          })}{" "}
        </article>{" "}
      </>
    );
}

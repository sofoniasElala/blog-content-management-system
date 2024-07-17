import { useParams } from "react-router-dom";
import { getSpecificPost, getAllTags, deleteComment } from "../utils";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

function getFormattedDate(isoDate){
    const today = DateTime.now();
    const commentDate = DateTime.fromISO(isoDate);
    const timeDiff = today.diff(commentDate, ['months', 'days', 'hours', 'minutes']).toObject();
    for(const time in timeDiff ){
        if(timeDiff[time] > 0) return `${timeDiff[time]} ${time} ago`;
    }
    return `less than a minute ago`;
  }

  

export default function EditPost() {
  const [postToEdit, setPostToEdit] = useState({});
  const [tags, setTags] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    async function getPost() {
      const postAndTags = await Promise.all([
        getSpecificPost(postId),
        getAllTags(),
      ]);
      setPostToEdit(postAndTags[0]);
      setTags(postAndTags[1]);
    }
    getPost();
  }, [postId]);

  async function deleteCommentClick(commentId){
    await deleteComment(postToEdit.post._id, commentId);
    setPostToEdit({...postToEdit, allCommentsOnPost: postToEdit.allCommentsOnPost.filter((comment) => comment._id !== commentId)})
  }


  if (tags.length <= 0) return <p>Loading...</p>;
  else
    return (
      <>
        <h2>Edit Post</h2>
        <form className="edit-form">
          <label className="title">
            {"Title: "}
            <input
              type="text"
              name="title"
              className="title_input"
              defaultValue={postToEdit.post.title}
            />
          </label>
          <label className="author">
            {"Author: "}
            <input
              type="text"
              name="authorName"
              className="author_input"
              defaultValue={postToEdit.post.authorName}
            />
          </label>
          <label className="content">
            {"Body: "}
            <textarea
              name="text"
              className="content_input"
              defaultValue={postToEdit.post.text}
            ></textarea>
          </label>
          <label className="displayImage">
            {"Display Image Link: "}
            <input
              type="text"
              name="image"
              className="imageLink_input"
              defaultValue={postToEdit.post.image}
            />
          </label>
          <label className="displayImage">
            {"Display Image Owner: "}
            <input
              type="text"
              name="imageOwner"
              className="imageOwner_input"
              defaultValue={postToEdit.post.imageOwner}
            />
          </label>
          <label htmlFor="tag-select">{"Tags: "}</label>
          <select
            name="tag"
            id="tag-select"
            defaultValue={
              postToEdit.post.tag.length > 0 ? postToEdit.post.tag[0]._id : ""
            }
          >
            <option value="">--Please choose an option--</option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
          <label className="publish">
            <input
              type="checkbox"
              name="published"
              className="publish"
              defaultChecked={postToEdit.post.published === "on" ? true : false}
            />
            {" Publish"}
          </label>
          <button type="submit">Update Post</button>
        </form>
        <hr />
        <h3>Comments</h3>
        {postToEdit.allCommentsOnPost.length > 0 ? (
          postToEdit.allCommentsOnPost.map(comment => {
           return <div className="comment" key={comment._id} >
            <h4>{comment.author.username} • {getFormattedDate(comment.date)}</h4>
            <p>{comment.text}</p>
            <div className="comment-buttons">
                <button onClick={() => null} >Reply</button>
                <button onClick={() => deleteCommentClick(comment._id)} >Delete</button>
            </div>
            </div>
          })
        ) : (
          <p>No Comments</p>
        )}
      </>
    );
}

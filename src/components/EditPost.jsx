import { useParams, useNavigate } from "react-router-dom";
import { getSpecificPost, getAllTags, deleteComment, updatePost, notificationPopUp} from "../utils";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

function getFormattedDate(isoDate){
    const today = DateTime.now();
    const commentDate = DateTime.fromISO(isoDate);
    const timeDiff = today.diff(commentDate, ['months', 'days', 'hours', 'minutes']).toObject();
    for(const time in timeDiff ){
        if(timeDiff[time] > 0) return `${timeDiff[time]} ${timeDiff[time] > 1 ? time : time.slice(0, time.length -1)} ago`;
    }
    return `less than a minute ago`;
  }

  

export default function EditPost() {
  const [postToEdit, setPostToEdit] = useState({});
  const [tags, setTags] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const postAndTagsApiCall =  Promise.all([
        getSpecificPost(postId),
        getAllTags(),
      ]);
      const postAndTags = await notificationPopUp(postAndTagsApiCall, {pending: 'Loading post...', success: 'Post loaded'}, 3000);
      setPostToEdit(postAndTags[0]);
      setTags(postAndTags[1]);
    }
    getPost();
  }, [postId]);

  async function deleteCommentClick(commentId){
    const deleteCommentApiCall =  deleteComment(postToEdit.post._id, commentId);
    await notificationPopUp(deleteCommentApiCall, {pending: 'Deleting comment...', success: 'Comment deleted'}, 3000);
    setPostToEdit({...postToEdit, allCommentsOnPost: postToEdit.allCommentsOnPost.filter((comment) => comment._id !== commentId)})
  }

  async function handleSubmission(newPostFormData){
    const postData = Object.fromEntries(newPostFormData);
    postData.date = new Date();

   const updatePostApiCall = updatePost(postData, postToEdit.post._id); //TODO: navigate to the post + maybe dialog box to show submission success
   await notificationPopUp(updatePostApiCall, {pending: 'Updating post...', success: 'Post updated'}, 3000);
   navigate('/home/posts');
}

  if (tags.length <= 0) return <p>Loading...</p>;
  else
    return (
      <>
        <h2>Edit Post</h2>
        <form className="edit-form" onSubmit={(e) => {
            e.preventDefault();
            handleSubmission(new FormData(e.currentTarget));

        }}>
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

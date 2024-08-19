import { useEffect, useRef, useState } from "react"
import { getAllTags, createPostDB, notificationPopUp } from "../utils";
import RichTextEditor from "./Editor";

export default  function CreatePost(){
    const [tags, setTags] = useState([]);
    const [submitted, setSubmitted] = useState({status: false, id: null});
    const editorRef = useRef(null);

    useEffect(() => {
        async function getTags(){
        const tagsArray = await getAllTags();
        setTags(tagsArray);
    }
        getTags();
    }, []);

    async function handleSubmission(newPostFormData){
        const postData = Object.fromEntries(newPostFormData);
        postData.date = new Date();
        postData.text = editorRef.current.getContent();

       const newPostApiCall = createPostDB(postData); //TODO: navigate to the post
       const newPost = await notificationPopUp(newPostApiCall, {pending: 'Creating post...', success: 'Post created'}, 3000);
       setSubmitted({status: true, id: newPost.id});
    }

    if(submitted.status) return <p>{submitted.id}</p>
    else
    return (
        <form className="create-form" onSubmit={(e) => {
            e.preventDefault();
            handleSubmission(new FormData(e.currentTarget));

        }} >
             <label className="title">{"Title: "}
            <input type="text" name="title" className="title_input" />
            </label>
            <label className="author">{"Author: "}
            <input type="text" name="authorName" className="author_input" />
            </label>
            <label className="content">{"Body: "}
            <RichTextEditor editorRef={editorRef}/>
            </label>
            <label className="displayImage">{"Display Image Link: "}
            <input type="text" name="image" className="imageLink_input" />
            </label>
            <label className="displayImage">{"Display Image Owner: "}
            <input type="text" name="imageOwner" className="imageOwner_input" />
            </label>
            <label htmlFor="tag-select">{"Tag: "}
            <select name="tag" id="tag-select">
                <option value="">--Please choose an option</option>
                {tags.map((tag) => <option key={tag._id} value={tag._id}>{tag.name}</option> )}
            </select>
            </label>
            <label className="publish">
            <input type="checkbox" name="published" className="publish" />
            {" Publish"}
            </label>
            <button type="submit">Create Post</button>

        </form>
    )
}
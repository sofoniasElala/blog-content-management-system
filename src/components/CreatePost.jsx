import { useEffect, useState } from "react"
import { getAllTags } from "../utils";

export default  function CreatePost(){
    const [tags, setTags] = useState([]);

    useEffect(() => {
        async function getTags(){
        const tagsArray = await getAllTags();
        setTags(tagsArray);
    }
        getTags();
    }, []);

    return (
        <form className="create-form">
             <label className="title">{"Title: "}
            <input type="text" name="title" className="title_input" />
            </label>
            <label className="author">{"Author: "}
            <input type="text" name="author" className="author_input" />
            </label>
            <label className="content">{"Body: "}
            <textarea name="content" className="content_input"></textarea>
            </label>
            <label className="displayImage">{"Display Image Link: "}
            <input type="text" name="imageLink" className="imageLink_input" />
            </label>
            <label className="displayImage">{"Display Image Owner: "}
            <input type="text" name="imageOwner" className="imageOwner_input" />
            </label>
            <label htmlFor="tag-select">{"Tags: "}</label>
            <select name="tags" id="tag-select">
                <option value="">--Please choose an option</option>
                {tags.map((tag) => <option key={tag._id} name={tag._id}>{tag.name}</option> )}
            </select>
            <label className="publish">
            <input type="checkbox" name="publish" className="publish" />
            {" Publish"}
            </label>
            <button type="submit">Create Post</button>

        </form>
    )
}
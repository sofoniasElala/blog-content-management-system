import { toast } from "react-toastify";

export async function handleAuth(justLoggedIn, setJustLoggedIn, loginData = null){
    let response;
    try {
        if(!localStorage.getItem('blog-user')){
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-in", { 
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.status === 200) { setUserLocalStorage(true, data.token); setJustLoggedIn({...justLoggedIn, value: true}); return data;}
            else return data;
        } else {
            setUserLocalStorage(false);
            setJustLoggedIn({...justLoggedIn, value: false});
        } 
   } catch(error) {
    throw {fetchError: true, error: error}; 
   }
    
}

export async function createPostDB(postData){
    try {
    const response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/posts", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
         },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data;
   } catch(error){
    throw {fetchError: true, error: error}; 
   }
}

export async function getAllPosts(){
    try {
        const response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/all", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
             }
        });
        const data = await response.json();
        return data.allPosts;
    } catch(error) {
        throw {fetchError: true, error: error}; 
    }
}

export async function getAllTags(){
    try {
        const response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/tags");
        const data = await response.json();
        return data.allTags;
    } catch(error) {
        throw {fetchError: true, error: error}; 
    }
    
}

export async function deleteComment(postId, commentId){
    try {
       const response = await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
             }
        });
        const data = await response.json();
        return data;
    } catch(error) {
        throw {fetchError: true, error: error}; 
     }
}

export async function updatePost(postData, id) {
    try {
       const response = await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${id}`, {
           method: 'PUT',
           headers: {
               "Content-Type": "application/json",
               "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
            },
           body: JSON.stringify(postData)
       });
       const data = await response.json();
       return data;
    } catch(error) {
        throw {fetchError: true, error: error}; 
   }
}

export async function deletePost(id){
    try {
      const response =   await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
             },
        });
        const data = await response.json();
        return data;
     } catch(error) {
        throw {fetchError: true, error: error}; 
    }
}

export async function getSpecificPost(id){
    try {
        const response = await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${id}`);
        const data = await response.json();
        return data;
    } catch(error) {
        throw {fetchError: true, error: error}; 
    }
}

export function capitalizeName(name){
    const splitNameAndLowerCase = name.toLowerCase().split(' ');
   const capitalizedNamesArray = splitNameAndLowerCase.map((name) =>  name[0].toUpperCase() + name.slice(1));
    return capitalizedNamesArray.join(' ');
}

function setUserLocalStorage(set, token = null){
    const twoWeeksExpiration = new Date();
    twoWeeksExpiration.setDate(twoWeeksExpiration.getDate() + 14);
    const data = {
        jwt: token,
        expires: twoWeeksExpiration
    }

    if(set) localStorage.setItem('blog-user', JSON.stringify(data));
    else localStorage.removeItem('blog-user')
}

export async function notificationPopUp(apiCall, popUpMessage, timeLength){
    return await toast.promise(apiCall, {
        pending: popUpMessage.pending,
        success: {
          render({data}){
            if(data && data.success == false) throw new Error (data.message)
            else return popUpMessage.success
          }
        },
        error: {
          render({data}){
            let popUpMessage = data.message;
            if(data.error) {
            if(data.error.name === 'TypeError') popUpMessage = 'Network error. check connection and try again.'
            else if(data.error.name === 'AbortError') popUpMessage = 'The request was cancelled.'
            }
            return `${popUpMessage}`
          }
        }
      }, {
        autoClose: timeLength
      });
}
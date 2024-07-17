export async function handleAuth(justLoggedIn, setJustLoggedIn, loginData = null){
    let response;
    try {
        if(!localStorage.getItem('blog-user')){
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-in", { 
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(loginData) // check formData is  passed in
            });
            const data = await response.json();
            if (response.status === 200) { setUserLocalStorage(true, data.token); setJustLoggedIn({...justLoggedIn, value: true}); }
            else return data;
        } else {
            setUserLocalStorage(false);
            setJustLoggedIn({...justLoggedIn, value: false});
        } 
   } catch(error) {
    alert(error); // handle the error later
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
    alert(error) //handle the error later
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
        alert(error) //  handle the error later
    }
}

export async function getAllTags(){
    try {
        const response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/tags");
        const data = await response.json();
        return data.allTags;
    } catch(error) {
        alert(error) //  handle the error later
    }
    
}

export async function deleteComment(postId, commentId){
    try {
        await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
             }
        });
    } catch(error) {
        alert(error) //  handle the error later
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
       alert(error) //  handle the error later
   }
}

export async function deletePost(id){
    try {
         await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.parse(localStorage.getItem('blog-user')).jwt,
             },
        });
     } catch(error) {
        alert(error) //  handle the error later
    }
}

export async function getSpecificPost(id){
    try {
        const response = await fetch(`https://sofonias-elala-blog-rest-api.glitch.me/posts/${id}`);
        const data = await response.json();
        return data;
    } catch(error) {
        alert(error) //  handle the error later
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
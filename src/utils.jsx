export async function handleAuth(user, setUser, loginData = null){
    let response;
    try {
        if(!user){
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-in", { 
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(loginData) // check formData is  passed in
            });
            const data = await response.json();
            if (response.status === 200) { setUserLocalStorage(data.user.username, true); setUser(data.user); }
            else return data;
        } else {
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-out", { 
                method: 'POST',
                headers: {"Content-Type": "application/json" },
            });
            if (response.status === 200) {setUserLocalStorage(false); setUser(null); }
        } 
   } catch(error) {
    alert(error); // handle the error later
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

function setUserLocalStorage(username = null, set){
    const twoWeeksExpiration = new Date();
    twoWeeksExpiration.setDate(twoWeeksExpiration.getDate() + 14);
    const data = {
        user: username,
        expires: twoWeeksExpiration
    }

    if(set) localStorage.setItem('blog-user', JSON.stringify(data));
    else localStorage.removeItem('blog-user')
}
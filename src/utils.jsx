export async function handleAuth(user, setUser, loginData = null){
    let response;
    try {
        if(!user){
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-in", {    //add actual url
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(loginData) // check formData is  passed in
            });
            const data = await response.json();
            if (response.status === 200) setUser(data.user);
            else return data;
        } else {
            response = await fetch("https://sofonias-elala-blog-rest-api.glitch.me/log-out", { //add actual url
                method: 'POST',
                headers: {"Content-Type": "application/json" },
            });
            if (response.status === 200) {console.log(user); setUser(null); }
        } 
   } catch(error) {
    alert(error); // handle the error later
   }
    
}
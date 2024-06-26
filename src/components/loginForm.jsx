import { useOutletContext, redirect } from "react-router-dom";
import { handleAuth } from "../utils";
import { useState } from "react";

async function handleSubmission(user, setUser, loginFormData, setInputs){
    const loginData = {
        username: loginFormData.get('username'),
        password: loginFormData.get('password')
    }
    const errorData = await handleAuth(user, setUser, loginData);

    //console.log(errorData)
    if(errorData == undefined) {
        redirect('/home');
    } else {
        loginData.errorMessage = errorData.message;
        setInputs(loginData);
    }
    

}

export default function LogInForm() {
  const [user, setUser] = useOutletContext();
  const [inputs, setInputs] = useState(null);
  return (
    <main>
      <form
        onSubmit={(e) =>{
            e.preventDefault();
          handleSubmission(user, setUser, new FormData(e.currentTarget), setInputs)
        }
        }
      >
        <label htmlFor="username">  {"username: "} </label>
        <input type="text" name="username" id="username" defaultValue={inputs && inputs.username} required />
        <label htmlFor="password">{" password: "}</label>
        <input type="password" name="password" id="password" defaultValue={inputs && inputs.password} required />
         {inputs && <p>{inputs.errorMessage}</p>}
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}

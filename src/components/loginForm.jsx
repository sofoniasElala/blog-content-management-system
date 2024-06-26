import { useOutletContext, useNavigate} from "react-router-dom";
import { handleAuth } from "../utils";
import { useState } from "react";


export default function LogInForm() {
  const [user, setUser] = useOutletContext();
  const [inputs, setInputs] = useState(null);
  const navigate = useNavigate();

  async function handleSubmission(user, setUser, loginFormData, setInputs){
    const loginData = {
        username: loginFormData.get('username'),
        password: loginFormData.get('password')
    }
    const errorData = await handleAuth(user, setUser, loginData);

    //console.log(errorData)
    if(errorData == undefined) {
        navigate('/home');
    } else {
        loginData.errorMessage = errorData.message;
        setInputs(loginData);
    }
    

}
  return (
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
  );
}

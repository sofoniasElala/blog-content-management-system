import { useOutletContext, useNavigate } from "react-router-dom";
import { handleAuth, notificationPopUp } from "../utils";
import { useState } from "react";

export default function LogInForm() {
  const [justLoggedIn, setJustLoggedIn] = useOutletContext();
  const [inputs, setInputs] = useState(null);
  const navigate = useNavigate();

  async function handleSubmission(loginFormData, setInputs) {
    const loginData = {
      username: loginFormData.get("username"),
      password: loginFormData.get("password"),
    };
    const logInApiCall = handleAuth(justLoggedIn, setJustLoggedIn, loginData);
    const errorData = await notificationPopUp(
      logInApiCall,
      { pending: "Logging in...", success: "Successful log in" },
      3000
    );

    if (errorData.success == true) {
      navigate("/home");
    } else {
      loginData.errorMessage = errorData.message;
      setInputs(loginData);
    }
  }
  return (
    <>
      <p id="login-paragraph">
        {"Log in"}
      </p>
    <form
      id="login"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmission(new FormData(e.currentTarget), setInputs);
      }}
    >
      <div className="username">
        <label htmlFor="username"> {"Username "} </label>
        <input
          type="text"
          name="username"
          id="username"
          defaultValue={(inputs && inputs.username) || 'demo'}
          required
        />
      </div>
      <div className="password">
        <label htmlFor="password">{"Password "}</label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue={(inputs && inputs.password) || 'demoPassword'}
          required
        />
      </div>
      {inputs && <p className="error">{inputs.errorMessage}</p>}
      <button type="submit">Log in</button>
    </form>
    </>
  );
}

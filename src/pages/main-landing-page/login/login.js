import React, {useState } from "react";
import { userLogin } from "../../../scripts/pureFetchFunctionsReza";
import './login.scss';

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const { uEmail, pass } = document.forms[0];
    const email = uEmail.value;
    const password = pass.value;

    const response = await userLogin(email, password);
    if (response.ok) {
      response.text().then((text) => {
        localStorage.setItem("userInfo", text);
        window.open("/", "_self");
      });
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      setErrorMessages("Email or password is wrong!");
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = () =>
  errorMessages !== '' && (
      <div className="error">{errorMessages}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {renderErrorMessage()}
        <div className="input-container">
          <input type="text" name="uEmail" required placeholder="E-Mail" />
        </div>

        <div className="input-container">
          <input type="password" name="pass" required placeholder="Passwort" />
        </div>

        <div className="button-container">
          <button type="submit">Anmelden</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? <div>Benutzer ist erfolgreich eingeloggt</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;

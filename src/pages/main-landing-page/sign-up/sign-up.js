import React, { useEffect, useState } from "react";
import { userRegister } from "../../../scripts/pureFetchFunctionsReza";
import "./sign-up.scss";

const SignUp = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentDep, setCurrentDep] = useState("Office");
  const [firstName, setFirstName] = useState("firstname");
  const [lastName, setLastName] = useState("lastname");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");

  const userInfo = {
    email: email,
    firstname: firstName,
    lastname: lastName,
    department: currentDep,
    password: password,
  };

  const HandleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    //var { email, firstname ,lastname, p} = document.forms[0];
    const response = await userRegister(userInfo);
    if (response.ok) {
      setIsSubmitted(true);
    } else {
      response.text().then((text) => {
        setErrorMessages(text);
      });
    }
  };

  console.log(errorMessages)


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>{
    if(errorMessages.includes(name)){
      if(errorMessages== "email already in use"){
        return <p className="error">E-Mail bereits verwendet</p>
      }else if( errorMessages== "Password must be at least 5 characters long"){
        return <p className="error">Das Passwort muss mindestens 5 Zeichen lang sein.</p>
      }

    }

  }



  // JSX code for register form
  const renderForm = (
    <div className="form">
      <form onSubmit={HandleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="firstname"
            required
            placeholder="Vorname"
            onChange={(event) => setFirstName(event.target.value)}
          />
          {renderErrorMessage("firstname")}
        </div>

        <div className="input-container">
          <input
            type="text"
            name="lastname"
            required
            placeholder="Nachname"
            onChange={(event) => setLastName(event.target.value)}
          />
          {renderErrorMessage("lastname")}
        </div>

        <div className="input-container">
          <input
            type="text"
            name="email"
            required
            placeholder="E-Mail"
            onChange={(event) => setEmail(event.target.value)}
          />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <select
            value={currentDep}
            onChange={(event) => setCurrentDep(event.target.value)}
          >
            <option value="Office">Office</option>
            <option value="Android">Android</option>
          </select>
        </div>

        <div className="input-container">
          <input
            type="password"
            name="p"
            required
            placeholder="Geben Sie Ihr Passwort ein"
            onChange={(event) => setPassword(event.target.value)}
          />
          {renderErrorMessage("Password")}
        </div>

        <div className="button-container">
          <button type="submit">Registrieren</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="register-form">
        {isSubmitted ? <div>Benutzer ist erfolgreich registriert </div> : renderForm}
      </div>
    </div>
  );
};

export default SignUp;

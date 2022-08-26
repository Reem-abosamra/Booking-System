import React, { useEffect, useState } from "react";
import "./profile.scss";
import { getTheStorage } from "../../../scripts/localStorageFunctions";
import { fetchTheLoggedInUser } from "../../../scripts/pureFetchFunctionsReza";

export const Profile = () => {
  const [errorMessages, setErrorMessages] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [currentDep, setCurrentDep] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const userFromStorage = JSON.parse(getTheStorage("deskUser"));
  const {userId, token} = JSON.parse(getTheStorage("userInfo"));
  const [user, setUser] = useState();

  const { firstname, lastname, email, department, isAdmin, id } =
    userFromStorage;
  
  const handleEdit = () => {
    setIsDisabled(false);
    setIsOpen(true)
  };
  const newUserInfo = {
    firstname: firstName,
    lastname: lastName,
    email: Email,
    department: currentDep,
    id: userId,
  };
  const handleSavbtn = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setIsOpen(false)
  };
  const handleUpdate = (name, newValue) => {

    update(name, newValue)
    localStorage.setItem("deskUser", JSON.stringify(newUserInfo));
  }


  
  const update = async (name, newValue) => {
    //event.preventDefault();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let newInfo = {}
    switch (name) {
      case "firstname":
        newInfo = {firstname: newValue};
        break;
      case "lastname":
        newInfo = {lastname: newValue};
        break;
      case "email":
        if(newValue.match(validRegex)){
          newInfo = {email: newValue};
        }else{
          setErrorMessages("Invalid email")
        }
        break;
      case "department":
        newInfo = {department: newValue};
        break;
      case "password":
        if(newValue.length > 0){
          newInfo = {password: newValue};
        }else{  
          setErrorMessages("Passwort länge kann nicht kleiner als 4 zeichen sein.")
        }
        break;
      default:
        break;

    }





    await fetch("https://deskbooking.dev.webundsoehne.com/api/user", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      
      body: JSON.stringify(
        newInfo 
    ),
    })
      .then((response) => {
        if (response.ok) {
          //setIsUpdate(true);
        } else {
          response.text().then((text) => {
            setErrorMessages(text);
          });
        }
      })

      .catch((err) => {
        console.log("error in update", err);
      });




       await fetchTheLoggedInUser(userId, token)
       .then((data)=>{
        setUser(JSON.stringify(data));
        localStorage.setItem("deskUser", JSON.stringify(data));
      }).catch((err)=>{
        console.log(err);
      })
  };

  const renderErrorMessage = (name) =>
    errorMessages.includes(name) === true && (
      <div className="error">{errorMessages}</div>
    );

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const renderUpdateProfile = (
    <div className="user-profile">
    
        <button className="edit-btn" onClick={handleEdit}>
          Bearbeiten
        </button>


      <form className="profile-form">
        <div className="firstname">
          <input
            type="text"
            name="firstname"
            disabled={isDisabled}
            defaultValue={firstname}
            onChange={(e) => setFirstName( e.target.value)}
            onBlur={(event) => handleUpdate("firstname", event.target.value) }
          />
          {renderErrorMessage("firstname")}
        </div>

        <div className="lastname">
          <input
            type="text"
            name="lastname"
            disabled={isDisabled}
            defaultValue={lastname}
            onChange={(e) => setLastName( e.target.value)}
            onBlur={(event) => handleUpdate("lastname", event.target.value)}
          />
          {renderErrorMessage("lastname")}
        </div>

        <div className="email">
          <input
            type="text"
            name="email"
            disabled={isDisabled}
            defaultValue={email}
            onClick={(e) => setErrorMessages("")}
            onChange={(e) => setEmail( e.target.value)}
            onBlur={(event) => handleUpdate("email", event.target.value)}
          />
          {renderErrorMessage("email")}
        </div>

        <div className="password">
          <input
            type="password"
            name="password"
            disabled={isDisabled}
            placeholder="Passwort"
            onClick={(e) => setErrorMessages("")}
            onBlur={(event) => handleUpdate("password", event.target.value)}
          />
          {renderErrorMessage("Password")}
        </div>
        <div className="department">
          <select
            disabled={isDisabled}
            name="department"
            defaultValue={department}
            onChange={(e) => setCurrentDep( e.target.value)}
            onBlur={(event) => handleUpdate("department", event.target.value)}
          >
            <option value="Office">Office</option>
            <option value="Android">Android</option>
          </select>
        </div>
        <input type="hidden" defaultValue={isAdmin} name="isAdmin"></input>
        <input type="hidden" defaultValue={id} name="id"></input>
        <div className="button-container">
         {isOpen && <button type="submit" onClick={  handleSavbtn} className="save-btn">
            Speichern
          </button>
         } 
        </div>
      </form>

       <div className="button-container">
          <button type="submit" onClick={logout} className="logout-btn">
            Abmelden
          </button>
       </div>
    </div>
  );
  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <div className="profile">
        {renderUpdateProfile}
    </div>
  );
};

export default Profile;

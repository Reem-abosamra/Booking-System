import { useEffect, useState } from "react";
import { getTheStorage } from "../../../scripts/localStorageFunctions";
import { getAdminComments } from "../../../scripts/pureFetchFunctionsReza";
import "./admin-landing-page.scss";

export const AdminLandingPage = () => {
  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState();
  const [usersLength, setUsersLength] = useState();
  const [requestsLength, setRequestsLength] = useState();
  const baseUrl = "https://deskbooking.dev.webundsoehne.com/api/";
  const {userId, token} = JSON.parse(localStorage.getItem("userInfo"));

  const handleClickOnAdminLink = (path) => {
    window.open(`${path}`, "_self");
  };

  // fetch all comments from the api
  useEffect(() => {
    const getCommentsOfUser = async () => {
        const response = await getAdminComments(token, 1000);
        if (response.ok) {
          response.text().then((text) => {
            setComments(JSON.parse(text));
            setCommentsLength(JSON.parse(text).length)
            
          });
          
        } else {
          console.log(response);
        }
      }

    getCommentsOfUser();
  }, 
  []);

  const commensLengthLocalStorage = parseInt(
    localStorage.getItem("commentsLength")
  );
  let newCommentsLength;

  if (commentsLength) {
    newCommentsLength =
      commentsLength - commensLengthLocalStorage
        ? commentsLength - commensLengthLocalStorage
        : "";
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      await fetch("https://deskbooking.dev.webundsoehne.com/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
          }
        })
        .then((data) => setUsersLength(data.length));
    };
    fetchAllUsers();
  }, []);

  const usersLengthFromLocalStorage = parseInt(
    localStorage.getItem("usersLength")
  );

  let newUsersLength;
  if (usersLength) {
    newUsersLength =
      usersLength - usersLengthFromLocalStorage
        ? usersLength - usersLengthFromLocalStorage
        : "";
    console.log(newUsersLength);
  }

useEffect(()=>{
    const response = async () =>{
      await fetch(`${baseUrl}/admin/fix-desk-request`,{
        method: 'get',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
      }
      ).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then((data) => setRequestsLength(data.length ? data.length : ""));
    }
    response()
}, [])



  return (
    <section className="admin-landing-page">
          <div  className="adminLink" onClick={ () => handleClickOnAdminLink("/admin/comments")}>
            <div className="number numNewComments">{newCommentsLength}</div>
            <p>Kommentare</p>
          </div>
          <div  className="adminLink"  onClick={ () => handleClickOnAdminLink("/admin/requests")}>
          <div className="number numNewRequests">{requestsLength}</div>
            <p> Desk Anfragen</p>
          </div>
          <div  className="adminLink"  onClick={ () => handleClickOnAdminLink("/admin/users")}>
            <div className="number numNewUsers"> {newUsersLength}</div>
            <p> Benutzer</p>
          </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { getAdminComments } from "../../../scripts/pureFetchFunctionsReza";
import "./comments.scss";

export const AdminCommentsPage = () => {

  const [comments, setComments] = useState([])
  const {userId, token} = JSON.parse(localStorage.getItem("userInfo"));

  // fetch all comments from the api
  useEffect(() => {
    const getCommentsOfUser = async () => {
        const response = await getAdminComments(token, 1000);
        if (response.ok) {
          response.text().then((text) => {
            setComments(JSON.parse(text));
    
          });
        } else {
          console.log(response);
        }
      }
      getCommentsOfUser()

  }, []);


  let commentsLength 
  if(comments){
     commentsLength = comments.length;
  }


window.onbeforeunload = function(){
  localStorage.setItem("commentsLength", JSON.stringify(commentsLength));
};


// add all comments to the localStorage
const addCommentsToLocalStorage = () => { 
  localStorage.setItem("commentsLength", JSON.stringify(commentsLength));
  window.location.reload();
}

// get the length of old comments from localStorage
const commentLengthFromLocalStorage = parseInt(localStorage.getItem("commentsLength"))

// get the number of new comments
let diff = 0
if(commentLengthFromLocalStorage){
  diff = (parseInt(commentsLength) - parseInt(commentLengthFromLocalStorage)) ? (parseInt(commentsLength) - parseInt(commentLengthFromLocalStorage)) : 0
}


// Sort all comments by Comments Date
const sortedComments = comments.slice().sort((a, b) => new Date(b.commentedAt.substr(0, 19)) - new Date(a.commentedAt.substr(0, 19)))
let AllOldComments = []

AllOldComments = sortedComments.slice(0, commentLengthFromLocalStorage)

if(!commentLengthFromLocalStorage){
  AllOldComments = sortedComments
}

//get new comments
const allNewComments = sortedComments.slice(0,diff)


  return (
    <section className="admin-comments-page">
      <div className="admin-newComments-container"> 
         <div className="new-comments-title">
             <h1> Neue Kommentare: </h1>  
        </div>
         {
          allNewComments ? <>
              { allNewComments.map((comment, index) => (
                  <div  className="admin-comment-container" key={index}>
                        <div><p>{comment.user.firstname}</p>
                        <p>{comment.commentedAt.substr(0, 10)}</p>
                        <p> <span> {comment.desk.office.name} - </span>{comment.desk.label}</p></div>
                        <p className="comment">{comment.comment}</p>
                  </div>  ))    }</>  
                  : 
               <> { 
                  <p>Keine Kommentare</p>
                }
              </>
       }
       </div>
       <div className="admin-oldComments-container"> 
            <h1> Alte Kommentare: </h1>
            { AllOldComments.map((comment, index) => (
                  <div  className="admin-comment-container" key={index}>
                      <div><p>{comment.user.firstname}</p>
                      <p>{comment.commentedAt.substr(0, 10)}</p>
                      <p> <span> {comment.desk.office.name} - </span>{comment.desk.label}</p>  </div>
                      <p className="comment">{comment.comment}</p>
                  </div>
            ))
            }
       </div>

    </section>
  );
};

import React, { useEffect, useState } from "react";
import "./user-list.scss";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  const userData = {
    userId: "4654705e-fff9-4c4a-b7e8-933bb9505ed9",
    token:
      "Bearer f39bc97961ac4db886018debe341480e5628d865568842bcadbe96f0f398cba0",
  };
  useEffect(() => {
    const fetchAllUsers = async () => {
      await fetch("https://deskbooking.dev.webundsoehne.com/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userData.token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
          }
        })
        .then((data) => setUsers(data));
    };

    fetchAllUsers();
  }, []);

  window.onbeforeunload = () => {
    localStorage.setItem("usersLenght", JSON.stringify(users.length));
    localStorage.setItem("users", JSON.stringify(users));
  };

  const usersFromLocalstorge = JSON.parse(localStorage.getItem("users"));

  let newUsers;
  let oldUsers;
  if (usersFromLocalstorge) {
    newUsers = users.filter((user) => {
      return !usersFromLocalstorge.some((userLocalStorge) => {
        return user.id === userLocalStorge.id;
      });
    });
    oldUsers = users.filter((user) => {
      return usersFromLocalstorge.some((userLocalStorge) => {
        return user.id === userLocalStorge.id;
      });
    });
  }
  if (!usersFromLocalstorge) {
    oldUsers = users;
  }
  return (
    <section className="all-users">
      <div className="user">
        <div className="users">{newUsers ? <h1>Neue Users</h1> : <></>}
        {newUsers?.map((user, index) => {
          return (
            <div className="user-list" key={index}>
              <p>{user.firstname} {user.lastname}</p>
              {user.isAdmin ? <p> Admin</p> : <p>User</p>}
            </div>
          );
        })}
        </div>
        <div className="users">
          {oldUsers ? <h1>Alte Users</h1> : <></>}
          {oldUsers?.map((user, index) => {
            return (
              <div className="user-list" key={index}>
                <p>{user.firstname} {user.lastname}</p>
                {user.isAdmin ? <p> Admin</p> : <p>User</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserList;

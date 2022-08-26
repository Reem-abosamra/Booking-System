import { useEffect, useState, useContext } from "react";
import star from "../../../assets/icons/star.png";
import starBlack from "../../../assets/icons/starblack.png";
import "./UserLandingPage.scss";
import { getTheStorage } from "../../../scripts/localStorageFunctions";
import {
  getAllBookings,
  getAllBookingsFromFavorites,
} from "../../../scripts/pureFetchFunctionsReza";

let today = new Date();
export const currentDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export const UserLanding = () => {
  const [reservations, setReservations] = useState([]);
  const [favoriten, setFavoriten] = useState([]);
  const {userId, token} = JSON.parse(localStorage.getItem("userInfo"));
  const userFromStorage = JSON.parse(getTheStorage("deskUser"));
  const { firstname } = userFromStorage;
  // get last 3 favourites Desk of the user

  // get user Favourites Desks
  useEffect(() => {
    // fetch user last 3 Reservations
    const fetchFavourite = async () => {
      const response = await getAllBookingsFromFavorites(token);
      if (response.ok) {
        response.text().then((text) => {
          setFavoriten(JSON.parse(text));
        });
      } else {
        console.log(response);
      }
    };
    fetchFavourite();
  }, []);

  useEffect(() => {
    // fetch user last 3 Reservations
    const fetchReservations = async () => {
      const response = await getAllBookings(token);
      if (response.ok) {
        response.text().then((text) => {
          setReservations(JSON.parse(text));
        });
      } else {
        console.log(response);
      }
    };
    fetchReservations();
  }, []);

  // get Favourites Desk from user's Bookings

  const userBookings = [];
  const userList = () => {
    reservations.map((b) => {
      if (b.user.id === userId) {
        userBookings.push(b);
      }
    });
  };
  userList();

  const b = userBookings.filter(
    (item) =>
      new Date(currentDate).getTime() <= new Date(item.dateStart).getTime()
  );
  const userLastBookings = b.slice(-3);


  return (
    <section className="UserLanding-section">
      <div className="UserLanding-section-left-col">
        <div className="header">
          <h1>
            <span className="h1-break">Hallo {firstname}</span>
            <span className="h1-break">Willkommen in deinem</span>
            <span className="h1-break">Booking Desk System</span>
          </h1>
        </div>
        <div></div>
      </div>
      <div className="UserLanding-section-right-col">
        {userLastBookings ? (
          <>
            <h1>Deine Reservierungen: </h1>
            <div>
              {userLastBookings.map((data, index) => (
                <div className="reservationsItem" key={index}>
                  <span>{data.dateEnd}</span>
                  <span>{data.desk.label}</span>
                  
                </div>
              ))}
            </div>
          </>
        ) : 
          <h1>Du hast zur Zeit keine Buchung </h1>
        }
      </div>
    </section>
  );
};

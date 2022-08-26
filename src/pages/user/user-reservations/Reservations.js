import { useEffect, useState, useContext, useReducer } from "react";
import "./Reservations.scss";
import star from "../../../assets/icons/star.png";
import starBlack from "../../../assets/icons/starblack.png";
import { getTheStorage } from "../../../scripts/localStorageFunctions";
import {
  AddADeskToFavorites,
  addCommentToDesk,
  cancelABooking,
  deleteAdeskFromFavorites,
  getAllBookings,
  getAllBookingsFromFavorites,
  getUserComment,
} from "../../../scripts/pureFetchFunctionsReza";

let today = new Date();
export const currentDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export const Reservations = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [favoriten, setFavoriten] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId, token} = JSON.parse(localStorage.getItem("userInfo"));
  const userFromStorage = JSON.parse(getTheStorage("deskUser"));
  const [state, setState] = useState({
    opened: false,
    selected: "",
  });
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);


  // get last 3 favourites Desk of the user
  useEffect(() => {
    // fetch user last 3 Reservations
    setLoading(true);
    const fetchReservations = async () => {
      const response = await getAllBookings(`${token}`);
      if (response.ok) {
        response.text().then((text) => {
          setData(JSON.parse(text));
        });
        setLoading(false);
      } else {
        console.log(response);
      }
    };
    fetchReservations();
  }, []);

  useEffect(() => {
    // fetch user last 3 Reservations
    setLoading(true);
    const fetchReservations2 = async () => {
      const response = await getAllBookings(`${token}`);
      if (response.ok) {
        response.text().then((text) => {
          setNewData(JSON.parse(text));
        });
        setLoading(false);
      } else {
        console.log(response);
      }
    };
    fetchReservations2();
  }, []);

 // get user Favourites Desks
  useEffect(() => {
    // fetch user last 3 Reservations
    const fetchFavourite = async () => {
      const response = await getAllBookingsFromFavorites(`${token}`);
      if (response.ok) {
        response.text().then((text) => {
          setFavoriten(JSON.parse(text));
        });
      } else {
        console.log(response);
      }
    };
    fetchFavourite();
  }, [reducerValue]);


  const userBookings = [];
  const userNewBookings = [];
  const getUserBookings = () => {
    data.map((b) => {
      if (b.user.id === userId) {
        userBookings.push(b);
      }
    });

    newData.map((b) => {
      if (b.user.id === userId) {
        userNewBookings.push(b);
      }
    });
  };
  getUserBookings();

  // get Old Bookings of user
  const userOldBookings = userBookings.filter(
    (item) =>
      new Date(currentDate).getTime() > new Date(item.dateStart).getTime()
  );

  // get New Bookings of user
  const userCurrentBookings = userNewBookings.filter(
    (item) =>
      new Date(currentDate).getTime() <= new Date(item.dateStart).getTime()
  );

  const listFav = [];

  const getFav = () => {
    userOldBookings.forEach((b) => {
      listFav.push({ bf: b, fav: false, comment: "" });
    });

    favoriten.map((b) => {
      listFav.map((f) => {
        if (b.id === f.bf.desk.id) {
          f.fav = true;
        }
      });
    }); 
  };
  getFav();


  // cancel a user booking
  const cancelBooking = async (data) => {
    const response = await cancelABooking(`${token}`, data.id, 1000);
    if (response.ok) {
      console.log("Booking gelöscht");
      setNewData(newData.filter((b) => b.id !== data.id));
    } else {
      console.log(response);
    }
    forceUpdate();
  };

  // add booking to favourites in api
  const addOrDeleteFav = async (data) => {
    if (data.fav == false) {
      const response = await AddADeskToFavorites(
        `${token}`,
        data.bf.desk.id,
        1000
      );
      if (response.ok) {
        console.log("Favourite hinzugefügt");
      } else {
        // console.log("addFav:", response);
      }
    } else {
      const response = await deleteAdeskFromFavorites(
        `${token}`,
        data.bf.desk.id,
        1000
      );
      if (response.ok) {
        console.log("Favourite gelöscht");
      } else {
        // console.log("deleteFav:",response);
      }
    }
    forceUpdate();
  };

  // get comment of Booking from api server
  const getComments = async (key, index) => {
    const response = await getUserComment(`${token}`, key);
    if (response.ok) {
      response.text().then((text) => {
        setListComment(JSON.parse(text));
      });
    } else {
      console.log(response);
    }
    setState({ opened: !state.opened, selected: index });
  };

  const addCommentsToDeks = () => {
    listComment.map((b) => {
      listFav.map((f) => {
        if (b.desk.id === f.bf.desk.id && b.user.id === f.bf.user.id) {
          f.comment = b.comment;
        }
      });
    });
  };
  addCommentsToDeks();

  // add comment to user Bookings
  const addCommentToBooking = async (deskId, comment, key) => {
    const response = await addCommentToDesk(`${token}`, deskId, comment);
    if (response.ok) {
      console.log("Kommentar hinzugefügt");
    } else {
      console.log(response);
    }
    forceUpdate();
    setState({ opened: !state.opened, selected: key });
  };


  return (
    <section className="UserReservations-section">
      <div className="UserReservations-section-new">
        <h1>Deine neuen Reservierungen: </h1>
        {loading ? (
          <div> Laden ... </div>
        ) : (
          <>
            {userCurrentBookings ? (
              <>
                <div>
                  {userCurrentBookings.map((data, index) => (
                    <div className="reservationsItem" key={index}>
                      <span>{data.desk.office.name}</span>
                      <span>{data.desk.label}</span>
                      <span>{data.dateEnd}</span>
                      <button
                        data-remove={data.id}
                        id="booking"
                        onClick={() => cancelBooking(data)}
                      >
                        Stornieren
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h1>Du hast keine Reservierung </h1>
            )}
          </>
        )}
      </div>
      <div className="UserReservations-section-old">
        <h1>Deine alten Reservierungen: </h1>
        {loading ? (
          <div> Laden ... </div>
        ) : (
          <>
            {userOldBookings ? (
              <>
                <div>
                  {listFav.map((data, index) => (
                    <div className="reservationsItem" key={index}>
                      <div className="reservationsDetail">
                        {data.fav == false ? (
                          <img
                            src={star}
                            alt="star"
                            onClick={() => addOrDeleteFav(data)}
                          />
                        ) : (
                          <img
                            src={starBlack}
                            alt="star"
                            onClick={() => addOrDeleteFav(data)}
                          />
                        )}

                        <span>{data.bf.desk.office.name}</span>
                        <span>{data.bf.desk.label}</span>
                        <span>{data.bf.dateEnd}</span>

                        <button
                          onClick={() => getComments(data.bf.desk.id, index)}
                        >
                          Kommentar
                        </button>
                      </div>
                      {state.opened && state.selected === index && (
                        <div className="reservationCommentContainer">
                          {data.comment ? (
                            <p>{data.comment}</p>
                          ) : (
                            <>
                              <textarea
                                type="text"
                                placeholder="Write your comment here"
                                onChange={(e) => setComment(e.target.value)}
                              />
                              <button
                                onClick={() =>
                                  addCommentToBooking(
                                    data.bf.desk.id,
                                    comment,
                                    index
                                  )
                                }
                              >
                                Senden
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h1> Du hast keine Reservierungen </h1>
            )}
          </>
        )}
      </div>
    </section>
  );
};

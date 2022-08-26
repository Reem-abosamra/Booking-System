// import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminCommentsPage } from "./pages/admin-page/admin-comments-page/comments";
import { AdminLandingPage } from "./pages/admin-page/admin-landing-page/admin-landing-page";
//the elements for the routes
import { Layout } from "./pages/header-for-all/Layout";
import { StartPage } from "./pages/main-landing-page/start-page/Startpage";
import { BookingPage } from "./pages/user/booking-page/BookingPage";
import { UserLanding } from "./pages/user/UserLandingPage/UserLandingPage";
import { FavouritePage } from "./pages/user/favourite-page/FavouritePage";
import { Reservations } from "./pages/user/user-reservations/Reservations";
import Profile from "./pages/user/user-profile/profile";

import { DeskRequests } from "./pages/Admin/desk-requests/DeskRequests";
import UserList from "./pages/Admin/user-list-of-all-user/user-list";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Startseite Login / Sign Up */}
        <Route path="/" element={<StartPage />} />

        {/* User Zone */}
        <Route path="/user" element={<Layout />}>
          <Route index element={<UserLanding />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="favourites" element={<FavouritePage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Zone */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminLandingPage />} />
          <Route path="comments" element={<AdminCommentsPage />} />
          <Route path="requests" element={<DeskRequests />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

//commit
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/* -------

in this area are some pure fetch functions - they have no action with the data

---*/

const baseUrl = "https://deskbooking.dev.webundsoehne.com/api/";

export const fetchTheLoggedInUser = async (userId, token) => {
  const response = await fetch(`${baseUrl}/user/${userId}`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};

export const fetchAllDesks = async (token) => {
  const response = await fetch(`${baseUrl}/desk`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};

export const fetchAllBookings = async (token) => {
  const response = await fetch(`${baseUrl}/booking`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};

export const fetchAllComments = async (deskId, token) => {
  const response = await fetch(`${baseUrl}/desk/${deskId}/comment`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};

export const bookAFlexDesk = async (token, deskId, dateStart, dateEnd) => {
  const response = await fetch(`${baseUrl}/booking`, {
    method: "Post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      deskId: `${deskId}`,
      dateStart: `${dateStart}`,
      dateEnd: `${dateEnd}`,
    }),
  });

  const data = await response;
  return data;
};

export const bookAFixDesk = async (token, deskId, comment) => {
  const response = await fetch(`${baseUrl}/desk/${deskId}/fix`, {
    method: "Post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      comment: `${comment}`,
    }),
  });

  const data = await response;
  return data;
};

export const userLogin = async (email, password) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response;
  return data;
};

export const userRegister = async (userInfo) => {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const data = await response;
  return data;
};

export const getAllBookingsFromFavorites = async (token) => {
  const response = await fetch(`${baseUrl}/favourite`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response;
  return data;
};
export const getAllBookings = async (token) => {
  const response = await fetch(`${baseUrl}/booking`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response;
  return data;
};

export const addCommentToDesk = async (token, deskId, comment) => {
  const response = await fetch(`${baseUrl}/desk/${deskId}/comment`, {
    method: "Post",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      comment: `${comment}`,
    }),
  });

  const data = await response;
  return data;
};

export const getUserComment = async (token, key) => {
  const response = await fetch(`${baseUrl}/desk/${key}/comment`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response;
  return data;
};


export const getAdminComments = async (token, timeout) => {
  const response = await fetch(`${baseUrl}/admin/comments`, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: timeout
  });
  const data = await response;
  return data;
};


export const cancelABooking = async (token, bookingId, timeout) => {
  const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: timeout,
  });
  const data = await response;
  return data;
};

export const deleteAdeskFromFavorites = async (token, deskId, timeout) => {
  const response = await fetch(`${baseUrl}/favourite`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: timeout,
    body: JSON.stringify({
      deskId: deskId,
    }),
  });

  const data = await response;
  return data;
};

export const AddADeskToFavorites = async (token, deskId,timeout) => {
  const response = await fetch(`${baseUrl}/favourite`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`,
    },
    timeout: timeout,
    body: JSON.stringify({
      deskId: deskId,
    }),
  });

  const data = await response;
  return data;
};

/* -------

in this area are some pure fetch functions - they have no action with the data

---*/

const baseUrl = "https://deskbooking.dev.webundsoehne.com/api/";

export const  fetchTheLoggedInUser = async (userId, token) => {
  const response = await fetch(`${baseUrl}/user/${userId}`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};


export const fetchAllDesks = async(token)=>{
    const response = await fetch(`${baseUrl}/desk`, {
        method: 'Get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await response.json()
    return json
}


export const fetchAllBookings = async(token)=>{
    const response = await fetch(`${baseUrl}/booking`, {
        method: 'Get',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await response.json()
    return json
}

export const fetchAllComments= async(deskId,token)=>{
    const response = await fetch(`${baseUrl}/desk/${deskId}/comment`, {
        method: 'Get',
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await response.json()
    return json
}


export const bookAFlexDesk = async(token, deskId, dateStart, dateEnd)=>{
    const response = await fetch(`${baseUrl}/booking`, {
        method: 'Post',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            deskId: `${deskId}`,
            dateStart: `${dateStart}`,
            dateEnd: `${dateEnd}`
        })
    })

    const data = await response
    return data
}

export const bookAFixDesk = async(token, deskId, comment)=>{
    const response = await fetch(`${baseUrl}/desk/${deskId}/fix`, {
        method: 'Post',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            comment: `${comment}`
        })
    })

    const data = await response
    return data
}

export const fetchAllFavourites = async(token)=>{
    const response = await fetch(`${baseUrl}/favourite`, {
        method: 'get',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    const data = await response.json()
    return data
}

export const deleteAFavourite = async(token, deskId)=>{
    const response = await fetch(`${baseUrl}/favourite`, {
        method: 'delete',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        },
        body:JSON.stringify({
            deskId: `${deskId}`
        })
    })

    const data = await response
    return data
}

export const fetchAllFixDeskRequests = async(token)=>{
    const response = await fetch(`${baseUrl}/admin/fix-desk-request`, {
        method: 'get',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    const data = await response.json()
    return data
}

export const fixDeskRequestAction = async(token,requestId, action)=>{
    const response = await fetch(`${baseUrl}/admin/fix-desk-request/${requestId}/${action}`, {
        method: 'post',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    const data = await response
    return data
}

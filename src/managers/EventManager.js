/*Getter Functions To Fetch Events*/
export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


/*POST Function*/
export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(response => response.json())
}

export const joinEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json(eventId))
}

/*PUT Function To Update Existing Events*/
export const updateEvent = (eventId, event) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}


/*Delete Functions*/
export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        }
    })
}


export const leaveEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


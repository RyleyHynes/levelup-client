import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const refreshPage = () => {
        window.location.reload(false);
      }
    return (
        <>
        <button className="btn btn-2 btn-sep icon create"
            onClick={() => {
                navigate({pathname: "/events/new"})
            }}
            >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game.title}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">{event.time}</div>
                        <button className="editButton"
                            onClick={() => {
                                navigate({pathname: `/events/edit/${event.id}`})
                            }}
                            >Update</button>
                        <button className="deleteButton"
                            onClick={() => {
                                refreshPage()
                                deleteEvent(event.id)
                                .then(getEvents().then(setEvents))}}>Delete</button>
                    </section>
                })
            }
        </article>
        </>
    )
}
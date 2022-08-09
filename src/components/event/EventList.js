import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

        // to rerender the list
        const renderEvents = () => [
            getEvents().then(setEvents)
        ]
        
    const refreshPage = () => {
        window.location.reload(false);
    }
    
    return (
            <><button className="btn btn-2 btn-sep icon create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            } }
        >Register New Event</button><article className="events">
                {events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event?.game?.title}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">{event.time}</div>
                        {
                                // button to display to either join the event or leave the event, based on if joined is true or false, if joined is true, the false button will appear, and if false the join button will appear, list will rerender once complete.
                                event.joined
                                    ? <button className="btn btn-3" onClick={(() => { leaveEvent(event.id).then(() => renderEvents()) })}>Leave</button>
                                    : <button className="btn btn-2" onClick={(() => { joinEvent(event.id).then(() => renderEvents()) })}>Join</button>
                        }
                            <button className="editButton"
                                onClick={() => {
                                    navigate({ pathname: `/events/edit/${event.id}` })
                                } }
                            >Update</button>
                            <button className="deleteButton"
                                onClick={() => {
                                    refreshPage()
                                    deleteEvent(event.id)
                                        .then(getEvents().then(setEvents))
                                } }>Delete</button>
                    </section>
                })}
            </article>
            </>
    )
}
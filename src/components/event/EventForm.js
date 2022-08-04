import { createEvent } from "@testing-library/react"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager"

export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of 
        the properties of this state variable, you need to provide
        some default values
    */
    const [newEvent, setNewEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0,
        organizerId: parseInt(localStorage.getItem("lu_token"))
    })

    useEffect(() => {
        getGames.then(data => setGames(data))
    },[])

    const changeEventState = (domEvent) => {
        const newEvent = {...newEvent}
        newEvent[domEvent.target.name] = domEvent.target.value
        setNewEvent(newEvent)
    }

    return(
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control" value={newEvent.description}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control" value={newEvent.date} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time" >Time: </label>
                    <input type="time" name="time" required className="form-control" min="1" max="50" value={newEvent.time} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Select A Game: </label>
                    <option value="0">Choose Game:</option>
                    {
                        games.map(game => {
                            return <option value={game.id} key={`game--${game.id}`}>{game.title}</option>
                        })
                    }
                </div>
            </fieldset>

            <button type="submit" onClick={evt => {
                /*Prevents the form from being submitted*/
                evt.preventDefault()
                const event = {
                    description: newEvent.description,
                    date: newEvent.date,
                    time: newEvent.time,
                    game: parseInt(newEvent.gameId),
                    organizer: parseInt(localStorage.getItem("lu_token"))
                }
                /*Send Post request to API*/
                createEvent(event)
                    .then(() => navigate("/events"))
            }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
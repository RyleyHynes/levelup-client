import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvent } from "../../managers/EventManager"
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
        gameId: 0
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    },[])

    const changeEventState = (domEvent) => {
        const copy = {...newEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setNewEvent(copy)
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
                    <input type="date" name="date" required autoFocus className="form-control" value={newEvent.date} onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time" >Time: </label>
                    <input type="time" name="time" required className="form-control" min="1" max="50" value={newEvent.time} onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Select A Game: </label>
                    <select className="form-control" name="game" value={newEvent.game} required onChange={changeEventState}>
                    <option value="0">Choose Game:</option>
                    {
                        games.map(game => {
                            return <option value={game.id} key={`game--${game.id}`}>{game.title}</option>
                        })
                    }
                    </select>
                </div>
            </fieldset>

            <button type="submit" onClick={evt => {
                /*Prevents the form from being submitted*/
                evt.preventDefault()

                const event = {
                    description: newEvent.description,
                    date: newEvent.date,
                    time: newEvent.time,
                    game: parseInt(newEvent.game)
                }
                /*Send Post request to API*/
                createEvent(event)
                    .then(() => navigate("/events"))
            }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
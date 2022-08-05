import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleEvent } from "../../managers/EventManager"
import { updateEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"

export const UpdateEvent = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const [games, setGames] = useState([])

    const [updatedEvent, setUpdatedEvent] = useState({
        description: "",
        date: "",
        time: "",
        gameId: 0
    })

    useEffect(() => {
        getSingleEvent(eventId).then(data => setUpdatedEvent(data))
    },
        [eventId])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])


    const changeEventState = (domEvent) => {
        const copy = { ...updatedEvent }
        copy[domEvent.target.name] = domEvent.target.value
        setUpdatedEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Edit Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control" value={updatedEvent.description}
                        onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control" value={updatedEvent.date} onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time" >Time: </label>
                    <input type="time" name="time" required className="form-control" min="1" max="50" value={updatedEvent.time} onChange={changeEventState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Select A Game: </label>
                    <select className="form-control" name="game" value={updatedEvent.game} required onChange={changeEventState}>
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
                    description: updatedEvent.description,
                    date: updatedEvent.date,
                    time: updatedEvent.time,
                    game: parseInt(updatedEvent.game)
                }
                updateEvent(eventId, event)
                .then(() => navigate("/events"))
            }}
                className="btn btn-primary">Update Event</button>

            </form>
            )
}
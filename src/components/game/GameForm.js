import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { createGame, getGameTypes } from "../../managers/GameManager"

export const GameForm = () => {
    const naviagate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of 
        the properties of this state variable, you need
        to provide some default values.
     */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newGame = {...currentGame}
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="Maker">Maker: </label>
                    <input type="text" name="Maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState} />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control" min="1" max="50" value={currentGame.numberOfPlayers}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select className="form-control" name="gameTypeId" value={currentGame.gameTypeId} required onChange={changeGameState}>
                        <option value="0">Chose Game Type</option>
                        {
                            gameTypes.map(gameType => {
                                return <option value={gameType.id} key={`type--${gameType.id}`}>{gameType.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    //Send POST request to your API
                    createGame(game)
                        .then(() => Navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
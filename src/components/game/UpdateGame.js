import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameTypes, getSingleGame, updateTheGame } from "../../managers/GameManager"


export const UpdateGame = () => {
    const navigate = useNavigate()
    const {gameId} = useParams()

    const [gameTypes, setGameTypes] = useState([])

    const [updateGame, setUpdatedGame] = useState({
        title: "",
        maker: "",
        numberOfPlayers: 0,
        skillLevel: 1,
        gameTypeId: 0
    })

    useEffect(() => {
        getSingleGame(gameId).then(data => setUpdatedGame(data))
    },
        [gameId])

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])


    const changeGameState = (domEvent) => {
        const copy = { ...updateGame }
        copy[domEvent.target.name] = domEvent.target.value
        setUpdatedGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={updateGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={updateGame.maker}
                        onChange={changeGameState} 
                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control" min="1" max="50" value={updateGame.numberOfPlayers}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={updateGame.skillLevel}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select className="form-control" name="gameTypeId" value={updateGame.gameTypeId} required onChange={changeGameState}>
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
                        title: updateGame.title,
                        maker: updateGame.maker,
                        number_of_players: parseInt(updateGame.numberOfPlayers),
                        skill_level: parseInt(updateGame.skillLevel),
                        game_type: parseInt(updateGame.gameTypeId)
                    }

                    //Send POST request to your API
                    updateTheGame(gameId, game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update Game</button>
        </form>
    )
}
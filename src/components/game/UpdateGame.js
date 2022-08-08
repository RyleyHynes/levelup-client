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
        getSingleGame(gameId).then(data => {
            data.game_type=data.game_type.id
            setUpdatedGame(data)})
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
                    <input type="number" name="number_of_players" required className="form-control" min="1" max="50" value={updateGame.numberOfPlayers}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={updateGame.skill_level}
                        onChange={changeGameState} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select className="form-control" name="game_type" value={updateGame.game_type} required onChange={changeGameState}>
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
                        number_of_players: parseInt(updateGame.number_of_players),
                        skill_level: parseInt(updateGame.skill_level),
                        game_type: parseInt(updateGame.game_type)
                    }

                    //Send POST request to your API
                    updateTheGame(gameId, game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update Game</button>
        </form>
    )
}
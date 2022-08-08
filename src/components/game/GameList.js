import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteGame, getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const refreshPage = () => {
        window.location.reload(false)
    }

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <button className="editButton"
                                onClick={() => {
                                    navigate({ pathname: `/games/edit/${game.id}` })
                                }}
                            >Update</button>
                            <button className="deleteButton"
                                onClick={() => {
                                    refreshPage()
                                    deleteGame(game.id).then(
                                        getGames().then(setGames)
                                        )
                                }}
                            >Delete</button>
                        </section>
                    })
                }
            </article>
        </>
    )
}
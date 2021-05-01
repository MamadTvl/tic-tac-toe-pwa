import React from 'react'
import {useGameStyle} from "./styles/useGameStyle";
import {useDispatch, useSelector} from "react-redux";
import {MenuItem, Select} from "@material-ui/core";
import {changeDifficulty} from '../redux/index'
import {changeMode} from "../redux/board/action";

const Game = (props) => {
    const classes = useGameStyle()
    const {
        board,
        player1,
        player2,
        gameFinished,
        difficulty,
        turn,
        mode
    } = useSelector((state) => {
        return state
    })

    const dispatch = useDispatch()


    return (
        <div className={classes.game}>
            <h1 className={classes.header}>
                Tic Tac Toe
            </h1>
            <h3>{turn === 1 && player1.name}{turn === 2 && player2.name} turn</h3>
            <div>
                <span>
                    Difficulty :
                </span>
                <Select
                    labelId="difficulty"
                    value={difficulty}
                    onChange={(event) => dispatch(changeDifficulty(event.target.value))}
                >
                    <MenuItem value={'easy'}>
                        easy
                    </MenuItem>
                    <MenuItem value={'hard'}>
                        hard
                    </MenuItem>
                </Select>
                <span>
                    Mode :
                </span>
                <Select
                    labelId="difficulty"
                    value={mode}
                    onChange={(event) => dispatch(changeMode(event.target.value))}
                >
                    <MenuItem value={'robot'}>
                        robot
                    </MenuItem>
                    <MenuItem value={'friendly'}>
                        friendly
                    </MenuItem>
                </Select>
            </div>
            {
                props.children
            }
        </div>
    )
}
export default Game

import React from 'react'
import {useGameStyle} from "./styles/useGameStyle";
import {useDispatch, useSelector} from "react-redux";
import {Button, MenuItem, NativeSelect, Select, Typography} from "@material-ui/core";
import {changeMode, changeDifficulty, restartGame} from "../redux/board/action";
import {Input} from "./Input";
import {CodeIcon, HeartIcon} from "./icon";

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
            <div className={classes.selectsContainer}>
                <div className={classes.select}>
                    <span className={classes.label}>Difficulty</span>
                    <NativeSelect
                        labelId="difficulty"
                        value={difficulty}
                        input={<Input/>}
                        onChange={(event) => dispatch(changeDifficulty(event.target.value))}
                    >
                        <option value={'easy'}>
                            easy
                        </option>
                        <option value={'hard'}>
                            hard
                        </option>
                        <option value={'impossible'}>
                            impossible (minmax algorithm)
                        </option>
                    </NativeSelect>
                </div>

                <div className={classes.select}>
                    <span className={classes.label}>Mode</span>
                    <NativeSelect
                        labelId="difficulty"
                        value={mode}
                        input={<Input/>}
                        onChange={(event) => dispatch(changeMode(event.target.value))}
                    >
                        <option value={'robot'}>
                            robot
                        </option>
                        <option value={'friendly'}>
                            friendly
                        </option>
                    </NativeSelect>
                </div>
            </div>
            {
                props.children
            }
            <footer>
                {
                    player1.winner && player2.winner ?
                        <h3>Draw</h3>
                        :
                        <>
                            <h3>{player1.winner && `${player1.name} win`}</h3>
                            <h3>{player2.winner && `${player2.name} win`}</h3>
                        </>
                }

                <Button
                    variant={'contained'}
                    color={'primary'}
                    style={{marginTop: 8}}
                    onClick={() => {
                        dispatch(restartGame())
                    }}
                >
                    Restart
                </Button>
                <Typography
                    className={classes.github}
                >
                    <a
                        href={'https://github.com/MamadTvl/tic-tac-toe-pwa'}
                        rel={'noreferrer'}
                        target={'_blank'}
                    >

                        <CodeIcon/>
                    </a>
                    with
                    <HeartIcon/>
                    By
                    <a
                        href={'https://github.com/MamadTvl'}
                        target={'_blank'}
                        rel={'noreferrer'}
                        style={{margin: '0 8px'}}
                    >MamadTvl</a>
                </Typography>
            </footer>
        </div>
    )
}
export default Game

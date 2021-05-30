import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useBoardStyle} from "./styles/useBoardStyle";
import {changePlayerState, changeTurn, finishGame, move} from "../redux";
import {robotPlayEasy, robotPlayHard, robotPlayImpossible} from "../functions/robot/robotPlay";
import {getTheWinner} from "../functions/win";

const Board = () => {
    const classes = useBoardStyle()
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

    const setBorderStyle = (index, row) => {
        switch (index) {
            case 0:
                return {
                    borderBottom: row !== 2 && '6px solid',
                    borderRight: '3px solid'
                }
            case 1:
                return {
                    borderLeft: '3px solid',
                    borderRight: '3px solid',
                    borderBottom: row !== 2 && '6px solid',
                }
            case 2:
                return {
                    borderBottom: row !== 2 && '6px solid',
                    borderLeft: '3px solid'
                }
            default:
                break
        }
    }

    const setLabel = (label) => {
        if (label === 'x') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 106.818 106.795">
                    <path id="Path_2" data-name="Path 2"
                          d="M295.552,195.115a10.667,10.667,0,0,0-15.083,0l-35.136,35.136-35.115-35.136A10.667,10.667,0,0,0,195.135,210.2l35.115,35.136-35.136,35.115a10.667,10.667,0,1,0,14.821,15.345c.089-.086.176-.173.262-.262l35.136-35.115,35.115,35.115a10.667,10.667,0,0,0,15.083-15.082l-35.115-35.115,35.115-35.115a10.666,10.666,0,0,0,.04-15.085Z"
                          transform="translate(-191.858 -191.992)" fill="#009688"/>
                </svg>

            )
        } else if (label === 'o') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 106.666 106.666">
                    <circle id="Ellipse_1" data-name="Ellipse 1" cx="53.333" cy="53.333" r="53.333" fill="#ffc107"/>
                </svg>
            )

        }
    }

    const addWinner = (player, position) => {
        const details = player === 'player1' ? player1 : player2
        dispatch(changePlayerState(player, {
            ...details,
            winner: true
        }))
    }

    const playWithRobot = (row, column) => {
        dispatch(move(row, column, player1.label))
        const winner = getTheWinner(board)
        if (winner !== -1) { // win or equal
            dispatch(finishGame())
            if (winner !== 'equal') {
                addWinner('player1', winner)
            } else {
                addWinner('player1', winner)
                addWinner('player2', winner)
            }
        } else {
            dispatch(changeTurn(2))
            let [robotRow, robotCol] = [-1, -1]
            if (difficulty === 'easy') {
                [robotRow, robotCol] = robotPlayEasy(board)
            } else if (difficulty === 'hard') {
                [robotRow, robotCol] = robotPlayHard(board)
            } else if (difficulty === 'impossible'){
                [robotRow, robotCol] = robotPlayImpossible(board)
            }

            if (robotRow !== -1 || robotCol !== -1) {
                setTimeout(() => {
                    dispatch(move(robotRow, robotCol, player2.label))
                    const winner = getTheWinner(board)
                    if (winner !== -1) { //win or equal
                        dispatch(finishGame())
                        if (winner !== 'equal') {
                            addWinner('player2', winner)
                        } else {
                            addWinner('player1', winner)
                            addWinner('player2', winner)
                        }
                    }
                    dispatch(changeTurn(1))
                }, 500)
            }
        }
    }

    const play2Player = (row, column) => {
        if (turn === 1) {
            dispatch(move(row, column, player1.label))
            const winner = getTheWinner(board)
            if (winner === 'equal') {
                dispatch(finishGame())
                addWinner('player1', winner)
                addWinner('player2', winner)
            } else if (winner !== -1) {
                dispatch(finishGame())
                addWinner('player1', winner)
            }
            dispatch(changeTurn(2))
        } else {
            dispatch(move(row, column, player2.label))
            const winner = getTheWinner(board)
            if (winner === 'equal') {
                dispatch(finishGame())
                addWinner('player1', winner)
                addWinner('player2', winner)
            } else if (winner !== -1) {
                dispatch(finishGame())
                addWinner('player2', winner)
            }
            dispatch(changeTurn(1))
        }
    }


    return (
        <table className={classes.table}>
            <tbody>
            {
                board.map((row, rowKey) => (
                    <tr className={classes.row} key={rowKey}>
                        {
                            row.map((column, columnKey) => (
                                <td
                                    onClick={() => {
                                        if (board[rowKey][columnKey] === 0 && !gameFinished)
                                            if (mode === 'robot') {
                                                turn === 1 && playWithRobot(rowKey, columnKey)
                                            } else {
                                                play2Player(rowKey, columnKey)
                                            }
                                    }}
                                    style={setBorderStyle(columnKey, rowKey)}
                                    className={classes.block}
                                    key={columnKey + 1000}
                                >
                                    {
                                        setLabel(column)
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default Board

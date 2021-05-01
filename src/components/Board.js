import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useBoardStyle} from "./styles/useBoardStyle";

const Board = () => {
    const classes = useBoardStyle()
    const board = useSelector((state) => {
        return state.board
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

    return (
        <table className={classes.table}>
            <tbody>
            {
                board.map((row, rowKey) => (
                    <tr className={classes.row} key={rowKey}>
                        {
                            row.map((column, columnKey) => (
                                <td
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

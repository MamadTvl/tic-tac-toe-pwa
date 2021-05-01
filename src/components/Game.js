import React from 'react'
import {useGameStyle} from "./styles/useGameStyle";


const Game = (props) => {
    const classes = useGameStyle()
    return(
        <div className={classes.game}>
            {
                props.children
            }
        </div>
    )
}
export default Game

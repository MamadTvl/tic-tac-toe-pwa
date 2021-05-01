import {MOVE} from "./types";
import {FINISH_GAME} from "./types";
import {CHANGE_PLAYER_STATE} from "./types";
import {CHANGE_DIFFICULTY} from "./types";

export const move = (row, column, playerName) => {
    return {
        type: MOVE,
        row: row,
        column: column,
        playerName: playerName,
    }
}

export const finishGame = () => {
    return {
        type: FINISH_GAME,
    }
}

export const changePlayerState = (player, details) => {
        return {
            type: CHANGE_PLAYER_STATE,
            player: player,
            details: details
        }
}

export const changeDifficulty = (difficulty) => {
    return {
        type: CHANGE_DIFFICULTY,
        difficulty: difficulty,
    }
}

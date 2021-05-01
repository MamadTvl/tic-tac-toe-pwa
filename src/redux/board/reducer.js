import {MOVE} from "./types";
import {FINISH_GAME} from "./types";
import {CHANGE_PLAYER_STATE} from "./types";
import {CHANGE_DIFFICULTY} from "./types";

const initialState = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    gameFinished: false,
    player1: {
        name: 'player 1',
        score: 0,
        starter: true,
        label: 'x',
        turn: true,
    },
    player2: {
        name: 'robot',
        score: 0,
        starter: false,
        label: 'o',
        turn: false,
    },
    difficulty: 'easy',
}

const reducer = (state = initialState, action) => {
    switch (action) {
        case MOVE: {
            let board = state.board
            board[action.row][action.column] = action.playerName
            return {
                ...state,
                board: board
            }
        }
        case FINISH_GAME: {
            return {
                ...state,
                gameFinished: true,
            }
        }
        case CHANGE_PLAYER_STATE: {
            if (action.player === 'player1'){
                return {
                    ...state,
                    player1: action.details,
                }
            } else {
                return {
                    ...state,
                    player2: action.details,
                }
            }
        }
        case CHANGE_DIFFICULTY: {
            return {
                ...state,
                difficulty: action.difficulty,
            }
        }
        default:
            return state
    }
}

export default reducer

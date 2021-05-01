import React from 'react'
import {Provider} from "react-redux";
import Board from "./components/Board";
import store from "./redux/store";
import {CssBaseline} from "@material-ui/core";
import Game from "./components/Game";

function App() {
    return (
        <Provider store={store}>
            <CssBaseline/>
            <Game>
                <Board/>
            </Game>
        </Provider>
    );
}

export default App;

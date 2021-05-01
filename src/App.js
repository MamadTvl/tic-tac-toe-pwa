import React from 'react'
import {ThemeProvider} from "@material-ui/styles";
import {theme} from 'theme'
import {Provider} from "react-redux";
import store from 'redux/store'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <div className="App">
                </div>
            </Provider>
        </ThemeProvider>
    );
}

export default App;

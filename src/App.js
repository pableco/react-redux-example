import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';

import Navigation from "./component/Navigation/Navigation";
import theme from './commonStyles/theme';
import GlobalStyle from './commonStyles/Global.styles';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router className="App">
                <Switch>
                    <Route path='/:section/:id?' component={Navigation}></Route>
                    <Route exact path="/" render={() => <Redirect to="/list" />}/>
                    <Route path="/*" render={() => <Redirect to="/404" />}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(App)

import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Main from './components/main';
import Nickname from './components/nickname';
import StartChat from './components/start-chat';
import Chat from './components/chat';

const App = (props) => {
  return <Router>
    <Switch>
      <Route path="/" component={Main}>
        <Redirect to="/start" />
        <Route path="/start" component={StartChat} />
        <Route path="/nickname" component={Nickname} />
        <Route path="/chat" component={Chat} />
      </Route>
    </Switch>
  </Router>
}


export default App;
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import FeedBack from './pages/FeedBack';
// import logo from './trivia.png';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/feedback" component={ FeedBack } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}

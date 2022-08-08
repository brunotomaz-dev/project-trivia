import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Header from './components/Header';
import Login from './pages/Login';
import Settings from './pages/Settings';
// import logo from './trivia.png';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </>
  );
}

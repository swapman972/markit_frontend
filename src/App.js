import React from 'react';
import './App.css';
import welcome from './components/welcome'
import seasonPick from './components/seasonPick'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserShowPage from './components/UserShowPage';
import summerSeason from './components/summerSeason';
import winterSeason from './components/winterSeason';

// import { Container, Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';


function App() {
  return (
    <Router>
      {/*
        <Navbar>

        </Navbar>
      */}
      <Route component={Navbar} exact path={["/seasonPick", "/userProfile", "/summer", "/winter"]}/>
      <Route exact path="/" component={welcome}/>
      <Route exact path="/seasonPick" component={seasonPick}/>
      <Route exact path="/userProfile" component={UserShowPage}/>
      <Route exact path="/summer" component={summerSeason}/>
      <Route exact path="/winter" component={winterSeason}/>
    </Router>
  );
}

export default App;

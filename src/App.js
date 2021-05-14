import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Map } from './components/Map.jsx';
// import { Tab } from './containers/Tab.jsx';

function App() {
  return (
    <Router>
      <Switch>
        // root
        <Route
          exact
          path="/">
          <Map />          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
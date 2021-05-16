import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Screen } from './components/Screen.jsx';
// import { Tab } from './containers/Tab.jsx';

function App() {
  return (
    <Router>
      <Switch>
        // root
        <Route
          exact
          path="/">
          <Screen />          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
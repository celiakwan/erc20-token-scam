import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import Hidden from './Hidden';
import '../style/App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/hidden" component={Hidden} />
        </Switch>
      </Router>
    );
  }
}

export default App;
import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import IndexPage from "./IndexPage";

const ShowPage = props => {
  const {
    match: {
      params: { id }
    }
  } = props;

  return <div>Show Page: {id} </div>;
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={IndexPage} />
          <Route path="/movie/:id" component={ShowPage} />
        </div>
      </Router>
    );
  }
}

export default App;

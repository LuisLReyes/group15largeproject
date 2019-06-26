import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import elementOne from "./components/element-one.component";
import elementTwo from "./components/element-two.component";
import elementThree from "./components/element-three.component";


class App extends Component {
  render() {
    return (
      <Router>
        
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://google.com" target="_blank">
              {/*<img src={} width="30" height="30" alt="google.com" />*/}
            </a>
            <Link to="/" className="navbar-brand">Skeleton for Group 15</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Elements</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create ???</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
        <Route path="/" exact component={elementOne} />
        <Route path="/element2/:id" component={elementTwo} />
        <Route path="/element3" component={elementThree} />
        </div>
      </Router>
    );
  }
}

export default App;
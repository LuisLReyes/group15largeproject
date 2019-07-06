import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class ElementOne extends Component {
    render() {
        return (
            <div>
                <p>Welcome to Chit-Chat.</p>
                <p>Log in to have access for enhanced features</p>
            </div>
            <div>
                 <button type="submit" id="loginBtn" class="btn btn-lg btn-primary btn-block" value="Submit">Login</button>
                 <button type="submit" id="loginBtn" class="btn btn-lg btn-primary btn-block" value="Continue Anonymously">Login</button>
            </div>
        )
    }
}

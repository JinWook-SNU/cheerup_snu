import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BoardPage from '../pages/BoardPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

class App extends Component {
    render() {
        return (
          <div>
              <Route exact path="/" component={BoardPage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
          </div>
        );
    }
}

export default App;
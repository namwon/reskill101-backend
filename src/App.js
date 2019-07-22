import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MainGroups from './components/Projects/mainGroups'
import VideosAdd from './components/Projects/videosAdd'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'

class App extends Component {  
  render() {    
    return (      
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>  
            <Route exact path='/' component={MainGroups} />
            <Route exact path='/mainGroup' component={MainGroups} />
            <Route exact path='/item/:id' component={VideosAdd} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }}
export default App;

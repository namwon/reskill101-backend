import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MainGroups from './components/Projects/mainGroups'
import AddGroup from './components/Projects/addGroup'
import VideosAdd from './components/Projects/videosAdd'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import VideosList from './components/Projects/videosList'

class App extends Component {  
  render() {    
    return (      
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>  
            <Route exact path='/' component={MainGroups} />
            <Route exact path='/mainGroup' component={MainGroups} />
            <Route exact path='/addGroup' component={AddGroup} />
            <Route exact path='/addVideo/:id' component={VideosAdd} />
            <Route exact path='/item/:id' component={VideosList} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }}
export default App;

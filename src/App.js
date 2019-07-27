import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MainGroups from './components/Projects/mainGroups'
import AddGroup from './components/Projects/addGroup'
import editGroup from './components/Projects/editGroup'
import VideosAdd from './components/Projects/videosAdd'
import VideosEdit from './components/Projects/videosEdit'
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
            <Route path='/mainGroup' component={MainGroups} />
            <Route path='/addGroup' component={AddGroup} />
            <Route path='/editGroup/:id' component={editGroup} />
            <Route path='/addVideo/:id' component={VideosAdd} />
            <Route path='/item/:id' component={VideosList} />
            <Route path='/video/:id/edit/:eid' component={VideosEdit} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }}
export default App;

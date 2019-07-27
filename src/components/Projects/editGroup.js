import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import firebase from '../../config/firebase'
import { firebaseConnect } from 'react-redux-firebase'
import { Redirect} from 'react-router-dom'

//import firebaseApp from 'firebase'

class EditGroup extends Component {

  constructor(props){
     super(props);
     this.state = {
        items:[],
        item_id:'',
        title:'',
        desc:'',
        photos:null
     }

     this.handleChange = this.handleChange.bind(this)
     this.handleFileChange = this.handleFileChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const itemsRef = firebase.database().ref('bookshelf/data');
    itemsRef.on('value',(snapshot) => {
       let items = snapshot.val();
       let newState = [];
       for(let item in items){
          newState.push({
             item_id:item,
             title:items[item].title,
             desc:items[item].desc,
             photos:items[item].photos
          })
       }
       this.setState({
          items:newState
       })
    })
  }

  handleChange(e){
     this.setState({
       [e.target.name]:e.target.value
     })     
  }
  handleFileChange(e){
    const file = e.target.files[0]
    this.setState({
      photos: file
    })
  }

  handleSubmit(e){
    e.preventDefault();

    //console.log(this.state.photos);
    if(this.state.item_id !== ''){
         return this.updateItem()
    }
    
    const itemsRef = firebase.database().ref('bookshelf/data')
    
    const storageRef = firebase.storage().ref('images');
    const mainimg =  storageRef.child(this.state.photos.name)
    mainimg.put(this.state.photos)
      .then((snapshot) => {
        //console.log('upload complete')
        //console.log('getDownloadURL start')        
        mainimg.getDownloadURL().then(
          (url) => {
            this.setState({
              photos: url,
            })

            const item = {
              title : this.state.title,
              desc : this.state.desc,
              photos : this.state.photos,
              createedAt: firebase.database.ServerValue.TIMESTAMP
            }
            itemsRef.push(item).then(()=>{console.log('load complete')})
            this.setState({
              item_id:'',
              title:'',
              desc:'',
              photos:null
            })
            this.props.history.push('/')
          }
        )
      });
  }

  render() {
    const { auth  } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="app">
        <div className="container" style={{marginTop:20}}>
          <h2>Add Group Skill</h2>
          <form onSubmit={this.handleSubmit} style={{marginTop:20}}>
            <div className="form-group row">
              <label for="title" className="col-md-2 col-form-label">Title</label>
              <div className="col-md-5">
                <input type="text" className="form-control" name="title" placeholder="Enter Title Group" onChange={this.handleChange} value={this.state.title}/>
              </div>
            </div>
            <div className="form-group row">
              <label for="desc" className="col-md-2 col-form-label">Description</label>
              <div className="col-md-8">
                <textarea className="form-control" name="desc" rows="3" placeholder="Enter Description" onChange={this.handleChange}>{this.state.desc}</textarea>
              </div>
            </div>
            <div className="form-group row">
              <label for="photos" className="col-md-2 col-form-label">Cover Group</label>
              <div className="col-md-10">
                <input type="file" name="photos" onChange={this.handleFileChange}/>
              </div>
            </div>
            <button className="btn btn-primary" ><i className="fa fa-save"></i> Save</button>      
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //console.log(state)
    return{
        auth: state.firebase.auth,
        //notifications: state.firestore.ordered.notifications    
      }
  }

//export default MainGroups;
export default compose(
  connect(mapStateToProps),
  firebaseConnect((props) => {
    return [
      'bookshelf'
    ]
  })
  
)(EditGroup)
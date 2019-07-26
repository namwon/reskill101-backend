import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import firebase from '../../config/firebase'
import { firebaseConnect } from 'react-redux-firebase'
import { Redirect} from 'react-router-dom'

//import { Link } from 'react-router-dom'
//import firebaseApp from 'firebase'

class VideosAdd extends Component {

  constructor(props){
     super(props);
     this.state = {
      items:[],
      //mainTitle: props.group.title,
      page_id: '',
      pagedesc:'',
      photo:'',
      linkvideo:'',
      titlevideo:'',
      count: 0
     }
     
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })     
  }
  handleFileChange(e){
    const file = e.target.files[0]
    this.setState({
      photo: file
    })
  }
  componentDidMount(){
    const { id } = this.props;
    const itemsRef = firebase.database().ref('bookshelf/data/'+ id + '/page')
    //console.log(group);
    
    itemsRef.on('value',(snapshot) => {
       let items = snapshot.val();
       let newState = [];
       for(let item in items){
          newState.push({
             page_id:item,
             pagedesc:items[item].pagedesc,
             photo:items[item].photo,
             linkvideo:items[item].linkvideo,
             titlevideo:items[item].titlevideo
          })
       }
       this.setState({
          items:newState
       })
    })
  }

  handleSubmit(e){
    e.preventDefault();

    if(this.state.page_id !== ''){
         return this.updateItem()
    }
    const { id } = this.props;
    const itemsRef = firebase.database().ref('bookshelf/data/'+ id + '/page')
    const storageRef = firebase.storage().ref('images');
    const mainimg =  storageRef.child(this.state.photo.name)
    mainimg.put(this.state.photo)
    .then((snapshot) => {
      //console.log('upload complete')
      //console.log('getDownloadURL start')        
      mainimg.getDownloadURL().then(
        (url) => {
          this.setState({
            photo: url,
          })

          const item = {
            linkvideo:this.state.linkvideo,
            titlevideo:this.state.titlevideo,
            pagedesc : this.state.pagedesc,
            photo : this.state.photo,
            createedAt: firebase.database.ServerValue.TIMESTAMP
          }
          itemsRef.push(item).then(()=>{console.log('load complete')})
          this.setState({
            page_id: '',
            pagedesc:'',
            photo:'',
            linkvideo:'',
            titlevideo:'',
            count: 0
          })
          this.props.history.push('/item/'+id)
        }
      )
    });
  }

  updateItem(){
    const { id } = this.props;

    var obj = { pagedesc:this.state.pagedesc, photo:this.state.photo }

    const itemsRef = firebase.database().ref('bookshelf/data/'+ id + '/page')

    itemsRef.child(this.state.item_id).update(obj);

    this.setState({
      item_id:'',
      pagedesc:'',
      photo:'',
      count: 0
    })

  }
  removeItem(itemId){
    const { id } = this.props;

    const itemsRef = firebase.database().ref('/bookshelf/data/'+ id + '/page');
    itemsRef.child(itemId).remove();
    this.setState({
      count: 0
    })
  }

  render(props) {
    const { auth, group } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="app">
        <div className="container" style={{marginTop:70}}>
          <h3>Add Vidoe to [{group.title}]</h3>
          {group.desc}
          <form onSubmit={this.handleSubmit} style={{marginTop:20}}>
            <div className="form-group row">
                <label for="titlevideo" className="col-md-2 col-form-label">Title</label>
                <div className="col-md-5">
                    <input type="text" className="form-control" name="titlevideo" placeholder="Enter Title Group" onChange={this.handleChange} value={this.state.titlevideo}/>
                </div>
            </div>
            <div className="form-group row">
                <label for="linkvideo" className="col-md-2 col-form-label">Link URL</label>
                <div className="col-md-5">
                    <input type="text" className="form-control" name="linkvideo" placeholder="Enter http://youtube.com/xxxxx" onChange={this.handleChange} value={this.state.linkvideo}/>
                </div>
            </div>
            <div className="form-group row">
                <label for="photo" className="col-md-2 col-form-label">Cover Skill</label>
                <div className="col-md-10">
                    <input type="file" name="photo" onChange={this.handleFileChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label for="pagedesc" className="col-md-2 col-form-label">Description</label>
                <div className="col-md-8">
                    <textarea className="form-control" name="pagedesc" rows="3" placeholder="Enter Description" onChange={this.handleChange}>{this.state.pagedesc}</textarea>
                </div>
            </div>
            <button className="btn btn-primary" ><i className="fa fa-save"></i> Save</button>      
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const mainItems = state.firebase.data.bookshelf
  const group = mainItems ? mainItems.data[id] : null
  //console.log(group);

 return{
   group: group,
   auth: state.firebase.auth,
   id: id
 }

  

}

//export default connect(mapStateToProps)(VideosAdd)
export default compose(
  connect(mapStateToProps),
  firebaseConnect((props) => {
    return [
      'bookshelf'
    ]
  })
  
)(VideosAdd)
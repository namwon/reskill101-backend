import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import firebase from '../../config/firebase'
import { firebaseConnect } from 'react-redux-firebase'
import { Link, Redirect} from 'react-router-dom'

//import firebaseApp from 'firebase'

class MainGroups extends Component {

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
    const itemsRef = firebase.database().ref('bookshelf/data').orderByChild('createedAt');
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
        console.log('upload complete')
        console.log('getDownloadURL start')        
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
          }
        )
      });
    //console.log(this.state.photos)
       
    
  }
  handleUpdate = (item_id = null , title = null , desc = null, photos = null) => {
    this.setState({item_id,title,desc,photos})
  }

  updateItem(){

      var obj = { title:this.state.title,desc:this.state.desc }

      const itemsRef = firebase.database().ref('/bookshelf/data')

      itemsRef.child(this.state.item_id).update(obj);

      this.setState({
        item_id:'',
        title:'',
        desc:'',
        photos:''
      })

  }

  removeItem(itemId){
    const itemsRef = firebase.database().ref('/bookshelf/data');
    itemsRef.child(itemId).remove();
  }
  render() {
    const { auth  } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="app">
        <div className="container" style={{marginTop:20}}>
          <Link to="/addGroup" className="btn btn-primary">Add Group</Link>
          <br/><br/>
          <table className="table table-sm table-bordered">
            <thead>
              <tr className="thead-dark">
                <th width="20%">Thumail</th>
                <th width="65%">Title</th>
                <th width="5%">Videos</th>
                <th width="5%">Edit</th>
                <th width="5%">Delete</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.items.map((item) => {
                return (
                  <tr>
                    <td>
                      <img className="img-fluid" src={item.photos} alt={item.title}/>
                    </td>
                    <td>
                      <h5>{item.title}</h5>
                      {item.desc}
                    </td>
                    <td>
                      <Link to={'/item/' + item.item_id} key={item.item_id}  className='btn btn-info btn-sm'>Add</Link>
                    </td>
                    <td>
                      <Link to={'/editGroup/' + item.item_id} key={item.item_id}  className='btn btn-warning btn-sm'>Edit</Link>
                    </td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.item_id)}>Delete</button></td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
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
  
)(MainGroups)
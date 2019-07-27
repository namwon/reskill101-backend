import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import firebase from '../../config/firebase'
import { firebaseConnect } from 'react-redux-firebase'
import { Link, Redirect } from 'react-router-dom'
import { Table } from 'reactstrap'
//import { Link } from 'react-router-dom'
//import firebaseApp from 'firebase'

class VideosList extends Component {

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
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
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

    const item = {
      pagedesc : this.state.pagedesc,
      photo : this.state.photo
    }

    itemsRef.push(item).then(()=>{
      this.setState({
        page_id: '',
        pagedesc:'',
        photo:'',
        linkvideo:'',
        titlevideo:'',
        count: 0
      })
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
  const MAX_LENGTH = 150;
  const { auth, group, id } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="app">
        <div className="container" style={{marginTop:70}}>
          <h3>{group.title}</h3>
          {group.desc}
          <hr/>
          <Link to={'/addVideo/' + id} key={id}  className='btn btn-info'>Add Video</Link>
          <br/><br/>
          <Table responsive striped bordered size="sm">
            <thead className="thead-dark">
              <tr>
                <th>No.</th>
                <th>Cover</th>
                <th>Video Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.items.map((item) => {
                this.state.count++
                return (
                  <tr>
                    <th scope="row">{this.state.count}</th>
                    <td><img className="img-fluid" src={item.photo} alt={item.title}/></td>
                    <td>
                      {item.pagedesc.length > MAX_LENGTH ?
                        (
                          <div>
                            {`${item.pagedesc.substring(0, MAX_LENGTH)}...`}
                          </div>
                        ) :
                        <p>{item.pagedesc}</p>
                      }
                    </td>
                    <td>
                      <Link to={'/Video/' + id + '/edit/' + item.page_id} key={item.page_id}  className='btn btn-sm btn-warning'>Edit</Link>
                    </td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.page_id)}>Delete</button></td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const mainItems = state.firebase.data.bookshelf
  const group = mainItems ? mainItems.data[id] : null
  console.log(group);

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
  
)(VideosList)
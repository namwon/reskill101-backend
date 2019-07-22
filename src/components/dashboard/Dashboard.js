import React, { Component } from 'react'

class Dashboard extends Component {
  render(){
    const { groupcourse, auth, notifications  } = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    return(
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <GroupLists groupcourse={groupcourse} cur_page={1} per_page={10} />
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
    return{
        // projects: state.project.projects  
        // .project in rootRuducer .projects in projectRuducer
        groupcourse: state.firestore.ordered.groupcourse,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications    
      }
  }
      
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'groupcourse' , orderBy: ['createedAt', 'asc']} ,
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}  
  ])
)(Dashboard)
      


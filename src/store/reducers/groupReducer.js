const initState = {
    groupcourse: [
        {id: '1', gTitle: 'help me find peach', gContent: 'blah blah blah'},
        {id: '2', gTitle: 'collect all the stars', gContent: 'blah blah blah'},
        {id: '2', gTitle: 'collect all the stars', gContent: 'blah blah blah'},
        {id: '3', gTitle: 'egg hunt with yoshi', gContent: 'blah blah blah'}
    ]
}

const groupReducer = (state = initState, action) => {
  switch (action.type) {
      case 'CREATE_GROUP':
          //console.log('created group', action.group)
          return state
      case 'CREATE_GROUP_ERROR':
          //console.log('create group error', action.err)
          return state
      case 'DELETE_GROUP':
          //console.log('delete group', action.id)
          return state
      case 'DELETE_GROUP_ERROR':
          //console.log('delete group error', action.err)
          return state
      case 'UPDATE_GROUP':
          //console.log('update group', action.group)
          return state
      case 'UPDATE_GROUP_ERROR':
          //console.log('update group error', action.err)
          return state
      case 'CREATE_SUBGROUP':
          console.log('create sub group', action.sGroup)
          return state
      case 'CREATE_SUBGROUP_ERROR':
          console.log('create sub group error', action.err)
          return state

      default:
          return state
    }
}

export default groupReducer

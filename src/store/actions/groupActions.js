export const createGroup = (group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('groupcourse').add({ 
      ...group,
      authorFirstName: profile.firstName,
      authorLastName:  profile.lastName,
      authorId: authorId,
      createedAt: new Date()
    }).then( () => {
      dispatch({ type: 'CREATE_GROUP', group });
    }).catch((err) => {
      dispatch({ type: 'CREATE_GROUP_ERROR', err});
    })
  }
};

export const createSubGroup = (sgroup) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;

    firestore.collection('subcourse').add({ 
      ...sgroup,
      authorFirstName: profile.firstName,
      authorLastName:  profile.lastName,
      createedAt: new Date()
    }).then( () => {
      dispatch({ type: 'CREATE_SUBGROUP', sgroup });
    }).catch((err) => {
      dispatch({ type: 'CREATE_SUBGROUP_ERROR', err});
    })
  }
};

export const deleteGroup = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    firestore.collection('groupcourse').doc(id).delete().then(
      () => {
      dispatch({ type: 'DELETE_GROUP', id });
    }).catch((err) => {
      dispatch({ type: 'DELETE_GROUP_ERROR', err});
    })

  }
};
 
export const updateGroup = (group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('groupcourse').doc(group.id).set({
      ...group,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      updateDate: new Date()
    },
    { merge: true }
  ).then( () => {
      dispatch({ type: 'UPDATE_GROUP', group });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_GROUP_ERROR', err});
    })
  }
};

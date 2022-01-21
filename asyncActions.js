const redux = require("redux")
const reduxThunk = require("redux-thunk")
const axios = require("axios")

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = reduxThunk.default


// setting initial stat
const initiaState = {
  loading: false,
  users: [],
  error: ''
}

// constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// creating action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

// reducer
const reducer = (state = initiaState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      }

    case fetchUsersFailure:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      }

    default: return state

  }
}


// now create an action creation with thunk middleware
// it's have the capability to return a function instead of an action
// we will use a jsonplaceholder.typicode.com for the API endpoints
// this function is now behave like asynchronous
const fetchUsers=()=>{
  // have capability to return a function instead of an action
  return dispatch => {
    // this disptach will call an action creater that will start loading
    dispatch(fetchUsersRequest())

    // calling an API endpoint
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
      // response.data is the array of users
      const users = response.data.map(user=>user.id)
      
      // disptach the users data
      dispatch(fetchUsersSuccess(users))
    })
    .catch(error=>{
      // error.message is the erro description
      dispatch(fetchUsersFailure(error.message))
    })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
const unsubscribe = store.subscribe(() => console.log("State: ",store.getState()))
store.dispatch(fetchUsers())
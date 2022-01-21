const redux = require("redux")
const reduxLogger = require("redux-logger")

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

const buyCake = () => {
  return {
    type: BUY_CAKE,
    payload: 'Buying a cake'
  }
}

const buyIcecream = () => {
  return {
    type: BUY_ICECREAM,
    payload: 'Buying an Ice-cream'
  }
}

// reducer
// (previousState, action) => newState

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    default: return state
  }
}

const iceCreameReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
    default: return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreameReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log("Initial state: ", store.getState())

const unsubscribe = store.subscribe(() => { })
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()
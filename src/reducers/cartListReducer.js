export const ADD_TO_CART = "ADD_TO_CART";

const INITIAL_STATE = {
  data: []
}
const actions = {};

actions[ADD_TO_CART] = (nextState, action) => {
  debugger
  let modifiedCardList = { ...nextState };
  modifiedCardList=action.data;
  nextState = modifiedCardList;
  return nextState;
}

export default function cartListReducer(state = INITIAL_STATE, action) {
  let nextState = JSON.parse(JSON.stringify(state))
  if (action.type in actions) {
    nextState = actions[action.type](nextState, action)
  }
  return nextState;
}

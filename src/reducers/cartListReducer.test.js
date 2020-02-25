import cartListReducer from './cartListReducer';
import {ADD_TO_CART} from './cartListReducer';

const INITIAL_STATE = {
  data: [],
}

it('Should set new state value', () => {
   const data=[{id:1,name:'samsumg'}]
    let action = { type: ADD_TO_CART,data:data };
    let newState = cartListReducer(INITIAL_STATE, action);
    expect(newState).toEqual(data);
})
import { combineReducers } from 'redux';
import cartListReducer from './cartListReducer';
const rootReducer = combineReducers({
  cartList: cartListReducer
})
export default rootReducer;
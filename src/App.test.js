import React from 'react';
import App from './App';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
let cartList=[{id:1},{id:2}]
const store = mockStore({cartList});
it('should render App', () => {
const wrapper = mount(<Provider store={store} ><App cartList={cartList}/></Provider>);
})
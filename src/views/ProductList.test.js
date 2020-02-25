import { mount } from 'enzyme';
import React from 'react';
import ProductList from './ProductList';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Card, Input, Modal } from 'reactstrap';
import ProductDetail from './ProductDetail';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let cartList = [{ id: 1 }, { id: 2 }]
const store = mockStore({ cartList });
const wrapper = mount(<Provider store={store}><ProductList onChange={() => { }} cartList={cartList}
  match={{ 'id': 1 }} /></Provider>);

it('should find Input', () => {
  expect(wrapper.find(Input)).toHaveLength(3);
})

it('should find Modal', () => {
  expect(wrapper.find(Modal)).toHaveLength(1);
})
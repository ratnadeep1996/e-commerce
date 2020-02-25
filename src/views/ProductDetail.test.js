import { mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Card, Button } from 'reactstrap';
import { NotificationContainer } from 'react-notifications';
import ProductDetail from './ProductDetail';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let product = { id: 1, name: 'samsung', price: 100 };
let cartList = [{ id: 1, product: { Quantity: 1 } }, { id: 2, product: { Quantity: 2 } }]
const store = mockStore({ product });
const wrapper = mount(<Provider store={store}><ProductDetail onChange={() => { }} product={product}
  cartList={cartList} /></Provider>);

it('should find NotificationContainer', () => {
  expect(wrapper.find(NotificationContainer)).toHaveLength(1);
})
it('should find cart button and click it', () => {
  wrapper.find('button#cartButton').simulate('click');
})
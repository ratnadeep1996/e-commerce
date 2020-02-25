import { mount } from 'enzyme';
import React from 'react';
import Basket from './Basket';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Card, Table, CardBody } from 'reactstrap';
import { NotificationContainer } from 'react-notifications';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let cartList=[{id:1,product:{Quantity:1}},{id:2,product:{Quantity:2}}]
const store = mockStore({cartList});
const wrapper = mount(<Provider store={store}><Basket onChange={() => { } } cartList={cartList} /></Provider>);


it('should find Card', () => {
  expect(wrapper.find(Card)).toHaveLength(1);
})

it('should find CardBody', () => {
  expect(wrapper.find(CardBody)).toHaveLength(1);
})

it('should find Table', () => {
  expect(wrapper.find(Table)).toHaveLength(1);
})

it('should find NotificationContainer', () => {
  expect(wrapper.find(NotificationContainer)).toHaveLength(1);
})

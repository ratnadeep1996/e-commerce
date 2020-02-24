import { mount } from 'enzyme';
import React from 'react';
import Basket from './Basket';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Card, Table, CardBody, Button } from 'reactstrap';
import { NotificationContainer } from 'react-notifications';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let carList=[{id:1},{id:2}]
const store = mockStore({carList});
const wrapper = mount(<Provider store={store}><Basket onChange={() => { } } cartList={carList} /></Provider>);


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

// it('should find button', () => {
//   expect(wrapper.find(Button)).toHaveLength(1);
// })

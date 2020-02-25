import { mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Navbar, NavbarBrand, Badge } from 'reactstrap';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let cartList = { id: 1, name: 'samsung', price: 100 };
const store = mockStore({ cartList });
const wrapper = mount(<Router><Provider store={store}><NavBar onChange={() => { }} /></Provider></Router>);

it('should find Navbar', () => {
  expect(wrapper.find(Navbar)).toHaveLength(1);
})

it('should find NavbarBrand', () => {
  expect(wrapper.find(NavbarBrand)).toHaveLength(1);
})
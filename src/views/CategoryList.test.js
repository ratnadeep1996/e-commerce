import { mount } from 'enzyme';
import React from 'react';
import CategoryList from './CategoryList';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Card, Row } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
let data=[{id:1,name:'a'},{id:2,name:'b'}];
 let varState = { categoryList: data };
const wrapper = mount(<Router><CategoryList /></Router>);
wrapper.setState(varState);

it('should find Row', () => {
  expect(wrapper.find(Row)).toHaveLength(1);
})



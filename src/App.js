import React, { Component } from 'react';
import './App.scss';
import CategoryList from './views/CategoryList';
import ProductList from './views/ProductList';
import Basket from './views/Basket';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Navbar from './views/NavBar';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}


	render() {
		return (
			<div>
				<HashRouter>
				<Navbar />
					<Switch>
						<Route path="/" exact={true} component={CategoryList} />
						<Route path="/category/:id" exact={true} component={ProductList} />
						<Route path="/cart" exact={true} component={Basket} />
					</Switch>
				</HashRouter>
				
			</div>

		);
	}
}

export default App;

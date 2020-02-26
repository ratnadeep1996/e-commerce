import React, { Component } from 'react';
import { Col, Row, Card, CardBody, Input, CardTitle, Button, Modal } from 'reactstrap';
import ProductDetail from './ProductDetail';

const SORT_BY = 'sortBy';
const PRICE_RANGE = 'priceRange';
const SEARCH_TEXT = 'searchText';

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productList: [],
			categoryId: '',
			sortBy: '',
			selectedProduct: '',
			showModal: false,
			searchText: '',
			priceRange: ''
		}
	}
	componentDidMount() {
		const categoryId = this.props.match.params ? parseInt(this.props.match.params.id) : null;
		this.setState({
			categoryId
		})
		this.getProductList();
	}

	//get list of all products
	getProductList = () => {
		fetch('http://localhost:8000/products').then(res => res.json())
			.then(data => this.setState({
				productList: data
			}))
	}

	onChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		if (key === SEARCH_TEXT) {
			if (value === '') {
				this.getProductList();
			}
			this.setState({
				[key]: value
			})
		}
		else if (key === SORT_BY)
			this.setState({
				[key]: parseInt(value)
			}, () => this.renderProductList());
		else if (key === PRICE_RANGE) {
			this.setState({
				[key]: parseInt(value)
			}, () => this.renderProductList());
		}
	}

	//options for sorting
	renderOptionSortBy = () => {
		const options = [{ id: 1, name: 'Price-Low to High' }, { id: 2, name: 'Price-High to Low' }]
		return options.map((item, index) => {
			return <option key={item.index} value={item.id}>{item.name}</option>
		})
	}

	//filter for price range
	renderPriceRange = () => {
		const options = [{ id: 1, name: '0-1000' }, { id: 2, name: '1000-5000' }, { id: 3, name: '5000-20000' },
		{ id: 4, name: 'Above 20000' }]
		return options.map((item, index) => {
			return <option key={item.index} value={item.id}>{item.name}</option>
		})
	}

	//product detail of selected product
	productDetail = (item) => {
		this.setState({
			selectedProduct: item,
			showModal: true
		})
	}

	//close modal of product detail
	closeModal = () => {
		this.setState({
			showModal: false
		})
	}

	//search product from product list
	search = () => {
		const axios = require('axios');
		axios.get(`http://localhost:8000/products?q=${this.state.searchText}`)
			.then(data => this.setState({
				productList: data.data
			})).catch(error => {
			});
	}

	//search will happen after pressing enter
	handleChange = (e) => {
		if (e.key === 'Enter') {
			this.search();
		}
	}

	//filter out products with given price range
	priceRangeFilter = (productList) => {
		let filterProductList = productList;
		if (this.state.priceRange === 1) {
			filterProductList = productList.filter(function (product) {
				return product.price >= 0 && product.price <= 1000;
			}
			)
		}
		if (this.state.priceRange === 2) {
			filterProductList = productList.filter(function (product) {
				return product.price >= 1000 && product.price <= 5000;
			}
			)
		}
		if (this.state.priceRange === 3) {
			filterProductList = productList.filter(function (product) {
				return product.price >= 5000 && product.price <= 20000;
			}
			)
		}
		if (this.state.priceRange === 4) {
			filterProductList = productList.filter(function (product) {
				return product.price > 20000;
			}
			)
		}
		return filterProductList;
	}

	//check if product list is empty
	isListEmpty(productList) {
		if (!productList.length)
			return true;
	}

	//apply sort on product list
	handleSort = (productList) => {
		if (this.state.sortBy === 1) {
			productList.sort(function (a, b) {
				return a.price - b.price
			})
		}
		else if (this.state.sortBy === 2) {
			productList.sort(function (a, b) {
				return a.price - b.price
			})
			productList.reverse();
		}
	}

	//show product list
	renderProductList = () => {
		let productList = [];
		this.state.productList && this.state.productList.forEach(element => {
			if (element.categoryId === this.state.categoryId) {
				productList.push(element);
			}
		});
		if (this.state.productList && this.state.productList.length) {
			if (this.isListEmpty(productList)) {
				return <p style={{ color: 'white' }}>No result found</p>
			}
		}
		if (this.state.sortBy)
			this.handleSort(productList);
		if (this.state.priceRange)
			productList = this.priceRangeFilter(productList);
		if (this.state.productList && this.state.productList.length) {
			if (this.isListEmpty(productList)) {
				return <p style={{ color: 'white' }}>No result found</p>
			}
		}

		return productList.map((item, index) => {
			return (
				<Card body className='text-center' style={{ maxWidth: '250px', maxHeight: '320px' }}>
					<CardTitle title={item.title} className='textwrap' style={{ fontSize: '18px' }}><b>{item.title}</b></CardTitle>
					<CardBody  >
						<Col >
							<img src={`/images/products/pId${item.pId}.jpg`} alt={item.title}
								width='100px' height='150px' style={{ maxHeight: '150px', maxWidth: '100px' }} />
							<br />
							<p><b>&#x20B9;{(item.price).toLocaleString('en-IN')}&nbsp;</b>
								<p className='prodListRating'>{item.rating}&nbsp;&#9734;</p>
							</p>
							<Button
								style={{ backgroundColor: 'transparent', color: 'black' }}
								onClick={() => this.productDetail(item)}
							>View Detail</Button>
						</Col>
					</CardBody>
				</Card>
			)
		})
	}
	render() {
		return (
			<React.Fragment>
				<Row style={{ margin: '2%' }}>
					<Col md={2}>
						<Input
							type='select'
							id='sort'
							name='sortBy'
							value={this.state.sortBy}
							onChange={(e) => this.onChange(e)}
						>
							<option value={0} selected >Sort By</option>
							{this.renderOptionSortBy()}
						</Input>
					</Col>
					<Col md={2}>
						<Input
							type='select'
							id='priceRange'
							name='priceRange'
							value={this.state.priceRange}
							onChange={(e) => this.onChange(e)}
						>
							<option value={0} selected >Price Range</option>
							{this.renderPriceRange()}
						</Input>
					</Col>
					<Col md={2}>
						<Input
							type='text'
							id='search'
							name='searchText'
							value={this.state.searchText}
							placeholder='search'
							onChange={(e) => this.onChange(e)}
							onKeyPress={this.handleChange}
						>
						</Input>
					</Col>
				</Row>
				<Row style={{ margin: '3%' }}>
					{this.renderProductList()}
				</Row>
				<Modal
					isOpen={this.state.showModal}
					effect='fadeInDown'
					toggle={this.closeModal}
					size={'xl'}
					fade={true}
					id='transaction-tabs-modal'
				>
					<Row>
						<Col style={{ textAlign: 'right' }}>
							<Button close
								id='closeModal'
								style={{ marginRight: '10px' }}
								onClick={this.closeModal}>
							</Button>
						</Col>
					</Row>
					<ProductDetail product={this.state.selectedProduct} />
				</Modal>
			</React.Fragment>
		)
	}

}
export default ProductList;
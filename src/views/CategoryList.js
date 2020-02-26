import React, { Component } from 'react';
import { Col, Row, Card, CardBody, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryList: []
		}
	}
	componentDidMount() {
		this.getCategories();
	}

	//get category list
	getCategories = () => {
		fetch('http://localhost:8000/categories').then(res => res.json())
			.then(data => this.setState({
				categoryList: data
			}))
	}

	//show category list
	renderCategoryList = () => {
		return this.state.categoryList.map((item, index) => {
			return (
				<Card style={{ marginLeft: '10%' }} >
					<CardBody>
						<Link to={`/category/${item.categoryId}`}>
							<Col >
								<img src={`/images/categories/categoryId${item.categoryId}.jpg`} alt={item.categoryName}
									width='100px' height='150px' style={{ maxHeight: '150px', maxWidth: '100px' }} />
								<CardFooter style={{ fontWeight: '600' }} >
									{item.categoryName}
								</CardFooter>
							</Col>
						</Link>
					</CardBody>
				</Card>
			)
		})
	}
	render() {
		return (
			<div className='hscroll'>
				<img src={`/images/branding/advertisement.jpg`} alt="advertise"
					style={{ maxHeight: '250px', minWidth: '48%',marginLeft:"2%" }} />
				<img src={`/images/branding/samsung.jpg`} alt="advertise"
					style={{ maxHeight: '250px', minWidth: '48%',marginRight:"2%" }} />
				<h2 style={{ textAlign: 'center', color: 'white' }}>Select Your Category</h2>
				<br />
				<Row>
					{this.state.categoryList ? this.renderCategoryList() : 'No result found'}
				</Row>
			</div>
		)
	}

}
export default CategoryList;
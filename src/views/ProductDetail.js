import React, { Component } from 'react';
import { Col, Row, Card, CardTitle } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../reducers/cartListReducer';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: []
    }
  }

  componentDidMount() {
    this.getCartList();
  }

  getCartList = () => {
    fetch("http://localhost:8000/cartList").then(res => res.json())
    .then(data => this.props.addToCart(data));
  }

  addToCart = (e, product) => {
    debugger
    e.preventDefault();
    let flag = 0;
    const axios = require('axios');
    this.props.cartList && this.props.cartList.forEach(element => {
      if (element.product && element.product.pId === product.pId) {
        element.product['Quantity'] += 1;
        product = element.product;
        flag = 1;
        axios.put(`http://localhost:8000/cartList/${element.id}`, {
          product
        }).then(resp => {
          NotificationManager.success('Product added');
          this.getCartList();
        }).catch(error => {
        });
      }
    });
    if (!flag) {
      product['Quantity'] = 1;
      axios.post('http://localhost:8000/cartList', {
        product
      }).then(resp => {
        NotificationManager.success('Product added');
        this.getCartList();
      }).catch(error => {
      });
    }
  }

  renderProductDetail = () => {
    let product = this.props.product;
    return (
      <Row>
        <Card style={{ marginLeft: "50px" }}>
          <CardTitle title={product.title} className="textwrap" style={{ fontSize: "18px" }}><b>{product.title}</b></CardTitle>
          <Col xs lg="6">
            <img src={`/products/pId${product.pId}.jpg`} alt={product.title}
              width="250px" height="600px" style={{ maxHeight: "400px", maxWidth: "250px" }} />
          </Col>
        </Card>
        <Col xs style={{ marginLeft: "10'0px" }}>
          <h5 style={{ fontWeight: "500" }}>{product.description}</h5>
          <h2><b>&#x20B9;{(product.price).toLocaleString('en-IN')}</b></h2>
          <h2 className="rating">{product.rating}&nbsp;&#9734;</h2>
          <h5>Available offers</h5>
          <p style={{ fontWeight: "600" }}>	<img src={`/products/tag.jpg`} alt="tag"
            width="20px" height="20px" /> <b>Bank Offer</b> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</p>
          <p style={{ fontWeight: "600" }}>	<img src={`/products/tag.jpg`} alt="tag"
            width="20px" height="20px" /> <b>Bank Offer</b> Extra 5% off* with Axis Bank Buzz Credit Card</p>
          <p style={{ fontWeight: "600" }}>	<img src={`/products/tag.jpg`} alt="tag"
            width="20px" height="20px" /> <b>Special Price</b> Get extra 20% off (price inclusive of discount)</p>
          <br />
          <button
            className="cartButton"
            title="Add to cart"
            onClick={(e) => this.addToCart(e, product)}
          >
            <i style={{ fontSize: "24px" }} className="fa">&#xf07a;</i>&nbsp;
							ADD TO CART
						</button>
        </Col>
      </Row>
    )
  }
  render() {
    return (
      <div className="App">
        <Row>
          {this.renderProductDetail()}
        </Row>
        <NotificationContainer />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  cartList: state.cartList
})
const mapDispatchToProps = function (dispatch) {
  return {
    addToCart: (data) => dispatch({ type: ADD_TO_CART, data })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
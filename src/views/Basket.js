import React, { Component } from 'react';
import { Card, Table, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../reducers/cartListReducer';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      cartList: [],
      categoryList: [],
      totalPrice: 0
    }
  }
  componentDidMount() {
    this.getCartList();
    this.getCategories();
  }

  //get category list 
  getCategories = () => {
    fetch('http://localhost:8000/categories').then(res => res.json())
      .then(data => this.setState({
        categoryList: data
      }))
  }

  //get cart list added by user
  getCartList = () => {
    fetch('http://localhost:8000/cartList').then(res => res.json())
      .then(data => this.props.addToCart(data));
  }

  //delete product from cart list
  deleteProduct = (item) => {
    const axios = require('axios');
    axios.delete(`http://localhost:8000/cartList/${item.id}`, {
    }).then(resp => {
      NotificationManager.error('Product removed','',1000);
      this.getCartList();
    }).catch(error => {
    });
  }

  //get category name of product from category id
  getCategoryName = (categoryId) => {
    let categoryName = '';
    this.state.categoryList && this.state.categoryList.forEach(element => {
      if (element.categoryId === categoryId) {
        return categoryName = element.categoryName;
      }
    });
    return categoryName;
  }

  //buy product which are in cart
  buyNow = () => {
    this.props.cartList && this.props.cartList.length && this.props.cartList.forEach(element => {
      const axios = require('axios');
      axios.delete(`http://localhost:8000/cartList/${element.id}`, {
      }).then(resp => {
        this.getCartList();
      }).catch(error => {
      });
    });
    NotificationManager.success('COngratulation !! Your order is Placed',2000);
  }

  //show empty cart whwn cart is empty
  renderEmptyCart() {
    return (
      <tr>
        <td colSpan='5'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={`/images/branding/empty-cart.jpg`} alt='empty-cart'
              style={{ maxHeight: '200px', maxWidth: '200px' }} />
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => this.props.history.push('/')}
              color='success'
            >
              Shop Now
        </Button>
          </div>
        </td>
      </tr>
    )
  }

  //show cart list
  renderCartList = () => {
    return this.props.cartList && this.props.cartList.length && this.props.cartList.map((item, index) => {
      return (
        <tr>
          <td >{item.product && item.product.title}</td>
          <td>{this.getCategoryName(item.product.categoryId)}</td>
          <td ><span style={{ fontSize: '12px' }}>&#10005;</span>&nbsp;{item.product && item.product.Quantity}</td>
          <td >&#x20B9;{item.product && (item.product.Quantity * item.product.price).toLocaleString('en-IN')}</td>
          <td>
            <Button
              id='trashButton'
              className='lessPadding'
              title='Delete Product'
              color='danger'
              onClick={() => this.deleteProduct(item)}
            >
              <i className='fa fa-trash' />
            </Button>
          </td>
        </tr>
      )
    })
  }
  render() {
    let total = 0;
    this.props.cartList && this.props.cartList.length && this.props.cartList.forEach(element => {
      total += element.product.Quantity * element.product.price;
    });
    return (
      <div className='App'>
        <br />
        <Card style={{ marginLeft: '20%', marginRight: '20%' }}>
          <CardBody >
            <Table>
              <thead>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </thead>
              {this.props.cartList && this.props.cartList.length ?
                <tbody>{this.renderCartList()} </tbody> : <tbody>{this.renderEmptyCart()}</tbody>}
            </Table>
            {this.props.cartList && this.props.cartList.length ?
              <button
                onClick={() => this.buyNow()}
                className='buyNowButton'>
                BUY NOW &nbsp;&#x20B9;{total.toLocaleString('en-IN')}
              </button> : null}
          </CardBody>
        </Card>
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

Basket.propTypes = {
  cartList: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
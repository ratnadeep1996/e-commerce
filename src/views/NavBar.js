import React, { Component } from 'react';
import { Navbar, NavbarBrand, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../reducers/cartListReducer';
import PropTypes from 'prop-types';

const style = {
  marginLeft: '900px',
  display: 'flex'
}

class NavBar extends Component {
  componentDidMount() {
    this.getCartList();
  }

  //get cart list for cart item count
  getCartList = () => {
    fetch('http://localhost:8000/cartList').then(res => res.json())
      .then(data => this.props.addToCart(data))
  }

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>
            <img src={`/images/branding/logo.jpg`} alt='logo'
              style={{ maxHeight: '50px', maxWidth: '100%' }} />
          </NavbarBrand>
          <h3>An E-Commerce Site</h3>

          <div style={style}>
            <Link to='/cart'><i style={{ fontSize: '34px' }} className='fa'>&#xf07a;</i>
            </Link>
            <Badge color='danger' style={{ marginBottom: '35px' }}>{this.props.cartList.length}</Badge>
          </div>
        </Navbar>
      </div >
    );
  }
}

NavBar.propTypes = {
  cartList: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  cartList: state.cartList
})

const mapDispatchToProps = function (dispatch) {
  return {
    addToCart: (data) => dispatch({ type: ADD_TO_CART, data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
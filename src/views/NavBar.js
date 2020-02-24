import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../reducers/cartListReducer';

const style = {
  marginLeft: "900px",
  display: "flex"
}
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.getCartList();
  }
  getCartList = () => {
    fetch("http://localhost:8000/cartList").then(res => res.json())
      .then(data => this.props.addToCart(data))
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={`/categories/logo.jpg`} alt="logo"
              style={{ maxHeight: "50px", maxWidth: "100%" }} />
          </NavbarBrand>
          <h3>An E-Commerce Site</h3>

          <div style={style}>
            <Link to="/cart"><i style={{ fontSize: "34px" }} className="fa">&#xf07a;</i>
            </Link>
            <Badge color='danger' style={{ marginBottom: "35px" }}>{this.props.cartList.length}</Badge>
          </div>
        </Navbar>
      </div >
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
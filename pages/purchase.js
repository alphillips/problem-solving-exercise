import React from 'react'
import Link from 'next/link'
import Header from './header'
import {addItem, getItems, hasItems} from './../services/store'

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    let props = {}
    let selectedItems = getItems();
    let items = [];
    for(let i in selectedItems){
      items.push({name:i,quantity:selectedItems[i].quantity, price:selectedItems[i].price});
    }
    props.items = items;
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      quantity:1
    }
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(){
    console.log(this.state.quantity)
    addItem(this.props.current.name, this.state.quantity);
  }

  handleChange(event) {
    this.setState({quantity: event.target.value});
  }

  render () {
    return (
      <div>
        <Header />
        <h1>Thank you for shopping with us.</h1>
        <p>Your credit card has been charged.</p>
        <p>Cheers</p>

      </div>
    )
  }
}

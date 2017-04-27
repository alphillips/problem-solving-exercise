import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {addItem, getItems} from './../services/store'
// import 'isomorphic-fetch'

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    // console.log(query)
    // console.log(getItems())
    // const res = await fetch('https://api.myjson.com/bins/gx6vz')
    // const json = await res.json()
    // return { prices: json.prices }
    let props = {}
    props.selectedItems = getItems();
    props.current = query
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
    addItem(this.props.current.name, this.state.quantity, this.props.current.price);
  }

  handleChange(event) {
    this.setState({quantity: event.target.value});
  }

  render () {
    return (
      <div>
        <Head>
          <title>My Online Shop</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <h1>{this.props.current.name}</h1>
        <strong>${this.props.current.price}</strong>
        <label htmlFor="quantity">Amount</label>
        <input id="quantity" type="number" value={this.state.quantity} onChange={this.handleChange}/>
        <button onClick={e => {
          this.addToCart()
        }}>Add to cart</button>
        <br />
        <Link href={{ pathname: '/'}}><a>Continue shopping</a></Link>
        <br />
        <Link href={{ pathname: 'checkout'}}><a>View cart</a></Link>
      </div>
    )
  }
}

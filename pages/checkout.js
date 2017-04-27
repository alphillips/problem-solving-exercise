import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {addItem, getItems, hasItems} from './../services/store'
// import 'isomorphic-fetch'

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    // console.log(query)
    // console.log(getItems())
    // const res = await fetch('https://api.myjson.com/bins/gx6vz')
    // const json = await res.json()
    // return { prices: json.prices }
    let props = {}
    let selectedItems = getItems();
    // console.log(props.selectedItems);
    let items = [];
    for(let i in selectedItems){
      // let obj = {name:i,price:selectedItems[i]}
      items.push({name:i,quantity:selectedItems[i].quantity, price:selectedItems[i].price});
    }
    // console.log(items);
    props.items = items;
    // props.current = query
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
        <Head>
          <title>My Online Shop</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <h1></h1>
        {hasItems() &&
          <div>
            <ul>
            {this.props.items.map((item) =>
              <li key={item.name}>{item.name} {item.price} {item.quantity}</li>
            )}
            </ul>
          </div>
        }
        <br />
        <Link href={{ pathname: '/',}}><a>Back to shopping</a></Link>

      </div>
    )
  }
}

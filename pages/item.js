import React from 'react'
import Link from 'next/link'
import Header from './header'
import {addItem, getItems} from './../services/store'

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    let props = {}
    props.selectedItems = getItems()
    props.current = query
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      quantity:1,
      total:0,
      specialPriceUsed:false
    }
  }

  addToCart = () => {

    let price = this.props.current.price,
        total = 0

    // apply special price
    if(this.props.current.special && this.props.current.special === this.state.quantity){
      total = this.props.current.specialPrice
      this.setState({specialPriceUsed: 'You get the special price of $' + this.props.current.specialPrice})
    } else {
      total = this.state.quantity * this.props.current.price
      this.setState({specialPriceUsed: false})
    }

    this.setState({total: total})

    // save to store
    addItem(this.props.current.name, total, this.state.quantity)
  }

  handleChange = (event) => {
    this.setState({quantity: event.target.value})
  }

  render () {
    return (
      <div>
        <Header />

        <h1>{this.props.current.name}</h1>

        <strong>${this.props.current.price}</strong>

        <label htmlFor="quantity">Amount</label>

        <input id="quantity" type="number" value={this.state.quantity} onChange={this.handleChange}/>

        <button onClick={e => {
          this.addToCart()
        }}>Add to cart</button>

        {this.state.total > 0 &&
        <div>Total: ${this.state.total}</div>
        }

        {this.state.specialPriceUsed &&
          this.state.specialPriceUsed
        }

        <br />
        <Link href={{ pathname: '/'}}><a>Continue shopping</a></Link>
        <br />
        <Link href={{ pathname: 'checkout'}}><a>View cart</a></Link>
      </div>
    )
  }
}

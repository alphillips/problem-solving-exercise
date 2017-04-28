import React from 'react'
import Header from './header'
import Link from 'next/link'
import {addItem, getItems, hasItems} from './../services/store'

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    let props = {}
    let selectedItems = getItems()
    let items = []
    let total = 0
    for(let i in selectedItems){
      items.push({name:i,quantity:selectedItems[i].quantity, price:selectedItems[i].price})
      total += parseInt(selectedItems[i].price,10)
    }
    props.items = items
    props.total = total
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      total:0
    }
  }

  render () {
    return (
      <div>
        <Header />

        <h1>Your Shoppoing Cart</h1>
        {hasItems() &&
          <div>
            <table>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
                {this.props.items.map((item) =>
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                )}
            </table>
          </div>
        }
        Your total price is: ${this.props.total}
        <br />
        <Link href={{ pathname: 'purchase',}}><a>Buy Now</a></Link>
        <br />
        <Link href={{ pathname: '/',}}><a>Back to shopping</a></Link>


      </div>
    )
  }
}

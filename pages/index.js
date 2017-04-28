import React from 'react'
import Link from 'next/link'
import Header from './header'
import {addItem, getItems, hasItems} from './../services/store'
import 'isomorphic-fetch'

export default class extends React.Component {

  static async getInitialProps ({ req }) {
    const res = await fetch('https://api.myjson.com/bins/gx6vz')
    const json = await res.json()
    let props = {}
    props.prices = json.prices
    return props
  }

  renderItemList = (price) =>{
    return (
      <li key={price.name}>
        <div>Item: {price.name} Price: ${price.unit_price}</div>

        <Link href={
          {
            pathname: 'item',
            query: {
                  name: price.name,
                  price: price.unit_price,
                  special: price.special_qty || '',
                  specialPrice:price.special_price || ''
            }
          }
        }><a>Add to cart</a></Link>
        <br />
        {price.special_price &&
          <div>
            <p><strong>Special Deal!</strong> You can buy ${price.special_qty} for ${price.special_price}</p>
            <p></p>
          </div>
        }

        <hr/>
      </li>
    );
  }

  render () {
    return (
      <div>

        <Header />

        <h1>Welcome to my online shop</h1>

        {hasItems() &&
          <button>View basket</button>
        }

        <p>Please select an item you would like to purchase</p>
        <ul>
        {this.props.prices.map((price) =>
          this.renderItemList(price)
        )}
        </ul>
      </div>
    )
  }
}

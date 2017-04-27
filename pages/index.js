import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {addItem, getItems, hasItems} from './../services/store'
import 'isomorphic-fetch'

export default class extends React.Component {

  static async getInitialProps ({ req }) {
    const res = await fetch('https://api.myjson.com/bins/gx6vz')
    const json = await res.json()
    let props = {}
    props.selectedItems = getItems()
    console.log(getItems())
    console.log(hasItems())
    props.prices = json.prices
    return props
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     view:'home'
  //   }
  // }

  render () {
    return (
      <div>
        <Head>
          <title>My Online Shop</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <h1>Welcome to my online shop</h1>

        {hasItems() &&
          <button>View basket</button>
        }

        <p>Please select an item you would like to purchase</p>
        <ul>
        {this.props.prices.map((price) =>
          <li key={price.name}>
            <div>{price.name} ${price.unit_price}</div>

            <Link href={{ pathname: 'item', query: { name: price.name, price: price.unit_price}}}><a>Buy now</a></Link>
            {price.special_price &&
              <div>
                <p><strong>Special Deal!</strong></p>
                <p>You can buy ${price.special_qty} for ${price.unit_price}</p>

              </div>
            }
          </li>
        )}
        </ul>
      </div>
    )
  }
}

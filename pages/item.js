import React from 'react'
import Head from 'next/head'
import {addItem, getItems} from './../services/store'
// import 'isomorphic-fetch'

export default class extends React.Component {

  static async getInitialProps ({ query }) {
    console.log(query)
    console.log(getItems())
    // const res = await fetch('https://api.myjson.com/bins/gx6vz')
    // const json = await res.json()
    // return { prices: json.prices }
    let props = {}
    props.selectedItems = getItems();
    props.current = query
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

        <h1>{this.props.current.name}</h1>
        <strong>${this.props.current.price}</strong>
        <label htmlFor="quantity">Amount</label><input id="quantity" type="number" />
      </div>
    )
  }
}

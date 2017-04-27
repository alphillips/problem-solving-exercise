let store = {};

const addItem = (name, price, quantity) => {
  store[name] = {price:price, quantity:quantity};
}

const getItems = () => {
  return store
}

const hasItems = () => {
  return Object.keys(store).length !== 0
}

const clear = () => {
  store = {}
}

export {addItem, getItems, clear, hasItems};

import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      let newItem = {};
      if (tempItem) {
        let tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }

            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });

        return { ...state, cart: tempCart };
      } else {
        newItem = {
          id: id + color,
          amount,
          color,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          max: product.stock,
        };
      }

      return {
        ...state,
        cart: [...state.cart, newItem],
      };

    case REMOVE_CART_ITEM:
      const cartItems = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: cartItems,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: ID, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === ID) {
          if (value === "inc") {
            let newAmount = item.amount + 1;

            if (newAmount > item.max) {
              newAmount = item.max;
            }

            return { ...item, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = item.amount - 1;

            if (newAmount < 1) {
              newAmount = 1;
            }

            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });

      return {
        ...state,
        cart: tempCart,
      };

    case COUNT_CART_TOTALS:
      const { total_amount, total_item } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem;

          total.total_item += amount;
          total.total_amount += price * amount;

          return total;
        },
        { total_amount: 0, total_item: 0 }
      );

      return { ...state, total_amount, total_item };

    default:
      return state;
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;

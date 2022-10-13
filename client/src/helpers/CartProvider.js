import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedTotalAmount =
      action.item.action > 0
        ? (action.item.price -
            ((action.item.price * action.item.action) / 100).toFixed(2)) *
            action.item.amount +
          state.totalAmount
        : action.item.price * action.item.amount + state.totalAmount;

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount =
      existingItem.action > 0
        ? state.totalAmount -
          (
            existingItem.price -
            (existingItem.price * existingItem.action) / 100
          ).toFixed(2)
        : state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "INSTANT-REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    let amount;
    if (existingCartItemIndex >= 0) {
      amount =
        state.items[existingCartItemIndex].action > 0
          ? (
              state.items[existingCartItemIndex].price -
              (state.items[existingCartItemIndex].price *
                state.items[existingCartItemIndex].action) /
                100
            ).toFixed(2) * state.items[existingCartItemIndex].amount
          : (
              state.items[existingCartItemIndex].price *
              state.items[existingCartItemIndex].amount
            ).toFixed(2);
      state.items.splice(existingCartItemIndex, 1);
    }
    return {
      items: state.items,
      totalAmount: state.totalAmount - amount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  function addItemToCartHandler(item) {
    dispatchCart({ type: "ADD", item: item });
  }
  function removeItemFromCartHandler(id) {
    dispatchCart({ type: "REMOVE", id: id });
  }

  function instantRemoveHandler(id) {
    dispatchCart({ type: "INSTANT-REMOVE", id: id });
  }

  function clearCartHandler() {
    dispatchCart({ type: "CLEAR" });
  }

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    instantRemove: instantRemoveHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

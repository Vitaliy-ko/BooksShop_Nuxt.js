import roundToTwo from '~/filters/roundToTwo';

export const state = () => {
  return {
    cart: [],
    totalPrice: 0,
    isPurchaseСompleted: false,
  };
};

export const mutations = {
  addToCart(state, book) {
    state.cart.push(book);
    state.totalPrice += roundToTwo(book.saleInfo.retailPrice.amount);
  },
  checkoutTrigger(state, isPurchaseСompleted) {
    state.isPurchaseСompleted = isPurchaseСompleted;
  },
  clearCart(state) {
    state.cart = [];
    state.totalPrice = 0;
  }
};

export const actions = {
  addToCart({ commit }, book) {
    commit("addToCart", book);
  },
  checkout({ commit }) {
    commit("checkoutTrigger", true);

    setTimeout(() => {
      commit("clearCart");
      commit("checkoutTrigger", false);
    }, 5000)
  },
  clearCart({ commit }) {
    commit("clearCart");
  }
};

export const getters = {
  cart: state => state.cart,
  cartBooksCount: state => state.cart.length,
  cartTotalPrice: state => state.totalPrice,
  isPurchaseСompleted: state => state.isPurchaseСompleted
};

import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"
import { Product, OrderProduct } from '~/models/product'


export const useOrderStore = defineStore('order', {
  state: () => ({
    order: useLocalStorage<OrderProduct[]>('order', []),
    orderId: useLocalStorage<number>("orderId", null)
  }),
  getters: {
    getOrder: (state) => {
      return state.order
    },
    getOrderId: (state) => {
      if (!state.orderId) {
        const authCookie = useCookie('orderId', { sameSite: true });

        if (authCookie.value) {
          state.orderId = parseInt(authCookie.value, 10);
        }
      }
      return state.orderId;
    }
  },
  actions: {
    /**
     * Add a product (add or increment) to the
     * current order
     * @param product 
     */
    addProduct(product: Product) {
      let alreadyInOrder = false
      for (let i = 0; i < this.order.length; i++) {
        if (this.order[i].product.id === product.id) {
          this.order[i].items += 1
          alreadyInOrder = true
        }
      }
      if (!alreadyInOrder) {
        this.order.push({ product: product, items: 1 })
      }
      // Stores order in local storage since useLocalStorage deep
      // doesn't work with order[i].items
      localStorage.setItem('order', JSON.stringify(this.order))
    },
    // Clears the current order after it is created or updated
    clearOrder() {
      this.order = [];
      localStorage.removeItem("order");
    },
    updateOrder(productId: number, value: number) {
      if (value <= 0) {
        this.order = this.order.filter(orderItem => orderItem.product.id != productId)
      } else {
        for (let i = 0; i < this.order.length; i++) {
          if (this.order[i].product.id === productId) {
            this.order[i].items = value
          }
        }
      }
    },
    setOrderId(id: number) {
      this.orderId = id;
      const authCookie = useCookie('orderId', { sameSite: true });
      authCookie.value = `${id}`;
      localStorage.setItem("orderId", `${id}`);
    }
  },
  // To load data from the client side
  hydrate(storeState, initialState) {
    const order = useLocalStorage<OrderProduct[]>('order', []);
    const orderId = useLocalStorage<number>('orderId', null);
    storeState.order = order.value;
    storeState.orderId = orderId.value;
  },
});
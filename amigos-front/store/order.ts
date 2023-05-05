import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"
import { Product, OrderProduct } from '~/models/product'


export const useOrderStore = defineStore('order', {
  state: () => ({
    order: useLocalStorage<OrderProduct[]>('order', [])
  }),
  getters: {
    getOrder: (state) => {
      return state.order
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
    }
  },
  // To load data from the client side
  hydrate(storeState, initialState) {
    const order = useLocalStorage<OrderProduct[]>('order', []);
    storeState.order = order.value;
  },
});
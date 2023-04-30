import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useOrderStore = defineStore('order', {
  state: () => ({
    products: useLocalStorage('products', [])
  }),
  getters: {
    getProducts: (state) => {
      return state.products
    }
  },
  actions: {
    addProduct(newProduct) {
      let alreadyInOrder = false
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === newProduct.id) {
          this.products[i].items += 1
          alreadyInOrder = true
        }
      }
      if (!alreadyInOrder) {
        const product = { ...newProduct, items: 1 }
        this.products.push(product)
      }
    }
  }
})
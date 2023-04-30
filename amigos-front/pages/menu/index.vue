<template>
  <NuxtLayout :name="layout">
    <Categories :categories="categories" :selected="selectedCategory" @changeCategory="changeCategory($event)" />

    <div class="flex justify-content-center flex-wrap">
      <ProductCard :product="product" v-for="product in products" @addToOrder="addToOrder" />
    </div>

  </NuxtLayout>
</template>

<script setup>
import { useOrderStore } from '~/store/order'

const orderStore = useOrderStore()
const { addProduct } = orderStore


const layout = 'client'
// Mock data
// TODO Update with API call
const categories = [
  'desayuno', 'almuerzo', 'hamburguesas', 'postres',
  'tacos', 'pizza', 'bebidas'
]
let selectedCategory = ref('desayuno')

// Mock data
// TODO Update with API call
const products = [
  {
    id: 1,
    name: 'Tacos al pastor',
    price: 300.00,
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum quo ipsam dolorum nesciunt'
  },
  {
    id: 2,
    name: 'Tacos de carnitas',
    price: 300.00,
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum quo ipsam dolorum nesciunt'
  },
  {
    id: 3,
    name: 'Tacos de barbacoa de borrego',
    price: 300.00,
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum quo ipsam dolorum nesciunt'
  },

]

/**
 * Changes the category to fetch new products
 * @param {String} category 
 */
const changeCategory = function (category) {
  selectedCategory.value = category
}

/**
 * Add the product to the current order
 * @param {Product} product 
 */
const addToOrder = function (product) {
  addProduct(product)
}




</script>

<style lang="scss" scoped></style>
<template>
  <NuxtLayout :name="layout">
    <Categories :categories="categories" :selected="selectedCategory" 
    @changeCategory="changeCategory($event)" />

    <div class="flex justify-content-center flex-wrap">
      <ProductCard :product="product" v-for="product in products"/>
    </div>

  </NuxtLayout>
</template>

<script setup>
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
    name: 'Tacos al pastor',
    price: 300.00,
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum quo ipsam dolorum nesciunt'
  },
  {
    name: 'Tacos de carnitas',
    price: 300.00,
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum quo ipsam dolorum nesciunt'
  },
  {
    name: 'Tacos de barbacoa de borrego',
    price: 300.00,
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsum quo ipsam dolorum nesciunt'
  },

]


const changeCategory = function(category){
  selectedCategory.value = category
}

</script>

<style lang="scss" scoped></style>
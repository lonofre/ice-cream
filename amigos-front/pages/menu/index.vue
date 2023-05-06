<template>
  <NuxtLayout :name="layout">
    <Categories :categories="categories" :selected="selectedCategory" @changeCategory="changeCategory($event)" />

    <div class="grid">
      <div class="sm:col-8 sm:col-offset-2 lg:col-6 lg:col-offset-3 flex justify-content-center flex-wrap">
        <ProductCard :product="product" v-for="product in products" @addToOrder="addToOrder" />
      </div>
    </div>

  </NuxtLayout>
</template>

<script setup>
import { useOrderStore } from '~/store/order';
import ProductService from '~/services/product.service';
import CategoryService from '~/services/category.service';

const orderStore = useOrderStore();
const { addProduct } = orderStore;
const axios = useNuxtApp().$axios;
const productService = new ProductService(axios);
const categoryService = new CategoryService(axios);

// Page data
const products = ref([]);
const selectedCategory = ref('desayunos');
const layout = 'client';
const categories = ref([]);


/**
 * Requests the products given a category
 */
const requestByCategory = async function (category) {
  const { data, status } = await productService.getOrdersByCategory(category);
  if (status == 200) {
    products.value = data;
  }
}

const response = await categoryService.getAllCategories();
const { data, status } = response;
if (status == 200) {
  categories.value = data;
  if (categories.value.length > 0) {
    selectedCategory.value = data[0];
    requestByCategory(selectedCategory.value);
  }
}


/**
 * Changes the category to fetch new products
 * @param {String} category 
 */
const changeCategory = async function (category) {
  selectedCategory.value = category
  await requestByCategory(category);
}

/**
 * Add the product to the current order
 * @param {Product} product 
 */
const addToOrder = function (product) {
  addProduct(product)
}




</script>

<style lang="scss" scoped>
</style>
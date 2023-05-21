<template>
  <NuxtLayout :name="layout">
    <div class="flex justify-content-center">
      <h2>Las secciones de nuestro menú</h2>
    </div>
    <Categories :categories="categories" :selected="selectedCategory" @changeCategory="changeCategory($event)" />

    <div class="grid">
      <div class="sm:col-8 sm:col-offset-2 lg:col-6 lg:col-offset-3 flex justify-content-center flex-wrap">
        <ProductCard :product="product" v-for="product in products" @addToOrder="addToOrder" />
      </div>
    </div>

  </NuxtLayout>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/store/order';
import ProductService from '~/services/product.service';
import CategoryService from '~/services/category.service';
import { Product } from '~/models/product';
import { Category } from '~/models/category';

const orderStore = useOrderStore();
const { addProduct } = orderStore;
const axios = useNuxtApp().$axios;
const productService = new ProductService(axios);
const categoryService = new CategoryService(axios);

// Page data
const categoryDummy = { id: 0, name: 'desayunos'}
const products = ref<Product[]>([]);
const selectedCategory = ref(categoryDummy);
const layout = 'client';
const categories = ref<Category[]>([]);


/**
 * Requests the products given a category
 */
const requestByCategory = async function (category: Category) {
  const response = await productService.getOrdersByCategory(category);
  if (response?.status == 200) {
    products.value = response.data ?? [];
  }
}

onMounted(async () => {
  const response = await categoryService.getAllCategories();
  if (response?.status == 200) {
    categories.value = response.data ?? [];
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0];
      requestByCategory(selectedCategory.value);
    }
  }
})

/**
 * Changes the category to fetch new products
 * @param {String} category 
 */
const changeCategory = async function (category: Category) {
  selectedCategory.value = category
  await requestByCategory(category);
}

/**
 * Add the product to the current order
 * @param {Product} product 
 */
const addToOrder = function (product: Product) {
  addProduct(product)
}




</script>

<style lang="scss" scoped></style>
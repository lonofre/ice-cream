<template>
  <div class="flex justify-content-center ">
    <Button :label="category.name" severity="secondary" size="small" :class="'mx-2'" 
    :outlined="selected.id != category.id" rounded v-for="category in categories" 
    @click="changeCategory(category)" />
  </div>
</template>

<script setup lang="ts">
/**
 * Displays the categories of the products. It allows
 * to make queries
 */
import { Category } from '~/models/category';

const props = defineProps<{
  categories: Array<Category>,
  selected: Category
}>();



const emit = defineEmits<{
  /* For send the icecream to the parent */
  (event: 'changeCategory', data: Category): void}>();

const changeCategory = function(category: Category) {
  emit('changeCategory', category);
}

</script>

<style lang="scss" scoped>
</style>
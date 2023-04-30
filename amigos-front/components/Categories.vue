<template>
  <div class="flex justify-content-center ">
    <Button :label="category" severity="secondary" size="small" :class="'mx-2'" 
    :outlined="selected != category" rounded v-for="category in categories" 
    @click="changeCategory(category)" />
  </div>
</template>

<script setup>
/**
 * Displays the categories of the products. It allows
 * to make queries
 */

const props = defineProps({
  categories: Array,
  selected: String
})

const emit = defineEmits('change')

const changeCategory = function(category) {
  emit('changeCategory', category)
}

</script>

<style lang="scss" scoped>
</style>
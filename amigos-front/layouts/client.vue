<template>
  <div>
    <div class="flex justify-content-between flex-wrap card-container purple-container">
      <div class="flex align-items-center justify-content-center "></div>
      <div class="flex align-items-center justify-content-center ">
        <h1 class="mx-3">50amigos</h1>
      </div>
      <div class="flex align-items-center justify-content-center ">
        <NuxtLink to="/menu"><Button label="Menú" :class="'mr-3'" :text="route.path != '/menu'" rounded /></NuxtLink>
        <NuxtLink to="/order"><Button label="Orden" icon="pi pi-shopping-bag" :badge="badge" :class="'mr-3'"
            severity="primary" :text="route.path != '/order'" rounded aria-label="Cancel" /></NuxtLink>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
/**
 * Layout for a client that is going to use 
 * the menu to make an order
 */
import Button from 'primevue/button'
import { useOrderStore } from '~/store/order'
import { storeToRefs } from "pinia"

const route = useRoute()
const orderStore = useOrderStore()
const { products } = storeToRefs(orderStore)
const badge = ref("0")

const updateBadge = function(products) {
  const count = products.reduce((acc, product) => {
    return product.items + acc
  }, 0)
  badge.value = `${count}`
}

onMounted(() => {
  updateBadge(products.value)
})

orderStore.$subscribe((mutation, state) => {
  updateBadge(state.products)
})

</script>

<style lang="scss" scoped></style>
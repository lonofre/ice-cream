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

<script setup lang="ts">
/**
 * Layout for a client that is going to use 
 * the menu to make an order
 */
import Button from 'primevue/button'
import { useOrderStore } from '~/store/order'
import { storeToRefs } from "pinia"
import { OrderProduct } from '~/models/product';

const route = useRoute()
const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)
const badge = ref("0")

/**
 * Updates badge that counts the total items in the order
 */
const updateBadge = function(currentOrder: OrderProduct[]) {
  const count = currentOrder.reduce((acc, item) => {
    return item.items + acc
  }, 0)
  badge.value = `${count}`
}

onMounted(() => {
  updateBadge(order.value)
})

orderStore.$subscribe((mutation, state) => {
  updateBadge(state.order)
})

</script>

<style lang="scss" scoped></style>
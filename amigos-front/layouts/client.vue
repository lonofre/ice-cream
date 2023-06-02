<template>
  <div>
    <div class="flex justify-content-between flex-wrap card-container purple-container">
      <div class="flex align-items-center justify-content-center ">
        <h1 class="mx-3">50amigos</h1>
      </div>
      <div class="flex align-items-center justify-content-center ">
        <NuxtLink to="/menu"><Button label="Menú" :class="'mr-3'" severity="info" :text="route.path != '/menu'" rounded />
        </NuxtLink>
        <Button label="Helado" icon="pi pi-star-fill" :class="'mr-3'" severity="info"
            :text="route.path != '/helado'" rounded aria-label="Cancel" @click="goToIcecreamPage"  />
        <NuxtLink to="/order"><Button label="Orden" icon="pi pi-shopping-bag" :badge="badge" :class="'mr-3'"
            severity="info" :text="route.path != '/order'" badgeClass="p-badge-info" rounded aria-label="Cancel" />
        </NuxtLink>
      </div>
    </div>
    <slot />

    <Dialog v-model:visible="visible" modal header="¡Falta terminar tu orden!" :style="{ width: '40vw' }">
      <p>
        Completa tu orden para recibir tu <b>helado gratis</b> 🍨
      </p>
    </Dialog>
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
import Dialog from 'primevue/dialog';

const route = useRoute()
const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)
const badge = ref("0")
const visible = ref(false);
const icecreamAvailable = ref(false);

/**
 * Updates badge that counts the total items in the order
 */
const updateBadge = function (currentOrder: OrderProduct[]) {
  const count = currentOrder.reduce((acc, item) => {
    return item.items + acc
  }, 0)
  badge.value = `${count}`
}

const goToIcecreamPage = function () {
  if (icecreamAvailable.value) {
    navigateTo('/helado')
  } else {
    visible.value = true;
  }
}

onMounted(() => {
  updateBadge(order.value)
})

orderStore.$subscribe((mutation, state) => {
  updateBadge(state.order)
  /*
  if(state.orderCompleted) {
    icecreamAvailable.state = true
  }
  */

})

</script>

<style lang="scss" scoped></style>
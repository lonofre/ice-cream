<template>
  <NuxtLayout :name="layout">
    <div>
      <div class="w-10 mx-auto" v-if="!createdOrder">
        <h2 class="font-bold">Su orden</h2>
        <OrderSection :orderList="currentOrder" :addToOrder="true" :createOrder="createOrder"
          @createNewOrder="createNewOrder" @updateCurrentOrder="updateCurrentOrder" @updateProduct="updateProduct">Para
          enviar a cocina
        </OrderSection><!--
        <OrderSection :orderList="previousOrder" :addToOrder="false" :createOrder="false">Ya ordenados
        </OrderSection> -->
      </div>
      <div class="flex justify-content-center" v-else>
        <h2>Su orden se ha enviado a cocina</h2>
      </div>
      <Toast />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { OrderProduct } from '~/models/product';
import OrderService from '~/services/order.service';
import { useOrderStore } from '~/store/order';
import { useSessionStore } from '~/store/session';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";


const layout = 'client'
/* definePageMeta({
    middleware: ['check-auth', 'is-tablet_master', 'check-session']
}) */

const orderStore = useOrderStore();
const sessionStore = useSessionStore();
const newOrder = orderStore.getOrder;
const orderId = orderStore.getOrderId;
const currentOrder = ref<any>([]);
const previousOrder = ref<any>([]);
const axios = useNuxtApp().$axios;
const orderService = new OrderService(axios);
const toast = useToast();
const createdOrder = ref(false);

/*
onMounted(async () => {
  try {
    if (orderId) {
      const response = await orderService.getOrderItems(orderId)
      if(response?.data) {
        previousOrder.value = response.data.map(mapOrder);
      }
    }
  } catch (e) {

  }
})*/

const mapOrder = function (el: OrderProduct) {
  return {
    quantity: el.items,
    id: el.product.id
  };
}

// For the items that will be added to an existing order
currentOrder.value = newOrder.map(mapOrder);





const createNewOrder = async function () {
  const items = orderStore.getOrder.map(e => {
    return {
      productId: e.product.id,
      quantity: e.items
    }
  })

  const sessionId = sessionStore.getSessionId;
  if (sessionId) {
    const response = await orderService.createOrder(items, sessionStore.getSessionId);
    if (response?.data) {
      orderStore.setOrderId(response.data.id);
      orderStore.clearOrder();
      toast.add({ severity: 'info', summary: 'Info', detail: 'Se mando su orden a cocina', life: 10000 });
      createdOrder.value = true;
    }
  }
}

const updateCurrentOrder = function () {
  
}

const updateProduct = function (data: any) {
  const { id, value } = data;
  orderStore.updateOrder(id, value);
  if (value <= 0) {
    currentOrder.value = orderStore.getOrder.map(mapOrder);
  }
}


// If the orderId exists, then we dont have to create a new order
const createOrder = orderId ? false : true;
if(!createOrder){
  createdOrder.value = true;
}
</script>

<style lang="scss" scoped></style>
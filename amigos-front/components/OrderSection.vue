<template>
    <div>
        <h3 class="mb-5"><slot/></h3>
        <div class="w-12 flex flex-column gap-3">
            <div v-for="(item, index) in itemsList" :key="item.id">
                <OrderItem :orderItem="item" :index="index" :addToOrder="addToOrder" @input="updateList(index)"></OrderItem>
            </div>
            <div v-if="createOrder && addToOrder">
                <Button @click="createOrderBtn">Crear orden</Button>
            </div>
            <div v-else-if="addToOrder">
                <Button @click="updateOrder">Actualizar orden</Button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useSessionStore } from '~/store/session';
import OrderService from '~/services/order.service';
import { useOrderStore } from '~/store/order';

const orderStore = useOrderStore();
const orderId = orderStore.getOrderId;

const axios = useNuxtApp().$axios;
const orderService = new OrderService(axios)

const { orderList, addToOrder, createOrder } = defineProps(["orderList", "addToOrder", "createOrder"]);

const sessionStore = useSessionStore();
const sessionId = sessionStore.getSessionId;

const itemQuantity = ref(orderList.map(el => el.quantity));
const itemId = ref(orderList.map(el => el.id));
const itemsList = ref(orderList);

const updateList = (index) => {
    itemQuantity.value.splice(index, 1);
    itemId.value.splice(index, 1);
    itemsList.value.splice(index, 1);

};

const createOrderBtn = async() => {
    const order = await orderService.createOrder(itemsList, sessionId);
    orderStore.setOrderId(order.data.id);
    orderStore.clearOrder();
    alert("Orden creada con id : " + JSON.stringify(order.data))
}

const updateOrder = async()=>{
    const updatedOrder = await orderService.updateOrder(orderId, itemsList);
    alert("Orden actualizada");
}


</script>
<style lang="scss" scoped>

</style>
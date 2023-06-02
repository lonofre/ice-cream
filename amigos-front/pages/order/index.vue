<template>
    <NuxtLayout :name="layout">
        <div>
            <div class="w-10 mx-auto">
                <h2 class="font-bold">Su orden</h2>
                <OrderSection :orderList="newItems" :addToOrder="true" :createOrder="createOrder">Para enviar a cocina</OrderSection>
                <OrderSection :orderList="ordenados" :addToOrder="false" :createOrder="false">Ya ordenados</OrderSection>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import OrderService from '~/services/order.service';
import { useOrderStore } from '~/store/order';

const orderStore = useOrderStore();
const newOrder = orderStore.getOrder;
const orderId = orderStore.getOrderId;

console.log(orderId + " <--- OrderId")
// For already ordered items
const axios = useNuxtApp().$axios;
const orderService = new OrderService(axios);
const ordenados = orderId ? await orderService.getOrderItems(orderId).data : [];
console.log(ordenados + " <-- Ordenaods");

// For the items that will be added to an existing order
const newItems = newOrder.map(el => {
    return {
        quantity: el.items,
        id: el.product.id
    };
});
const layout = 'client'
/* definePageMeta({
    middleware: ['check-auth', 'is-tablet_master', 'check-session']
}) */

// If the orderId exists, then we dont have to create a new order
const createOrder = orderId ? false : true;
</script>

<style lang="scss" scoped></style>
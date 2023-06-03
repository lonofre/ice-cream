<template>
    <div>
        <h3 class="mb-5"><slot/></h3>
        <div class="w-12 flex flex-column gap-3">
            <div v-for="(item, index) in orderList" :key="item.id">
                <OrderItem :orderItem="item" :index="index" :addToOrder="addToOrder" @input="updateList"></OrderItem>
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
import OrderService from '~/services/order.service';
import { useOrderStore } from '~/store/order';

const orderStore = useOrderStore();
const orderId = orderStore.getOrderId;
const emit = defineEmits('createNewOrder', 'updateCurrentOrder', "updateProduct");

const axios = useNuxtApp().$axios;
const orderService = new OrderService(axios)

const { orderList, addToOrder, createOrder } = 
    defineProps(["orderList", "addToOrder", "createOrder"]);

const updateList = (data) => {
    emit("updateProduct", data)
};

const createOrderBtn = async() => {
    emit('createNewOrder');
}

const updateOrder = async()=>{
    emit('updateCurrentOrder');
    /*
    const updatedOrder = await orderService.updateOrder(orderId, itemsList.value);
    alert("Orden actualizada");
    */
}


</script>
<style lang="scss" scoped>

</style>
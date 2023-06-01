<template>
    <div>
        <h3 class="mb-5"><slot/></h3>
        <div class="w-12 flex flex-column gap-3">
            <div v-for="(item, index) in itemsList" :key="item.id">
                <OrderItem :orderItem="item" :index="index" :addToOrder="addToOrder" @input="updateList(index)"></OrderItem>
            </div>
        </div>
    </div>
</template>

<script setup>
const { orderList, addToOrder } = defineProps(["orderList", "addToOrder"]); 
const itemQuantity = ref(orderList.map(el => el.quantity));
const itemId = ref(orderList.map(el => el.id));
const itemsList = ref(orderList);

const updateList = (index) => {
    itemQuantity.value.splice(index, 1);
    itemId.value.splice(index, 1);
    itemsList.value.splice(index, 1);

};


</script>
<style lang="scss" scoped>

</style>
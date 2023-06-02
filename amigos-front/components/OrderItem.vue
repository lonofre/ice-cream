<template>
    <div class="flex flex-row p-3 border-round-md justify-content-between order-item">
        <div class="flex flex-row gap-3 w-6">
            <img :src="info.image" alt="Product Img" class="product-img  border-round-md">
            <div>
                <h3>{{ info.name }}</h3>
                <p>
                    {{ info.description }}
                </p>
            </div>
        </div>
        <div class="w-6">
            <div class="flex justify-content-end ">
                <h3>${{ price }}.00</h3>
            </div>
            <div class="flex justify-content-end ">
                <span class="priceBtn" v-if="!addToOrder">Cantidad: {{ orderItem.quantity }}</span>
                <div class="number-input" v-else>
                    <InputNumber v-model="inputVal" inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
                        :step="1" decrementButtonClass="p-button-secondary" incrementButtonClass="p-button-secondary"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal"
                        @input="handleChange" class="numberInput" :inputStyle="{ width: '80px', textAlign: 'center' }" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber';
import ProductService from '~/services/product.service';
const axios = useNuxtApp().$axios;
const productService = new ProductService(axios);
const { orderItem, addToOrder, index } = defineProps(["orderItem", "addToOrder", "index"]);
const emit = defineEmits(["input"]);
const infoProd = await productService.getProductById(orderItem.id);
const info = infoProd.data.data;
console.log(info);
const inputVal = ref(orderItem.quantity);
// Datos harcodeados para pruebas
// "https://www.cocinavital.mx/wp-content/uploads/2017/08/receta-masa-hot-cakes.jpg"
// https://assets.unileversolutions.com/recipes-v2/210995.jpg

// Si el valor llega a 0, emitimos el cambio al padre
const handleChange = () => {
    if (inputVal.value == 0) {
        emit("input", index.value);
    }
}

let price = computed(() => inputVal.value * info.price);

</script>

<style scoped lang="scss">
.order-item {
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.product-img {
    object-fit: cover;
}

img {
    max-width: 100px;
    height: auto;
}

.priceBtn {
    padding: 5px 10px;
    background-color: rgb(255, 255, 255);
    color: white;
    font-size: small;
    border-radius: 15%;
}

div.number-input {
    max-width: 50%;
}

    
</style>
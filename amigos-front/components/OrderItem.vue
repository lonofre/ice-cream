<template>
    <div class="flex flex-row p-3 surface-300 border-round-md justify-content-between">
        <div class="flex flex-row gap-3 w-8">
            <img :src="info.image" alt="Product Img">
            <div>
                <h3>{{ info.name }}</h3>
                <p>
                    {{ info.description }}
                </p>
            </div>
        </div>
        <div class="border-solid border-blue-500 w-3">
            <h3>${{ price }}.00</h3>
            <span class="priceBtn" v-if="!addToOrder">Cantidad: {{ orderItem.quantity }}</span>
            <div class="w-12" v-else>
                <InputNumber v-model="inputVal" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1"
    decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
    mode="decimal" @input="handleChange"/>
            </div>

        </div>
    </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber';
const { orderItem, addToOrder, index } = defineProps(["orderItem", "addToOrder", "index"]);
const emit = defineEmits(["input"]);
const inputVal = ref(orderItem.quantity);
// Datos harcodeados para pruebas
const info = {
    image : "https://www.cocinavital.mx/wp-content/uploads/2017/08/receta-masa-hot-cakes.jpg",
    name: "Hot cakes",
    description : "Unos hotcakes muy rikolinos",
    price: 10
}

// Si el valor llega a 0, emitimos el cambio al padre
const handleChange = () => {
    if(inputVal.value == 0){
        emit("input", index.value);
    }
}

let price = computed(() => inputVal.value * info.price);

</script>

<style scoped>
img{
    max-width: 100px;
    height: auto;
}

.priceBtn{
    padding: 5px 10px;
    background-color: darkgrey;
    color: white;
    font-size: small;
    border-radius: 15%;
}
</style>
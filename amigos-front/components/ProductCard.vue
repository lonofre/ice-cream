<template>
  <div class="product-card flex flex-column justify-content-between">
    <div>
      <div>
        <img class="product-img" :src="product.image">
      </div>
      <div class="flex justify-content-between align-items-end">
        <p class="text-lg title mr-1">{{ product.name }}</p>
        <p class="price text-xl">{{ formatPrice(product.price) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-700">{{ product.description }}</p>
      </div>
    </div>

    <div class="flex justify-content-end flex-wrap">
      <Button @click="addToOrder(product)" :icon="icon" :severity="severity" :label="label" size="small" rounded />
    </div>
  </div>
</template>

<script setup>
/**
 * Shows a product card, that contains a product's data.
 * It allows add this product to the current order.
 */

const props = defineProps({
  product: Object
})

const severity = ref('')
const icon = ref('')
const label = ref('Agregar')

const options = { style: 'currency', currency: 'MXN' }
const formatPrice = function(value) {
  return value.toLocaleString('es-MX', options)
}

const emit = defineEmits('addToOrder')

/**
 * Add this product to the order
 * @param {Product} product 
 */
const addToOrder = function(product){
  emit('addToOrder', props.product)
  setTimeout(() => {
    severity.value = ''
    icon.value = ''
    label.value = 'Agregar'
  }, 3000)
  severity.value = 'success'
  icon.value = 'pi pi-check'
  label.value = 'Añadido'
}

</script>

<style lang="scss" scoped>
.product-card {
  width: 15em;
  height: 23em;
  margin: 0.5em;

  .product-img {
    border-radius: 8px;
  }

  .title {
    font-weight: bold;
    display: inline-block;
    margin-bottom: 0;
  }

  .price {
    display: inline-block;
    margin-bottom: 0;
  }

  img {
    max-width: 100%;
    display: inline-block;
  }

  background-color: white;
  border: 2px solid white;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
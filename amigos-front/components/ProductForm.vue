<template>
  <div>
    <Toast />
    <div class="p-fluid">
      <div class="p-field">
        <label for="name">Nombre</label>
        <InputText id="name" v-model="product.name" />
      </div>
      <div class="p-field">
        <label for="description">Descripción</label>
        <InputText id="description" v-model="product.description" />
      </div>
      <div class="p-field">
        <label for="image">Imagen</label>
        <InputText id="image" v-model="product.image" />
      </div>
      <div class="p-field">
        <label for="price">Precio</label>
        <InputNumber id="price" v-model="product.price" mode="currency" currency="MXN" />
      </div>
      <div class="p-field">
        <label for="category">Categoría</label>
<Dropdown id="category" v-model="product.categoryName" :options="categoryOptions" :placeholder="product.categoryName ? product.categoryName : 'Select a category'" />
      </div>
    </div>
    <Button label="Save" @click="saveProduct" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import ProductService from '~/services/product.service';
import Message from 'primevue/message';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: false,
    default: 0,
  },
});

const categoryOptions = [
  'entradas',
  'plato fuerte', 
  'bebidas',
  'postre',
];

const mode = props.mode;
const productId = props.productId;

const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);

const product = ref({
  name: '',
  description: '',
  image: '',
  price: null,
  categoryName: '',
});

const axios = useNuxtApp().$axios;
const productService = new ProductService(axios);


onMounted(async () => {
  if (mode === 'edit' && productId) {
    await fetchProduct(productId);
  }
});

const fetchProduct = async (productId) => {
  const response = await productService.getProductById(productId);
  if (response.status === 200) {
    product.value = response.data;
    product.value.categoryName = response.data.category.name;
  } else {
    toast.add({ severity: 'danger', summary: mode === 'edit' ? 'No se puede editar el producto ahora' : 'No se puede crear el producto ahora', life: 3000 });
  }
};

const saveProduct = async () => {
  const response =
    mode === 'edit' ? await productService.updateProduct(product.value) : await productService.createProduct(product.value);
  if (response.status === 201) {
    toast.add({ severity: 'success', summary: mode === 'edit' ? 'Producto editado existosamente' : 'Producto creado correctamente', life: 3000 });
  } else {
    toast.add({ severity: 'danger', summary: mode === 'edit' ? 'No se pudo editar el producto' : 'No se pudo crear el producto', life: 3000 });
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 20px;
}

.p-field {
  margin-bottom: 20px;
}
</style>

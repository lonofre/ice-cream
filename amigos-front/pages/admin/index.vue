<template>
    <NuxtLayout :name="layout">
        <div>
      <Message severity="success" v-if="showSuccessMessage" closable>
        Producto eliminado correctamente
      </Message>
      <Message severity="error" v-if="showErrorMessage" closable>
        El producto no pudo ser eliminado por fallo del servidor
      </Message>
    </div>
    <div class = "product-table">
      <Toolbar class="mb-4">
          <template #start>
              <h1>Productos</h1>
          </template>
          <template #end>
              <Button class="icon-button" icon="pi pi-plus" @click="addProduct"  />
          </template>
      </Toolbar>
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="name" header="Nombre"></Column>
        <Column field="description" header="Descripción"></Column>
        <Column field="price" header="Precio"></Column>
        <Column header="Imagen">
          <template #body="slotProps">
            <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-2 border-round" style="width: 64px" />
        </template>
        </Column>
        <Column field="category.name" header="Categoría"> 
          <template #body="slotProps">
            <Tag :value="slotProps.data.category.name"  :severity="getCategoryLabel(slotProps.data.category.name)" />
          </template>
        </Column>
        <Column header="Acciones" style="min-width:8rem">
          <template #body="slotProps">
            <Button class="icon-button" icon="pi pi-pencil" @click="editProduct(slotProps.data)"></Button>
            <Button class="icon-button" icon="pi pi-trash" @click="deleteProduct(slotProps.data)"></Button>
          </template>
        </Column>
      </DataTable>
    </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

const layout = 'admin'
definePageMeta({
    middleware: ['check-auth', 'is-admin']
})

import { ref } from 'vue';
import ProductService from '~/services/product.service';
import { Product } from '~/models/product';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Toolbar from 'primevue/toolbar';
import Message from 'primevue/message';

const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const axios = useNuxtApp().$axios;
const productService = new ProductService(axios);
const products = ref<Product[]>([]);

const getCategoryLabel = (category) => {
    switch (category) {
        case 'entradas':
            return 'success';

        case 'plato fuerte':
            return 'warning';

        case 'bebidas':
            return 'danger';

        case 'postre':
            return 'primary';

        default:
            return null;
    }
};

onMounted(async () => {
  const response = await productService.getAllProducts();
  if (response?.status == 200) {
    products.value = response.data ?? [];
  }
})

/**
 * 
 * @param {Product} product 
 */
 const editProduct = function (product: Product) {
}

/**
 * 
 * @param {Product} product 
 */
 const addProduct = function () {
}

/**
 * 
 * @param {Product} product 
 */
 const deleteProduct = async function (product: Product) {
  const confirm = await window.confirm('¿Está seguro que desea eliminar el producto?');
  if (confirm) {
    const response = await productService.deleteProduct(product.id);
    if (response?.status == 200) {
      showSuccessMessage.value = true;
      // Update the list of products removing the deleted element
      products.value = products.value.filter(p => p.id !== product.id);
    }else{
      showErrorMessage.value = true;
    }
  }
}

</script>

<style lang="scss" scoped>


.icon-button {
  color: gray;
  background: none;
  border: none;
}

.product-table {
  margin: 50px;
}

</style>
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
    <!-- <ProductForm
      v-if="showProductForm"
      :mode="productFormMode"
      :productId="selectedProductId"
      @close="showProductForm = false"
    /> -->
    <div class="product-table">
      <Toolbar class="mb-4">
        <template #start>
          <h1>Productos</h1>
        </template>
        <template #end>
          <Button class="icon-button" icon="pi pi-plus" @click="addProduct"></Button>
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
            <Tag :value="slotProps.data.category.name" :severity="getCategoryLabel(slotProps.data.category.name)" />
          </template>
        </Column>
        <Column header="Acciones" style="min-width:8rem">
          <template #body="slotProps">
            <Button class="icon-button" icon="pi pi-pencil" @click="editProduct(slotProps.data)"></Button>
            <Button class="icon-button" icon="pi pi-trash" @click="deleteProduct(slotProps.data)"></Button>
          </template>
        </Column>
      </DataTable>
      <Dialog v-model="showProductForm" :modal="true" :visible="showProductForm" :style="{ 'width': '50vw' }" :header="productFormMode === 'edit' ? 'Edit Product' : 'Create Product'" :onHide="resetProductForm">
        <ProductForm :mode="productFormMode" :productId="selectedProductId" @close="resetProductForm" />
      </Dialog>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductService from '~/services/product.service';
import { Product } from '~/models/product';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Toolbar from 'primevue/toolbar';
import Message from 'primevue/message';
import Dialog from 'primevue/dialog';
import ProductForm from '~/components/ProductForm.vue';

const layout = 'admin';
definePageMeta({
  middleware: ['check-auth', 'is-admin']
});

const showSuccessMessage = ref(false);
const showErrorMessage = ref(false);
const showProductForm = ref(false);
const selectedProductId = ref(0);
const productFormMode = ref('create');

const axios = useNuxtApp().$axios;
const productService = new ProductService(axios);
const products = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);

const getCategoryLabel = (category: string) => {
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
  if (response?.status === 200) {
    products.value = response.data ?? [];
  }
});

const editProduct = function (product: Product) {
  productFormMode.value = 'edit';
  selectedProductId.value = product.id;
  selectedProduct.value = product;
  showProductForm.value = true;
};

const addProduct = function () {
  productFormMode.value = 'create';
  selectedProductId.value = 0;
  selectedProduct.value = null;
  showProductForm.value = true;
};

const resetProductForm = function () {
  showProductForm.value = false;
  selectedProductId.value = 0;
  selectedProduct.value = null;
};

const deleteProduct = async function (product: Product) {
  const confirm = await window.confirm('¿Está seguro que desea eliminar el producto?');
  if (confirm) {
    const response = await productService.deleteProduct(product.id);
    if (response?.status === 200) {
      showSuccessMessage.value = true;
      // Update the list of products removing the deleted element
      products.value = products.value.filter((p) => p.id !== product.id);
    } else {
      showErrorMessage.value = true;
    }
  }
};
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

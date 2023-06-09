<template>
  <NuxtLayout :name="layout">
    <Toast />
    <div class="product-table">
      <Toolbar class="mb-4">
        <template #start>
          <h1>Productos</h1>
        </template>
        <template #end>
          <Button class="icon-button" label="Agregar producto" icon="pi pi-plus" @click="addProduct"></Button>
        </template>
      </Toolbar>
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="name" header="Nombre">
          <template #body="slotProps">
            <b>{{ slotProps.data.name }}</b>
          </template>
        </Column>
        <Column field="description" header="Descripción"></Column>
        <Column field="price" header="Precio">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.price) }}
          </template>
        </Column>
        <Column header="Imagen">
          <template #body="slotProps">
            <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="shadow-2 border-round"
              style="width: 64px" />
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
      <Dialog v-model:visible="showProductForm" :modal="true" :style="{ 'width': '50vw' }"
        :header="productFormMode === 'edit' ? 'Editar Producto' : 'Crear Producto'" :onHide="resetProductForm">
        <ProductForm :mode="productFormMode" :productId="selectedProductId" @close-dialog="resetProductForm" />
      </Dialog>
      <ConfirmDialog></ConfirmDialog>
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
import Dialog from 'primevue/dialog';
import ProductForm from '~/components/ProductForm.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';

const toast = useToast();
const confirm = useConfirm();

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
  reloadProducts();
};


const deleteProduct = async (product: Product) => {
  confirm.require({
    message: '¿Está seguro que desea eliminar el producto?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      const response = await productService.deleteProduct(product.id);
      if (response?.status === 200) {
        toast.add({ severity: 'success', summary: 'Producto eliminado correctamente', life: 3000 });
        // Update the list of products removing the deleted element
        products.value = products.value.filter((p) => p.id !== product.id);
      } else {
        toast.add({ severity: 'success', summary: 'No se pudo eliminar el producto', life: 3000 });
      }
    },
    reject: () => {

    }
  });
};



const reloadProducts = async function () {
  const response = await productService.getAllProducts();
  if (response?.status === 200) {
    products.value = response.data ?? [];
  }
};

const options = { style: 'currency', currency: 'MXN' }
const formatPrice = function (value: number) {
  return value.toLocaleString('es-MX', options)
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

<template>
<NuxtLayout :name="layout">
  <!-- Agregar -->
  
  <Toast />
  <div class="user-table">
    <Toolbar class="mb-4">
      <template #start>
        <h1>Tablet_Master</h1>
      </template>
      <template #end>
        <Button class="icon-button" label="Agregar Tableta" icon="pi pi-plus" @click="addUser"></Button>
      </template>
    </Toolbar>
    
    
    <DataTable :value="users" tableStyle="min-width: 50rem">
      <Column field="username" header="Nombre">
        <template #body="slotProps">
          <b>{{ slotProps.data.username }}</b>
        </template>
      </Column>
      <Column field="role" header="Rol">
        <template #body="slotProps">
          {{ slotProps.data.role }}
        </template>
      </Column>
      
      <Column header="Acciones" style="min-width:8rem">
	  <template #body="slotProps">
	      <Button class="icon-button" icon="pi pi-pencil" @click="editUser(slotProps.data)"></Button>
	      <Button class="icon-button" icon="pi pi-trash" @click="deleteUser(slotProps.data)"></Button>
	    </template>
	</Column>
    </DataTable>
    
      <Dialog v-model:visible="showUserForm" :modal="true" :style="{ 'width': '50vw' }"
              :header="userFormMode === 'edit' ? 'Editar Usuario' : 'Crear Usuario'" :onHide="resetUserForm">
        <UserForm :mode="userFormMode" :userId="selectedUserId" @close-dialog="resetUserForm" />
      </Dialog>
      <ConfirmDialog></ConfirmDialog>
  </div>    
</NuxtLayout>
</template>

<script setup lang="ts">
  
  import Message from 'primevue/message';
  import Dropdown from 'primevue/dropdown';
  import Toast from 'primevue/toast';
  import Toolbar from 'primevue/toolbar';
  import Dialog from 'primevue/dialog';
  import UserForm from '~/components/UserForm.vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Tag from 'primevue/tag';
  import { useToast } from 'primevue/usetoast';
  import { useConfirm } from 'primevue/useconfirm';
  import ConfirmDialog from 'primevue/confirmdialog';

  
  definePageMeta({
  middleware: ['check-auth', 'is-admin']
  })
  
  import { ref } from 'vue';
  import UserService from '~/services/user.service';
  import { User } from '~/models/user';
  
  const showSuccessMessage = ref(false);
  const showErrorMessage = ref(false);
  const showUserForm = ref(false);
  const selectedUserId = ref(0);
  const userFormMode = ref('create');
  
  const axios = useNuxtApp().$axios;
  const userService = new UserService(axios);
  
  /* Page Data */
  const layout = 'admin'
  const users = ref<User[]>([]);
    
    const addUser = function () {
    userFormMode.value = 'create';
    selectedUserId.value = 0;
    selectedUser.value = null;
    showSelectedForm.value = true;
    };

    
    const resetUserForm = function () {
    showUserForm.value = false;
    selectedUserId.value = 0;
    selectedUser.value = null;
    reloadUsers();
    };

    const reloadUsers = async function () {
    const response = await userService.getAllUsers();
    if (response?.status === 200) {
    users.value = response.data ?? [];
    }
    };

    const editUser = function (user: User) {
    userFormMode.value = 'edit';
    selectedUserId.value = user.id;
    selectedUser.value = user;
    showUserForm.value = true;
    };

    
    const deleteUser = async (user: User) => {
    confirm.require({
    message: '¿Está seguro que desea eliminar el Usuario?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
    const response = await userService.deleteUser(user.id);
    if (response?.status === 200) {
    toast.add({ severity: 'success', summary: 'Usuario eliminado correctamente', life: 3000 });
    // Update the list of products removing the deleted element
    users.value = users.value.filter((p) => p.id !== product.id);
    } else {
    toast.add({ severity: 'success', summary: 'No se pudo eliminar el usuario', life: 3000 });
    }
    },
    reject: () => {
    
    }
    });
    };
    
    onMounted(async () => {
    const response = await userService.getAllUsers();
    if (response?.status == 200) {
    users.value = response.data ?? [];
    }
    });
    
</script>

<style lang="scss" scoped>
.icon-button {
    color: gray;
    background: none;
    border: none;
}

.user-table {
    margin: 50px;
}
</style>

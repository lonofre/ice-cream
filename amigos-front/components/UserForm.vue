<template>
  <div>
    <Toast />
    <div class="p-fluid">
      <div class="p-field">
        <label for="name">UserName</label>
        <InputText id="name" v-model="user.username" :maxlength="maxNameLength"/>
      </div>
      <div class="p-field">
        <label for="role">Rol</label>
        <InputText id="role" v-model="user.role" :maxlength="maxDescriptionLength"/>
      </div>
    </div>
    <Button label="Guardar" @click="saveUser" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import Button from 'primevue/button';
  import UserService from '~/services/user.service';
  import Message from 'primevue/message';
  import Dropdown from 'primevue/dropdown';
  import Toast from 'primevue/toast';
  import { useToast } from 'primevue/usetoast';
  import { useConfirm } from 'primevue/useconfirm';
  import ConfirmDialog from 'primevue/confirmdialog';
  
  const emits = defineEmits(['close-dialog']);
  const maxNameLength = 40;
  const maxDescriptionLength = 80;
  
  const toast = useToast();
  
  const props = defineProps({
  mode: {
  type: String,
  required: true,
  },
  userId: {
  type: Number,
  required: false,
  default: 0,
  },
  });
  
  const mode = props.mode;
  const userId = props.userId;
  
  const showSuccessMessage = ref(false);
  const showErrorMessage = ref(false);
  
  const user = ref({
  username: '',
  role: '',
  });
  
  const axios = useNuxtApp().$axios;
  const userService = new UserService(axios);
  
  
  onMounted(async () => {
  if (mode === 'edit' && userId) {
  await fetchUser(userId);
  }
  });
  
  const fetchUser = async (userId) => {
  const response = await userService.getUsersById(userId);
  if (response.status === 200) {
  user.value = response.data;
  } else {
  toast.add({ severity: 'danger', summary: mode === 'edit' ? 'No se puede editar el usuario ahora' : 'No se puede crear el usuario ahora', life: 3000 });
  }
  };
  
  const saveUser = async () => {
  const response =
  mode === 'edit' ? await userService.updateUser(user.value) : await userService.createUser(user.value);
  if (response.status === 201) {
  toast.add({ severity: 'success', summary: mode === 'edit' ? 'Usuario editado existosamente' : 'Usuario creado correctamente', life: 3000 });
  emits('close-dialog');
  } else {
  toast.add({ severity: 'danger', summary: mode === 'edit' ? 'No se pudo editar el usuario' : 'No se pudo crear el usuario', life: 3000 });
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

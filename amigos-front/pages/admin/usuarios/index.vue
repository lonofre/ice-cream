<template>
  <NuxtLayout :name="layout">
    <!-- Agregar -->
    
    
    <!-- Usuarios:  -->
    <div class='grid'>
      <div class="sm:col-8 sm:col-offset-2 lg:col-6 lg:col-offset-3 flex justify-content-center flex-wrap">
	<Users :user="user" v-for="user in users" />
      </div>
    </div>
</NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['check-auth', 'is-admin']
})

import { ref } from 'vue';
import UserService from '~/services/user.service';
import { User } from '~/models/user';

const axios = useNuxtApp().$axios;
const userService = new UserService(axios);

/* Page Data */
const layout = 'admin'
const users = ref<User[]>([]);


onMounted(async () => {
    const response = await userService.getAllUsers();
    if (response?.status == 200) {
	users.value = response.data ?? [];
    }
})

</script>

<style lang="scss" scoped>

</style>

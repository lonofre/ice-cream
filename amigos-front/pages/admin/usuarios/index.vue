<template>
    <NuxtLayout :name="layout">
    
    <ul id='v-for-object'>
    <li v-for='user in users'>
      {{ user.username }} - {{ user.role }}
    </li>
    </ul>

    </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['check-auth', 'is-admin']
})

var lista = ['hola', 'adios']
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

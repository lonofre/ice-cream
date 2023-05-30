<template>
    <NuxtLayout :name="layout">

    <H1> AYUDA </H1>
    
    <ul id='v-for-object'>
    <li v-for='user in users'>
    {{ user.name }} - {{ user.role }}
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
const layout = ref('admin')
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

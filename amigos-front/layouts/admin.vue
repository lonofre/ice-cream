<template>
    <div>
        <div class="flex justify-content-between flex-wrap card-container purple-container">
            <div class="flex align-items-center justify-content-center ">
                <h1 class="mx-3">50amigos</h1>
            </div>
            <div class="flex align-items-center justify-content-center ">
                <NuxtLink to="/admin"><Button label="Productos" :class="'mr-3'"
                    severity="info" :text="route.path != '/admin'" rounded />
                </NuxtLink>
                <NuxtLink to="/admin/helados"><Button label="Helados"
                    severity="info" :class="'mr-3'" :text="route.path != '/admin/helados'"
                        rounded /></NuxtLink>
                <NuxtLink to="/admin/usuarios"><Button label="Usuarios" :class="'mr-3'"
                        :text="route.path != '/admin/usuarios'" severity="info" rounded /></NuxtLink>
                <Button label="Cerrar sesión" icon="pi pi-arrow-circle-down" :class="'mr-3'"
                    text severity="danger" @click="logout" rounded />
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup>
/**
 * Layout for the admin
 * that contains the routes
 */
import Button from 'primevue/button'
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

const route = useRoute()
const logout = function(){
    authStore.logout();
    navigateTo('/login')
}
</script>

<style lang="scss" scoped></style>
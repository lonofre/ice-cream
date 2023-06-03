<template>
    <div class="flex justify-content-center align-content-center page flex-wrap">
        <div class="flex flex-column">
            <p class="extra">Restaurante</p>
            <h1 class="title">50amigos</h1>
            <div class="flex justify-content-center">
                <Button class="button" label="Empezar" @click="navigateTo('/login')" severity="secondary" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';

</script>

<style lang="scss" scoped>
.title {
    font-size: 90px;
    margin-bottom: 5px;
    margin-top: 5px;
}
.button {
    width: 60%;
    margin-top: 20px;
}
.extra {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
}
.page {
    width: 100%;
    height: 100vh;
    background-color: orange;
}
</style>
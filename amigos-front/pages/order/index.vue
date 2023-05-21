<template>
    <NuxtLayout :name="layout">
        
    </NuxtLayout>
</template>

<script setup>
const layout = 'client'

definePageMeta({
    middleware: ['check-auth', 'is-tablet_master', 'check-session']
})

</script>

<style lang="scss" scoped></style>
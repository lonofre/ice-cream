<template>
  <NuxtLayout :name="layout">


  </NuxtLayout>
</template>

<script setup>
const layout = 'admin'
definePageMeta({
  middleware: ['check-auth', 'is-admin']
})

</script>

<style lang="scss" scoped>

</style>
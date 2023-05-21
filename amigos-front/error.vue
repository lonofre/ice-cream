<template>
  <div class="flex justify-content-center align-content-center page flex-wrap">
    <div class="flex flex-column">
      <p class="extra">50amigos</p>
      <h1 class="title">{{ titleError }}</h1>
      <div class="flex justify-content-center">
        <Button class="button" label="Volver" @click="handleError" severity="secondary" icon="pi pi-arrow-left" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
const titleError = ref("Ocurrió algo inesperado");


const handleError = function () {
  clearError();
  const router = useRouter();
  router.back();
}

</script>

<style lang="scss" scoped>
.title {
  font-size: 90px;
  margin-bottom: 5px;
  margin-top: 5px;
}

.button {
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
}
</style>
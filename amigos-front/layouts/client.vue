  <template>
    <div>
      <div class="flex justify-content-between flex-wrap card-container purple-container">
        <div class="flex align-items-center justify-content-center "></div>
        <div class="flex align-items-center justify-content-center ">
          <h1 class="mx-3" >50amigos</h1>
        </div>
        <div class="flex align-items-center justify-content-center ">
          <NuxtLink to="/menu"><Button label="Menú" :class="'mr-3'" :text="route.path != '/menu'" rounded /></NuxtLink>
          <NuxtLink to="/order"><Button icon="pi pi-shopping-bag" :class="'mr-3'" severity="primary" :text="route.path != '/order'" rounded
              aria-label="Cancel" /></NuxtLink>
        </div>
      </div>
      <slot />
    </div>
  </template>

  <script setup>
  /**
   * Layout for a client that is going to use 
   * the menu to make an order
   */
  import Button from 'primevue/button'
  import { watch } from 'vue'

  const route = useRoute()
  </script>

  <style lang="scss" scoped></style>
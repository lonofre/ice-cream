<template>

<div class='users flex flex-column justify-content-between'>
  <div class='name'>
    <p> Usuario: {{user.username}}</p>
  </div>
  <div class='role'>
    <p> Rol: {{user.role}}</p>
  </div>
  <div class="text-align:center">
  <Button severity="secondary" size="big" :class="'mx-2'">Eliminar</Button>
  <!-- @click="changeCategory(category)" /> -->
  </div>
</div>

</template>

<script setup lang="ts">
  const props = defineProps({
  user: Object
})


  /**
  * Add this product to the order
  * @param {Product} product 
  */
  const addToOrder = function(product){
  emit('addToOrder', props.product)
  setTimeout(() => {
  severity.value = ''
  icon.value = ''
  label.value = 'Agregar'
  }, 3000)
  severity.value = 'success'
  icon.value = 'pi pi-check'
  label.value = 'Añadido'
  }
</script>

<style lang="scss" scoped>
.users {
width: 30em;
height: 10em;
margin: 0.5em;

.name {
font-weight: bold;
display: inline-block;
margin-bottom: 0;
}

.role {
font-weight: italic;
display: inline-block;
margin-bottom: 0;
}

background-color: white;
border: 2px solid white;
padding: 1em;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

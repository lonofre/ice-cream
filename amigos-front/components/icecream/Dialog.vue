<template>
  <Dialog :visible="isActive" header="Elige tu helado" modal :style="{ width: '50vw' }" :closable="false">
    <div class="grid">
      <div class="col flex flex-column gap-3">
        <div class="flex flex-column gap-2">
          <label for="name">Comensal</label>
          <InputText id="name" type="text" :style="{ width: '100%' }" v-model="name"
            placeholder="¿Para quién va el helado?" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="icecream">Helado</label>
          <Dropdown id="icecream" :options="options" :style="{ width: '100%' }" option-label="flavor"
            v-model="selectedIcecream" placeholder="Selecciona un helado" />
        </div>
      </div>
      <div class="col flex justify-content-center">
        <img :src="imageUrl" class="icecream">
      </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" @click="closeDialog" text />
      <Button label="Agregar voto" :disabled="!isDataPresent" icon="pi pi-plus" @click="selectIcecream" autofocus />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Icecream, SingleVote } from '~/models/icecream';

// Component data
const name = ref<string>('');
const selectedIcecream = ref();
const imageUrl = ref<string>("")
const props = defineProps<{
  isActive: boolean,
  options: Icecream[]
}>();
// To disable the send button
const isDataPresent = computed(() => 
  name.value && selectedIcecream.value)


const emit = defineEmits<{
  /* For send the icecream to the parent */
  (event: 'icecreamEntry', data: SingleVote): void,
  (event: 'closeDialog'): void
}>();

watch(selectedIcecream, (newValue) => {
  if(newValue) {
    imageUrl.value = newValue.image;
  }
})


const closeDialog = function () {
  selectedIcecream.value = null;
  name.value = ''
  imageUrl.value = '';
  emit('closeDialog');
}


const selectIcecream = function () {
  const data = {
    icecream: selectedIcecream.value,
    name: name.value
  }
  emit('icecreamEntry', data);
  closeDialog();
}


</script>

<style lang="scss" >
img.icecream {
  border-radius: 8px;
  max-width: 80%;
}
</style>
<template>
  <NuxtLayout :name="layout">
    <div class="grid">
      <div class="col-6 col-offset-3">
        <div class="flex align-items-center">
          <h2 class="title">Votación de helados</h2>
          <Button label="Agregar voto" @click="isDialogActive = true" icon="pi pi-plus" class="ml-3"
            v-if="votes.length > 0" />
        </div>
        <div v-if="votes.length > 0">
          <h3>Votación al momento</h3>
          <IcecreamVote :vote="vote" v-for="vote in votes" />
          <div class="flex justify-content-end flex-wrap my-3">
            <Button label="Terminar" />
          </div>
        </div>
        <div v-else class="flex justify-content-center">
          <Button label="Agregar voto" @click="isDialogActive = true" icon="pi pi-plus" class="ml-3" />
        </div>
      </div>
    </div>
    <IcecreamDialog :isActive="isDialogActive" :options="icecreams" @closeDialog="isDialogActive = false"
      @icecreamEntry="receiveVote" />
  </NuxtLayout>
</template>

<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import IcecreamService from '~/services/icecream.service';

const axios = useNuxtApp().$axios;
const icecreamService = new IcecreamService(axios);
const icecreams = ref([])
const layout = 'client';
const isDialogActive = ref(true);
const votes = ref([])


onMounted(async () => {
  const { data, status } = await icecreamService.getAll();
  if (status && status == 200) {
    icecreams.value = data;
  }
})

const receiveVote = function (newVote) {
  let wasVoteMade = false;
  votes.value.forEach(vote => {
    if (vote.icecream.id == vote.icecream.id) {
      vote.people.push(vote.name);
      wasVoteMade = true;
    }
  })
  if (!wasVoteMade) {
    votes.value.push({
      icecream: newVote.icecream,
      people: [newVote.name]
    })
  }
}



</script>

<style lang="scss" scoped>
h2.title {
  display: inline-block;
}
</style>
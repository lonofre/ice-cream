<template>
  <NuxtLayout :name="layout">
    <div class="icecream-title">
      <h1>Sección de helados</h1>
      <p>Al final de cada pedido, les ofrecemos un helado a cada uno de nuestros clientes.
      </p>
      <p> Para eso, es nesario que se realice una votación.</p>
      <p> El helado ganador, será el que recibirán todos.</p>
      <Button label="Elegir helado" @click="isDialogActive = true" :disabled="loading || isVotingCompleted" icon="pi pi-plus" class="ml-3" />
    </div>
    <div class="grid" v-if="!isVotingCompleted">
      <div class="col-6 col-offset-3">
        <div v-if="votes.length > 0">
          <h3>Votación al momento</h3>
          <IcecreamVote :vote="vote" class="mt-2" v-for="vote in votes" />
          <div class="flex justify-content-end flex-wrap my-3">
            <Button label="Terminar" :loading="loading" @click="endVoting" />
          </div>
        </div>
      </div>
    </div>
    <div class="grid mt-2" v-if="isVotingCompleted">
      <div class="col-6 col-offset-3">
        <div class="flex justify-content-center">
          <img :src="icecreamChoice?.image" alt="">
        </div>
        <div class="flex justify-content-center">
          <p> El ganador es el helado de <span class="icecream-choice">{{ icecreamChoice?.flavor }}</span>
          </p>
        </div>
      </div>
    </div>

    <IcecreamDialog :isActive="isDialogActive" :options="icecreams" @closeDialog="isDialogActive = false"
      @icecreamEntry="receiveVote" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import IcecreamService from '~/services/icecream.service';
import { Icecream, SingleVote, Vote } from '~/models/icecream';
import { rand } from '@vueuse/core';

const axios = useNuxtApp().$axios;
const icecreamService = new IcecreamService(axios);
const icecreams = ref<Icecream[]>([])
const layout = 'client';
const isDialogActive = ref(true);
const votes = ref<Vote[]>([])
const isVotingCompleted = ref<boolean>(false);
const icecreamChoice = ref<Icecream>();
const loading = ref<boolean>(false);


onMounted(async () => {
  const response = await icecreamService.getAll();
  if (response?.status == 200) {
    icecreams.value = response.data ?? [];
  }
})

/**
 * Receives a single icecream vote and adds to the global votating
 */
const receiveVote = function (newVote: SingleVote) {
  let wasVoteMade = false;
  votes.value.forEach(vote => {
    if (vote.icecream.id == newVote.icecream.id) {
      vote.people.push(newVote.name);
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

const endVoting = function () {
  setTimeout(() => {
    isVotingCompleted.value = true;
    icecreamChoice.value = makeIcecreamChoice(votes.value).icecream;
  }, 3000);
  loading.value = true;
}

const makeIcecreamChoice = function (votes: Vote[]) {
  const { votesFrequency, keys } = frequency(votes);
  const maxKey = Math.max(...keys);
  const mostVoted = votesFrequency[maxKey];
  if (mostVoted.length == 1) {
    return mostVoted[0];
  } else {
    const randomKey = Math.floor(Math.random() * mostVoted.length);
    return mostVoted[randomKey];
  }
}

const frequency = function (votes: Vote[]) {
  const votesFrequency: { [key: number]: Vote[] } = {};
  const keys = [];
  for (const vote of votes) {
    const totalVotes = vote.people.length;
    if (totalVotes in votesFrequency) {
      votesFrequency[totalVotes].push(vote);
    } else {
      votesFrequency[totalVotes] = [vote];
      keys.push(totalVotes);
    }
  }

  return { votesFrequency, keys }
}


</script>

<style lang="scss" scoped>
.icecream-title {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #ffc96b;
  background-image: url('/img/ice.png');
  background-position: 10% top;
  background-repeat: no-repeat;
  text-align: center;

  h1 {
    color: #ff4c6f;
  }

  p {
    color: white;
    font-weight: bold;
  }
}

.icecream-choice {
  font-size: 18px;
  font-weight: bold;
}

h2.title {
  display: inline-block;
  text-align: center;
}
</style>
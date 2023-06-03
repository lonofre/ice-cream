<template>
  <NuxtLayout :name="layout">
    <div class="icecream-title">
      <h1>Sección de helados</h1>
      <p>Al final de cada pedido, les ofrecemos un helado a cada uno de nuestros clientes.
      </p>
      <p> Para eso, es nesario que se realice una votación.</p>
      <p> El helado ganador, será el que recibirán todos.</p>
      <Button label="Elegir helado" @click="isDialogActive = true" :disabled="loading || isVotingCompleted"
        icon="pi pi-plus" class="ml-3" />
    </div>
    <!-- 
      Voting in progress
     -->
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
    <!-- 
      Screen when the voting was
     completed 
    -->
    <div class="grid mt-2" v-if="isVotingCompleted">
      <div class="col-8 col-offset-2 flex grid">
        <div class="col-6 icecream-result">
          <div class="flex justify-content-center">
            <img :src="icecreamChoice?.image" alt="" class="icecream-choice shadow-1">
          </div>
          <div class="flex justify-content-center flex-column">
            <p class="icecream-choice my-2 icecream-data"> 🎉 {{ icecreamChoice?.flavor }} 🎉
            </p>
            <p class="icecream-data mt-1">Helados a entregar: <Badge :value="totalVotes()"></Badge>
            </p>
          </div>
        </div>
        <div class="col-6">
          <h2>Su orden ha finalizado</h2>
          <p class="mt-0">Vuelva pronto :)</p>
          <Button label="Salir" @click="goToMenu" ></Button>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <IcecreamDialog :isActive="isDialogActive" :options="icecreams" @closeDialog="isDialogActive = false"
      @icecreamEntry="receiveVote" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import { ref } from 'vue';
import IcecreamService from '~/services/icecream.service';
import { Icecream, SingleVote, Vote } from '~/models/icecream';
import { useSessionStore } from '~/store/session';
import SessionService from '~/services/session.service';

definePageMeta({
  middleware: ['check-auth', 'is-tablet_master', 'check-session']
})

const axios = useNuxtApp().$axios;
const icecreamService = new IcecreamService(axios);
const sessionService = new SessionService(axios);
const icecreams = ref<Icecream[]>([])
const layout = 'client';
const isDialogActive = ref(false);
const votes = ref<Vote[]>([])
const isVotingCompleted = ref<boolean>(false);
const icecreamChoice = ref<Icecream>();
const loading = ref<boolean>(false);
const sessionStore = useSessionStore();


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

const totalVotes = function () {
  return votes.value.reduce((prev: number, current: Vote) => {
    return current.people.length + prev
  }, 0);
}


/**
 * Ends the voting, shows both the result
 * and the end of the session
 */
const endVoting = async function () {
  const choice = makeIcecreamChoice(votes.value);
  icecreamChoice.value = choice.icecream;
  await icecreamService.createOrder(choice.icecream.id, totalVotes());
  await sessionService.postSessionClosingAttempt();
  sessionStore.logout();
  loading.value = true;
  setTimeout(() => {
    isVotingCompleted.value = true;
  }, 3000);

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

/**
 * Frequency of votes all icecreams in votes
 */
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

const goToMenu = async function () {
  await navigateTo('/menu')
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

p.icecream-choice {
  font-size: 30px;
  font-weight: bold;
}

img.icecream-choice {
  max-width: 50%;
}


h2.title {
  display: inline-block;
  text-align: center;
}

.icecream-data {
  text-align: center;
}

.icecream-result {
  max-width: 60%;
}

.countdown {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
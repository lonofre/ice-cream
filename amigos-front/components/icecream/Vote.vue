<template>
  <div class="vote p-3 shadow-1 flex flex-wrap align-items-center  justify-content-between ">
    <div class="flex flex-wrap align-items-center">
      <img class="w-4rem flex-shrink-0" :src="vote.icecream.image" />
      <p class="flavor">{{ vote.icecream.flavor }}</p>
    </div>
    <div class="flex justify-content-between">
      <Badge :value="'Votos: ' + vote.people.length" ></Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import { Vote } from '~/models/icecream';

const props = defineProps<{
  vote: Vote
}>();


</script>

<style scoped lang="scss">
div.vote {
  background-color: white;
  border-radius: 8px;

  p.flavor {
    font-size: x-large;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 10px;
    display: inline-block;
  }

  img {
    border-radius: 8px;
  }
}
</style>
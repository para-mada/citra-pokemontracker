<template>
  <div class="row">
    <div class="col-10">
      <div class="row">
        <div class="col-2">
          <PokemonCard :pokemon="this.selectedPokemon" :back="team==='you'"/>
        </div>
      </div>
      <div class="row">
        <div class="row h-25" v-if="team === 'you'">
          <div class="col-8">
            <div class="row" v-if="this.selectedPokemon">
              <MovementCard class="col-6" :movement="this.selectedPokemon.move1" v-if="this.selectedPokemon.move1"/>
              <MovementCard class="col-6" :movement="this.selectedPokemon.move2" v-if="this.selectedPokemon.move2"/>
              <MovementCard class="col-6" :movement="this.selectedPokemon.move3" v-if="this.selectedPokemon.move3"/>
              <MovementCard class="col-6" :movement="this.selectedPokemon.move4" v-if="this.selectedPokemon.move4"/>
            </div>
          </div>
          <div class="col-4"></div>
        </div>
      </div>
    </div>
    <div class="col-2">
      <div class="card shadow-lg border border-secondary">
        <div class="row" v-if="team === 'you'">
          <span class="center">Your Team</span>
        </div>
        <div class="row" v-if="team === 'enemy'">
          <span class="center">Enemy Team</span>
        </div>
        <PokemonTeamList @pokemonSelected="selectPokemon" :team="team"/>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue'
import MovementCard from './MovementCard'
import PokemonTeamList from './PokemonTeamList.vue';
import {state} from '@/store.js';

export default {
  name: "CombatPanel",
  components: {
    PokemonTeamList,
    PokemonCard,
    MovementCard
  },
  props: {
    team: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedPokemon: null
    }
  },
  created() {
    window.electron.onDataReceived('selected_enemy', (event, data) => {
      if (this.team === 'enemy') {
        this.selectedPokemon = data.pokemon;
        state.selectedEnemyPokemon = data.pokemon;
      }
    })
  },
  methods: {
    selectPokemon: function (pokemon) {
      if (this.team === 'you') {
        this.selectedPokemon = pokemon;
        state.selectedPokemon = pokemon;
      }
    },
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="row">
    <div class="col-3">
      <PokemonPanel :pokemon="this.selectedPokemon" :team="team"/>
    </div>
    <div class="col"></div>
    <div class="col-3">
      <PokemonTeamList @pokemonSelected="selectPokemon" :team="team"/>
    </div>
  </div>
  <div class="row" v-if="this.team === 'you'">
    <div class="col-6">
      <div class="row" v-if="this.selectedPokemon">
        <MovementCard class="col-6" :movement="this.selectedPokemon.move1" v-if="this.selectedPokemon.move1"/>
        <MovementCard class="col-6" :movement="this.selectedPokemon.move2" v-if="this.selectedPokemon.move2"/>
        <MovementCard class="col-6" :movement="this.selectedPokemon.move3" v-if="this.selectedPokemon.move3"/>
        <MovementCard class="col-6" :movement="this.selectedPokemon.move4" v-if="this.selectedPokemon.move4"/>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonPanel from './PokemonPanel'
import MovementCard from './MovementCard'
import PokemonTeamList from './PokemonTeamList';
import {state} from '@/store';

export default {
  name: "CombatPanel",
  components: {
    PokemonTeamList,
    PokemonPanel,
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

    window.electron.onDataReceived('end_combat', () => {
      if (this.team === 'enemy') {
        this.selectedPokemon = null;
        state.selectedEnemyPokemon = null;
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
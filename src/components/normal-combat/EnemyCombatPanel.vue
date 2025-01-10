<template>
  <div class="row" style="margin-top:20px" v-if="false">
    <div class="col-sm">
      <div class="row row-cols-2" v-if="this.selectedPokemon">
        <div v-for="(move, index) in this.selectedPokemon.moves" :key="index" v-show="move && move.discovered">
          <div class="col" v-if="move">
            <MovementCard :enemy="this.enemyPokemon" :pokemon="this.selectedPokemon" :movement="move"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm"></div>
  </div>
  <div class="row">
    <div class="col-sm">
      <PokemonPanel :pokemon="this.selectedPokemon" team="enemy"/>
    </div>
    <div class="col-sm"></div>
    <div class="col-sm">
      <PokemonTeamList team="enemy" :data="this.data"/>
    </div>
  </div>
</template>

<script>
import PokemonPanel from '@/components/basic-comps/PokemonPanel'
import MovementCard from '../basic-comps/MovementCard'
import PokemonTeamList from '@/components/basic-comps/PokemonTeamList';

export default {
  name: "CombatPanel",
  components: {
    PokemonTeamList,
    PokemonPanel,
    MovementCard
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedPokemon: null,
      enemyPokemon: null
    }
  },
  created() {
    window.electron.onDataReceived('selected_enemy', (event, data) => {
      this.selectedPokemon = data.pokemon;
    })

    window.electron.onDataReceived('end_combat', () => {
      this.selectedPokemon = null;
      this.enemyPokemon = null;
    })
  },
  mounted() {
    this.emitter.on('select-pokemon-ally', (pokemon) => {
      this.enemyPokemon = pokemon;
    });
  },
  methods: {}
}
</script>

<style scoped>

</style>
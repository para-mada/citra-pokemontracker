<template>
  <div class="row" style="margin-top:20px" v-if="false">
    <div class="col-sm">
      <div class="row row-cols-2" v-if="this.selectedPokemon">
        <div v-for="(move, index) in this.selectedPokemon.moves" :key="index" v-show="move && move.discovered">
          <div class="col" v-if="move">
            <MultiMovementCard :enemy="this.enemyPokemon" :pokemon="this.selectedPokemon" :movement="move"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm"></div>
  </div>

  <div class="row">
    <div class="col-sm" v-for="(slot, index) in this.data.selected_pokemon" :key="index">
      <PokemonPanel :pokemon="this.data.team[slot]" team="enemy"/>
    </div>
    <div class="col-sm">
      <PokemonTeamList :data="this.data" team="enemy"/>
    </div>
  </div>
</template>

<script>
import PokemonPanel from '@/components/basic-comps/PokemonPanel'
import MultiMovementCard from '@/components/basic-comps/MultiMovementCard'
import PokemonTeamList from '@/components/basic-comps/PokemonTeamList';

export default {
  name: "CombatPanel",
  components: {
    PokemonTeamList,
    PokemonPanel,
    MultiMovementCard
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
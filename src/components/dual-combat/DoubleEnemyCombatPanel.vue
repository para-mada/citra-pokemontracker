<template>
  <v-row class="mt-4" v-if="true">
    <v-col sm>
      <v-row v-if="this.selectedPokemon">
        <v-col cols="6" v-for="(move, index) in this.selectedPokemon.moves" :key="index">
          <MovementCard :pokemon="this.selectedPokemon" :movement="move" :enemy_data="enemy_data" v-if="move"/>
        </v-col>
      </v-row>
    </v-col>
    <v-col sm></v-col>
  </v-row>
  <v-row>
    <v-col sm v-for="(slot, index) in this.data.selected_pokemon" :key="index">
      <PokemonPanel :pokemon="this.data.team[slot]" team="enemy"/>
    </v-col>
    <v-col sm></v-col>
    <v-col sm>
      <PokemonTeamList team="enemy" :data="this.data"/>
    </v-col>
  </v-row>
</template>

<script>
import PokemonPanel from '@/components/basic-comps/PokemonPanel'
import MovementCard from '@/components/basic-comps/MovementCard'
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
    },
    enemy_data: {
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
  mounted() {
  }
}
</script>

<style scoped>

</style>
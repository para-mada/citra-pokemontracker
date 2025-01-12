<template>
  <v-row class="h-25 mt-0" style="max-height: 25%">
    <v-col sm cols="8">
      <DualPokemonPanel @show_moves="show_moves" @deselect_pokemon="deselect_pokemon1"
                        @selected_pokemon="selectPokemon1" team="you" :team_data="this.data" :enemy_data="enemy_data"/>
      <DualPokemonPanel @show_moves="show_moves" @deselect_pokemon="deselect_pokemon2"
                        @selected_pokemon="selectPokemon2" team="you" :team_data="this.data" :enemy_data="enemy_data"/>
    </v-col>
    <v-col sm cols="4">
      <PokemonTeamList team="you" :data="this.data" :enemy_data="enemy_data"/>
    </v-col>
  </v-row>
</template>

<script>
import DualPokemonPanel from '@/components/basic-comps/DualPokemonPanel'
import PokemonTeamList from '@/components/basic-comps/PokemonTeamList';

export default {
  name: "CombatPanel",
  emits: ['selected_pokemon', 'deselect_pokemon'],
  components: {
    PokemonTeamList,
    DualPokemonPanel
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
  methods: {
    selectPokemon1(pokemon) {
      this.$emit('selected_pokemon', {
        slot: 1,
        pokemon: pokemon
      })
    },
    selectPokemon2(pokemon) {
      this.$emit('selected_pokemon', {
        slot: 0,
        pokemon: pokemon
      })
    },
    deselect_pokemon1() {
      this.$emit('deselect_pokemon', {
        slot: 1
      })
    },
    deselect_pokemon2() {
      this.$emit('deselect_pokemon', {
        slot: 0
      })
    },
    show_moves(pokemon) {
      this.pokemon_moves = pokemon
    }
  },
  data() {
    return {
      selectedPokemon: null,
      enemyPokemon: null,
      pokemon_moves: null
    }
  },
}
</script>

<style scoped>

</style>
<template>
  <v-row>
    <v-col cols="12">
      <VerticalPokemonTeamList @select_pokemon="select_pokemon" team="you" :data="team_data"/>
    </v-col>
  </v-row>
</template>

<script>
import VerticalPokemonTeamList from '@/components/basic-comps/VerticalPokemonTeamList'

export default {
  name: "PokemonTeamPanel",
  components: {
    VerticalPokemonTeamList
  },
  data() {
    return {
      selected_pokemon: null,
      team_data: {
        team: [null, null, null, null, null, null]
      },
    }
  },
  methods: {
    select_pokemon(pokemon) {
      this.selected_pokemon = pokemon;
    },
  },
}
</script>

<style scoped>

</style>
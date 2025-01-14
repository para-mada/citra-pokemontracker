<template>
  <v-card border class="mt-2">
    <v-alert :type="team === 'enemy' ? 'primary' : 'success'" class="p-0">
      <template v-slot:prepend>
      </template>
      <span v-if="team === 'enemy'" >
        Equipo Enemigo
      </span>
      <span v-if="team === 'you'" >
        Tu Equipo
      </span>
    </v-alert>
    <v-row class="pa-1">
      <div v-for="(pokemon, i) in this.data.team" :key="i">
        <v-col sm cols="6">
          <PokemonCard :pokemon="pokemon" @click="selectPokemon(pokemon)"/>
        </v-col>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import PokemonCard from "@/components/basic-comps/PokemonCard";

export default {
  name: "VerticalPokemonTeamList",
  emits: ["select_pokemon"],
  components: {
    PokemonCard
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    team: {
      type: String,
      required: true
    }
  },
  methods: {
    selectPokemon: function (pokemon) {
      this.$emit('select_pokemon', pokemon);
    }
  },
  created() {
  },
  updated() {
  }
}
</script>

<style scoped>

</style>
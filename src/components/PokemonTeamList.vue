<template>
  <div class="row">
    <div class="col-6" v-for="(pokemon, i) in party.team" :key="i">
      <PokemonCard :pokemon="pokemon" @click="selectPokemon(pokemon)"/>
    </div>
  </div>
</template>

<script>
import PokemonCard from "@/components/PokemonCard";

export default {
  name: "PokemonTeamList",
  emits: ["pokemonSelected"],
  components: {
    PokemonCard
  },
  props: {
    team: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      party: {
        team: [null, null, null, null, null, null]
      }
    }
  },
  methods: {
    selectPokemon: function (pokemon) {
      this.$emit('pokemonSelected', pokemon);
    }
  },
  created() {
    window.electron.onDataReceived('party_update', (event, data) => {
      if (data.team === this.team) {
        if (JSON.stringify(this.party.team[data.slot]) === JSON.stringify(data.pokemon)) return;
        this.party.team[data.slot] = data.pokemon;
        console.log(data.pokemon)
      }
    })
    window.electron.startComms()
  },
  updated() {
    if (!this.party.team[0]) {
      this.$emit('pokemonSelected', null)
    }
  }
}
</script>

<style scoped>

</style>
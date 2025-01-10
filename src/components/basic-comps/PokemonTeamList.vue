<template style="margin-top:33px">
  <div class="card border-success shadow" style="width: 18rem;margin-top:10px">
    <div class="card-header bg-success text-white" v-if="team === 'you'">
      Tu Equipo
    </div>
    <div class="card-header bg-primary text-white" v-if="team === 'enemy'">
      Equipo Enemigo
    </div>
    <div class="row" style="padding: 10px;">
      <div class="col" v-for="(pokemon, i) in this.data.team.slice(0,3)" :key="i">
        <PokemonCard :pokemon="pokemon" @click="selectPokemon(pokemon)"/>
      </div>
    </div>
    <div class="row" style="padding: 10px; padding-top: 0px;">
      <div class="col" v-for="(pokemon, i) in this.data.team.slice(3,6)" :key="i">
        <PokemonCard :pokemon="pokemon" @click="selectPokemon(pokemon)"/>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from "@/components/basic-comps/PokemonCard";

export default {
  name: "PokemonTeamList",
  emits: ["pokemonSelected"],
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
    console.log(this.data)
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
<template>
  <div class="card shadow-lg border border-secondary">
    <div class="row" v-if="team === 'you'">
      <span class="center">Tu Equipo</span>
    </div>
    <div class="row" v-if="team === 'enemy'">
      <span class="center">Equipo Enemigo</span>
    </div>
    <div class="row">
      <div class="col-4" v-for="(pokemon, i) in party.team" :key="i">
        <PokemonCard :pokemon="pokemon" @click="selectPokemon(pokemon)"/>
      </div>
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
      }
    })
    if (this.team === 'enemy') {
      window.electron.onDataReceived('end_combat', () => {
        this.party.team = [null, null, null, null, null, null];
      })
    }
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
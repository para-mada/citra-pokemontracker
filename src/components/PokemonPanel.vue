<template>
  <div class="card mb-4 shadow-lg border border-secondary">
    <div class="row" id="side">
      <div class="row" v-if="team === 'you'">
        <span class="center">Pokemon Atacando</span>
      </div>
      <div class="row" v-if="team === 'enemy'">
        <span class="center">Pokemon Enemigo</span>
      </div>
    </div>
    <div class="row" id="pokemon data">
      <div class="col-6">
        <img :src="pokemon.sprite_url" alt="" class="card-img-top" v-if="pokemon">
        <img src="https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/32" alt=""
             class="card-img-top" v-if="!pokemon">
        <div class="row" v-if="pokemon">
          <div class="col-6" v-for="(type, i) in pokemon.types" :key="i">
            <TypeComponent :pokemonType="type"/>
          </div>
        </div>
      </div>
      <div class="col-6" v-if="pokemon">
        <div class="row">
          <div class="row">
            <span class="center" :class="team === 'enemy' ? 'alert-info' : 'alert-success'">{{ pokemon.mote }}</span>
            <span class="center fw-bold">{{ pokemon.species }}</span>
            <span class="center">Nivel {{ pokemon.level }}</span>
            <span class="center">{{ pokemon.types.map((v)=>v.name).join("/") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeComponent from "./TypeComponent";

export default {
  name: "PokemonCard",
  components: {
    TypeComponent
  },
  props: {
    pokemon: {
      type: Object,
      required: false
    },
    team: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
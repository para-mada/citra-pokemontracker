<template>
    <div class="card mb-4 shadow-lg border border-secondary" v-if="pokemon" @click="$emit('click', pokemon)">
      <div class="row">
        <img :src="pokemon.sprite_url" alt="" class="card-img-top" v-if="!back">
        <img :src="pokemon.sprite_back_url" alt="" class="card-img-top" v-if="back">
      </div>
    </div>
    <div class="card mb-4 shadow-lg border border-secondary"  v-if="!pokemon">
      <img src="https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af/scale-to-width/32" alt="" class="card-img-top">
    </div>
</template>

<script>
export default {
  name: "PokemonCard",
  emits: ['click'],
  components: {
  },
  props: {
    pokemon: {
      type: Object,
      required: false
    },
    back: {
      type: Boolean,
      required: false
    }
  },
}
</script>

<style scoped>

</style>
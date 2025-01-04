<template>
  <main>
    <div class="card mb-4 shadow-lg border border-secondary" v-if="movement">
      <div class="row h-75">
        <span class="center">{{ movement.move_name }}</span>
      </div>
      <div class="row h-25 justify-content-end">
        <img class="col-2" height="20px" width="20px" :src="type" :alt="movement.type">
        <img class="col-2" height="20px" width="20px" :src="category" :alt="movement.category">
        <img class="col-2" height="20px" width="20px" :src="multiplier" alt="" v-if="multiplier"/>
        <img class="col-2" height="20px" width="20px" :src="stab" v-if="stab"/>
      </div>
    </div>
  </main>
</template>

<script>
import {state} from '@/store.js';
import {toRaw} from "vue";

function appearances(coverageTypes, enemyTypes) {
  return enemyTypes.filter(item => coverageTypes.includes(item.name)).length;
}

export default {
  name: "MovementCard",
  props: {
    movement: {
      type: Object,
      required: true
    },
  },
  computed: {
    pokemon() {
      return toRaw(state.selectedPokemon);
    },
    enemyPokemon() {
      return toRaw(state.selectedEnemyPokemon);
    },
    type() {
      return `./assets/types/${this.movement.type}.png`;
    },
    category() {
      return `./assets/categories/${this.movement.category}.png`;
    },
    multiplier() {
      if (!this.enemyPokemon) {
        return ''
      }

      let doubles = appearances(this.movement.coverage.double_damage_to, this.enemyPokemon.types)
      let halves = appearances(this.movement.coverage.half_damage_to, this.enemyPokemon.types)
      let zeroes = appearances(this.movement.coverage.no_damage_to, this.enemyPokemon.types)
      let multiplier = 1;
      if (zeroes > 0) {
        multiplier = 0;
      } else {
        if (doubles > 0) {
          multiplier = doubles * 2;
        }
        if (halves > 0) {
          multiplier /= halves * 2;
        }
      }
      if (multiplier === 1) {
        return '';
      }
      return `./assets/damage-multiplier-${multiplier}.png`;
    },
    stab() {
      if (!this.pokemon || !this.pokemon.types) return '';
      if (this.pokemon.types.map((item) => item.name).includes(this.movement.type.toLowerCase())) {
        return './assets/stab.png';
      }
      return '';
    }
  }
}
</script>

<style scoped>

</style>
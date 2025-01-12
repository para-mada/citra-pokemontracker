<template>
  <v-card type="primary" class="mt-2" border>
    <v-alert :type="team === 'enemy' ? 'primary' : 'success'" class="p-0">
      <span v-if="team === 'enemy'">
        Pokemon enemigo
      </span>
      <span v-if="team === 'you'">
        Pokemon atacando
      </span>
    </v-alert>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col>
            <img :src="pokemon ? pokemon.sprite_url : missingno" @click="dialog = true" class="cursor-pointer card-img-top" width="130" alt="">
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col>
            <div v-if="pokemon">
              <v-img :src="`./assets/types/${type_name(type.name)}.png`" v-for="(type, i) in pokemon.types" :key="i"
                     width="32" inline></v-img>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-alert :type="team === 'enemy' ? 'info' : 'success'" variant="tonal" class="pb-0 pt-0 mt-1">
          <template v-slot:prepend>
          </template>
          <template v-slot:text>
            {{ pokemon ? pokemon.mote : '???' }}
          </template>
        </v-alert>
        <p class="text-center font-weight-bold">{{ pokemon ? pokemon.species : '???' }}</p>
        <p class="text-center">{{ pokemon ? pokemon.types.map((v) => v.name).join("/") : '???' }}</p>
        <v-btn @click="deselect_pokemon()" v-if="pokemon" color="teal accent-4">Quitar</v-btn>
      </v-col>
      <v-col cols="8">
        <v-row v-if="pokemon">
          <v-col cols="6" v-for="(move, index) in pokemon.moves" :key="index">
            <MovementCard :pokemon="pokemon" :enemy_data="enemy_data" :movement="move" v-if="move"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" title="Selecciona un Pokemon">
      <template v-slot:text>
        <VerticalPokemonTeamList @select_pokemon="selectPokemon" :data="this.team_data" :team="this.team"/>
      </template>
    </v-card>
  </v-dialog>
</template>


<script>
import VerticalPokemonTeamList from "@/components/basic-comps/VerticalPokemonTeamList";
import MovementCard from "@/components/basic-comps/MovementCard";

export default {
  name: "PokemonCard",
  emits:['selected_pokemon', 'show_moves', 'deselect_pokemon'],
  components: {
    VerticalPokemonTeamList,
    MovementCard
  },
  props: {
    team: {
      type: String,
      required: true
    },
    team_data: {
      type: Object,
      required: true
    },
    enemy_data: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectPokemon(pokemon) {
      this.$emit('selected_pokemon', pokemon);
      this.pokemon = pokemon;
      this.dialog = false;
    },
    show_moves(pokemon) {
      this.$emit('show_moves', pokemon);
    },
    deselect_pokemon() {
      this.pokemon = null;
      this.$emit('deselect_pokemon')
    },
    type_name(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
  },
  data() {
    return {
      pokemon: null,
      dialog: false,
      missingno: 'https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af'
    }
  }
}
</script>

<style scoped>

</style>
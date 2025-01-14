<template>
  <v-row>
    <v-col cols="12">
      <v-card border class="mt-2">
        <v-alert :type="team === 'enemy' ? 'primary' : 'success'" class="p-0">
          <template v-slot:prepend>
          </template>
          <span>
            Caja Pokemon
          </span>
        </v-alert>
        <div class="pa-4">
          <v-row justify="space-between">
            <v-col>
              <v-select label="Cajas" :items="boxes" item-value="_id" item-title="name" v-model="selected_box"></v-select>
            </v-col>
            <v-col>
              <v-btn>Ver Equipo</v-btn>
            </v-col>
            <v-col>
              <span>Caja de {{ box_data.trainer_name }}</span>
            </v-col>
          </v-row>
          <v-row v-for="(box_row, index) in box_data.box" :key="index">
            <v-col cols="2" v-for="(pokemon, slot) in box_row" :key="slot">
              <PokemonCard :pokemon="pokemon"/>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PokemonCard from "@/components/basic-comps/PokemonCard";

export default {
  name: "PokemonTeamPanel",
  components: {
    PokemonCard
  },
  props: {
    trainer_name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected_box: 1,
      selected_pokemon: null,
      box_data: {
        box: [
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null]
        ]
      }
    }
  },
  computed: {
    boxes() {
      return [...Array(31).keys()].map((value) => {
        return {
          _id: value + 1,
          name: `PC #${value + 1}`
        }
      })
    }
  },
  created() {
    let ws = new WebSocket(`ws://localhost:8000/boxes/${this.trainer_name}`);
    ws.on('update_boxes', (data) => {
      console.log(data)
    })
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
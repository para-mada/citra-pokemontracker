<!--suppress JSVoidFunctionReturnValueUsed -->
<template>
  <v-card border>
    <template v-slot:title>
      <v-alert :color="team === 'enemy' ? 'error' : team === 'ally' ? 'info' : 'success'" class="p-0">
      <span v-if="team === 'enemy'">
        Pokemon enemigo
      </span>
        <span v-if="team === 'you'">
        Pokemon atacando
      </span>
        <span v-if="team === 'ally'">
        Pokemon aliado atacando
      </span>
      </v-alert>
    </template>
    <template v-slot:text>
      <v-row class="mt-0">
        <v-col cols="2">
          <v-row>
            <v-spacer/>
            <v-col>
              <v-img :src="pokemon ? pokemon.sprite_url : missingno" width="96"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div v-if="pokemon">
                <v-img v-for="(type, i) in pokemon_types" :key="i"
                       :src="`./assets/types/${type_name(type.name)}.png`"
                       width="32" inline/>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2">
          <v-row>
            <v-spacer/>
            <v-col class="text-center">
              <span class="justify-center mote" :class="team === 'enemy' ? 'info' : 'success'">
                {{ pokemon ? pokemon.mote : '???' }}
              </span>
            </v-col>
            <v-spacer/>
          </v-row>
          <p class="text-center font-weight-bold">{{ pokemon ? pokemon.species : '???' }}</p>
          <p class="text-center">{{ pokemon ? pokemon_types.map((v) => v.name).join("/") : '???' }}</p>
        </v-col>
        <v-col cols="8" v-if="team === 'you'">
          <v-row v-if="pokemon">
            <v-col cols="6" v-for="(move, index) in pokemon.moves" :key="index">
              <MovementCard :pokemon="pokemon" :enemy_data="enemy_data" :movement="move" v-if="move"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>


<script>
import MovementCard from "@/components/basic-comps/MovementCard";

export default {
  name: "DualPokemonPanel",
  emits: [],
  components: {
    MovementCard
  },
  props: {
    team: {
      type: String,
      required: true
    },
    pk_slot: {
      type: Number,
      required: false
    },
    team_data: {
      type: Object,
      required: true
    },
    ally_data: {
      type: Object,
      required: false
    },
    enemy_data: {
      type: Object,
      required: true
    }
  },
  methods: {
    type_name(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    },
    get_enemy_pokemon(dex_number) {
      return this.team_data.team.filter(enemy => enemy && enemy.dex_number.toString() === dex_number.toString())[0]
    },
    get_ally_pokemon(dex_number) {
      return this.ally_data.team.filter(ally => ally && ally.dex_number.toString() === dex_number.toString())[0]
    }
  },
  computed: {
    pokemon() {
      if (this.team === 'enemy') {
        return this.get_enemy_pokemon(this.pk_slot)
      } else if (this.team === 'ally') {
        return this.get_ally_pokemon(this.pk_slot)
      }
      if (this.pk_slot) {
        return this.team_data.team[this.pk_slot];
      }
      return null;
    },
    pokemon_types() {
      if (this.pokemon.battle_data) {
        return this.pokemon.battle_data.types;
      }
      return this.pokemon.types;
    }
  },
  data() {
    return {
      dialog: false,
      missingno: 'https://static.wikia.nocookie.net/bec6f033-936d-48c5-9c1e-7fb7207e28af'
    }
  }
}
</script>

<style scoped>
.mote {
  border-radius: 10px;
  padding: .2rem 1rem;
}

.success {
  background-color: rgba(76, 175, 80, 0.8);
  color: white;
}

.info {
  background-color: rgba(33, 150, 243, 0.8);
  color: white;
}
</style>
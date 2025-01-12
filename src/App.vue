<template>
  <v-container fluid>
    <v-card v-if="!game_data">
      <template v-slot:text>
        <v-row>
          <v-col cols="6">
            <v-select filled v-model="enemy_name" density="comfortable" label="Selecciona el equipo enemigo"
                      :items="displayed_teams"></v-select>
          </v-col>
          <v-col cols="6">
            <v-select filled v-model="ally_name" density="comfortable" label="Selecciona tu equipo"
                      :items="displayed_teams"></v-select>
          </v-col>
        </v-row>
      </template>
      <template v-slot:actions>
        <v-btn text @click="loadTeams" color="teal accent-4">Buscar</v-btn>
      </template>
    </v-card>
    <div v-if="game_data && game_data.combat_info.combat_type === 'OFF'" class="row justify-content-center">
      <AllyCombatPanel :data="game_data.your_data"/>
    </div>
    <div v-if="game_data && game_data.combat_info.combat_type === 'NORMAL'">
      <EnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <div class="row" style="height: 1rem"></div>
      <AllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </div>
    <div v-if="game_data && game_data.combat_info.combat_type === 'DOUBLE'">
      <DoubleEnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <div class="row" style="height: 1rem"></div>
      <DoubleAllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </div>
    <div v-if="game_data && game_data.combat_info.combat_type === 'SHOWDOWN'">
      <ShowdownDoubleEnemyCombatPanel @deselect_pokemon="deselect_enemy_pokemon" @selected_pokemon="selectEnemyPokemon"
                                      :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <ShowdownDoubleAllyCombatPanel @deselect_pokemon="deselect_ally_pokemon" @selected_pokemon="selectPokemon"
                                     :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </div>
    <div v-if="game_data && game_data.combat_info.combat_type === 'TRIPLE' && false">
      <EnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <div class="row" style="height: 1rem"></div>
      <AllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </div>
  </v-container>
</template>

<script>
import AllyCombatPanel from './components/normal-combat/AllyCombatPanel'
import EnemyCombatPanel from './components/normal-combat/EnemyCombatPanel'
import DoubleAllyCombatPanel from './components/dual-combat/DoubleAllyCombatPanel'
import DoubleEnemyCombatPanel from './components/dual-combat/DoubleEnemyCombatPanel'
import ShowdownDoubleAllyCombatPanel from './components/showdown-combat/ShowdownDoubleAllyCombatPanel'
import ShowdownDoubleEnemyCombatPanel from './components/showdown-combat/ShowdownDoubleEnemyCombatPanel'


export default {
  name: 'App',
  components: {
    AllyCombatPanel,
    EnemyCombatPanel,
    DoubleAllyCombatPanel,
    DoubleEnemyCombatPanel,
    ShowdownDoubleAllyCombatPanel,
    ShowdownDoubleEnemyCombatPanel
  },
  data() {
    return {
      game_data: null,
      enemy_name: null,
      ally_name: null,
      displayed_teams: [
        'MARYBLOG',
        'Guti',
        'Alejo',
        'CASS',
        'DANITA',
        'Garrit',
        'Maikikii',
        'RIMO',
        'TUTO',
      ]
    }
  },
  methods: {
    loadTeams() {
      window.electron.obtainTeam({
        your_trainer: this.ally_name,
        enemy_trainer: this.enemy_name
      })
    },
    selectPokemon(data) {
      // noinspection UnnecessaryLocalVariableJS
      let pokemon_slot = this.game_data.your_data.team.map((pokemon) => pokemon.dex_number).indexOf(data.pokemon.dex_number)
      this.game_data.your_data.selected_pokemon[data.slot] = pokemon_slot;
      this.$forceUpdate();
    },
    selectEnemyPokemon(data) {
      // noinspection UnnecessaryLocalVariableJS
      let pokemon_slot = this.game_data.enemy_data.team.map((pokemon) => pokemon.dex_number).indexOf(data.pokemon.dex_number)
      this.game_data.enemy_data.selected_pokemon[data.slot] = pokemon_slot;
      this.$forceUpdate();
    },
    deselect_enemy_pokemon(data) {
      this.game_data.enemy_data.selected_pokemon = this.game_data.enemy_data.selected_pokemon.splice(data.slot)
      this.$forceUpdate();
    },
    deselect_ally_pokemon(data) {
      this.game_data.your_data.selected_pokemon = this.game_data.your_data.selected_pokemon.splice(data.slot)
      this.$forceUpdate();
    }
  },
  created() {
    window.electron.onDataReceived('updated_game_data', (event, data) => {
      this.game_data = data;
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-repeat: no-repeat;
  background-size: cover;
}

* {
  cursor: default;
}
</style>

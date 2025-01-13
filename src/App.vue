<template>
  <v-container fluid>
    <v-row v-if="game_data && game_data.combat_info.combat_type === 'OFF'">
      <v-col sm>
        <PokemonTeamList team="you" :data="game_data.your_data" :enemy_data="null"/>
      </v-col>
    </v-row>

    <v-row v-if="game_data && game_data.combat_info.combat_type === 'NORMAL'">
      <EnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <AllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </v-row>

    <v-row v-if="game_data && game_data.combat_info.combat_type === 'DOUBLE'">
      <DoubleEnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <DoubleAllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </v-row>

    <v-row v-if="game_data && game_data.combat_info.combat_type === 'TRIPLE' && false">
      <EnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      <AllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </v-row>
  </v-container>
</template>

<script>
import AllyCombatPanel from './components/normal-combat/AllyCombatPanel'
import EnemyCombatPanel from './components/normal-combat/EnemyCombatPanel'
import DoubleAllyCombatPanel from './components/dual-combat/DoubleAllyCombatPanel'
import DoubleEnemyCombatPanel from './components/dual-combat/DoubleEnemyCombatPanel'
import PokemonTeamList from '@/components/basic-comps/PokemonTeamList';


export default {
  name: 'App',
  components: {
    AllyCombatPanel,
    EnemyCombatPanel,
    DoubleAllyCombatPanel,
    DoubleEnemyCombatPanel,
    PokemonTeamList
  },
  data() {
    return {
      game_data: null,
    }
  },
  created() {
    window.electron.onDataReceived('updated_game_data', async (event, data) => {
      this.game_data = data;
      for (let slot = 0; slot < this.game_data.your_data.team.length; slot++) {
        let mote = this.game_data.your_data.team[slot].mote;
        let coach_data = await fetch(`http://137.184.87.251:8000/coach_data/xshaf/${mote}`).then((res) => res.json())
        if (coach_data) {
          this.game_data.your_data.team[slot].coach_data = coach_data;
        } else {
          this.game_data.your_data.team[slot].coach_data = {
            data: {
              notes: ''
            }
          }
        }
      }
    })
    window.electron.startComms()
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

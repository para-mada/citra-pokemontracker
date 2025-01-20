<template>
  <LivePokemonTeamPanel v-if="game_data && game_data.combat_info.combat_type === 'OFF'"
                        :team_data="game_data.your_data"/>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'NORMAL'">
    <EnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
    <AllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
  </v-row>

  <v-row v-if="game_data && game_data.combat_info.combat_type === 'DOUBLE'">
    <v-row>
      <DoubleCombatPanel team="enemy" :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
    </v-row>
    <v-row>
      <v-col>
        <PokemonTeamList team="enemy" :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      </v-col>
      <v-spacer/>
      <v-col>
        <v-row class="w-100 h-100">
          <v-spacer/>
          <v-col>
            <v-card>
              <template v-slot:text>
                <v-row>
                  <v-spacer/>
                  <v-col>
                    <v-btn disabled color="teal">Buscar_pokemon</v-btn>
                  </v-col>
                  <v-spacer/>
                </v-row>
              </template>
            </v-card>
          </v-col>
          <v-spacer/>
        </v-row>
      </v-col>
      <v-spacer/>
      <v-col>
        <PokemonTeamList team="you" :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
      </v-col>
    </v-row>
    <v-row>
      <DoubleCombatPanel team="you" :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
    </v-row>
  </v-row>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'HORDE'">
    <v-row>
      <v-col>
        <v-card>
          <v-alert color="danger">WIP</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'TRIPLE' && false">
    <EnemyCombatPanel :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
    <AllyCombatPanel :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
  </v-row>
</template>

<script>
import AllyCombatPanel from "@/components/live-combat/normal-combat/AllyCombatPanel";
import EnemyCombatPanel from "@/components/live-combat/normal-combat/EnemyCombatPanel";
import DoubleCombatPanel from "@/components/live-combat/dual-combat/DoubleCombatPanel";
import LivePokemonTeamPanel from '@/components/LivePokemonTeamPanel';
import PokemonTeamList from '@/components/basic-comps/PokemonTeamList';

export default {
  name: "LiveCombatPanel",
  components: {
    AllyCombatPanel,
    EnemyCombatPanel,
    DoubleCombatPanel,
    LivePokemonTeamPanel,
    PokemonTeamList
  },
  props: {
    game_data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.game_data)
  }
}
</script>

<style scoped>

</style>
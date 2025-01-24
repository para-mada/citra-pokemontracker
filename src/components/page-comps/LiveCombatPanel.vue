<template>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'OFF'">
    <LivePokemonTeamPanel :team_data="game_data.your_data"/>
  </v-row>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'NORMAL'">
    <v-col cols="12">
      <v-row>
        <SingleCombatPanel team="enemy" :team_data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      </v-row>
      <v-row>
        <SingleCombatPanel team="you" :team_data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'DOUBLE'">
    <v-col cols="12">
      <v-row>
        <DoubleCombatPanel team="enemy" :team_data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      </v-row>
      <v-row>
        <v-col cols="4">
          <PokemonTeamList team="enemy" :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
        </v-col>
        <v-spacer/>
        <v-col cols="4">
          <PokemonTeamList team="you" :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
        </v-col>
      </v-row>
      <v-row>
        <DoubleCombatPanel team="you" :team_data="game_data.your_data" :ally_data="game_data.ally_data" :enemy_data="game_data.enemy_data"/>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'HORDE'">
    <v-row class="ml-2 mr-2">
      <v-col cols="12">
        <HordeCombatPanel team="enemy" :data="game_data.enemy_data" :enemy_data="game_data.your_data"/>
      </v-col>
    </v-row>
    <v-row class="ml-2 mr-2">
      <v-col cols="8">
        <HordeAllyCombatPanel team="you" :team_data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
      </v-col>
      <v-col cols="4">
        <PokemonTeamList team="you" :data="game_data.your_data" :enemy_data="game_data.enemy_data"/>
      </v-col>
    </v-row>
  </v-row>
  <v-row v-if="game_data && game_data.combat_info.combat_type === 'TRIPLE'">
    <v-col>
      <v-alert color="error">WIP</v-alert>
    </v-col>
  </v-row>
</template>

<script>
import SingleCombatPanel from "@/components/live-combat/normal-combat/SingleCombatPanel";
import HordeCombatPanel from "@/components/live-combat/horde-combat/HordeCombatPanel";
import HordeAllyCombatPanel from "@/components/live-combat/horde-combat/HordeAllyCombatPanel";
import DoubleCombatPanel from "@/components/live-combat/dual-combat/DoubleCombatPanel";
import LivePokemonTeamPanel from '@/components/live-combat/LivePokemonTeamPanel';
import PokemonTeamList from '@/components/basic-comps/PokemonTeamList';
import {useGameStore} from "@/stores/app";

export default {
  name: "LiveCombatPanel",
  components: {
    SingleCombatPanel,
    HordeAllyCombatPanel,
    HordeCombatPanel,
    DoubleCombatPanel,
    LivePokemonTeamPanel,
    PokemonTeamList
  },
  computed: {
    store () {
      return useGameStore();
    },
    game_data () {
      return this.store.game_data;
    },
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
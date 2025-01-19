<template>
  <TeamSelectorPanel @search="search_combat" :default_trainer="trainer_name" v-if="!combat_data"/>
  <v-row v-if="combat_data">
    <v-col>
      <DoubleCombatPanel :trainer_name="this.combat_data.enemy_trainer.name"
                         @selected_pokemon="select_enemy_pokemon" team="enemy"
                         :data="combat_data.enemy_trainer.current_team"
                         :enemy_data="combat_data.your_trainer.current_team"/>
      <v-row>
        <v-col sm cols="4">
          <PokemonTeamList team="enemy" :data="this.combat_data.your_trainer.current_team"
                           :enemy_data="this.combat_data.enemy_trainer.current_team" :trainer_name="this.combat_data.enemy_trainer.name"/>
        </v-col>
        <v-spacer/>
        <v-col>
          <v-row class="h-100 w-100" justify="center" align="center">
            <v-spacer/>
            <v-col>
              <v-card>
                <template v-slot:text>
                  <v-row>
                    <v-spacer/>
                    <v-col>
                      <v-btn color="teal" @click="speed_table_display = true">Tabla de velocidades</v-btn>
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
        <v-col sm cols="4">
          <PokemonTeamList team="you" :data="this.combat_data.enemy_trainer.current_team"
                           :enemy_data="this.combat_data.your_trainer.current_team" :trainer_name="trainer_name"/>
        </v-col>
      </v-row>
      <DoubleCombatPanel :trainer_name="this.combat_data.your_trainer.name"
                         @selected_pokemon="select_you_pokemon" team="you"
                         :data="combat_data.your_trainer.current_team"
                         :enemy_data="combat_data.enemy_trainer.current_team"/>
    </v-col>
  </v-row>
  <v-dialog v-model="speed_table_display">
    <v-row justify="center">
      <v-spacer @click="speed_table_display = false"/>
      <v-col>
        <v-card>
          <template v-slot:actions>
            <v-btn text="Cerrar" color="teal" variant="text" @click="speed_table_display = false"></v-btn>
          </template>
          <template v-slot:text>
            <SpeedTable :combat_info="combat_data"/>
          </template>
        </v-card>
      </v-col>
      <v-spacer @click="speed_table_display = false"/>
    </v-row>
  </v-dialog>
</template>

<script>
import TeamSelectorPanel from "@/components/offline-app/showdown/TeamSelectorPanel";
import DoubleCombatPanel from "@/components/offline-app/showdown/DoubleCombatPanel";
import PokemonTeamList from '@/components/offline-app/api-comps/PokemonTeamList';
import SpeedTable from "@/components/offline-app/api-comps/SpeedTable";

export default {
  name: "ShowdownCombatPanel",
  components: {
    TeamSelectorPanel,
    DoubleCombatPanel,
    PokemonTeamList,
    SpeedTable
  },
  props: {
    trainer_name: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      speed_table_display: false,
      combat_data: null,
    }
  },
  methods: {
    search_combat(data) {
      window.electron.sendMessage('showdown-combat', {
        enemy_trainer: data.selected_enemy_trainer,
        your_trainer: data.selected_trainer
      })
    },
    select_enemy_pokemon(data) {
      this.combat_data.enemy_trainer.current_team.selected_pokemon[data.slot] = data.team_slot
    },
    select_you_pokemon(data) {
      this.combat_data.your_trainer.current_team.selected_pokemon[data.slot] = data.team_slot
    },
  },
  created() {
    window.electron.onDataReceived('showdown-data', (event, data) => {
      console.log(data)
      this.combat_data = data;
      this.combat_data.enemy_trainer.current_team.selected_pokemon = []
      this.combat_data.your_trainer.current_team.selected_pokemon = []
    })
  },
}
</script>

<style scoped>

</style>
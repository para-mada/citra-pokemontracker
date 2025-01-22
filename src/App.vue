<template>
  <v-app style="background: url('./assets/kalos.png') no-repeat fixed; background-size: cover">
    <router-view/>
    <UpdateDialog :update_data="update_data" v-if="update_dialog"/>
    <v-dialog v-model="logoff_dialog">
      <v-row class="h-100 w-100" justify="center" align="center">
        <v-col cols="6">
          <v-card>
            <template v-slot:title>
              <h3>Cerrar Sesión</h3>
            </template>
            <template v-slot:text>
              <p>
                ¿Estás segur@ de que quieres cerrar sesión?
              </p>
            </template>
            <template v-slot:actions>
              <v-row>
                <v-spacer/>
                <v-col cols="4">
                  <v-btn @click="logoff_dialog = false;" variant="tonal" color="primary" text="Cancelar"/>
                  <v-btn @click="log_off(); logoff_dialog = false;" variant="text" color="error" text="Cerrar Sesión"/>
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
  </v-app>
</template>


<!--suppress JSUnresolvedFunction -->
<script>
import UpdateDialog from '@/components/UpdateDialog';

const {useGameStore} = require("@/stores/app");
export default {
  name: 'App',
  components: {
    UpdateDialog
  },
  data() {
    return {
      trainer_name: 'MARYBLOG',
      update_dialog: false,
      update_data: {
        progress: 69,
        version: '0.0.0'
      },
      logoff_dialog: false
    }
  },
  methods: {
    log_off() {
      localStorage.removeItem('api_token');
      localStorage.removeItem('trainer_id');
      localStorage.removeItem('coins');
      this.$router.push('/login')
    }
  },
  computed: {
    store: () => useGameStore()
  },
  mounted() {
    window.electron.onDataReceived('updated_game_data', async (event, data) => {
      console.log(data)
      this.store.activate(data);
    });

    window.electron.onDataReceived('trainer_name', (event, trainer_name) => {
      return this.store.set_trainer_name(trainer_name);
    });

    window.electron.onDataReceived('update-progress', (event, data) => {
      if (!this.update_dialog) {
        this.update_dialog = true;
      }
      this.update_data = data;
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

iframe {
  width: 100vw;
  height: 100vh;
  border: none;
}
</style>

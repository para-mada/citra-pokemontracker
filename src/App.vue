<template>
  <div class="container-fluid">
    <div id="1v1-combat">
      <EnemyCombatPanel/>
      <div class="row" style="height: 1rem"></div>
      <AllyCombatPanel/>
    </div>
  </div>
</template>

<script>
import AllyCombatPanel from './components/normal-combat/AllyCombatPanel'
import EnemyCombatPanel from './components/normal-combat/EnemyCombatPanel'


export default {
  name: 'App',
  components: {
    AllyCombatPanel,
    EnemyCombatPanel
  }, created() {
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

.img-thumbnail {
  cursor: pointer;
}

* {
  cursor: default;
}
</style>

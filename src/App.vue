<template >
   <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>
#app {
  width: 67%; /* La page prendra 67% de la largeur du navigateur */
}

/*
  [v-cloak] {
    display: none;
  }
*/
</style>

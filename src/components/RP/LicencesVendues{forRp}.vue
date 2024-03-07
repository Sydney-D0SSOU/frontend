<template>
    <div id="page">
        <Nav/>
        <h1 style="position: absolute; left: 300px">Ici on verra les LICENCES VENDUES</h1>
    </div>
</template>

<script>
import Nav from './NavRp.vue';
import {authAdmin} from '../../auth.js';
export default {
    mixins: [authAdmin],
    components: {
        Nav
    },
}
</script>

<style scoped>
#page {
  background-color: #ebebeb;
  top: 0px;
  left: 0px;
  position: fixed;
  height: 900vw;
  width: 1980vw;
}

</style>

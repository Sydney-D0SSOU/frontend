<template>
     <div v-if="authorized" id="page">
        <Nav/>
        <h1>Bienvenue {{memberInfo.name}} !</h1>
        <button id="rPA" @click="registerPersAsser">Inscrire une personne assermenter</button>
    </div>
    <NoAccess v-else></NoAccess>
</template>

<script>
import NoAccess from './AccessDenied.vue';
import Nav from './BarreNav.vue';
    import {authFront} from '../auth.js';
    export default {
        name: 'frontOffice',
        mixins: [authFront],
        components: {
            Nav, NoAccess
        },
        data() {
            return {
                memberInfo: {}
            }
        },
        created() {
            const infos = JSON.parse(localStorage.getItem('memberInfo'));
            if (infos) this.memberInfo = infos;
            else this.memberInfo = ''
        },
        methods: {
            registerPersAsser() {
                this.$router.push('/inscription-persAsser');
            }
        },
        mounted() {
          document.title = "frontOffices"; // Mettez le titre que vous souhaitez afficher
        }
    }
</script>

<style>
    #nav {
        position: absolute;
    }
    button {
        background-color: rgb(0, 0, 0);
        color: white
    }
    button:hover {
        background-color: rgb(114, 29, 29);
    }
    #rPA {
        position: absolute;
        top: 70px;
        left: 1380px;
        width: 200px;
        height: 50px;
    }
</style>

<template>
    <div  id="page">
        <Nav/>
        <h1>Welcom {{memberInfo.name}}</h1>
        <button id="rUser" @click="registerUser">Inscrire un utilisateur </button>
        <button id="cnxUser" @click="connexionUser">Connexion utilisateur </button>
        <button id="rBank" @click="registerBank">Inscrire une banque </button>
    </div>
</template>

<script>
import NoAccess from './AccessDenied.vue';
import Nav from './BarreNav.vue';
import {authPersAsser} from '../auth.js';
export default {
    mixins: [authPersAsser],
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
        registerUser() {
            this.$router.push('/inscription-user');
        },
        registerBank() {
            this.$router.push('/inscription-banque');
        },
        connexionUser() {
            this.$router.push('/connexion-user');
        },
    },
    mounted() {
        document.title = "persAsser"; // Mettez le titre que vous souhaitez afficher
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
    #rUser {
        position: absolute;
        top: 70px;
        left: 1380px;
        width: 200px;
        height: 50px;
    }
    #cnxUser {
        position: absolute;
        top: 140px;
        left: 1380px;
        width: 200px;
        height: 50px;
    }
    #rBank {
        position: absolute;
        top: 210px;
        left: 1380px;
        width: 200px;
        height: 50px;
    }
    /*
    #recherche {
        position: absolute;
        border-radius: 10px;
        top: 37px;
        left: 800px;
        width: 250px;
        height: 30px;
        border: 1px solid #ccc;
    }
    */
</style>

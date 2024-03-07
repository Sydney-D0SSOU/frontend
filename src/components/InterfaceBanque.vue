<template>
    <div v-if="authorized" id="page">
        <Nav/>
        <h1>Bienvenue Banque {{ memberInfo.designation }}</h1>
        <button id="see-InfoUsers" @click="seeInfoUsers">Voir les infos des utilisateurs</button>
    </div>
    <NoAccess v-else></NoAccess>
</template>

<script>
import NoAccess from './AccessDenied.vue';
import Nav from './BarreNav.vue';
import {authBanque} from '../auth.js';
export default {
    mixins: [authBanque],
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
        seeInfoUsers() {
        },
    },
    mounted() {
        document.title = "Institution financiere"; // Mettez le titre que vous souhaitez afficher
    }
}
</script>

<style scoped>
#nav {
    position: absolute;
}
    button {
        background-color: rgb(0, 0, 0);
        color:rgb(255, 255, 255)
    }
    button:hover {
        background-color: rgb(114, 29, 29);
    }
    #rFront {
        position: absolute;
        top: 70px;
        left: 1680px;
    }
    #rPersAsser {
        position: absolute;
        top: 37px;
        left: 1228px;
    }
</style>

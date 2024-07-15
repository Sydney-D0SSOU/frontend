<template>
    <div v-if="isConnected" id="page">
        <Nav id="nav"/>
        <div id="welcome-message">BIENVENUE SUR SCORE Mr/Mme  {{ username }}, Front Offices</div>
    </div>
    <div v-else>
        <Noaccess/>
    </div>
</template>

<script>
import { computed } from 'vue';
import Nav from './NavFO.vue';
import Noaccess from './../AccessDenied.vue';
import { useUserStore } from '@/store/store.js';

export default {
    components: {
        Nav,
        Noaccess
    },
    setup() {
        const store = useUserStore();
        const username = computed(() => store.user ? store.user.nom : null);
        const isConnected = computed(() => localStorage.getItem('token') !== null);

        return {
            username,
            isConnected
        };
    }
}
</script>

<style scoped>
#page {
    background-color: #ebebeb;
    top: 0;
    left: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
}

#nav {
    position: absolute;
}

#welcome-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 900;
    font-size: 24px;
    text-align: center;
    color: #333;
}
</style>

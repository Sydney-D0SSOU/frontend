<template>
  <div id="page">
    <Nav class="nav-button"/>
    <h1>Bienvenue Mr/Mme {{ memberInfo.name }}</h1>
    <div class="button-container">
      <button id="contrat" @click="registerActe">Enregitrer un contrat de prêt</button>
      <button id="rUser" @click="registerUser">Inscrire un utilisateur</button>
      <button id="cnxUser"  @click="connexionUser">Connexion utilisateur</button>
    </div>
  </div>
</template>

<script>
import Nav from '../BarreNav.vue';
import { authPersAsser } from '../../auth.js';

export default {
  mixins: [authPersAsser],
  components: { Nav },
  data() {
    return {
      memberInfo: {},
    };
  },
  created() {
    const infos = JSON.parse(localStorage.getItem('memberInfo'));
    if (infos) this.memberInfo = infos;
  },
  methods: {
    registerUser() {
      this.$router.push('/inscription-user');
    },
    registerActe() {
      this.$router.push('/acteP');
    },
    connexionUser() {
      this.$router.push('/connexion-user');
    },
  },
  mounted() {
    document.title = 'persAsser';
  },
};
</script>

<style>
#page {
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

button {
  background-color: rgb(110, 55, 34);
  color: white;
  margin: 10px; /* Espacement entre les boutons */
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Animation de transition */
}

button:hover {
  background-color: rgb(143, 140, 140);
}

/* Annulation du style pour le bouton "Se connecter" */
.nav-button {
  background-color: inherit;
  color: inherit;
  margin: inherit;
  border-radius: inherit;
  transition: inherit;
}
</style>

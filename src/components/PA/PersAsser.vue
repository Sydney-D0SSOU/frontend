<script>
import Nav from '../BarreNav.vue';
import { useUserStore } from '@/store/store.js';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importez useRouter depuis Vue Router

export default {
  components: { Nav },
  setup() {
    const store = useUserStore();
    const router = useRouter(); // Initialisez useRouter
    const username = computed(() => store.user ? store.user.nom : null);

    const registerUser = () => {
      router.push('/inscription-user'); // Utilisez router.push pour naviguer
    };

    const registerActe = () => {
      router.push('/acteP');
    };
    const registerContrat = () => {
      router.push('/listContrat');
    };

    const connexionUser = () => {
      router.push('/listCivil');
    };

    onMounted(() => {
      document.title = 'persAsser';
    });

    return {
      username,
      registerUser,
      registerActe,
      connexionUser,
      registerContrat
    };
  },
};
</script>

<template>
  <div id="page">
    <Nav class="nav-button"/>
    <h1>Bienvenue Mr/Mme {{ username }} </h1> <br/>
    <h1> N*1373892429748</h1>
    <div class="card-container">
      <div class="card">
        <h2>Enregistrer un contrat de prêt</h2>
        <p>Vous êtes prêt à enregistrer un nouveau contrat de prêt?</p>
        <button id="register-acte" @click="registerActe">Enregistrer</button>
      </div>
      <div class="card">
        <h2>Liste des contrats de prêt</h2>
        <p>Rechercher et afficher les contrats de prêt</p>
        <button id="register-acte" @click="registerContrat">Voir</button>
      </div>
      <div class="card">
        <h2>Inscrire un utilisateur</h2>
        <p>Envie de rejoindre notre communauté? Inscrivez-vous dès maintenant!</p>
        <button id="register-user" @click="registerUser">Inscrire</button>
      </div>
      
    </div>
  </div>
</template>

<style>
#page {
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 50px;
  width: 80%;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 30%;
  margin-left : 10px;
  text-align: center;
}

.card h2 {
  color: #333;
}

.card p {
  color: #666;
  margin-bottom: 20px;
}

button {
  background-color: #8B4513; /* Marron */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease; /* Animation de transition */
}

button:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3); /* Ombre au survol */
}

/* Annulation du style pour le bouton "Se connecter" */
.nav-button {
  background-color: inherit;
  color: inherit;
  margin: inherit;
  border-radius: inherit;
  transition: inherit;
}
.card {
  /* Autres styles... */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card button {
  margin-top: auto; /* Pour aligner le bouton en bas de la carte */
}

</style>

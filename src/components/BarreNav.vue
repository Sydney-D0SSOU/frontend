<template>
  <div id="full-width-view">
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container>
      <MDBNavbarToggler
        target="#navbarExample01"
        @click="collapse1 = !collapse1"
      ></MDBNavbarToggler>
      <MDBCollapse id="#navbarExample01" v-model="collapse1">
        <!-- Utiliser une classe pour le logo et lui appliquer des styles -->
        <img src="../assets/score.png" alt="Logo" class="navbar-logo">
        <!-- Placer le bouton à droite de l'écran -->
        <div class="ml-auto">
          <!-- Utilisez router-link pour rediriger vers la page de connexion -->
          <router-link to="/connexion">
            <MDBBtn size="" color="dark">Se connecter</MDBBtn>
          </router-link>
        </div>
      </MDBCollapse>
    </MDBNavbar>
    <!-- Jumbotron -->
  </header>
  </div>
</template>

<script>
import { MDBNavbar, MDBNavbarToggler, MDBCollapse, MDBBtn } from 'mdb-vue-ui-kit';
import { ref } from 'vue';

export default {
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBCollapse,
    MDBBtn
  },
  setup() {
    const collapse1 = ref(false);
    return { collapse1 };
  }
};
</script>

<style scoped>
#id {
    width: 100vw; /* Largeur de la vue à 100% de la largeur de la fenêtre */
}
/* Appliquer des styles au logo */
.navbar-logo {
  max-width: 150px; /* Définir une taille maximale pour le logo */
  height: 70px; /* Assurer que la hauteur s'ajuste automatiquement pour préserver les proportions */
}

/* Ajouter des styles pour le header */
header {
  padding: 5px 0; /* Réduire le padding du haut et du bas à 5px */
  margin-bottom: 0; /* Supprimer la marge en bas du header */
}
</style>

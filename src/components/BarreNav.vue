<template>
  <div id="full-width-view">
    <header>
      <!-- Navbar -->
      <MDBNavbar expand="lg" light bg="white" container>
        <MDBNavbarToggler
          target="#navbarExample01"
          @click="collapse1 = !collapse1"
        ></MDBNavbarToggler>
        <MDBCollapse id="navbarExample01" v-model="collapse1">
          <div class="d-flex justify-content-between align-items-center w-100">
            <!-- Utiliser une classe pour le logo et lui appliquer des styles -->
            <img src="../assets/score.png" alt="Logo" class="navbar-logo">

            <!-- Placer le bouton à droite de l'écran -->
            <div class="ml-auto">
              <!-- Utilisez router-link pour rediriger vers la page de connexion -->
              <router-link to="/connexion">
                <MDBBtn size="lg" color="dark" class="btn-custom">Se connecter</MDBBtn>
              </router-link>
            </div>
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
#full-width-view {
  width: 100vw; /* Largeur de la vue à 100% de la largeur de la fenêtre */
}

/* Appliquer des styles au logo */
.navbar-logo {
  max-width: 200px; /* Augmenter la taille maximale pour le logo */
  height: auto; /* Ajuster la hauteur automatiquement pour préserver les proportions */
}

/* Ajouter des styles pour le bouton */
.btn-custom {
  font-size: 1.2rem; /* Augmenter la taille de la police */
  padding: 0.75rem 1.5rem; /* Augmenter le padding pour rendre le bouton plus grand */
}

/* Ajouter des styles pour le header */
header {
  padding: 5px 0; /* Réduire le padding du haut et du bas à 5px */
  margin-bottom: 0; /* Supprimer la marge en bas du header */
}
</style>

<template>
  <div id="full-width-view">
    <!-- Import du style CSS du kit d'interface utilisateur MDB Vue -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.1.0/mdb.min.css" rel="stylesheet">
    
    <!-- Import du composant de navigation -->
    <Bar />
    
    <!-- Carrousel -->
    <MDBCarousel
    v-model="carousel4"
    :items="items4"
      :controls="false"
      :indicators="false"
      :interval="2000"
      wrap  
      @slid="handleSlideChange" 
    />
  </div>
</template>

<script>
// Import des dépendances nécessaires
import Bar from '@/components/BarreNav.vue';
import { ref } from "vue";
import { MDBCarousel } from "mdb-vue-ui-kit";

// Importez vos images en utilisant des importations statiques
import image1 from '@/assets/image1.jpg';
import image2 from '@/assets/image2.jpg';
import image3 from '@/assets/image3.jpg';

export default {
  components: {
    MDBCarousel,
    Bar
  },
  setup() {
    const items4 = [
      {
        src: image1, // Utilisez l'importation statique
        alt: "Image 1" // Description de l'image
      },
      {
        src: image2, // Utilisez l'importation statique
        alt: "Image 2" // Description de l'image
      },
      {
        src: image3, // Utilisez l'importation statique
        alt: "Image 3" // Description de l'image
      }
    ];
    const carousel4 = ref(0);

    // Gestionnaire d'événements pour l'animation
    const handleSlideChange = () => {
      // Ajoutez une classe CSS pour l'animation
      document.querySelector('.carousel-item.active').classList.add('slide-animation');
      // Supprimez la classe après l'animation
      setTimeout(() => {
        document.querySelector('.carousel-item.active').classList.remove('slide-animation');
      }, ); // ajustez cette durée selon vos besoins
    };

    return {
      items4,
      carousel4,
      handleSlideChange
    };
  }
};
</script>

<style>
 
 #full-width-view {
    width: 100vw; /* Largeur de la vue à 100% de la largeur de la fenêtre */
}
  /* Ajustez la taille des images pour qu'elles s'adaptent à l'écran */
  .carousel-item img {
    max-width: 100%; /* Pour que l'image s'adapte à la largeur du conteneur */
    height: 100%; /* Pour remplir complètement la hauteur du conteneur */
  }
</style>

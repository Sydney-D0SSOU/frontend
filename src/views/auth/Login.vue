<template>
  <div id="main">  
    <center>
      <h1>Connectez-vous !</h1>

    <form class="mt-5" @submit.prevent="submitForm">
      <img src="../../assets/score.png" id="p1" alt="Image d'en-tête"/>
      <input type="text" v-model="formData.unique" @input="clearError" placeholder="Code ID:" required>
      <input type="password" v-model="formData.password" @input="clearError" placeholder="Password" required>
      <h6 id="msgerr" v-if="badinfo">Identifiants incorrect !</h6>
      <button type="submit">Se connecter</button>
    </form>
    </center>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginVue',
  data() {
    return {
      formData: {
        unique: '',
        password: '',
      },
      badinfo: false
    };
  },
  methods: {
    async submitForm() {
      // Reset error message
      this.badinfo = false;

      // Check if fields are empty
      if (!this.formData.unique || !this.formData.password) {
        this.badinfo = true;
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          unique_id: this.formData.unique,
          password: this.formData.password
        });

        // Check the user object in the response to determine the user type
        const user = response.data.user;
        if (user.personne_juridique) {
          const connectId1 = response.data.user.personne_juridique.id;
          localStorage.setItem('connectId', connectId1);
          console.log("User data:", connectId1);
          this.showSuccessMessage = true; // Assuming you define showSuccessMessage
          setTimeout(() => {
           this.router.push('/persAsser'); // Redirect to dashboard for personne juridique after a delay
          }, 2000); // Redirect after 2 seconds
        } else if (user.front_office) {
          const connectId = response.data.user.front_office.id;
          localStorage.setItem('connectId', connectId);
          console.log("User data:", connectId);
          this.showSuccessMessage = true; // Assuming you define showSuccessMessage
          setTimeout(() => {
            this.router.push('/frontOffices'); // Redirect to dashboard for personne juridique after a delay
          }, 2000); // Redirect after 2 seconds
          // Similar logic for other user types...
        }

        // Save the token to local storage for future authenticated requests
        const token = response.data.token;
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Error during login:', error);
        this.badinfo = true;
      }
    },
    clearError() {
      this.badinfo = false;
    }
  },
  setup() {
    const router = useRouter();
    const showSuccessMessage = ref(false); // Assuming you define showSuccessMessage
    return { router, showSuccessMessage };
  }
};
</script>

<style scoped>
#main {
  background-image: url(../../assets/img.png);
  background-size: cover; /* Ajuste la taille de l'image */
  height: 100vh; /* Hauteur égale à la taille de la fenêtre */
  display: flex; /* Utilisation de Flexbox pour centrer verticalement */
  justify-content: center; /* Centre le contenu horizontalement */
  align-items: center; /* Centre le contenu verticalement */
}

#p1 {
  max-width: 50%;
  height: auto;
  margin-bottom: 20px;
}

form {
  width: 80%;
  max-width: 500px;
  border: 1px solid rgb(0, 0, 0);
  background-color: #fafafa; 
  padding: 20px;
  border-radius: 50px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
  text-align: left; /* Aligne le texte à gauche à l'intérieur du formulaire */
  margin-right: 200px;
}

input {
  width: calc(100% - 22px); /* Ajuste la largeur pour tenir compte du padding */
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 60px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

button {
  width: 100%;
  background-color: #2f7287;
  color: #ffffff;
  padding: 15px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #10d2d5;
  box-shadow: 0 10px 10px rgba(78, 118, 146, 0.987);
  color: black;
}

#msgerr {
  color: red;
  font-size: 14px;
}
</style>

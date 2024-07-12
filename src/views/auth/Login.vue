<template>
  <div id="main">  
    <center>
      <h1 id="one">Connectez-vous !</h1>

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
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/store.js';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';

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
    alertDisplay() {
        // $swal function calls SweetAlert into the application with the specified configuration.
        this.$swal({
        title: 'Oops',
    text: 'Vérifier vos identifiants',
    icon: 'error', // Vous pouvez choisir entre 'warning', 'error', 'success' et 'info'
    iconColor: 'red', // Spécifiez la couleur de l'icône ici
    confirmButtonText: 'OK',
    confirmButtonColor:'red'
        
    });
      },
      alertSuccess() {
        // $swal function calls SweetAlert into the application with the specified configuration.
        this.$swal({
        title: 'Bien',
    text: 'Authenfication avec Suscess',
    icon: 'Sucsess', // Vous pouvez choisir entre 'warning', 'error', 'success' et 'info'
    iconColor: 'green', // Spécifiez la couleur de l'icône ici
    confirmButtonText: 'OK',
    confirmButtonColor:'green'
        
    });
      },
    async submitForm() {
      // Reset error message
      this.badinfo = false;

      // Check if fields are empty
      if (!this.formData.unique || !this.formData.password) {
        this.badinfo = true;
        return;
      }

      try {
        const response = await axios.post('https://emploipourtous.africa/api/login', {
          unique_id: this.formData.unique,
          password: this.formData.password
        });

        const userStore = useUserStore();
        const user = response.data.user;
        if (user.personne_juridique) {
          userStore.setUser(response.data.user);
       
          this.alertSuccess()
          this.$router.push('/persAsser'); // Utilisez $router au lieu de router
          
        } else if (user.front_office) {
          userStore.setUser(response.data.user);
          this.alertSuccess()
            this.$router.push('/frontOffices'); // Utilisez $router au lieu de router
         
        } else if (user.admin_pays) {
          userStore.setUser(response.data.user);
          this.alertSuccess()
          this.$router.push('/representant-pays'); // Utilisez $router au lieu de router
        
        } else if (user.institution_financiere) {
          userStore.setUser(response.data.user);
          this.alertSuccess()
          this.$router.push('/banque'); // Utilisez $router au lieu de router
        
        }
        /*else if (user.admin) {
          userStore.setUser(response.data.user);
          this.alertSuccess()
          this.$router.push('/admin'); // Utilisez $router au lieu de router
        
        }*/

        const token = response.data.token;
        localStorage.setItem('token', token);
      }
       catch (error) {
        this.alertDisplay(); // Appel de la méthode showAlert dans le bloc catch
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
    return { router };
  }
};
</script>

<style scoped>
#one{
  text-decoration-color: #f59c02;
}
#main {
  background-image: url(../../assets/img.png);
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  text-align: left;
  margin-right: 0px;
  margin-left: 50px;
}

input {
  width: calc(100% - 22px);
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

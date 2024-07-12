<template>
  <div id="page" class="background-image">
    <div class="form-container">
      <form class="form" @submit.prevent="submitForm">
        <div class="form-header">
          <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
          <div class="form-title">
            <p id="ajout_compte">Ajouter compte</p>
            <p id="Nature-compte">[Un Civil]</p>
          </div>
        </div>
        <input type="text" v-model="formData.nom" placeholder="Nom du civil:" @input="clearError" required>
        <input type="text" v-model="formData.prenoms" placeholder="Prénom du civil:" @input="clearError" required>
        <input type="text" v-model="formData.ifu" placeholder="IFU:" @input="clearError" required>
        <input type="text" v-model="formData.tel" placeholder="Téléphone:" @input="clearError" required>
        <input type="text" v-model="formData.nip" placeholder="Numéro d'identification personnel:" @input="clearError" required>
        <input type="text" v-model="formData.profession" placeholder="Profession:" @input="clearError" required>
        <input type="email" v-model="formData.email" placeholder="Adresse email:" @input="clearError" required>
        <div class="generate-container">
          <button type="button" @click="generateUserCode(8)">Generer</button>
          <input type="text" v-model="formData.password" placeholder="Mot de passe:" @input="clearError" required>
        </div>
        <div class="message-container">
          <h6 v-if="ifuError">{{ ifuError }}</h6>
          <h6 v-if="nipError">{{ nipError }}</h6>
          <h6 v-if="badcode">8 caractères requis pour le code !</h6>
          <h6 v-if="badinfo">{{ errorMessage }}</h6>
          <h6 v-if="success">Inscription réussie !</h6>
        </div>
        <button type="submit">Inscrire</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserStore } from '@/store/store.js';
import { computed } from 'vue';

export default {
  name: 'RegisterVue',
  setup() {
    const store = useUserStore();
    const personne_juridique_id = computed(() => store.user.personne_juridique?.id);

    return {
      store,
      personne_juridique_id
    };
  },
  data() {
    return {
      formData: {
        nom: '', 
        prenoms: '',
        ifu: '',
        nip: '', 
        profession: '',
        email: '', 
        password: '', 
        tel: '',
        personne_juridique_id: null
      },
      nipError: '',
      ifuError: '',
      badinfo: false, 
      success: false, 
      badcode: false,
      errorMessage: ''
    };
  },
  methods: {
    generateUserCode(length) {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset[randomIndex];
      }
      this.formData.password = code;
    },
    submitForm() {
      if (this.formData.ifu.toString().length !== 12) {
        this.alertError("L'IFU doit contenir exactement 12 chiffres.");
        return;
      }
      if (this.formData.nip.toString().length !== 8) {
        this.alertError("Le NIP doit contenir exactement 8 chiffres.");
        return;
      }

      this.formData.nip = parseInt(this.formData.nip);
      this.formData.tel = parseInt(this.formData.tel);
      const userStore = useUserStore();
      const user = userStore.user;
      this.formData.personne_juridique_id = user?.personne_juridique?.id;

      axios.post('https://emploipourtous.africa/api/register', this.formData)
      .then(() => {
        this.success = true;
        this.alertSuccess("Un civil a été ajouté avec succès");
        setTimeout(() => {
          this.success = false;
        }, 2000);
        // Réinitialisation des champs du formulaire
        this.formData = {
          nom: '', 
          prenoms: '',
          ifu: '',
          nip: '', 
          profession: '',
          email: '', 
          password: '', 
          tel: '',
          personne_juridique_id: null
        };
      })
      .catch((err) => {
        console.error(err);
        const errorMessage = err.response?.data?.message || "Informations invalides / Civil existant";
        this.alertError(errorMessage);
      });
    },
    clearError() {
      this.badinfo = false;
      this.badcode = false;
    },
    alertError(message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      });
    },
    alertSuccess(message) {
      Swal.fire({
        title: 'Bien',
        text: message,
        icon: 'success',
        iconColor: 'green',
        confirmButtonText: 'OK',
        confirmButtonColor: 'green'
      });
    }
  }
};
</script>

<style scoped>
#page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/2.jpg');
  background-size: cover;
  background-position: center;
  height: 100%; /* Assure que la section occupe la hauteur complète de la vue */
  width: 100%; /* Assure que la section occupe la largeur complète de la vue */
  padding: 20px; /* Ajoute un peu de padding pour s'assurer que le formulaire ne touche pas les bords */
  box-sizing: border-box;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 2em;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.form {
  width: 100%;
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.form-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.form-title {
  flex: 1;
}

#ajout_compte {
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

#Nature-compte {
  font-size: 1rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.generate-container {
  display: flex;
  align-items: center;
}

.generate-container button {
  padding: 10px 15px;
  margin-right: 1em;
  background-color: rgb(73, 6, 73);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-container button:hover {
  background-color: maroon;
}

button[type="submit"] {
  width: 100%;
  padding: 15px;
  background-color: rgb(73, 6, 73);
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: maroon;
}

.message-container {
  margin-bottom: 1em;
}

.message-container h6 {
  color: red;
  font-size: 0.9rem;
  margin: 0.5em 0;
}

#ok-msg {
  color: green;
}
</style>

<template>
  <div id="page" class="background-image">
    <form class="form" @submit.prevent="submitForm">
      <div class="header">
        <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
        <div class="header-text">
          <p id="ajout_compte">Ajouter compte</p>
          <p id="Nature-compte">[Une Banque]</p>
        </div>
      </div>
      <div class="form-content">
        <!-- Champs alignés horizontalement -->
        <div class="form-group-inline">
          <input id="Designation" type="text" v-model="formData.nom" placeholder="Nom du Front de la banque :" @input="clearError" required>
          <input id="adresse" type="text" v-model="formData.prenoms" placeholder="Libelé de la banque:" @input="clearError" required>
          <input id="paswrd" type="text" v-model="formData.tel" placeholder="Téléphone:" @input="clearError" required>
        </div>
        
        <!-- Champs alignés horizontalement sur une autre ligne -->
        <div class="form-group-inline">
          <input id="IFU" type="text" v-model="formData.ifu" placeholder="IFU:" @input="clearError" required>
          <input id="Contact" type="text" v-model="formData.nip" placeholder="Numéro d'identification personnel:" @input="clearError" required>
        </div>
        
        <!-- Champs alignés horizontalement sur une autre ligne -->
        <div class="form-group-inline">
          <input id="dir_name" type="text" v-model="formData.profession" placeholder="Profession:" @input="clearError" required>
          <input id="dir_Contact" type="email" v-model="formData.email" placeholder="Adresse email:" @input="clearError" required>
        </div>
      </div>
      <div class="form-actions">
        <button id="gen_btm" type="button" @click="generateUserCode(8)">Générer</button>
        <input id="user_code_id" type="text" v-model="formData.password" placeholder="Mot de passe:" @input="clearError" required>
        <button id="log" type="submit">Inscrire</button>
      </div>
      <div class="form-messages">
        <h6 class="msgerr" v-if="ifuError">{{ ifuError }}</h6>
        <h6 class="msgerr" v-if="nipError">{{ nipError }}</h6>
        <h6 class="msgerr" v-if="badcode">8 caractères requis pour le code !</h6>
        <h6 class="msgerr" v-if="badinfo">{{ errorMessage }}</h6>
        <h6 id="ok-msg" v-if="success">Inscription réussie !</h6>
      </div>
    </form>
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
    const store = useUserStore(); // Utiliser useUserStore pour accéder au store
    const admin_pays_id = computed(() => store.user.admin_pays.id);

    return {
      store,
      admin_pays_id
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
        admin_pays_id:''
      },
      nipError:'',
      ifuError:'',
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
        this.alertError("Le numéro IFU doit contenir exactement 12 chiffres.");
        return;
      }
      if (this.formData.nip.toString().length !== 9) {
        this.alertError("Le NIP doit contenir exactement 09 chiffres.");
        return;
      }

      this.formData.nip = parseInt(this.formData.nip);
      this.formData.tel = parseInt(this.formData.tel);
      const userStore = useUserStore();
      const user = userStore.user;
      this.formData.admin_pays_id = user.admin_pays.id
      const x = this.formData
 console.log (JSON.stringify(x))

      axios.post('https://emploipourtous.africa/api/register/institution-financiere', x)
      .then(() => {
        this.success = true;
        this.alertSuccess("Inscription réussie !");
        setTimeout(() => {
          this.success = false;
        }, 2000);
        // Réinitialisation des champs du formulaire
        this.clearForm();
      })
      .catch((err) => {
        console.error(err);
        this.badinfo = true;
        this.errorMessage = "Informations invalides / Front office existant.";
        this.alertError("Informations invalides / Front office existant.");
      });
    },
    clearError() {
      this.nipError = '';
      this.ifuError = '';
      this.badinfo = false;
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
        icon: 'success',
        title: 'Succès',
        text: message
      });
    },
    clearForm() {
      this.formData = {
        nom: '', 
        prenoms: '',
        ifu: '',
        nip: '', 
        profession: '',
        email: '', 
        password: '', 
        tel: '',
        admin_pays_id : '' 
      };
    }
  }
};
</script>


  <style scoped>
#page.background-image {
  position: relative;
  background-image: url('../assets/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.form-image {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}

.header-text {
  display: flex;
  flex-direction: column;
}

#ajout_compte {
  font-size: 2rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

#Nature-compte {
  font-size: 1.2rem;
  color: rgb(90, 2, 90);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 1em;
}

.form-group-inline {
  display: flex;
  gap: 1em;
  align-items: center;
  flex-wrap: wrap;
}

input {
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 0.5em;
  flex: 1;
}

#Designation,
#adresse,
#paswrd,
#IFU,
#Contact,
#dir_name,
#dir_Contact,
#user_code_id {
  flex: 1;
}

#Designation,
#adresse,
#paswrd {
  max-width: calc(33.33% - 1em); /* Réduit la largeur pour tenir sur la même ligne */
}

#IFU,
#Contact {
  max-width: calc(50% - 0.5em); /* Réduit la largeur pour tenir sur la même ligne */
}

#dir_name,
#dir_Contact {
  max-width: calc(50% - 0.5em); /* Réduit la largeur pour tenir sur la même ligne */
}

.form-actions {
  display: flex;
  gap: 1em;
  margin-top: 1em;
  justify-content: space-between;
}

button {
  background-color: rgb(73, 6, 73);
  color: #fff;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: maroon;
}

#gen_btm {
  background-color: rgb(73, 6, 73);
}

#log {
  background-color: rgb(73, 6, 73);
}

#ok-msg {
  color: rgb(48, 177, 1);
}

.msgerr {
  color: red;
  font-size: 0.875rem;
}

.form-messages {
  margin-top: 1em;
}


  </style>

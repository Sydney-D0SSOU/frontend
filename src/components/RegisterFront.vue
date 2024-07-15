<template>
  <div id="page" class="background-image">
    <form class="form" @submit.prevent="submitForm">
      <div class="header">
        <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
        <p id="ajout_compte">Ajouter compte</p>
      </div>
      <p id="Nature-compte">[Une Frontoffice]</p>
      
      <div class="form-group">
        <input id="Designation" type="text" v-model="formData.nom" placeholder="Nom du Front office :" @input="clearError" required>
        <input id="IFU" type="text" v-model="formData.ifu" placeholder="IFU:" @input="clearError" required>
        <input id="adresse" type="text" v-model="formData.prenoms" placeholder="Prenom du Front office :" @input="clearError" required>
        <input id="paswrd" type="text" v-model="formData.tel" placeholder="Téléphone:" @input="clearError" required>
        <input id="Contact" type="text" v-model="formData.nip" placeholder="Numéro d'identification personnel:" @input="clearError" required>
      </div>

      <div class="form-group">
        <input id="dir_name" type="text" v-model="formData.profession" placeholder="Profession:" @input="clearError" required>
        <input id="dir_Contact" type="email" v-model="formData.email" placeholder="Adresse email:" @input="clearError" required>
      </div>

      <div class="form-actions">
        <button id="gen_btm" type="button" @click="generateUserCode(8)">Générer</button>
        <input id="user_code_id" type="text" v-model="formData.password" placeholder="Mot de passe:" @input="clearError" required>
        <button id="log" type="submit">Inscrire</button>
      </div>

      <h6 class="msgerr" v-if="ifuError">{{ ifuError }}</h6>
      <h6 class="msgerr" v-if="nipError">{{ nipError }}</h6>
      <h6 class="msgerr" v-if="badcode">8 caractères requis pour le code !</h6>
      <h6 class="msgerr" v-if="badinfo">{{ errorMessage }}</h6>
      <h6 id="ok-msg" v-if="success">Inscription réussie !</h6>
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
        admin_pays_id: ''
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
        this.alertError("Le numéro IFU doit contenir exactement 12 chiffres.");
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
      this.formData.admin_pays_id = user.admin_pays.id;
      const x = this.formData;
      console.log(JSON.stringify(x));

      axios.post('https://emploipourtous.africa/api/register/front-office', x)
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
        admin_pays_id: '' 
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
  background-color: rgb(255, 255, 255);
  border: 1px solid #ccc;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-image {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}

#ajout_compte {
  font-size: 2rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

#Nature-compte {
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

.form-group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  width: calc(100% - 20px);
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 45px;
}

.form-actions {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

button {
  background-color: rgb(73, 6, 73);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: maroon;
}

.msgerr {
  color: red;
  font-size: 0.8rem;
}

#ok-msg {
  color: rgb(48, 177, 1);
}

</style>

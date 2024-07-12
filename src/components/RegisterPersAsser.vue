<template>
  <div id="page" class="background-image">
    <form class="form" @submit.prevent="submitForm">
      <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
      <p id="ajout_compte">Ajouter compte</p>
      <p id="Nature-compte">[Une Personne Assermentée]</p>
      <input id="Designation" type="text" v-model="formData.nom" placeholder="Nom de la personne assermentée:" @input="clearError" required>
      <input id="IFU" type="text" v-model="formData.ifu" placeholder="IFU:" @input="clearError" required>
      <input id="paswrd" type="text" v-model="formData.tel" placeholder="Téléphone:" @input="clearError" required>
      <input id="adresse" type="text" v-model="formData.prenoms" placeholder="Prenom de la personne assermentée:" @input="clearError" required>
      <input id="Contact" type="text" v-model="formData.nip" placeholder="Numéro d'identification personnel:" @input="clearError" required>
      <div id="dirigeant">
        <input id="dir_name" type="text" v-model="formData.profession" placeholder="Profession:" @input="clearError" required>
        <input id="dir_Contact" type="email" v-model="formData.email" placeholder="Adresse email:" @input="clearError" required>
      </div>
      <button id="gen_btm" type="button" @click="generateUserCode(8)">Générer</button>
      <input id="user_code_id" type="text" v-model="formData.password" placeholder="Mot de passe:" @input="clearError" required>
      <h6 class="msgerr" v-if="ifuError">{{ ifuError }}</h6>
      <h6 class="msgerr" v-if="nipError">{{ nipError }}</h6>
      <h6 class="msgerr" v-if="badcode">8 caractères requis pour le code !</h6>
      <h6 class="msgerr" v-if="badinfo">{{ errorMessage }}</h6>
      <h6 id="ok-msg" v-if="success">Inscription réussie !</h6>
      <button id="log" type="submit">Inscrire</button>
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
    const front_office_id = computed(() => store.user.front_office.id);

    return {
      store,
      front_office_id
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
      front_office_id: '',
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
        this.alertError("L'IFU doit contenir exactement 12 chiffres.");
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
      this.formData.front_office_id = user.front_office.id
      const x = this.formData
 console.log (JSON.stringify(x))

      axios.post('https://emploipourtous.africa/api/register/personne-ass', x)
      .then(() => {
        this.success = true;
        this.alertSuccess("Une personne assermentée a été ajoutée avec succès");
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
        };
      })
      .catch((err) => {
        console.error(err);
        this.badinfo = true;
        this.errorMessage = "Informations invalides / Personne assermentée existante";
        this.alertError("Informations invalides / Personne assermentée existante");
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
    }
  }
};
</script>

<style scoped>
#page {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('../assets/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 600px;
  box-sizing: border-box;
  margin: 0 auto;
}

.form-image {
  width: 70px;
  height: 70px;
  display: block;
  margin: 0 auto;
}

#ajout_compte,
#Nature-compte {
  text-align: center;
  font-size: large;
  font-weight: 900;
  color: rgb(90, 2, 90);
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#gen_btm {
  display: block;
  width: 120px; /* Ajuste la largeur du bouton "Générer" */
  background-color: rgb(73, 6, 73);
  border-radius: 50px;
  height: 35px; /* Ajuste la hauteur du bouton "Générer" */
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 10px auto;
  font-size: 14px; /* Ajuste la taille de la police */
}

#gen_btm:hover {
  background-color: maroon;
}

#log {
  display: block;
  width: 100%;
  background-color: rgb(73, 6, 73);
  border-radius: 50px;
  height: 45px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

#log:hover {
  background-color: maroon;
}

.msgerr {
  color: red;
  font-size: 12px;
  text-align: center;
}

#ok-msg {
  color: rgb(48, 177, 1);
  text-align: center;
}

@media (max-width: 768px) {
  .form {
    width: 90%;
  }
}

@media (max-width: 480px) {
  #ajout_compte,
  #Nature-compte {
    font-size: medium;
  }

  input {
    font-size: 14px;
  }

  #gen_btm,
  #log {
    font-size: 14px;
  }
}
</style>

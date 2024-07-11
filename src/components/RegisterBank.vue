<template>
  <div id="page" class="background-image">
    <form class="form" @submit.prevent="submitForm">
      <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
      <p id="ajout_compte">Ajouter compte </p>
      <p id="Nature-compte">[Une Banque]</p>
      <input id="Designation" type="text" v-model="formData.nom" placeholder="Nom  du Front de la banque :" @input="clearError" required>
      <input id="IFU" type="text" v-model="formData.ifu" placeholder="IFU:" @input="clearError" required>
      <input id="paswrd" type="text" v-model="formData.tel" placeholder="Téléphone:" @input="clearError" required>
      <input id="adresse" type="text" v-model="formData.prenoms" placeholder="libelé de la banque:" @input="clearError" required>
      <input id="Contact" type="text" v-model="formData.nip" placeholder="Numéro d'identification personnel:" @input="clearError" required>
      <br>
      <div id="dirigeant">
        <input id="dir_name" type="text" v-model="formData.profession" placeholder="Profession:" @input="clearError" required>
        <input id="dir_Contact" type="email" v-model="formData.email" placeholder="Adresse email:" @input="clearError" required>
      </div>
      <button id="gen_btm" type="button" @click="generateUserCode(8)">Generer</button>
      <input id="user_code_id" type="text" v-model="formData.password" placeholder="mot de passe:" @input="clearError" required>
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
    position: absolute;
    top: 0vh;
    left: 0vw;
    background-image: url('../assets/2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat:no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .form-image {
    width: 70px;
    height: 70px;
  margin-right: 20px;
  }

  #ajout_compte{
    position: absolute;
    top: 20px;
    left: 130px;
    font-size: xxx-large;
    font-weight: 900;
    color: rgb(90, 2, 90);
  }

  #Nature-compte {
    position: absolute;
    top: 90px;
    left: 230px;
    font-size: 20px;
    font-weight: 900;
    color: rgb(90, 2, 90);
  }

  #Designation {
    position: absolute;
    top: 170px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #IFU{
    position: absolute;
    top: 290px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #adresse {
    position: absolute;
    top: 230px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  } 

  #paswrd {
    position: absolute;
    top: 350px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #Contact {
    position: absolute;
    top: 410px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #dir_name {
    position: absolute;
    top: 170px;
    left: 800px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #dir_Contact{
    position: absolute;
    top: 230px;
    left: 800px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #gen_btm{
    position: absolute;
    top: 350px;
    left: 800px;
    width: 100px;
    background-color: rgb(73, 6, 73);
    border-radius: 50px;
  }

  #gen_btm:hover {
    background-color: maroon;
  }

  #user_code_id {
    position: absolute;
    top: 395px;
    left: 800px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }

  #ok-msg {
    color:rgb(48, 177, 1);
  }

  .form {
      background-color: rgb(255, 255, 255);
      border: 1px solid #ccc;
      padding: 2em;
      border-radius: 50px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 1350px;
      height: 620px;
      position: absolute;
      top:  50px;
      left: 240px;
      margin: 0;
    }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  #log {
    position: absolute;
    top: 560px;
    left: 510px;
    width: 390px;
    background-color: rgb(73, 6, 73);
    border-radius: 50px;
    height: 45px;
  }

  #log:hover {
    background-color: maroon;
  }

  button {
    background-color: #000000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #821010;
  }

  .msgerr {
    color: red;
    font-size: 10px;
  }
  .msgsuccess {
  color: green;
}
  </style>

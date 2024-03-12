<template>
  <div id="page" class="background-image">
    <form class="form" @submit.prevent="submitForm">
      <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
      <p id="ajout_compte">Ajouter compte </p>
      <p id="Nature-compte">[Une Personne Assermentée]</p>
      <input id="Designation" type="text" v-model="formData.nom" placeholder="Nom de la personne assermentée:" @input="clearError" required>
      <input id="IFU" type="text" v-model="formData.ifu" placeholder="IFU:" @input="clearError" required>
      <input id="paswrd" type="text" v-model="formData.tel" placeholder="Téléphone:" @input="clearError" required>
      <input id="adresse" type="text" v-model="formData.prenoms" placeholder="Prenom de la personne assermentée:" @input="clearError" required>
      <input id="Contact" type="text" v-model="formData.nip" placeholder="Numéro d'identification personnel:" @input="clearError" required>
      <br>
      <div id="dirigeant">
        <input id="dir_name" type="text" v-model="formData.profession" placeholder="Profession:" @input="clearError" required>
        <input id="dir_Contact" type="text" v-model="formData.email" placeholder="Adresse email:" @input="clearError" required>
      </div>
      <button id="gen_btm" type="button" @click="generateUserCode(8)">Generer</button>
      <input id="user_code_id" type="text" v-model="formData.password" placeholder="mot de passe:" @input="clearError" required>
      <h6 class="msgerr" v-if="ifuError">{{ ifuError }}</h6>
      <h6 class="msgerr" v-if="nipError">{{ nipError }}</h6>
      <h6 class="msgerr" v-if="badcode">8 caractere requis pour le code !</h6>
      <h6 class="msgerr" v-if="badinfo">Informations invalides !</h6>
      <h6 id="ok-msg" v-if="success">Inscription réussie !</h6>
      <button id="log" type="submit">Inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterVue',
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
        front_office_id: localStorage.getItem('connectId') || '' // Récupérer front_office_id depuis le localStorage 
      },
      nipError:'',
      ifuError:'',
      badinfo: false, 
      success: false, 
      badcode: false, 
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
        this.ifuError = "L'IFU doit contenir exactement 12 chiffres.";
        return;
      }
      if (this.formData.nip.toString().length !== 9) {
        this.nipError = "Le NIP doit contenir exactement 10 chiffre ";
        return;
      }

      console.log('Données du formulaire envoyées à l\'API :', this.formData);

      axios.post('http://localhost:8000/api/register/personne-ass', {
        nom: this.formData.nom,
        prenoms: this.formData.prenoms,
        ifu: this.formData.ifu,
        nip: this.formData.nip,
        profession: this.formData.profession,
        email: this.formData.email,
        password: this.formData.password,
        tel: this.formData.tel,
        front_office_id:this.formData.front_office_id
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(() => {
        this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 2000);
          this.router.push('')
      })
      .catch((err) => {
        console.error(err);
        this.badinfo = true;
      });
    },

    clearError() {
      this.badinfo = false;
      this.badcode = false;
    }
  },
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

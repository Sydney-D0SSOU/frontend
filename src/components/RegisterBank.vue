<template>
  <div id="page" class="background-image">
        <form class= "form" @submit.prevent="submitForm()">
          <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
          <p id="ajout_compte">Ajouter compte </p>
          <p id="Nature-compte">[Banque]</p>
          <input id= "Designation" type="text" v-model="formData.designation" placeholder="Designation:" @input="clearError" required>
          <input id= "IFU" type="txt" v-model="formData.IFU" placeholder="IFU:" @input="clearError" required>
          <input id= "Contact" type="txt" v-model="formData.contact" placeholder="Contact:" @input="clearError" required>
          <input id= "adresse" type="txt" v-model="formData.adresse" placeholder="Adresse:" @input="clearError" required>
          <input id= "mots_de_passe" type="txt" v-model="formData.passwd" placeholder="Mot de passe:" @input="clearError" required>
          <input id= "verf_mots_de_passe" type="txt" v-model="formData.verfpasswd" placeholder="verf.Mot de passe:" @input="clearError" required>
          <div id="Dirigeant">
            <div v-if="showDirigeant">
              <input id="dirigeant_name" type="text" v-model="formData.dirigeantNom" placeholder="Nom du dirigeant:" @input="clearError" required>
              <input id="dir_contact" type="text" v-model="formData.dirigeantContact" placeholder="Contact du dirigeant:" @input="clearError" required>
              <input id="adresse_dir" type="txt" v-model="formData.dirigeantAdresse" placeholder="Adresse du dirigeant:" @input="clearError" required>
            </div>
          </div>
          <label id="expiration">Duree d'expiration: </label><br>
            <select id= "exp_case" v-model="formData.expireDans" required>
              <option value="90">90 jours</option>
              <option value="30">30 jours</option>
              <option value="180">180 jours</option>
            </select><br/>
          <button id= "gen_btm" @click.prevent="generateUserCode(5)">Generer</button>
          <input id= "id_code_user" type="text" v-model="formData.code_id" placeholder="Code utilisateur:" @input="clearError" required>
          <h6 class="msgerr" v-if="badcode">5 caractere requis pour le code !</h6>
          <div id="condition">
            <p id= "txt-cond">J'accepte les conditions d'utilisations</p>
            <input type="checkbox" id="checkbox-cond" required>
            <p id= "know_more" class="txt-click">En savoir plus</p>
          </div>
          <h6 id="already-exist" class="msgerr" v-if="badinfo">Cet utilisateur existe déjà !</h6>
          <h6 id="ok-msg" v-if="success">Inscription reussie !</h6>
          <button id= "log" :disabled="!isFormValid" >Inscrire</button>
        </form>
      </div>
</template>

<script>
//import NoAccess from './AccessDenied.vue';
//import {authPersAsser} from '../auth.js';
  import axios from 'axios';
  export default {
    name: 'RegisterVue',
   // mixins: [authPersAsser],
    components: {
      
        },
    data() {
      return {
        formData: {
          designation: '', status: 'Banque', IFU: '', adresse: '', passwd: '',verf_passwd: '',
          code_id: '', contact: '', expireDans: '',
          dirigeantNom: '', dirigeantAdresse: '', dirigeantContact: ''
        },
        showDirigeant: true, badinfo: false, success: false, badcode: false
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
      this.formData.code_id = code;
    },
      isFormValid() {
          for (const key in this.formData) {
              if (this.formData[key] === '') {
                return false;
              }
          }
          return true;
      },
      toggle() {
        this.showDirigeant = !this.showDirigeant;
      },
      async submitForm() {
        if (this.formData.code_id.length !== 5) {
          this.badcode = true; return
        }
        console.log(`Someone submit`);
        try {
            axios.post('http://localhost:3100/register/', this.formData, {
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(() => {
              this.success = true;
              console.log('Inscription réussie !');
              setTimeout(() => {
                this.success = false; // Réinitialisation après 2 secondes
              }, 4000);
            })
            .catch((err) => {
              this.badinfo = true;
              console.error(`L'utilisateur existe deja.\nErreur: ${err}`);
            })
        } catch (error) {
          console.error('Erreur lors de la communication avec le serveur:', error);
        }
      },
      clearError() {
        this.badinfo = false, this.badcode = false
      }
    },
    mounted() {
      document.title = "inscription institution financiere";
    }
  };
  </script>

<style scoped>
#page.background-image {
  position: absolute;
  top: 0vh;
  left: 0vw;
  background-image: url('../assets/2.jpg'); /* Remplacez '/path/to/your/background-image.jpg' par le chemin de votre image de fond */
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
  height: 100vh; /* Utilisez 100vh pour couvrir la hauteur de la fenêtre visible */
  width: 100vw; /* Utilisez 100 % pour couvrir toute la largeur de la fenêtre */
}
.form-image {
  width: 70px; /* Largeur de l'image */
  height: 70px; /* Hauteur de l'image */
  margin-right: 20px; /* Espacement entre l'image et le formulaire */
  /* Autres styles d'image */
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
#Designation{
  position: absolute;
  top: 170px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}

#Contact{
  position: absolute;
  top: 470px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#expiration{
  position: absolute;
  top: 450px;
   left: 800px;
   font-size: x-large;
  font-weight: 900;
  color: rgb(90, 2, 90);
}
#exp_case{
  position: absolute;
  top: 490px;
   left: 800px;
   font-size: x-large;
  font-weight: 900;
  color: rgb(90, 2, 90);
}
#IFU {
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
#mots_de_passe {
  position: absolute;
  top: 350px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#verf_mots_de_passe {
  position: absolute;
  top: 410px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}

#dirigeant_name {
  position: absolute;
  top: 170px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}

#dir_contact{
  position: absolute;
  top: 230px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}

#adresse_dir{
  position: absolute;
  top: 290px;
   left:800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#id_code_user {
  position: absolute;
  top: 390px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}

#log {
  position: absolute;
  top: 610px;
   left: 500px;
   width: 390px;
   background-color: rgb(73, 6, 73);
   border-radius: 50px;
   height: 50px;
   font-size: large;
}
#log:hover {
  background-color: maroon;
}
#gen_btm{
  position: absolute;
  top: 345px;
   left: 800px;
   width: 100px;
   background-color: rgb(73, 6, 73);
   border-radius: 50px;
}
#gen_btm:hover {
  background-color: maroon;
}
#condition {
  margin-bottom: -80px;
}

.txt-click {
  cursor: pointer;
  color: rgb(16, 16, 16);
  font-weight: bold;
}

.txt-click:hover {
  text-decoration: underline;
}

input:invalid {
    border: 1px solid red;
}
  /* Style pour les champs valides */
  input:valid {
    border: 1px solid green;
  }

#checkbox-cond {
  position: relative;
  top: 355px;
  left: 680px;
}
#txt-cond {
  position: relative;
  top: 395px;
  left: 800px;
  font-size: larger;
}
#know_more {
  position: relative;
  top: 320px;
  left: 1150px;
  font-size: larger;
}
#know_more:hover {
  color:  rgb(99, 13, 99);
}

#nav {
  position: absolute;
}
  #ok-msg {
    position: absolute;
    color:rgb(48, 177, 1);
    top: 110px;
    left:50px;
  }

  #already-exist {
    position: absolute;
    top: 110px;
    left:50px;
  }

  .form {
    background-color: rgb(255, 255, 255);
    border: 1px solid #ccc;
    padding: 2em;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 1350px;
    height: 700px;
    position: absolute;
    top:  100px;
    left: 240px;
    margin: 0;
  }

  input {
    width: 10vw;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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

  select {
    margin-bottom: 10px;
  }

</style>


<template>
  <div id="page" class="background-image">
          <form class= "form" @submit.prevent="submitForm()">
            <img id= "img" src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
            <p id="ajout_compte">Ajouter compte </p>
            <p id="Nature-compte">[Utilisateur]</p>
            <input id= "Nom" type="text" v-model="formData.name" placeholder="Nom:" @input="clearError" required>
            <input id= "num_ip"  type="txt" v-model="formData.numero_ip" placeholder="Numero IP:" @input="clearError" required>
            <h6 class="msgerr" v-if="badIP">Verifiez le numero IP !</h6>
            <input id=  "adresse"  type="txt" v-model="formData.adresse" placeholder="Adresse:" @input="clearError" required>
            <input id= "phone_num" type="txt" v-model="formData.telephone" placeholder="Numero de telephone:" @input="clearError" required>
            <button id= "gen_btm" @click.prevent="generateUserCode(5)">Generer</button>
            <input id= "id_code_user" type="text" v-model="formData.code_id" placeholder="Code utilisateur:" @input="clearError" required>
            <h6 class="msgerr" v-if="badcode">5 caractere requis pour le code !</h6>
            <div id="condition">
              <p id="txt-cond">J'accepte les conditions d'utilisations</p>
              <input type="checkbox" id="checkbox-cond" required>
              <p id="know-more" class="txt-click">En savoir plus</p>
            </div>
            <h6 class="msgerr" v-if="badinfo">Cet utilisateur existe déjà !</h6>
            <h6 id="ok-msg" v-if="success">Inscription reussie !</h6>
            <button  id= "log" :disabled="!isFormValid" >Inscrire</button>
          </form>
       </div>
   <!-- <NoAccess v-else></NoAccess>-->
</template>

<script>
//import NoAccess from './AccessDenied.vue';
//import Nav from './BarreNav.vue';
//import {authPersAsser} from '../auth.js';
  import axios from 'axios';
  export default {
    name: 'RegisterVue',
   // mixins: [authPersAsser],  
    components: {
     // Nav, //NoAccess
    },
    data() {
      return {
        formData: {
          name: '', status: 'User', numero_ip: '', adresse: '',
          code_id: '', telephone: ''
        },
        badinfo: false, success: false, badcode: false, badIP: false
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
      async submitForm() {
        if (this.formData.numero_ip.length != 10 || !/^\d+$/.test(this.formData.numero_ip)) {
          this.badIP = true; return
        }
        if (this.formData.code_id.length !== 5) {
          this.badcode = true; return
        }
        console.log(`Someone submit`);
        try {
            axios.post('http://localhost:3100/register', this.formData, {
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
        this.badinfo = false, this.badcode = false, this.badIP = false
      }
    },
    mounted() {
      document.title = "inscription utilisateur";
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
  height: 100vh; /* Utilisez 100vh pour couvrir la hauteur de la fenêtre visible */
  width: 100vw; /* Utilisez 100 % pour couvrir toute la largeur de la fenêtre */
}
#ajout_compte{
  position: absolute;
  top: 20px;
   left: 260px;
  font-size: xxx-large;
  font-weight: 900;
  color: rgb(90, 2, 90);                
}
#Nature-compte {
  position: absolute;
  top: 90px;
   left: 300px;
  font-size: 20px;
  font-weight: 900;
  color: rgb(90, 2, 90);
}
.form-image {
  width: 70px; /* Largeur de l'image */
  height: 70px; /* Hauteur de l'image */
  margin-right: 20px; /* Espacement entre l'image et le formulaire */
  /* Autres styles d'image */
}
#Nom {
  position: absolute;
  top: 170px;
   left: 230px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#num_ip {
  position: absolute;
  top: 290px;
   left: 230px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#adresse {
  position: absolute;
  top: 230px;
   left: 230px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#phone_num {
  position: absolute;
  top: 350px;
   left: 230px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#id_code_user {
  position: absolute;
  top: 460px;
   left: 225px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}

#img{
  position: absolute;
   left: 170px;
}
#log {
  position: absolute;
  top: 600px;
   left: 270px;
   width: 390px;
   background-color: rgb(73, 6, 73);
   border-radius: 50px;
   height: 50px;
}
#log:hover {
  background-color: maroon;
}
#gen_btm{
  position: absolute;
  top: 410px;
   left: 230px;
   width: 100px;
   background-color: rgb(73, 6, 73);
   border-radius: 50px;
}
#status {
  margin-bottom: -30px;
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
  top: 465px;
  left: -210px;
}
#know-more{
  position: relative;
  top: 435px;
  left: 570px;
  font-size: larger;
}
#txt-cond {
  position: relative;
  top: 506px;
  left: 240px;
  font-size: larger;
}
#know_more:hover {
  color:  rgb(99, 13, 99);
}

#nav {
  position: absolute;
}
  #ok-msg {
    color:rgb(48, 177, 1)
  }

  .form {
    background-color: rgb(255, 255, 255);
    border: 1px solid #ccc;
    padding: 2em;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 900px;
    height: 700px;
    position: absolute;
    top:  100px;
    left: 450px;
    margin: 0;
  }

  input {
    width: 100%;
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


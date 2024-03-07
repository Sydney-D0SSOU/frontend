<template>
  <div id="page" class="background-image">
        <form class= "form" @submit.prevent="submitForm()">
          <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
          <p id="ajout_compte">Ajouter compte </p>
          <p id="Nature-compte">[Representant pays]</p>
          <input id= "Designation" type="text" v-model="formData.name" placeholder="Designation:" @input="clearError" required>
          <input id= "IFU" type="txt" v-model="formData.IFU" placeholder="IFU:" @input="clearError" required>
          <input id= "registre" type="txt" v-model="formData.registreCommerce" placeholder="Registre Commerce:" @input="clearError" required>
          <input id= "paswrd" type="txt" v-model="formData.passwd" placeholder="Mot de passe:" @input="clearError" required>
          <input id= "adresse" type="txt" v-model="formData.adresse" placeholder="Adresse:" @input="clearError" required>
          <input id= "Contact" type="txt" v-model="formData.contact" placeholder="Contact:" @input="clearError" required>
          <input id= "Front_off_many" type="txt" v-model="formData.nombre_FO" placeholder="Nombre de Front Office:" @input="clearError" required>
          <h6 class="msgerr" v-if="badnum_FO">L'input doit etre un nombre !</h6>
          <input id= "pers_asser_many" type="txt" v-model="formData.nombre_PA" placeholder="Nombre de Personne assermentee:" @input="clearError" required>
          <h6 class="msgerr" v-if="badnum_PA">L'input doit etre un nombre !</h6>
          <label id="pays">Pays: </label><br>
          <select id= "pays_c" v-model="formData.Pays" required>
            <option value="Benin">Benin</option>
            <option value="Togo">Togo</option>
          </select><br/>
          <div id="dirigeant">
            <div >
              <input id= "dir_name" type="text" v-model="formData.dirigeantNom" placeholder="Nom du dirigeant:" @input="clearError" required>
              <input id= "dir_Contact" type="text" v-model="formData.dirigeantContact" placeholder="Contact du dirigeant:" @input="clearError" required>
              <input id= "dir_adresse" type="txt" v-model="formData.dirigeantAdresse" placeholder="Adresse du dirigeant:" @input="clearError" required>
            </div>
          </div>
          <button id="gen_btm" @click.prevent="generateUserCode(5)">Generer</button>
          <input id="user_code_id" type="text" v-model="formData.code_id" placeholder="Code utilisateur:" @input="clearError" required>
          <h6 class="msgerr" v-if="badcode">5 caractere requis pour le code !</h6>
          <label id="expiration">Duree d'expiration: </label><br>
          <select id= "expiration_c" v-model="formData.expireDans" required>
            <option value="90">90 jours</option>
            <option value="30">30 jours</option>
          </select><br/>
          <div id="condition">
            <p id="txt-cond">J'accepte les conditions d'utilisations</p>
            <input type="checkbox" id="checkbox-cond" required>
            <p id="know-more" class="txt-click">En savoir plus</p>
          </div>
          <h6 class="msgerr" v-if="badinfo">Cet utilisateur existe déjà !</h6>
          <h6 id="ok-msg" v-if="success">Inscription reussie !</h6>
          <button id= "log" :disabled="!isFormValid" >Inscrire</button>
        </form>
      </div>
</template>

<script>
//import NoAccess from './AccessDenied.vue';
//import Nav from './BarreNav.vue';
// import {authAdmin} from '../auth.js';
import axios from 'axios';
export default {
  name: 'RegisterVue',
  //mixins: [authAdmin],
  components: {
  //  Nav, NoAccess
  },
  data() {
    return {
      formData: {
        name: '', status: 'Rp', IFU: '', adresse: '', passwd: '',
        code_id: '', registreCommerce: '', contact: '', expireDans: '', Pays: '',
        dirigeantNom: '', dirigeantAdresse: '', dirigeantContact: '', nombre_FO: '', nombre_PA: ''
      },
      showDirigeant: true, badinfo: false, success: false, badcode: false, badnum_FO: false, badnum_PA: false
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
      if (!(/^\d+$/.test(this.formData.nombre_FO))) {
          this.badnum_FO = true; return
      }
      if (!(/^\d+$/.test(this.formData.nombre_PA))) {
          this.badnum_PA = true; return
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
      this.badinfo = false, this.badcode = false, this.badnum_FO = false, this.badnum_PA = false
    }
  },
  mounted() {
    document.title = "inscription representant pays";
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

#Designation {
  position: absolute;
  top: 170px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45 px
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
#Front_off_many{
  position: absolute;
  top: 470px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#pers_asser_many{
  position: absolute;
  top: 530px;
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
#dir_adresse {
  position: absolute;
  top: 290px;
   left:800px;
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
#registre {
  position: absolute;
  top: 455px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#pays {
  position: absolute;
  top: 520px;
   left: 805px;
   font-size: x-large;
  font-weight: 900;
  color: rgb(90, 2, 90);
}
#pays_c {
  position: absolute;
  top: 560px;
   left: 805px;
   font-size: large;
  font-weight: 900;
  color: rgb(14, 1, 14);
   width: 95px;
  height: 35px;
}
#expiration{
  position: absolute;
  top: 520px;
   left: 1050px;
   font-size: x-large;
  font-weight: 900;
  color: rgb(90, 2, 90);
}

#expiration_c{
  position: absolute;
  top: 560px;
   left: 1050px;
   font-size: large;
  font-weight: 900;
  color: rgb(14, 1, 14);
  width: 95px;
  height: 35px;
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
  position: absolute;
  top: 625px;;
  left: 70px;
}
#know-more {
  position: absolute;
  top: 615px;
  left: 1200px;
  font-size: larger;
}
#txt-cond {
  position: absolute;
  top: 615px;
  left: 800px;
  font-size: larger;
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
    width: 1350px;
    height: 720px;
    position: absolute;
    top:  100px;
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
  top: 660px;
   left: 810px;
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

select {
  margin-bottom: 10px;
}
</style>


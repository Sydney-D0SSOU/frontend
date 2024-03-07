<template>
  <div v-if="authorized" id="page" class="background-image">
        <form class= "form" @submit.prevent="submitForm()">
          <img src="../assets/addcmp.png" alt="Image de formulaire" class="form-image">
          <p id="ajout_compte">Ajouter compte </p>
          <p id="Nature-compte">[Personne Assermenter]</p>
          <input id= "Nom" type="text" v-model="formData.name" placeholder="Nom:" @input="clearError" required>
          <input id= "num_ip" type="txt" v-model="formData.numero_ip" placeholder="Numero IP:" @input="clearError" required>
          <input id= "zone_att" type="text" v-model="formData.zone" placeholder="zone d'attribution" @input="clearError" required>
          <h6 class="msgerr" v-if="badIP">Verifiez le numero IP !</h6>
          <input id= "adresse" type="txt" v-model="formData.adresse" placeholder="Adresse:" @input="clearError" required>
          <input id= "mots_de_passe" type="txt" v-model="formData.passwd" placeholder="Mot de passe:" @input="clearError" required>
          <div id="garant">
            <div v-if="showGarantForm">
              <input id= "garante_name" type="text" v-model="formData.persGarant_name" placeholder="Nom de la personne garante:" @input="clearError" required>
              <input id= "IP_number" type="0text" v-model="formData.persGarant_numero_ip" placeholder="Numéro IP de la personne garante:" @input="clearError" required>
              <h6 class="msgerr" v-if="badIP_gar">Verifiez le numero IP du garant!</h6>
              <input id= "adresse_gar" type="txt" v-model="formData.persGarant_adresse" placeholder="Adresse de la personne garante:" @input="clearError" required>
            </div>
          </div>
          <button id= "gen_btm" @click.prevent="generateUserCode(5)">Generer</button>
          <input id= "id_code_user" type="text" v-model="formData.code_id" placeholder="Code utilisateur:" @input="clearError" required>
          <h6 class="msgerr" v-if="badcode">5 caractere requis pour le code !</h6>
          <label >
            <input id= "father_name" type="text" v-model="formData.secret_ask1" placeholder="Quelle est le nom de votre pere ?" @input="clearError" required>
            <input id= "friends_name" type="text" v-model="formData.secret_ask2" placeholder="Quelle est le nom de votre meilleur ami ?" @input="clearError" required>
            <input id= "dog_name" type="text" v-model="formData.secret_ask3" placeholder="Comment s'appelle votre chien ?" @input="clearError" required>
          </label>
          <div id="condition">
            <p id="txt-cond">J'accepte les conditions d'utilisations</p>
            <input type="checkbox" id="checkbox-cond" required>
            <p id= "know_more" class="txt-click">En savoir plus</p>
          </div>
          <h6 id="already-exist" class="msgerr" v-if="badinfo">Cet utilisateur existe déjà !</h6>
          <h6 id="ok-msg" v-if="success">Inscription reussie !</h6>
          <button id= "log" :disabled="!isFormValid" >Inscrir</button>
        </form>
      </div>
  <NoAccess v-else></NoAccess>
</template>

<script>
import NoAccess from './AccessDenied.vue';
import {authAdminRpFront} from '../auth.js';
import axios from 'axios';
export default {
  name: 'RegisterVue',
  mixins: [authAdminRpFront],
  components: {
   NoAccess
  },
  data() {
    return {
      formData: {
        name: '', status: 'Pers Asser', numero_ip: '', adresse: '', passwd: '', zone: '',
        code_id: '', secret_ask1: '', secret_ask2: '', secret_ask3: '',
        persGarant_name: '', persGarant_numero_ip: '', persGarant_adresse: ''
      },
      showGarantForm: true, badinfo: false, success: false, badcode: false, badIP: false, badIP_gar: false
    };
  },
  methods: {
    mounted() {
    this.addMetaTags();
  },
  destroyed() {
    this.removeMetaTags();
  },
  methods: {
    addMetaTags() {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=0.67, maximum-scale=0.67, minimum-scale=0.67, user-scalable=no');
      document.head.appendChild(meta);
    },
    removeMetaTags() {
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        document.head.removeChild(meta);
      }
    }
  },
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
    toggleGarantForm() {
      this.showGarantForm = !this.showGarantForm;
    },
    async submitForm() {
      if (this.formData.numero_ip.length != 10 || !/^\d+$/.test(this.formData.numero_ip)) {
        this.badIP = true; return
      }
      if (this.formData.persGarant_numero_ip.length != 10 || !/^\d+$/.test(this.formData.persGarant_numero_ip)) {
        this.badIP_gar = true; return
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
      this.badinfo = false, this.badcode = false, this.badIP = false, this.badIP_gar = false
    }
  },
  mounted() {
    document.title = "inscription PersAsser";
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
  position:fixed ;
}
.form-image {
  width: 70px; /* Largeur de l'image */
  height: 70px; /* Hauteur de l'image */
  margin-right: 20px; /* Espacement entre l'image et le formulaire */
  /* Autres styles d'image */
}
#ajout_compte{
  position: absolute;
  top:  20px;
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

#Nom {
  position: absolute;
  top: 160px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#zone_att {
  position: absolute;
  top: 470px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;
}
#num_ip {
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
#garante_name {
  position: absolute;
  top:  160px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#IP_number {
  position: absolute;
  top: 230px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#adresse_gar {
  position: absolute;
  top: 290px;
   left:800px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#id_code_user {
  position: absolute;
  top: 395px;
   left: 800px;
   width: 500px;
   border-radius: 50px;
   height:  45px;

}
#father_name {
  position: absolute;
  top: 410px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#friends_name {
  position: absolute;
  top: 470px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#dog_name{
  position: absolute;
  top: 530px;
   left: 70px;
   width: 500px;
   border-radius: 50px;
   height: 45px;

}
#log {
  position: absolute;
  top: 620px;
   left: 810px;
   width: 390px;
   background-color: rgb(73, 6, 73);
   border-radius: 50px;
   height: 45px;
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
  top: 390px;
  left: 680px;
}

#know-more {
  position: relative;
  top: -75px;
  left: 350px;
  color: rgb(49, 67, 183)
}

#txt-cond {
  position: relative;
  top: 430px;;
  left: 800px;
  font-size: larger;
}
#know_more {
  position: relative;
  top: 360px;
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
  /*#formulaire {
    position: relative;
    top: 130px;
    left: 720px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }*/

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

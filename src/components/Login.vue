<template>
  <div id="page">
  <Nav id="nav"/>
  <h1>Connectez-vous !</h1>
    <form>
      <img src="" alt="Image d'en-tête">
      <div id="formulaire">
      <input type="txt" v-model="formData.code_id" @input="clearError" placeholder="Code ID:" required>
      <input type="password" v-model="formData.passwd" @input="clearError" placeholder="Password" required>
      <h6 id="msgerr" v-if="badinfo">Identifiants incorrect !</h6>
      <button @click.prevent="Login" type="submit">se connecter</button>
      </div>
    </form>
  </div>
</template>

<script>
  import Nav from './BarreNav.vue';
    import axios from 'axios';
    export default {
        name: 'LoginVue',
        components: {
          Nav
        },
        data() {
            return {
                formData: {
                    code_id: '',
                    passwd: '',
                },
            badinfo: false
          };
        },
        methods: {
          async Login() {
            console.log(`Someone try login`);
            try {
                axios.post('http://localhost:3100/login', this.formData, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    const data = response.data
                    localStorage.setItem('token', data.token);
                    const infoJSON = JSON.stringify(data.info_member);
                    localStorage.setItem('memberInfo', infoJSON);
                    this.$router.push(`/${data.route}`);
                    console.log('Connexion réussie !');
                })
                .catch((err) => {
                   this.badinfo = true;
                   console.error(`Identifiants incorrect !\nÉchec de la connexion: ${err}`);
                })
            } catch (error) {
              console.error('Erreur lors de la communication avec le serveur:', error);
            }
          },
          clearError() {
            this.badinfo = false
          }
        },
        mounted() {
          document.title = "connexion";
        }
    }
</script>

<style scoped>

#page {
 background-image: url(../assets/img.png);
 background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
}

img {
  max-width: 50%; /* Ajustez la largeur maximale selon vos besoins */
  height: auto; /* Cela maintiendra le rapport hauteur/largeur de l'image */
  margin-bottom: 20px; /* Ajoutez un espacement sous l'image si nécessaire */
  margin-left: 110px;
}

#nav {
  position: relative;
}

  form {
    position: fixed;
    top: 300px;
    left: 700px;
    height: 500px;
    width: 500px;
    border: 1px solid rgb(0, 0, 0);
     background-color: #fafafa; 
    padding: 20px;
    border-radius: 50px 50px 20px 20px;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
  }

#formulaire {
  position: relative;
  top: 20px;
  left: 40px;
}

  input {
    width: 400px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 60px;
    background-color: #ffffff;
    color: rgb(0, 0, 0)
  }

  button {
    background-color: #2f7287;
    color: #ffffff;
    padding: 15px 170px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 60px ;
  }

  button:hover {
    background-color: #10d2d5;
     box-shadow: 0 10px 10px rgba(78, 118, 146, 0.987);
     color: black;
  }

  #msgerr {
    color: red;
    font-size: 10px;
  }
  select {
    margin-bottom: 10px
  }
</style>
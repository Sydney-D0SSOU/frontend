<template>
    <div v-if="authorized">
       <Nav id="nav"/>
        <h1>Connectez un utilisateur !</h1>
        <div id="LogForm">
            <form>
                <input type="txt" v-model="formData.code_id" @input="clearError" placeholder="Code ID:" required>
                <h6 id="msgerr" v-if="badinfo">Identifiants incorrect !</h6>
                <button @click.prevent="Login" type="submit">Se connecter</button>
            </form>
        </div>
    </div>
    <NoAccess v-else/>
</template>

<script>
import Nav from '../BarreNav.vue';
import NoAccess from '../AccessDenied'
import {authPersAsser} from '../../auth.js';
    import axios from 'axios';
    export default {
        mixins: [authPersAsser],
        components: {
          Nav, NoAccess
        },
        name: 'LoginVue',
        data() {
            return {
                formData: {
                    code_id: '',
                    status: 'User'
                },
            badinfo: false
          };
        },
        methods: {
          async Login() {
            console.log(`Une personne assermente veut connecter un user`);
            try {
                axios.post('http://localhost:3100/loginUser', this.formData, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    const data = response.data
                    const infoUserJSON = JSON.stringify(data.info_user);
                    localStorage.setItem('userInfo', infoUserJSON);
                    localStorage.setItem('token_user', data.token);
                    console.log('Connexion réussie !');
                    this.$router.push('/user');
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
          document.title = "connexion-user";
        }
    }
</script>

<style scoped>
#nav {
  position: relative;
}
  #LogForm {
    position: absolute;
    top: 250px;
    left: 720px;
    /*
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    */
  }

  form {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
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
    background-color: #6b2020;
  }

  #msgerr {
    color: red;
    font-size: 10px;
  }
  select {
    margin-bottom: 10px
  }
</style>

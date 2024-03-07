<template>
    <div>
        <Nav/>
    <div id="redirect-page">
        <div id="box">
            <h1 id="txt1">Vous n'etes plus autorises a voir les infos de l'utilisateur</h1>
            <h4 id="txt2">Reconnectez l'utilisateur</h4>
            <button id="butt" @click="connexion">Connexion</button>
            <h4 id="txt3">Retourner a l'interface personne assermenter</h4>
            <button id="buttRedirect" @click="redirection">Retour</button>
        </div>
    </div>
    </div>
</template>

<script>
import Nav from './BarreNav.vue';
export default {
    components: {
            Nav
    },
    methods: {
        connexion() {
            this.$router.push('/connexion-user')
        },
        redirection() {
            this.$router.push('/persAsser')
        },
    }
    
}
</script>

<style scoped>
#nav {
    position: absolute;
}
#redirect-page {
    height: 1080px;
    width: 1900px;
    background-color: #3b3a3a
}
    #box {
        position: relative;
        border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 550px;
    height: 450px;
    top: 200px;
    left: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #000000;
}

#butt {
  background-color: rgb(255, 0, 0);
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}


#butt:hover {
  background-color: #700b0b;
}

#buttRedirect {
  background-color: rgb(51, 255, 0);
  color: rgb(0, 0, 0);
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}


#buttRedirect:hover {
  background-color: #6a7026;
}

#txt1, #txt2, #txt3 {
    color: white;
}

#txt3 {
    position: absolute;
    top: 320px;
    left: 100px;
}

#buttRedirect {
    position: absolute;
    top: 400px;
    left: 220px;
}
</style>

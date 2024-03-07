<template>
 <div id="page">
    <Nav id="nav" />
    <h1>SCORE</h1>
    <p class="type-writer">" Débloquez votre potentiel financier,<br>sécurisez votre avenir. "</p>
    <img id="pub" :src="getImagePath()" alt="Une image decrivant les utilites de Score">
  </div>
</template>

<script>
import AcceuilImg1 from '../assets/Acceuil-Img1.jpg';
import AcceuilImg2 from '../assets/Acceuil-Img2.jpg';
import AcceuilImg3 from '../assets/Acceuil-Img3.jpg';
    import Nav from './BarreNav.vue';
    export default {
        name: 'acceuilVue',
        components: {
            Nav
        },
        data() {
          return {
            images: [AcceuilImg1, AcceuilImg2, AcceuilImg3],
            i_img: 0
          }
        },
        methods: {
          getImagePath() {
            return this.images[this.i_img];
          }
        },
        mounted() {
            document.title = "Score | Acceuil";
            setInterval(() => {
              this.i_img += 1
              if (this.i_img === this.images.length) {
                this.i_img = 0
              }
            }, 1200)
        }
    }
</script>

 <style scoped>

.type-writer {
  overflow: hidden; /* Pour masquer le texte initial */
  white-space: nowrap; /*Pour empêcher le texte de se retourner à la ligne */
  animation: typewriter 4s steps(1000, end) infinite;
  border-right: 2px solid transparent; /* Pour simuler un curseur de frappe */
}

@keyframes typewriter {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

#page {
  /* background-color: #223b3e; */
   background-color: #eeeeee;
  left: 0px;
  position: fixed;
  height: 950px;
  width: 1980px;
}

h1 {
  position: fixed;
  font-weight:900px;
  font-size: 70px;
  top: 150px;
  left: 200px;
  font-style:italic;
  color: #5e0161
}

p {
  position: fixed;
  top: 300px;
  left: 100px;
  font-size: 25px;
  font-weight: bold;
  font-style:initial;
}

#nav {
    position: relative;
}

#pub {
  background-size: cover;
  background-position: center;
  position: fixed;
  height: 650px;
  width: 1000px;
  top: 100px;
  left: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 80px;
   box-shadow: 0 60px 60px rgba(0, 0, 0, 0.2);
}


#banner { 
  background-color: rgb(52, 59, 77);
  height: 200px;
}

button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
    background-color: rgb(120, 43, 43);
}
#login {
    position: absolute;
    top: 60px;
    left: 1700px;
}
</style>
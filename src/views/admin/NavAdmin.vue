<template>
    <div id="nav">
      <img id="logo" src="@assets/logoscoreCut.png" alt="Logo SCORE">
      <div id="chiffre-affaire">Chiffre d'affaires<br>
        <span style="font-size: 25px; font-weight: 900">35000000 FCAF</span>
      </div>
      <div id="options" class="opts">
        <div @click="chooseOption(options, 'acceuil')" id="acceuil" class="opt" :class="{'optionSelect': options[0].value}">
          <div>Acceuil Admin</div>
          <img src="@assets/home.png" alt="logo d'une maison">
        </div>
        <div @click="chooseOption(options, 'licence')" id="licence" class="opt" :class="{'optionSelect': options[1].value}">
          <div>Licences vendues</div>
          <img src="@assets/licence.png" alt="logo d'une maison">
        </div>
        <div @click="chooseOption(options, 'stats')" id="statistiques" class="opt" :class="{'optionSelect': options[2].value}">
          <div>Statistiques</div>
          <img src="@assets/stats.png" alt="logo de statistiques">
        </div>
        <div @click="chooseOption(options, 'transaction')" id="transactions" class="opt" :class="{'optionSelect': options[3].value}">
          <div>Contrats</div>
          <img src="@assets/transaction.png" alt="logo de transaction">
        </div>
        <div @click="chooseOption(options, 'compte')" id="compte" class="opt" :class="{'optionSelect': options[4].value}">
          <div>Comptes</div>
          <img src="@assets/compte.png" alt="logo de compte">
        </div>
        <div v-if="options[4].value" id="all-comptes" class="opts">
          <div @click="chooseOption(allComptes, 'Rp')" :class="{'CompteSelect': allComptes[0].value}">Représentant pays</div>
          <div @click="chooseOption(allComptes, 'FO')" :class="{'CompteSelect': allComptes[1].value}">Front Office</div>
          <div @click="chooseOption(allComptes, 'PA')" :class="{'CompteSelect': allComptes[2].value}">Assermentées</div>
          <div @click="chooseOption(allComptes, 'Banque')" :class="{'CompteSelect': allComptes[3].value}">Banques</div>
          <div @click="chooseOption(allComptes, 'User')" :class="{'CompteSelect': allComptes[4].value}">Civils</div>
        </div>
        <div id="line" class="line-separator"></div>
        <div @click="chooseOption(options, 'params')" id="parametre" class="opt" :class="{'optionSelect': options[5].value}">
          <div>Paramètres</div>
          <img src="@assets/parametre.png" alt="logo de parametre">
        </div>
        <div @click="Deconnect()" id="Deconnexion" class="opt" :class="{'optionSelect': options[6].value}">
          <div>Déconnexion</div>
          <img src="@assets/deconnexion.png" alt="logo de parametre">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        options: [
          { name: 'acceuil', path: '/statsgr', value: true },
          { name: 'licence', path: '/licences-vendues', value: false },
          { name: 'stats', path: '/statsgr', value: false },
          { name: 'transaction', path: '/listContrat', value: false },
          { name: 'compte', path: '/infos-Rp', value: false },
          { name: 'params', path: '', value: false },
          { name: 'log out', path: '/', value: false },
        ],
        allComptes: [
          { name: 'Rp', path: '/infos-Rp', value: true },
          { name: 'FO', path: '/infos-FO', value: false },
          { name: 'PA', path: '/infos-PA', value: false },
          { name: 'Banque', path: '/infos-Banque', value: false },
          { name: 'User', path: '/infos-User', value: false },
        ]
      }
    },
    methods: {
      offOthers(list, uniqueOn) {
        list.forEach(objet => {
          if (objet.name !== uniqueOn) {
            objet.value = false;
          }
        });
      },
      chooseOption(list, choosed) {
        let objetfind = list.find(objet => objet.name === choosed)
        objetfind.value = true
        this.offOthers(list, choosed)
        this.$router.push(`${objetfind.path}`);
      },
      Deconnect() {
        localStorage.removeItem('token');
        localStorage.removeItem('memberInfo');
        localStorage.removeItem('options{Admin}');
        localStorage.removeItem('allComptes{Admin}');
        this.$router.push(`/`);
      },
      resetOptionBarreNav(list, currentPath) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].path === currentPath) {
            list[i].value = true
            this.offOthers(list, list[i].name)
          }
        }
      }
    },
    mounted() {
      const optionsJSON = localStorage.getItem('options{Admin}');
      const allComptesJSON = localStorage.getItem('allComptes{Admin}');
      if (optionsJSON && allComptesJSON) {
        this.options = JSON.parse(optionsJSON);
        this.allComptes = JSON.parse(allComptesJSON)
      }
      this.resetOptionBarreNav(this.options, this.$route.path)
      this.resetOptionBarreNav(this.allComptes, this.$route.path)
    }
  }
  </script>
  
  <style scoped>
  #nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 240px;
    background-color: rgb(0, 0, 0);
    overflow-y: auto; /* Permet de faire défiler si le contenu dépasse */
  }
  
  #logo {
    position: absolute;
    top: 10px;
    left: 80px;
    height: 80px;
    width: 80px;
  }
  
  #chiffre-affaire {
    position: relative;
    color: white;
    background-color: rgb(43, 141, 38);
    margin-top: 100px;
    left: 20px;
    width: 200px;
    padding: 10px;
    border-radius: 20px;
  }
  
  .opt {
    position: relative;
    color: white;
    left: 10px;
    height: 35px;
    width: 220px;
    border-radius: 20px;
    font-weight: 900;
    background-color: rgba(0, 128, 0, 0);
    margin-bottom: 10px; /* Ajout d'une marge pour éviter le chevauchement */
  }
  
  .opt > div {
    position: absolute;
    top: 0;
    left: 50px;
    font-weight: 900;
    padding-top: 8px;
  }
  
  .opt:hover {
    transform: translateX(-10px);
    transition: all 0.3s;
    border-radius: 20px;
    color: rgb(3, 3, 3);
    background-color: rgb(214, 175, 103);
  }
  
  .opt > img {
    position: absolute;
    top: 4px;
    left: 10px;
    height: 30px;
    width: 30px;
  }
  
  .opts {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  
  .opts > div:hover {
    cursor: pointer;
  }
  
  #options {
    margin-top: 50px;
  }
  
  .opts > div {
    position: relative;
    margin-bottom: 10px;
  }
  
  #all-comptes {
    top: 0;
    left: 40px;
    color: white;
  }
  
  #all-comptes > div {
    margin-bottom: 10px;
  }
  
  #all-comptes > div:hover {
    color: orange;
  }
  
  .CompteSelect {
    color: orange;
    font-weight: 900;
  }
  
  .optionSelect {
    background-color: orange;
    color: black;
  }
  
  #line {
    height: 1px;
    width: 200px;
    background-color: white;
    position: relative;
    left: 10px;
  }
  
  #Deconnexion:hover {
    background-color: rgb(168, 2, 2);
    color: white;
    box-shadow: 0 0 20px red;
  }
  
  @media (max-width: 768px) {
    #nav {
      width: 200px;
    }
    .opt {
      width: 180px;
    }
    .opts > div {
      margin-bottom: 8px;
    }
    #chiffre-affaire {
      width: 180px;
    }
  }
  </style>
  
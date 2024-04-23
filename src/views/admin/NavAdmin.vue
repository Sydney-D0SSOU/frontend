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
            <div @click="chooseOption(options, 'compte')" id="compte"  class="opt" :class="{'optionSelect': options[4].value}">
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
            <div id="line" style="height: 1px; width: 240px; background-color: white; position: relative; left: 13px;"></div>
            <div @click="chooseOption(options, 'params')" id="parametre"  class="opt" :class="{'optionSelect': options[5].value}">
                <div>Paramètres</div>
                <img src="@assets/parametre.png" alt="logo de parametre">
            </div>
            <!-- <div @click="chooseOption(options, 'add compte')" id="ajouterCompte"  class="opt" :class="{'optionSelect': options[6].value}">
                <div>Ajouter compte</div>
                <img src="@assets/ajout-compte.png" alt="logo d'ajout de compte">
            </div>
            <div @click="chooseOption(options, 'delete compte')" id="supprimerCompte"  class="opt" :class="{'optionSelect': options[7].value}">
                <div>Supprimer compte</div>
                <img src="@assets/supprimer-compte.png" alt="logo de suppression">
            </div> -->
            <div @click="Deconnect()" id="Deconnexion"  class="opt" :class="{'optionSelect': options[6].value}">
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
                { name: 'transaction', path: '/admi', value: false },
                { name: 'compte', path: '/infos-Rp', value: false },
                { name: 'params', path: '/admi', value: false },
                // { name: 'add compte', path: '/admi', value: false },
                // { name: 'delete compte', path: '/admi', value: false },
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
            // console.log(`CLICK for ${choosed} \n`)
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
            // console.log(`In reset !!!`)
            // console.log(`lenght list = ${list.length}`)
            for (let i = 0; i < list.length; i++) {
                // console.log(`on path: [${list[i].path}]`)
                // console.log(`current path: [${currentPath}]`)
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
        // Si des données existent dans le LocalStorage, utilisez-les pour initialiser la variable options
        if (optionsJSON && allComptesJSON) {
            this.options = JSON.parse(optionsJSON);
            this.allComptes = JSON.parse(allComptesJSON)
        }
        // console.log(`currentPath is {${this.$route.path}}`)
        this.resetOptionBarreNav(this.options, this.$route.path)
        this.resetOptionBarreNav(this.allComptes, this.$route.path)
    }
}
</script>

<style scoped>

#nav {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 1100px;
    width: 280px;
    background-color: rgb(0, 0, 0);
}

#logo {
    position: absolute;
    top: 0px;
    left: 90px;
    height: 100px;
    width: 80px;
}

#chiffre-affaire {
    position: relative;
    color: white;
    background-color: rgb(43, 141, 38);
    top: 130px;
    left: 25px;
    width: 200px;
    padding: 10px;
    border-radius: 20px;
}

.opt {
    position: absolute;
    color: white;
    /* top: 250px;
    left: 30px; */
    left: 30px;
    height: 40px;
    width: 220px;
    border-radius: 20px;
    font-weight: 900;
    background-color: rgba(0, 128, 0, 0);
}

.opt > div {
    position: absolute;
    top: 0px;
    left: 60px;
    font-weight: 900;
    padding-top: 8px;
}

.opt:hover {
    /* left: 0px; */
    transform: translateX(-20px);
    transition: all 0.3s;
    /* cursor: pointer; */
    border-radius: 20px;
    color: rgb(3, 3, 3);
    background-color: rgb(214, 175, 103);
}

.opt > img {
    position: relative;
    top: 4px;
    left: 10px;
    height: 30px;
    width: 30px;
}

.opts {
    position: absolute;
    display: flex;
    flex-direction: column;
}

.opts > div:hover {
    cursor: pointer;
}

#options {
    top: 240px;
}

.opts > div {
    position: relative;
    margin-bottom: 15px;
}

#all-comptes {
    top: 0px;
    left: 80px;
    color: white;
}

#all-comptes > div {
    margin-bottom: 10px;
}

#all-comptes > div:hover {
    color: orange;
}
/* 
#line {
   
  height: 1px; width: 240px; background-color: white; position: relative; left: 13px;
} */

.CompteSelect {
    color: orange;
    font-weight: 900;
}

.optionSelect {
    background-color: orange;
    color: black;
}

#Deconnexion:hover {
    background-color: rgb(168, 2, 2);
    color: white;
     box-shadow: 0 0 20px red;
}

.glissante {
    transition: transform 0.5s ease-in-out; /* Animation de 0,5 seconde avec accélération et décélération */
  transform: translateX(-100%);
}

.glissante.show {
    transform: translateX(0);
}

</style>

<template>
    <div id="nav">
        <img id="logo" src="../../assets/logoscoreCut.png" alt="Logo SCORE">
        <div id="chiffre-affaire">Chiffre d'affaires<br>
            <span style="font-size: 25px; font-weight: 900">35 000 000 fcfa</span>
        </div>
        <div id="options" class="opts">
            <div @click="chooseOption(options, 'acceuil')" id="acceuil" class="opt" :class="{'optionSelect': options[0].value}">
                <div>Acceuil</div>
                <img src="../../assets/home.png" alt="logo d'une maison">
            </div>
            <div @click="chooseOption(options, 'licence')" id="licence" class="opt" :class="{'optionSelect': options[1].value}">
                <div>Licences </div>
                <img src="../../assets/licence.png" alt="logo d'une maison">
            </div>
            <div @click="chooseOption(options, 'stats')" id="statistiques" class="opt" :class="{'optionSelect': options[2].value}">
                <div>Statistiques</div>
                <img src="../../assets/stats.png" alt="logo de statistiques">
            </div>
            <div @click="chooseOption(options, 'transaction')" id="transactions" class="opt" :class="{'optionSelect': options[3].value}">
                <div>Transactions</div>
                <img src="../../assets/transaction.png" alt="logo de transaction">
            </div>
            <div @click="chooseOption(options, 'compte'); chooseOption(allComptes, 'PA')" id="compte"  class="opt" :class="{'optionSelect': options[4].value}">
                <div>Comptes</div>
                <img src="../../assets/compte.png" alt="logo de compte">
            </div>
            <div v-if="options[4].value" id="all-comptes" class="opts">
                <div @click="chooseOption(allComptes, 'PA')" :class="{'CompteSelect': allComptes[0].value}">Assermentées</div>
                <div @click="chooseOption(allComptes, 'Banque')" :class="{'CompteSelect': allComptes[1].value}">Banque</div>
            </div>
            <div id="line" style="height: 1px; width: 240px; background-color: white; position: relative; left: 13px;"></div>
            <div @click="chooseOption(options, 'params')" id="parametre"  class="opt" :class="{'optionSelect': options[5].value}">
                <div>Paramètres</div>
                <img src="../../assets/parametre.png" alt="logo de parametre">
            </div>
           
            <div @click="Deconnect()" id="Deconnexion"  class="opt" :class="{'optionSelect': options[6].value}">
                <div>Déconnexion</div>
                <img src="../../assets/deconnexion.png" alt="logo de parametre">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                { name: 'acceuil', path: '/frontOffices', value: true },
                { name: 'licence', path: '/frontOffices/licences-vendues', value: false },
                { name: 'stats', path: '/stats', value: false },
                { name: 'transaction', path: '/', value: false },
                { name: 'compte', path: '/frontOffices/infos-FO', value: false },
                { name: 'params', path: '/', value: false },
                { name: 'log out', path: '/', value: false },
            ],
            allComptes: [
                { name: 'PA', path: '/frontOffices/infos-PA', value: false },
                { name: 'Banque', path: '/frontOffices/infos-Banque', value: false },
                { name: 'User', path: '/frontOffices/infos-User', value: false },
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
            const optionsJSON = JSON.stringify(this.options);
            const allComptesJSON = JSON.stringify(this.allComptes)
          
            this.$router.push(`${objetfind.path}`);
        },
        Deconnect() {
            localStorage.clear();
            this.$router.push('/')
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
        const optionsJSON = localStorage.getItem('options{Rp}');
        const allComptesJSON = localStorage.getItem('allComptes{Rp}');
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
    height: 100vh; /* Full viewport height */
    width: 220px; /* Reduced width */
    background-color: rgb(0, 0, 0);
    overflow: auto; /* Allow scrolling if needed */
}

#logo {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 80px;
    width: 60px;
}

#chiffre-affaire {
    position: relative;
    color: white;
    background-color: rgb(43, 141, 38);
    top: 100px;
    left: 10px;
    width: 200px;
    padding: 10px;
    border-radius: 20px;
}

.opt {
    position: relative;
    color: white;
    height: 40px;
    width: calc(100% - 20px); /* Adjust width to fit inside the nav */
    margin: 5px 0; /* Add margin for spacing */
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
    transform: translateX(-10px);
    transition: all 0.3s;
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
    display: flex;
    flex-direction: column;
}

.opts > div:hover {
    cursor: pointer;
}

#options {
    margin-top: 100px; /* Adjust top margin to fit below the chiffre-affaire */
}

#all-comptes {
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

#Deconnexion:hover {
    background-color: rgb(168, 2, 2);
    color: white;
    box-shadow: 0 0 20px red;
}

.glissante {
    transition: transform 0.5s ease-in-out; /* Animation */
    transform: translateX(-100%);
}

.glissante.show {
    transform: translateX(0);
}

/* Media Queries */
@media (max-width: 768px) {
    #nav {
        width: 180px; /* Further reduced width for smaller screens */
    }

    #logo {
        height: 60px;
        width: 50px;
    }

    #chiffre-affaire {
        top: 80px;
        left: 5px;
        width: 170px;
    }

    .opt {
        width: calc(100% - 10px);
    }
}

@media (max-width: 480px) {
    #nav {
        width: 150px; /* Further reduced width for very small screens */
    }

    #logo {
        height: 50px;
        width: 40px;
    }

    #chiffre-affaire {
        top: 60px;
        left: 0;
        width: 130px;
        font-size: 14px; /* Adjust font size for small screens */
    }

    .opt {
        font-size: 14px; /* Adjust font size for small screens */
    }
}
</style>



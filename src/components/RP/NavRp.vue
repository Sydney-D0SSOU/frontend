<template>
    <div id="nav">
        <img id="logo" src="../../assets/logoscoreCut.png" alt="Logo SCORE">
        <div id="chiffre-affaire">Chiffre d'affaires<br>
            <span style="font-size: 25px; font-weight: 900">35 000 000 fcfa</span>
        </div>
        <div id="options" class="opts">
            <div @click="chooseOption(options, 'acceuil')" id="acceuil" class="opt" :class="{'optionSelect': options[0]?.value}">
                <div>Acceuil</div>
                <img src="../../assets/home.png" alt="logo d'une maison">
            </div>
            <div @click="chooseOption(options, 'licence')" id="licence" class="opt" :class="{'optionSelect': options[1]?.value}">
                <div>Licences vendues</div>
                <img src="../../assets/licence.png" alt="logo d'une maison">
            </div>
            <div @click="chooseOption(options, 'stats')" id="statistiques" class="opt" :class="{'optionSelect': options[2]?.value}">
                <div>Statistiques</div>
                <img src="../../assets/stats.png" alt="logo de statistiques">
            </div>
            <div @click="chooseOption(options, 'transaction')" id="transactions" class="opt" :class="{'optionSelect': options[3]?.value}">
                <div>Transactions</div>
                <img src="../../assets/transaction.png" alt="logo de transaction">
            </div>
            <div @click="chooseOption(options, 'compte'); chooseOption(allComptes, 'FO')" id="compte"  class="opt" :class="{'optionSelect': options[4]?.value}">
                <div>Comptes</div>
                <img src="../../assets/compte.png" alt="logo de compte">
            </div>
            <div v-if="options[4]?.value" id="all-comptes" class="opts">
                <div @click="chooseOption(allComptes, 'FO')" :class="{'CompteSelect': allComptes[0]?.value}">Front Office</div>
                <div @click="chooseOption(allComptes, 'PA')" :class="{'CompteSelect': allComptes[1]?.value}">Assermentées</div>
                <div @click="chooseOption(allComptes, 'Banque')" :class="{'CompteSelect': allComptes[2]?.value}">Banque</div>
                <div @click="chooseOption(allComptes, 'User')" :class="{'CompteSelect': allComptes[3]?.value}">Civils</div>
            </div>
            <div id="line" style="height: 1px; width: 240px; background-color: white; position: relative; left: 13px;"></div>
            <div @click="Deconnect()" id="Deconnexion"  class="opt" :class="{'optionSelect': options[6]?.value}">
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
                { name: 'acceuil', path: '/representant-pays', value: true },
                { name: 'licence', path: '/representant-pays/licences-vendues', value: false },
                { name: 'stats', path: '/', value: false },
                { name: 'transaction', path: '/', value: false },
                { name: 'compte', path: '/representant-pays/infos-FO', value: false },
                { name: 'params', path: '/admin', value: false },
                { name: 'log out', path: '/', value: false },
            ],
            allComptes: [
                { name: 'FO', path: '/representant-pays/infos-FO', value: false },
                { name: 'PA', path: '/representant-pays/infos-PA', value: false },
                { name: 'Banque', path: '/representant-pays/infos-Banque', value: false },
                { name: 'User', path: '/representant-pays/infos-User', value: false },
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
            let objetfind = list.find(objet => objet.name === choosed);
            if (objetfind) {
                objetfind.value = true;
                this.offOthers(list, choosed);
                const optionsJSON = JSON.stringify(this.options);
                const allComptesJSON = JSON.stringify(this.allComptes);
                localStorage.setItem('options{Rp}', optionsJSON);
                localStorage.setItem('allComptes{Rp}', allComptesJSON);
                this.$router.push(`${objetfind.path}`);
            } else {
                console.error(`Option "${choosed}" not found.`);
            }
        },
        Deconnect() {
            localStorage.clear();
            this.$router.push(`/`);
        },
        resetOptionBarreNav(list, currentPath) {
            for (const option of list) {
                if (option.path === currentPath) {
                    option.value = true;
                    this.offOthers(list, option.name);
                }
            }
        }
    },
    mounted() {
        const optionsJSON = localStorage.getItem('options{Rp}');
        const allComptesJSON = localStorage.getItem('allComptes{Rp}');
        if (optionsJSON && allComptesJSON) {
            this.options = JSON.parse(optionsJSON);
            this.allComptes = JSON.parse(allComptesJSON);
        }
        this.resetOptionBarreNav(this.options, this.$route.path);
        this.resetOptionBarreNav(this.allComptes, this.$route.path);
    }
}
</script>

<style scoped>

#nav {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 950px;
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
    transform: translateX(-20px);
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
    transition: transform 0.5s ease-in-out;
    transform: translateX(-100%);
}

.glissante.show {
    transform: translateX(0);
}

</style>

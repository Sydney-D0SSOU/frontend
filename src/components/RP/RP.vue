<template>
    <div v-if="isConnected" id="page">
        <Nav id="nav"/>
        <div id="dash-name">Dashboard</div>
        <input type="text" id="recherche" style="text-indent: 40px; overflow: show" placeholder="Recherche">
        <div id="butt-search"></div>
        <img id="loupe" src="../../assets/recherche.png" alt="loupe">
        <div id="txt-superadmin">REPRESENTANT PAYS</div>
        <img id="message" src="../../assets/message.png" alt="msg">
        <img v-if="hasNotifs" id="notif-logo" @click="see_notif = !see_notif" src="../../assets/notif-alerte.png" alt="cloche">
        <img v-else id="notif-logo" @click="see_notif = !see_notif" src="../../assets/cloche.png" alt="cloche">
        <div id="box-utilisations" style="display: flex; flex-direction: column; background-color: white; position: absolute; top: 130px; left: 370px; height: 300px; width: 500px; padding-bottom: 10px; border-radius: 20px; overflow: auto">
            <div style="position: absolute; top: 30px; left: 40px; font-size: 18px; font-weight: 10px">Utilisation</div>
            <div id="use-pays" v-for="(pays, j) in use_pays" :key="j" style="position: relative; margin-bottom: 30px; color: black; top: 80px; height: 50px; width: 300px; background-color: transparent;">
                <div style="position: absolute; font-weight: bolder; left: 100px; font-size: 20px; text-transform: uppercase;">{{pays.name}}</div>
                <div style="position: relative; top: 25px; left: 100px" :style="{color: pays.profit === true ? 'green':'red' }">{{pays.enregistrements}} enregistrements par jour</div>
                <img class="logo" v-if="pays.profit" style="position: relative; top: -25px; left: 400px" src="../../assets/croissance.png" alt="fleche">
                <img class="logo" v-else style="position: relative; top: -25px; left: 400px" src="../../assets/decroissance.png" alt="fleche">
                <div style="position: absolute; top: 25px; left: 400px">{{pays.pourcentage}}%</div>
                <div class="circle" style="position: absolute; top: 5px; left: 50px"></div>
            </div>
        </div>
        <div id="box-versement" style="display: flex; flex-direction: column; background-color: white; position: absolute; top: 130px; left: 970px; height: 300px; width: 500px; padding-bottom: 10px; border-radius: 20px; overflow: auto">
            <div style="position: absolute; top: 30px; left: 40px; font-size: 18px; font-weight: 10px">BENIN</div>
            <div id="versement" v-for="(personne, k) in versements" :key="k" style="position: relative; margin-bottom: 30px; color: black; top: 80px; height: 50px; width: 400px; background-color: transparent;">
                <div style="position: absolute; font-weight: bolder; left: 100px; font-size: 20px; text-transform: uppercase;">{{personne.status}}</div>
                <div style="position: relative; top: 25px; left: 100px">{{personne.prix}} fcfa</div>
                <img class="logo" v-if="personne.paye" style="position: relative; top: -25px; left: 400px; height: 40px; width: 40px" src="../../assets/on.png" alt="fleche">
                <img class="logo" v-else style="position: relative; top: -25px; left: 400px; height: 40px; width: 40px" src="../../assets/off.png" alt="fleche">
                <div class="carre" style="position: absolute; top: 5px; left: 50px"></div>
            </div>
        </div>
        <div id="box-licences" style="display: flex; flex-direction: column; background-color: white; position: absolute; top: 530px; left: 370px; height: 300px; width: 500px; padding-bottom: 10px; border-radius: 20px;">
            <div style="position: absolute; top: 30px; left: 40px; font-size: 18px; font-weight: 10px">Licences actives</div>
            <div id="licences" v-for="(licence, k) in licences" :key="k" style="position: relative; margin-bottom: 30px; color: black; top: 80px; height: 50px; width: 300px; background-color: transparent;">
                <div style="position: absolute; font-weight: bolder; left: 100px; font-size: 20px; text-transform: uppercase;">{{licence.pays}}</div>
                <div style="position: relative; top: 25px; left: 100px">{{licence.prix}} fcfa</div>
                <div v-if="licence.active">
                    <img class="logo" @click="licence.active = !licence.active" style="position: relative; top: -35px; left: 400px; height: 40px; width: 40px" src="../../assets/on.png" alt="fleche">
                    <div style="position: relative; top: -45px; left: 400px; color: green">Active</div>
                </div>
                <div v-else>
                    <img class="logo" @click="licence.active = !licence.active" style="position: relative; top: -35px; left: 400px; height: 40px; width: 40px" src="../../assets/off.png" alt="fleche">
                    <div style="position: relative; top: -45px; left: 350px; color: red">Desactivée</div>
                </div>
                <img class="logo" style="position: absolute; top: 5px; left: 50px; height: 30px; width: 30px" src="../../assets/licence-logo.png" alt="fleche">
            </div>
        </div>
        <img src="../../assets/carte.png" alt="carte" style="position: absolute; top: 530px; left: 970px; height: 300px; width: 500px; border-radius: 20px">
        <div v-if="see_notif" id="barre-notifs" style="overflow-y: auto">
            <div id="container-title" style="position: absolute; height: 55px; width: 250px; background-color: black; color: white; border-bottom: 1px solid white;">
                <h1>Notifications</h1>
            </div>
            <div v-if="hasNotifs">
                <div v-for="(notif, i) in notifications" :key="i"  id="box-notif">
                    <div style="font-weight: 100">id: {{notif.id}}</div>
                    <div style="font-weight: 100">message: {{notif.message}}</div>
                </div>
            </div>
            <div v-else style="position: absolute; top: 100px; left: 20px; color: white">Aucune notification pour l'instant
            </div>
        </div>
    </div>
    <div v-else>
        <Noaccess/>
    </div>
</template>

<script>
import Nav from './NavRp.vue';
import Noaccess from './../AccessDenied.vue'
export default {
    components: {
        Nav,
        Noaccess
    },
    computed: {
    isConnected() {
      // Vérifier si l'identifiant de connexion est présent dans le stockage local
      return localStorage.getItem('token') !== null;
    }
   },
    data() {
        return {
            memberInfo: {},
            use_pays: [
                {name: 'Donga', enregistrements: 10, profit: false, pourcentage: 5},
                {name: 'Alibori', enregistrements: 60, profit: true, pourcentage: 70},
                {name: 'Zou', enregistrements: 135, profit: true, pourcentage: 90},
                {name: 'Atlantique', enregistrements: 40, profit: false, pourcentage: 37},
                {name: 'Littoral', enregistrements: 485, profit: true, pourcentage: 110},
            ],
            versements: [
                {status: 'front office', prix: '500 000', paye: true},
                {status: 'Assermentées', prix: '2 000 000', paye: true},
                 {status: 'Banques', prix: '300 000', paye: false}
            ],
            licences: [
                {pays: 'Cotonou', prix: '5 000 000', active: true},
                {pays: 'Alibori', prix: '10 000 000', active: false},
                {pays: 'Ketou', prix: '100 000 000', active: true},
            ],
            notifications: [
                {id: 'Afiss', message: 'Une cliente refuse de reconnaitre ses dettes.'},
                {id: 'Am-lake', message: 'J\'aimerais avoir la possibilite d\'inscrire plus de personne assermentee.'},
                {id: 'Aquilas', message: 'C\'est difficile de coder :('},
                {id: 'Joel', message: 'Ti est game petit'},
                {id: 'Hanniel', message: 'Lol'},
            ],
            // notifications: [],
            see_notif: false,
            hasNotifs: false
        }
    },
    created() {
        const infos = JSON.parse(localStorage.getItem('memberInfo'));
        if (infos) this.memberInfo = infos;
        else this.memberInfo = ''
        this.hasNotifs = this.notifications.length > 0;
    },
    methods: {
    },
   
}
</script>

<style scoped>

#page {
  background-color: #ebebeb;
  top: 0px;
  left: 0px;
  position: fixed;
  height: 900vw;
  width: 1980vw;
}

#nav {
    position: absolute;
}

#dash-name {
    position: absolute;
    font-weight: 900;
    top: 43px;
    left: 330px;
    font-size: 23px;
}

#recherche {
    position: absolute;
    height: 27px;
    width: 250px;
    top: 43px;
    left: 1000px;
    border-radius: 20px;
    border: none;
}

#box-search {
    position: absolute;
    height: 33px;
    width: 200px;
    top: 43px;
    left: 960px;
    border-radius: 20px;
    background-color: rgb(179, 179, 179);
}


#butt-search {
    position: relative;
    top: 43px;
    left: 1000px;
    height: 29px;
    width: 40px;
    background-color: white;
    border-radius: 20px 0 0 20px
}

#loupe {
    position: absolute;
    top: 45px;
    left: 1005px;
    height: 25px;
    width: 25px;
}

#message {
    position: relative;
    top: 17px;
    left: 1555px;
    height: 25px;
    width: 25px;
}

#notif-logo {
    position: relative;
    top: 17px;
    left: 1560px;
    height: 25px;
    width: 25px;
}

#txt-superadmin {
    position: absolute;
    top: 43px;
    left: 1650px;
    font-weight: 900;
    font-size: 20px;
}

#barre-notifs {
    position: fixed;
    top: 0px;
    left: 1670px;
    height: 1500px;
    width: 250px;
    background-color: rgb(0, 0, 0);
}

#barre-notifs > div > h1 {
    position: absolute;
    top: 10px;
    left: 25px;
    font-weight: 700;
    font-size: 17px;
    color: white;
    transition: all 4s
    
}

#box-notif {
    position: relative;
    top: 80px;
    left: 10px;
    width: 200px;
    background-color: rgb(106, 45, 10);
    padding: 10px;
    padding-left: 20px;
    margin-bottom: 10px;
    color: rgb(255, 255, 255);
    border-radius: 20px;
}

#box-notif:hover {
     background-color: rgb(59, 25, 6);
}

.logo {
    height: 25px;
    width: 25px;
}

.circle {
  width: 35px;
  height: 35px;
  background-color: rgb(12, 85, 211);
  border-radius: 50%; /* Cela rendra l'élément circulaire */
}

.carre {
    height: 30px;
    width: 30px;
    background-color: orange;
    border-radius: 5px;
}
</style>
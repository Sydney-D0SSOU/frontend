<template>
    <div  id="page">
        <Nav id="nav"/>
        <div id="dash-name">Dashboard</div>
        <MDBInput
    v-model="search1"
    inputGroup
    :formOutline="false"
    wrapperClass="mb-3"
    placeholder="Search"
    aria-label="Search"
    aria-describedby="button-addon2"
  >
    <MDBBtn color="success">
      <MDBIcon icon="search" />
    </MDBBtn>
  </MDBInput>        <div id="butt-search"></div>
        <div id="txt-superadmin">SUPER ADMIN</div>
        <img v-if="hasNotifs" id="notif-logo" @click="see_notif = !see_notif" src="" alt="cloche">
        <img v-else id="notif-logo" @click="see_notif = !see_notif" src="" alt="cloche">
        <div id="box-utilisations" style="display: flex; flex-direction: column; background-color: white; position: absolute; top: 130px; left: 370px; height: 300px; width: 500px; padding-bottom: 10px; border-radius: 20px; overflow: auto">
            <div style="position: absolute; top: 30px; left: 40px; font-size: 18px; font-weight: 10px">Utilisation</div>
            <div id="use-pays" v-for="(pays, j) in use_pays" :key="j" style="position: relative; margin-bottom: 30px; color: black; top: 80px; height: 50px; width: 300px; background-color: transparent;">
                <div style="position: absolute; font-weight: bolder; left: 100px; font-size: 20px; text-transform: uppercase;">{{pays.name}}</div>
                <div style="position: relative; top: 25px; left: 100px" :style="{color: pays.profit === true ? 'green':'red' }">{{pays.enregistrements}} enregistrements par jour</div>
                <img class="logo" v-if="pays.profit" style="position: relative; top: -25px; left: 400px" src="" alt="fleche">
                <img class="logo" v-else style="position: relative; top: -25px; left: 400px" src="" alt="fleche">
                <div style="position: absolute; top: 25px; left: 400px">{{pays.pourcentage}}%</div>
                <div class="circle" style="position: absolute; top: 5px; left: 50px"></div>
            </div>
        </div>
        <div id="box-versement" style="display: flex; flex-direction: column; background-color: white; position: absolute; top: 130px; left: 970px; height: 300px; width: 500px; padding-bottom: 10px; border-radius: 20px; overflow: auto">
            <div style="position: absolute; top: 30px; left: 40px; font-size: 18px; font-weight: 10px">BENIN</div>
            <div id="versement" v-for="(personne, k) in versements" :key="k" style="position: relative; margin-bottom: 30px; color: black; top: 80px; height: 50px; width: 400px; background-color: transparent;">
                <div style="position: absolute; font-weight: bolder; left: 100px; font-size: 20px; text-transform: uppercase;">{{personne.status}}</div>
                <div style="position: relative; top: 25px; left: 100px">{{personne.prix}} fcfa</div>
                <img class="logo" v-if="personne.paye" style="position: relative; top: -25px; left: 400px; height: 40px; width: 40px" src="" alt="fleche">
                <img class="logo" v-else style="position: relative; top: -25px; left: 400px; height: 40px; width: 40px" src="" alt="fleche">
                <div class="carre" style="position: absolute; top: 5px; left: 50px"></div>
            </div>
        </div>
        <div id="box-licences" style="display: flex; flex-direction: column; background-color: white; position: absolute; top: 530px; left: 370px; height: 300px; width: 500px; padding-bottom: 10px; border-radius: 20px;">
            <div style="position: absolute; top: 30px; left: 40px; font-size: 18px; font-weight: 10px">Licences actives</div>
            <div id="licences" v-for="(licence, k) in licences" :key="k" style="position: relative; margin-bottom: 30px; color: black; top: 80px; height: 50px; width: 300px; background-color: transparent;">
                <div style="position: absolute; font-weight: bolder; left: 100px; font-size: 20px; text-transform: uppercase;">{{licence.pays}}</div>
                <div style="position: relative; top: 25px; left: 100px">{{licence.prix}} fcfa</div>
                <div v-if="licence.active">
                    <img class="logo" @click="licence.active = !licence.active" style="position: relative; top: -35px; left: 400px; height: 40px; width: 40px" src="" alt="fleche">
                    <div style="position: relative; top: -45px; left: 400px; color: green">Active</div>
                </div>
                <div v-else>
                    <img class="logo" @click="licence.active = !licence.active" style="position: relative; top: -35px; left: 400px; height: 40px; width: 40px" src="" alt="fleche">
                    <div style="position: relative; top: -45px; left: 350px; color: red">Desactivée</div>
                </div>
                <img class="logo" style="position: absolute; top: 5px; left: 50px; height: 30px; width: 30px" src="" alt="fleche">
            </div>
        </div>
        <img src="" alt="carte" style="position: absolute; top: 530px; left: 970px; height: 300px; width: 500px; border-radius: 20px">
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
</template>

<script>
 import { MDBInput, MDBBtn, MDBIcon } from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import NoAccess from '../../components/AccessDenied.vue';
import Nav from './NavAdmin.vue';
import {authAdmin} from '../../auth.js';
export default {
    mixins: [authAdmin],
    components: {
        MDBInput,
      MDBBtn,
      MDBIcon,
        Nav, NoAccess
    },
    data() {
        return {
            memberInfo: {},
            use_pays: [
                {name: 'Congo', enregistrements: 10, profit: false, pourcentage: 5},
                {name: 'Benin', enregistrements: 60, profit: true, pourcentage: 70},
                {name: 'Cote d\'ivoire', enregistrements: 135, profit: true, pourcentage: 90},
                {name: 'France', enregistrements: 40, profit: false, pourcentage: 37},
                {name: 'Belgique', enregistrements: 485, profit: true, pourcentage: 110},
            ],
            versements: [
                 {status: 'Representant pays', prix: '1 000 000', paye: true},
                {status: 'front office', prix: '500 000', paye: true},
                {status: 'Assermentées', prix: '2 000 000', paye: true},
                 {status: 'Banques', prix: '300 000', paye: false}
            ],
            licences: [
                {pays: 'Benin', prix: '5 000 000', active: true},
                {pays: 'Gabon', prix: '10 000 000', active: false},
                {pays: 'Chine', prix: '100 000 000', active: true},
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
    mounted() {
        document.title = "Admin"; // Mettez le titre que vous souhaitez afficher
    }
}
</script>

<style scoped>
#page {
    background-color: #ebebeb;
    position: fixed;
    height: 100%;
    width: 100%;
}

/* Styles pour les écrans de petite taille */
@media screen and (max-width: 768px) {
    #dash-name {
        font-size: 18px;
        top: 30px;
        left: 15px;
    }

    #recherche {
        height: 25px;
        width: 180px;
        top: 30px;
        left: 250px;
    }

    /* Ajoutez d'autres styles pour les éléments nécessaires */
}

/* Styles pour les écrans de taille moyenne */
@media screen and (min-width: 769px) and (max-width: 1024px) {
    #dash-name {
        font-size: 20px;
        top: 40px;
        left: 150px;
    }

    #recherche {
        height: 27px;
        width: 250px;
        top: 40px;
        left: 1000px;
    }

    /* Ajoutez d'autres styles pour les éléments nécessaires */
}

/* Styles pour les écrans de grande taille */
@media screen and (min-width: 1025px) {
    #dash-name {
        font-size: 23px;
        top: 43px;
        left: 330px;
    }

    #recherche {
        height: 27px;
        width: 250px;
        top: 43px;
        left: 1000px;
    }

    /* Ajoutez d'autres styles pour les éléments nécessaires */
}

</style>
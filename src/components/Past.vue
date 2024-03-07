<template>
    <div id="page">
        <Nav/>
        <div id="box-title" style="height: 70px; width: 1950px; background-color: #b9650c">
            <div style="position: absolute; left: 800px; top: 30px;font-size: 20px;font-weight: 900">FRONT OFFICES</div> 
        </div>
        <div id="box-liste-rp">
            <div id="box-titre">
                <div style="position: absolute; font-weight: 900; top: 10px; left: 40px">Liste des front offices</div>
                <img id="add" class="logo" @click="this.$router.push(`/inscription-frontOffice`);" src="../assets/+.png" style="top: 3px; right: 0px; transition: transform 0.3s" alt="Rp">
            </div>
            <div id="liste" style="position: absolute; top: 40px; background-color: transparent; height: 370px; width: 1200px; color: black; overflow: auto">
                <div id="Rp" v-for="(FO, k) in FOs" :key="k" style="position: relative; margin-bottom: 1px; color: black; top: 0px; height: 80px; width: 650px; border-bottom: 1px solid rgb(0, 0, 0); border-radius: 40px">
                    <img class="logo" src="../assets/FO.png" style="top: 10px; left: 10px" alt="Rp">
                    <div @click="seeInfoUser(FO.num_ip)" id="seeInfo" style="position: absolute; font-weight: 500; top: 10px; left: 50px">{{FO.nom}}</div>
                    <img id="delete-buton" class="logo" @click="deleteCompte(FO)" src="../assets/x.png" style="top: 10px; left: 500px; border-radius: 20px" alt="Rp">
                    <div style="position: absolute; font-weight: 100; top: 40px; left: 50px">[{{FO.zone}}]</div>
                </div>
            </div>
        </div>
            <div v-if="see_infoFO" style="position: absolute; top: 200px; left: 1000px; width: 800px;box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.5); height: 580px;">
                <button @click="see_infoFO = false" class="btn btn-danger rounded-circle" style="position: absolute; top: -20px; right: 0;">
                    <span class="text-white" style="font-size: 20px; line-height: 1;">&times;</span>
                </button>
                <h3 class="text-center text-light" style="font-size: 20px; ">Les infos de {{ choosedUser.nom }}</h3>
                <table class="table table-striped table-bordered custom-table" style="overflow-y: auto">
                    <tbody>
                        <tr style="height: 30px" v-for="(value, key, k) in choosedUser" :key="k">
                            <td id="keys" class="text-white" style="width: 250px">{{ key }}</td>
                            <th id="values" > {{ value }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>

<script>
import Nav from '../views/admin/NavAdmin.vue';
import {authAdmin} from '../auth.js';
import axios from 'axios'
export default {
    mixins: [authAdmin],
    components: {
        Nav,
    },
    data() {
        return {
            FOs: [], see_infoFO: false, choosedUser: {}, status: 'Front office'
        }
    },
    methods: {
        seeInfoUser(num_ip) {
            this.see_infoFO = true,
            this.choosedUser = this.FOs.find(user => user.num_ip === num_ip);
        },
        deleteCompte(compte) {
            const reponse = window.confirm(`Etes vous sur de vouloir supprimer ${compte.nom} ?`)
            if (reponse) {
                const param = {
                    status: this.status,
                    num_ip: compte.num_ip
                };
                try {
                    axios.delete('http://localhost:3100/delete-user', {
                        params: param
                    })
                    .then(() => {
                        console.log(`Suppression du ${param.status} avec succes !`)
                    })
                    .catch((err) => {   
                        console.log(`Erreur avec axios lors de la suppresion du ${param.status}: ${err}`)
                    })
                } catch(err) {
                    console.log(`Erreur try lors de la suppression du ${param.status}`)
                }
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
        }
    },
    created() {
        const param = {
            status: this.status,
        };
        try {
            axios.get('http://localhost:3100/List-Users', {
                params: param
            })
            .then((res) => {
                const data = res.data
                this.FOs = data.list
                console.log(this.FOs)
            })
            .catch((err) => {
                console.log(`Erreur envoi axios: ${err}`)
            })
        } catch(err) {
            console.log(`Error try: ${err}`)
        }
    }
}
</script>

<style scoped>

#page {
  background-color: rgb(70, 50, 8);
  /* background-color: #dbdbdb; */
  top: 0px;
  left: 0px;
  position: fixed;
  height: 900vw;
  width: 1980vw;
}

.logo {
    position: absolute;
    height: 35px;
    width: 35px;
}

#box-liste-rp {
    position: absolute;
    top: 110px;
    left: 310px;
    height: 750px;
    width: 700px;
    /* min-height: 200px; */
    /* padding-bottom: 100px; */
    width: 650px;
     background-color: rgb(167, 167, 167);
}

#box-liste-rp > div:nth-child(1) {
    position: absolute fixed;
    top: 0px; left: 0px;
    background-color: orange;
    height: 40px;
    width: 1000px;
}

#Rp {
    background-color: rgb(220, 219, 219)
}

#Rp:hover {
    background-color: rgb(255, 255, 255);
}

#delete-buton:hover {
    background-color: rgb(255, 132, 0);
}

#seeInfo {
    cursor: pointer;

}

#seeInfo:hover {
    text-decoration: underline;
    color: red;
}

#add:hover {
    transform: scale(1.3); 
}

#keys {
    background-color: rgb(0, 0, 0)
}

.custom-table {
    background-color: rgb(204, 204, 204);
}
 
#values:hover {
    background-color: rgb(241, 241, 241);
    color:   
}

</style>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
<template>
    <div  id="page">
        <!-- <Nav/> -->
            <!-- <bar-chart ref="barrePerc"></bar-chart> -->
            <!-- <Char/> -->
        <div :class="{calqueDettes: detail_dettes || addHistorydette, calqueRecouvr: detail_recouvrement, calqueAddDette: add_dette || add_recouvr}">
        <div id="deconnect" @click="Deconnect()" style="position: absolute; height: 50px; width: 150px; top: 20px; left: 1700px; display: flex; align-item: center; justify-content: center; margin-bottom: 0px; border-radius: 10px; cursor: pointer">
            <p style="position: absolute; top: 10px; font-weight: 600; font-style: italic">Deconnexion</p>
        </div>
        <div class="box" style="position: absolute; top: 50px; left: 600px; height: auto; background-color: black; color: white; border-radius: 20px; min-width: 530px; padding: 0px">
            <img src="../../assets/compte.png" style="position: absolute; top: 10px; left: 10px; height: 110px; width: 110px">
            <div style="position: relative; top: 10px">
                <p class="bold-txt" style="position: relative; margin-bottom: 0px; left: 160px; font-size: 25px; top: 0px">id {{userInfo.contact}}</p>
                <p style="position: relative; left: 160px; font-size: 25px; top: -5px">Commerçant</p>
                <p style="position: relative; top: -25px; left: 160px; margin-bottom: 0px; font-size: 25px;">{{userInfo.adresse}}</p>
            </div>
        </div>
        <!-- <div style="position: absolute; top: 180px; left: 850px; heigth: 30px; width: 350px; background-color: yellow; display: flex; border-radius: 10px; align-items: center">
            <p style="font-size: 15px; font-weight: 500px; color: purple; margin-bottom: 0px; font-size: 20px">Requête</p>
            <div id="send-req" style="margin-left: 200px; height: 50px; width: 100px; color: yellow; display: flex; justify-content: center; align-items: center; border-radius: 10px ">
                <p style="margin-bottom: 0px">SEND</p>
            </div>
        </div> -->
        <div class="box" id="container-dettes" style="position: relative; top: 280px; left: 200px; width: 620px; height: 600px; padding-bottom: 180px; background-color: rgb(92, 21, 21); padding-right: 20px">
            <img id="add" class="logo" @click="add_dette = true" src="../../assets/+.png" style="position: absolute; top: -40px; right: 0px; transition: transform 0.3s; height: 40px; width: 40px">
            <div class="box" id="box-tauxDeRemboursement" style="top: -10px; right: -5px;">
                <div>
                    <span class="bold-txt" style="position: absolute; top: 0px;">TAUX DE<br> REMBOURSEMENT:</span><br>
                    <div id="cercle-jauge" style="top: 60px; left: 30px">
                        <div id="pourcentage" style="top: 40px; left: 40px">98%</div>
                    </div>
                </div>
            </div>
            <p class="bold-txt" style=" position: absolute; top: 10px; left: 20px; width: 300px; color: yellow">DETTES</p>
            <div class="box" id="box-total-dettes" style=" top: 40px; left: 35px; height: 70px; width: 300px; background-color: black; color: wheat;">
                <p style="margin-bottom: 0px">TOTAL DETTES:</p>
                <p class="bold-txt" style="position: relative; top: 0px; left: 50px">{{total_dettes}} fcfa</p>
            </div>
            <div style="position: relative; background-color: rgb(92, 21, 21); height: 420px; width: 609px; top: 160px; overflow-y: auto; overflow-x: hidden">
                <div  id="dette-info" v-for="(dette, index) in dettes" :key="index" style="position: relative; margin-bottom: 10px; width: 580px; overflow-y: auto; overflow-x: hidden">
                    <p class="bold-txt" style="color: yellow">{{ dette.creancier.nom }}</p>
                    <p class="bold-txt" style="color: white; position: relative; top: -10px">{{ dette.prix }} fcfa</p>
                    <p style="position: absolute; top: 10px; right: 20px; color: rgb(185, 185, 185);">{{dette.date.split(' ')[0]}}</p>
                    <p style="position: absolute; top: 40px; right: 20px; color: red;">{{dette.reste}} fcfa</p>
                    <p id="more-info" @click="detail_dettes = !detail_dettes, chooseDette(dette.id)" style="font-style: italic; position: absolute; top: 65px; right: 20px; cursor: pointer; color: rgb(185, 185, 185);">plus de detail</p>
                </div>
            </div>
        </div>
        <div class="box" id="container-dettes" style="position: absolute; top: 280px; left: 900px; width: 620px; height: 600px; padding-bottom: 180px; background-color: green; padding-right: 20px">
            <img id="add" class="logo" @click="add_recouvr = true" src="../../assets/+.png" style="position: absolute; top: -40px; right: 0px; transition: transform 0.3s; height: 40px; width: 40px">
            <div class="box" id="box-tauxDeRemboursement" style="top: -10px; right: -5px;">
                <div>
                    <span class="bold-txt" style="position: absolute; top: 0px;">TAUX DE<br> RECOUVREMENT:</span><br>
                    <div id="cercle-jauge" style="top: 60px; left: 30px">
                        <div id="pourcentage" style="top: 40px; left: 40px">98%</div>
                    </div>
                </div>
            </div>
            <p class="bold-txt" style=" position: absolute; top: 10px; left: 20px; width: 300px; color: yellow">RECOUVREMENT</p>
            <div class="box" id="box-total-dettes" style=" top: 40px; left: 35px; height: 70px; width: 300px; background-color: black; color: wheat;">
                <p style="margin-bottom: 0px">TOTAL:</p>
                <p class="bold-txt" style="position: relative; top: 0px; left: 50px">{{total_recouvrement}} fcfa</p>
            </div>
            <div style="position: relative; background-color: green; height: 420px; width: 609px; top: 160px; overflow-y: auto; overflow-x: hidden">
                <div  id="dette-info" v-for="(recouvr, index) in recouvrements" :key="index" style="position: relative; margin-bottom: 10px; width: 580px; overflow-y: auto; overflow-x: hidden">
                    <p class="bold-txt" style="color: yellow">{{ recouvr.debiteur.nom }}</p>
                    <p class="bold-txt" style="color: white; position: relative; top: -10px">{{ recouvr.prix }} fcfa</p>
                    <p style="position: absolute; top: 10px; right: 20px; color: rgb(185, 185, 185);">{{recouvr.date.split(' ')[0]}}</p>
                    <p style="position: absolute; top: 40px; right: 20px; color: red;">{{recouvr.reste}} fcfa</p>
                    <p id="more-info" @click="detail_recouvrement = !detail_recouvrement, chooseRecouvr(recouvr.id)" style="font-style: italic; position: absolute; top: 65px; right: 20px; cursor: pointer; color: rgb(185, 185, 185);">plus de detail</p>
                </div>
            </div>
        </div>
  </div>
    <div v-if="detail_dettes" id="more-info-dettes" style="position: absolute; height: 800px; width: 1000px; top: 50px; left: 400px; display: inline-block; justify-content: center; align-items: center; flex-direction: column; padding: 20px; border-radius: 30px; overflow-y: show; overflow-x: hidden">
        <p style="position: fixed; top: 5px; left: 750px; font-size: 25px; font-weight; 600; color: white; font-style: italic">Details de la dette</p>
        <button @click="detail_dettes = !detail_dettes" class="btn btn-danger rounded-circle" style="position: fixed; top: 5px; right: 520px; ">
            <span class="text-white" style="font-size: 20px; line-height: 1;">&times;</span>
        </button>
        <div style="position: absolute; height: 30px; width: "></div>
        <div style="position: absolute; ; top: 70px; left: 80px; padding: 10px; background-color: transparent">
            <div style="position: relative; height: 280px; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Creancier:</div>
                <table style="position: absolute; top: 50px; left: 20px; width: 700px; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: black; color: white">
                            <th style="border: 1px solid #ddd; padding: 8px; height: 100px; width: 150px">Nom</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Adresse</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Contact</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Profession</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Numero IP</th>
                        </tr>
                    </thead>
                     <tbody>
                        <tr style="background-color: gris; color: white; border: 1px solid black">
                            <td style="border: 1px solid black; padding: 8px; height: 100px">{{ choosedDette.creancier.nom }}</td>
                            <td style="border: 1px solid black; padding: 8px;font-weight: 700">{{ choosedDette.creancier.adresse }}</td>
                            <td style="border: 1px solid black; padding: 8px; font-weight: 700">{{ choosedDette.creancier.contact }}</td>
                            <td style="border: 1px solid black; padding: 8px;">{{choosedDette.creancier.profession }}</td>
                            <td style="border: 1px solid black; padding: 8px;">{{choosedDette.creancier.num_IP }}</td>
                         </tr>
                    </tbody>
                </table>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Montant:</div><div style="margin-left: 20px; color: white">{{choosedDette.prix}} fcfa</div>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Date:</div><div style="margin-left: 20px; color: white">{{choosedDette.date}}</div>
            </div>
            <div style="position: relative; height: 400px; display: flex; width: 800px; flex-direction: line; margin-bottom: 20px;">
                <div class="keyDettes" style="color: white">Historique de paiement:</div>
                <img id="add" class="logo" @click="addHistorydette = true, detail_dettes = false" src="../../assets/+.png" style="position: absolute; top: 0px; right: 75px; transition: transform 0.3s; height: 30px; width: 30px">
                <div style="position: absolute; top: 50px; height: 300px; width: 800px; overflow-y: show; overflow-x: hidden">
                <table style="position: absolute; top: 10px; left: 20px; width: 700px; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: black; color: white">
                            <th style="border: 1px solid #ddd; padding: 8px; height: 100px; width: 200px">Dates</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Montant</th>
                            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold">Mode de paiement</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Restants</th>
                        </tr>
                    </thead>
                     <tbody>
                        <tr v-for="payment in choosedDette.historique_payments" :key="payment" style="background-color: gris; color: black; border: 1px solid black">
                            <td style="border: 1px solid black; padding: 8px; height: 100px; color: yellow">{{  payment.date.split(' ')[0] }}</td>
                            <td style="border: 1px solid black; padding: 8px; color: rgb(51, 255, 0);">+ {{ payment.somme }} fcfa</td>
                            <td style="border: 1px solid black; padding: 8px; color: white">{{ payment.mode }}</td>
                            <td style="border: 1px solid black; padding: 8px; color: red">{{ payment.reste }} fcfa</td>
                         </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Date d'echeance:</div><div style="margin-left: 20px; color: white">{{choosedDette.echeance.split(' ')[0]}}</div>
            </div>
            <div style="position: relative; top: 0px; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Reste a payer:</div><div style="margin-left: 20px; color: white">{{choosedDette.reste}} fcfa</div>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Dossier(s) associe(s):</div><div style="margin-left: 20px; color: white">Ici sera mis les pdf necessaires</div>
            </div>
            <div v-if="choosedDette.paid" style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Status de la dette:</div><div style="margin-left: 20px; color: white; background-color: green">Payee</div>
            </div>
            <div v-else style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Status de la dette:</div><div style="margin-left: 20px; color: white; background-color: red">Impayee</div>
            </div>
        </div>
    </div>
    <div v-if="addHistorydette" id="form-hist-dette" style="position: absolute; top: 250px; left: 500px; height: 445px; width: 800px; border-radius: 20px; overflow: show">
        <button @click="addHistorydette = false, detail_dettes = true" class="btn btn-danger rounded-circle" style="position: fixed; top: 200px; right: 615px; ">
            <span class="text-white" style="font-size: 20px; line-height: 1;">&times;</span>
        </button>
        <p style="position: fixed; top: 200px; left: 750px; font-size: 25px; font-weight; 600; color: white; font-style: italic">Ajouter un paiement de dette</p>
        <div style="position: absolute; display: flex; flex-direction: column; left: 70px">
            <form>
            <input type="number" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formHistory.somme" placeholder="Somme:" required>
            <p style="position: relative; font-style: italic; color: black; font-weight: 500; top: 80px">Mode de paiement:</p>
            <select v-model="formHistory.mode" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" required>
                <option value="Cash">Cash</option>
                <option value="Carte bancaire">Carte bancaire</option>
            </select>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.creancier.adresse" @input="errorsformDette.badinfo = false" placeholder="Mode paiement:" required> -->
            <p style="position: relative; font-style: italic; color: black; font-weight: 500; top: 80px">Date d'aujourd'hui:</p>
            <VueDatePicker v-model="formHistory.date" style="position: relative; top: 80px; width: 600px; border-radius: 200px;" readonly></VueDatePicker>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.date" @input="badinfo_form = false" placeholder="Date:" required> -->
             <p style="position: relative; font-style: italic; color: white; font-weight: 500; top: 100px; ">Echeance de la dette:</p>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 100px; margin-bottom: 20px;" v-model="formDataDette.echeance" @input="badinfo_form = false, badEcheancedette = false" placeholder="Echeance: XX/XX/XXXX" required> -->
            <div type="submit" id="button-endettement" @click="addHistory()" style="position: relative; top: 80px; left: 400px; height: 50px; width: 100px; border-radius: 5px">
                <p style="position: absolute; top: 10px; left: 15px">Ajouter</p>
            </div>
            <span v-if="succesPay" style="position: relative; color: green; font-weight: 500; top: 30px">Paiement ajoutée avec succès</span>
            </form>
        </div>
    </div>
    <div v-if="detail_recouvrement" id="more-info-dettes" style="position: absolute; height: 800px; width: 1000px; top: 50px; left: 400px; display: inline-block; justify-content: center; align-items: center; flex-direction: column; padding: 20px; border-radius: 30px; overflow-y: show; overflow-x: hidden">
        <p style="position: fixed; top: 5px; left: 750px; font-size: 25px; font-weight; 600; color: white; font-style: italic">Details du recouvrement</p>
        <button @click="detail_recouvrement = !detail_recouvrement" class="btn btn-danger rounded-circle" style="position: fixed; top: 5px; right: 520px; ">
            <span class="text-white" style="font-size: 20px; line-height: 1;">&times;</span>
        </button>
        <div style="position: absolute; height: 30px; width: "></div>
        <div style="position: absolute; ; top: 70px; left: 80px; padding: 10px; background-color: transparent">
            <div style="position: relative; height: 280px; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Débiteur:</div>
                <table style="position: absolute; top: 50px; left: 20px; width: 700px; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: black; color: white">
                            <th style="border: 1px solid #ddd; padding: 8px; height: 100px; width: 150px">Nom</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Adresse</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Contact</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Profession</th>
                        </tr>
                    </thead>
                     <tbody>
                        <tr style="background-color: gris; color: white; border: 1px solid black">
                            <td style="border: 1px solid black; padding: 8px; height: 100px">{{ choosedRecouvr.debiteur.nom }}</td>
                            <td style="border: 1px solid black; padding: 8px;font-weight: 700">{{ choosedRecouvr.debiteur.adresse }}</td>
                            <td style="border: 1px solid black; padding: 8px; font-weight: 700">{{ choosedRecouvr.debiteur.contact }}</td>
                            <td style="border: 1px solid black; padding: 8px;">{{ choosedRecouvr.debiteur.profession }}</td>
                         </tr>
                    </tbody>
                </table>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Montant:</div><div style="margin-left: 20px; color: white">{{choosedRecouvr.prix}} fcfa</div>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Date:</div><div style="margin-left: 20px; color: white">{{choosedRecouvr.date}}</div>
            </div>
            <div style="position: relative; height: 400px; display: flex; width: 800px; flex-direction: line; margin-bottom: 20px;">
                <div class="keyDettes" style="color: white">Historique de paiement:</div>
                <div style="position: absolute; top: 50px; height: 300px; width: 800px; overflow-y: show; overflow-x: hidden">
                <table style="position: absolute; top: 10px; left: 20px; width: 700px; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: black; color: white">
                            <th style="border: 1px solid #ddd; padding: 8px; height: 100px; width: 200px">Dates</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Montant</th>
                            <th style="border: 1px solid #ddd; padding: 8px; font-weight: bold">Mode de paiement</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Restants</th>
                        </tr>
                    </thead>
                     <tbody>
                        <tr v-for="payment in choosedRecouvr.historique_payments" :key="payment" style="background-color: gris; color: black; border: 1px solid black">
                            <td style="border: 1px solid black; padding: 8px; height: 100px; color: yellow">{{ payment.date}}</td>
                            <td style="border: 1px solid black; padding: 8px; color: rgb(51, 255, 0);">+ {{ payment.somme }} fcfa</td>
                            <td style="border: 1px solid black; padding: 8px; color: white">{{ payment.mode }}</td>
                            <td style="border: 1px solid black; padding: 8px; color: red">{{ payment.reste }} fcfa</td>
                         </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Date d'echeance:</div><div style="margin-left: 20px; color: white">{{choosedRecouvr.echeance.split(' ')[0]}}</div>
            </div>
            <div style="position: relative; top: 0px; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Reste a payer:</div><div style="margin-left: 20px; color: white">{{choosedRecouvr.reste}} fcfa</div>
            </div>
            <div style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Dossier(s) associe(s):</div><div style="margin-left: 20px; color: white">Ici sera mis les pdf necessaires</div>
            </div>
            <div v-if="choosedRecouvr.paid" style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Status du recouvrement:</div><div style="margin-left: 20px; color: white; background-color: green">Payee</div>
            </div>
            <div v-else style="position: relative; display: flex; flex-direction: line; margin-bottom: 20px">
                <div class="keyDettes" style="color: white">Status du recouvrement:</div><div style="margin-left: 20px; color: white; background-color: red">Impayee</div>
            </div>
        </div>
    </div>
    <div v-if="add_dette" id="form-add-dette" style="position: absolute; top: 70px; left: 500px; height: 745px; width: 800px; border-radius: 20px; overflow: show">
        <button @click="add_dette = false" class="btn btn-danger rounded-circle" style="position: fixed; top: 20px; right: 615px; ">
            <span class="text-white" style="font-size: 20px; line-height: 1;">&times;</span>
        </button>
        <p style="position: fixed; top: 20px; left: 750px; font-size: 25px; font-weight; 600; color: white; font-style: italic">Ajouter une dette :(</p>
        <div style="position: absolute; display: flex; flex-direction: column; left: 70px">
            <form>
            <p style="position: absolute; font-size: 20px; color: white; font-weight: 400px; font-style: italic; top: 30px">Creancier:</p>
            <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.creancier.nom" @input="errorsformDette.badinfo = false" placeholder="Nom du creancier:" required>
            <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.creancier.adresse" @input="errorsformDette.badinfo = false" placeholder="Adresse du creancier:" required>
            <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.creancier.contact" @input="errorsformDette.badinfo = false, errorsformDette.badContact = false" placeholder="Contact du creancier: +XX XXXXXX" required>
            <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.creancier.num_ip" @input="errorsformDette.badinfo = false, errorsformDette.badIP = false" placeholder="Numero IP du creancier:" required>
            <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 50px;" v-model="formDataDette.creancier.profession" @input="errorsformDette.badinfo = false" placeholder="Profession du creancier:" required>
            <input type="number" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.prix" @input="errorsformDette.badinfo = false, errorsformDette.badPrix = false" placeholder="Prix de la dette:" required>
            <p style="position: relative; font-style: italic; color: white; font-weight: 500; top: 80px">Date d'aujourd'hui:</p>
            <VueDatePicker v-model="formDataDette.date" style="position: relative; top: 80px; width: 600px; border-radius: 200px;" readonly></VueDatePicker>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.date" @input="badinfo_form = false" placeholder="Date:" required> -->
             <p style="position: relative; font-style: italic; color: white; font-weight: 500; top: 100px; ">Echeance de la dette:</p>
            <VueDatePicker v-model="formDataDette.echeance" style="position: relative; top: 100px; width: 600px; border-radius: 200px;" format="dd/mm/yyyy"></VueDatePicker>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 100px; margin-bottom: 20px;" v-model="formDataDette.echeance" @input="badinfo_form = false, badEcheancedette = false" placeholder="Echeance: XX/XX/XXXX" required> -->
            <div type="submit" id="button-endettement" @click="addDetteOrRecouvr(formDataDette, dettes, errorsformDette, 'ajouterDette')" style="position: relative; top: 120px; left: 400px; height: 50px; width: 100px; border-radius: 5px">
                <p style="position: absolute; top: 10px; left: 15px">S'endetter</p>
            </div>
            <span v-if="errorsformDette.badinfo" style="position: relative; color: red; font-weight: 500; top: 60px">Remplissez bien tous les champs s'il vous plait</span>
            <span v-if="errorsformDette.badContact" style="position: relative; color: red; font-weight: 500; top: 60px">Mauvais format de contact du creancier</span>
            <span v-if="errorsformDette.badPrix" style="position: relative; color: red; font-weight: 500; top: 60px">Verifiez le montant de la dette</span>
            <span v-if="errorsformDette.badIP" style="position: relative; color: red; font-weight: 500; top: 60px">Verifiez l'IP du creancier</span>
            <span v-if="errorsformDette.succesfulAdd" style="position: relative; color: rgb(4, 255, 0); font-weight: 500; top: 60px">Dette ajoutée avec succès</span>
            </form>
        </div>
    </div>
        <div v-if="add_recouvr" id="form-add-recouvr" style="position: absolute; top: 70px; left: 500px; height: 745px; width: 800px; border-radius: 20px; overflow: show">
            <button @click="add_recouvr = false" class="btn btn-danger rounded-circle" style="position: fixed; top: 20px; right: 615px; ">
                <span class="text-white" style="font-size: 20px; line-height: 1;">&times;</span>
            </button>
            <p style="position: fixed; top: 20px; left: 750px; font-size: 25px; font-weight; 600; color: white; font-style: italic">Ajouter un recouvrement :)</p>
            <div style="position: absolute; display: flex; flex-direction: column; left: 70px">
                <form>
                <p style="position: absolute; font-size: 20px; color: white; font-weight: 400px; font-style: italic; top: 30px">Debiteur:</p>
                <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataRecouvr.debiteur.nom" @input="errorsformRecouvr.badinfo = false" placeholder="Nom du debiteur:" required>
                <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataRecouvr.debiteur.adresse" @input="errorsformRecouvr.badinfo = false" placeholder="Adresse du debiteur:" required>
                <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataRecouvr.debiteur.contact" @input="errorsformRecouvr.badinfo = false, errorsformRecouvr.badContact = false" placeholder="Contact du debiteur: +XX XXXXXX" required>
                <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataRecouvr.debiteur.num_ip" @input="errorsformRecouvr.badinfo = false, errorsformRecouvr.badIP = false" placeholder="Numero IP du debiteur:" required>
                <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 50px;" v-model="formDataRecouvr.debiteur.profession" @input="errorsformRecouvr.badinfo = false" placeholder="Profession du debiteur:" required>
                <input type="number" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataRecouvr.prix" @input="errorsformRecouvr.badinfo = false, errorsformRecouvr.badPrix = false" placeholder="Prix du recouvrement:" required>
                <p style="position: relative; font-style: italic; color: white; font-weight: 500; top: 80px">Date d'aujourd'hui:</p>
                <VueDatePicker v-model="formDataRecouvr.date" style="position: relative; top: 80px; width: 600px; border-radius: 200px;" readonly></VueDatePicker>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 80px; margin-bottom: 20px;" v-model="formDataDette.date" @input="badinfo_form = false" placeholder="Date:" required> -->
                <p style="position: relative; font-style: italic; color: white; font-weight: 500; top: 100px; ">Echeance du recouvrement:</p>
                <VueDatePicker v-model="formDataRecouvr.echeance" style="position: relative; top: 100px; width: 600px; border-radius: 200px;" format="dd/mm/yyyy"></VueDatePicker>
            <!-- <input type="text" style="position: relative; border-radius: 10px; height: 40px; width: 600px; top: 100px; margin-bottom: 20px;" v-model="formDataDette.echeance" @input="badinfo_form = false, badEcheancedette = false" placeholder="Echeance: XX/XX/XXXX" required> -->
                <div type="submit" id="button-endettement" @click="addDetteOrRecouvr(formDataRecouvr, recouvrements, errorsformRecouvr, 'ajouterRecouvr')" style="position: relative; top: 120px; left: 400px; height: 50px; width: 100px; border-radius: 5px">
                <p style="position: absolute; top: 10px; left: 15px">Endetter</p>
                </div>
                <span v-if="errorsformRecouvr.badinfo" style="position: relative; color: red; font-weight: 500; top: 60px">Remplissez bien tous les champs s'il vous plait</span>
                <span v-if="errorsformRecouvr.badContact" style="position: relative; color: red; font-weight: 500; top: 60px">Mauvais format de contact du debiteur</span>
                <span v-if="errorsformRecouvr.badPrix" style="position: relative; color: red; font-weight: 500; top: 60px">Verifiez le montant de la dette</span>
                <span v-if="errorsformRecouvr.badIP" style="position: relative; color: red; font-weight: 500; top: 60px">Verifiez l'IP du debiteur</span>
                <span v-if="errorsformRecouvr.succesfulAdd" style="position: relative; color: rgb(4, 255, 0); font-weight: 500; top: 60px">Recouvrement effectuée avec succès</span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import { Bar } from 'vue-chartjs'
// port imChar from './pourentageChart.vue'
import NoAccess from '../AccessDeniedUser.vue';
// import Nav from '../BarreNav.vue';
import {authUser} from '../../auth.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { format } from "date-fns"
 import axios from 'axios';
export default {
    mixins: [authUser],
    components: {
        // Nav,
        NoAccess, VueDatePicker,
    },
    data() {
        return {
            userInfo: {},
            dettes: [],
            recouvrements: [],
            formDataDette: {
                creancier: {nom: '', adresse: '', contact: '', profession: '', num_ip: ''},
                prix: undefined, dejaPaye: '0', echeance: '', reste: '0', paid: false,
                historique_payments: [
                ],
                date: new Date(), id: 0
            },
            formDataRecouvr: {
                debiteur: {nom: '', adresse: '', contact: '', profession: '', num_ip: ''},
                prix: undefined, dejaPaye: '0', echeance: '', reste: '0', paid: false,
                historique_payments: [
                ],
                date: new Date(), id: 0
            },
            errorsformDette: {
                badinfo: false,
                badContact: false, badPrix: false, badIP: false,
                succesfulAdd: false
            },
            errorsformRecouvr: {
                badinfo: false,
                badContact: false, badPrix: false, badIP: false,
                succesfulAdd: false
            },
            formHistory: {
                somme: '', date: new Date(), mode: 'Cash', reste: '', dejaPaye: ''
            },
            total_dettes: '0', total_recouvrement: '0', choosedDette: {}, choosedRecouvr: {},
             detail_dettes: false, detail_recouvrement: false, add_dette: false, 
             add_recouvr: false, succesPay: false
        }
    },
    created() {
        const infos = JSON.parse(localStorage.getItem('userInfo'));
        if (infos) this.userInfo = infos;
        else this.userInfo = ''
        try {
            axios.post(`http://localhost:3100/checkOthersDettesorRecouvr/${this.userInfo.num_ip}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(() => {
                console.log(`Good process to checkOthers`)
            })
            .catch((err0) => {
                console.log(`Erreur envoi axios (OrtherDetteorRecouvr): ${err0}`)
            })
        } catch(err) {
            console.log(`Error try (OrtherDetteorRecouvr): ${err}`)
        }
        try {
            axios.get(`http://localhost:3100/List-Dettes/${this.userInfo.num_ip}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                const data = res.data
                // console.log(`data: ${res.data}`)
                this.dettes = data.list_dettes, this.total_dettes = data.totalDettes
                // console.log(`data-list-dettes: ${data.list_dettes}`)
                // console.log(`dettes: ${this.dettes}`)
            })
            .catch((err) => {
                console.log(`Erreur envoi axios (Liste des dettes): ${err}`)
            })
        } catch(err) {
            console.log(`Error try (Liste des dettes): ${err}`)
        }
        try {
            axios.get(`http://localhost:3100/List-Recouvr/${this.userInfo.num_ip}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                const data = res.data
                // console.log(`data: ${res.data}`)
                this.recouvrements = data.list_recouvrs, this.total_recouvrement = data.totalRecouvr
                // console.log(`data-list-dettes: ${data.list_dettes}`)
                // console.log(`dettes: ${this.dettes}`)
            })
            .catch((err) => {
                console.log(`Erreur envoi axios (Liste des recouvrements): ${err}`)
            })
        } catch(err) {
            console.log(`Error try (Liste des recouvrements): ${err}`)
        }
    },
    methods: {
        chooseDette(id) {
            this.choosedDette = this.dettes.find(dette => dette.id === id);
        },
        chooseRecouvr(id) {
            this.choosedRecouvr = this.recouvrements.find(recouvr => recouvr.id === id);
        },
        addHistory() {
            console.log(`In history`)
            this.formHistory.date = format(new Date(), "dd/MM/yyyy HH:mm:ss");
            this.formHistory.somme = this.formHistory.somme.toLocaleString('fr-FR');
            console.log(`after date: ${this.formHistory.date}`)
            const TotaleDejaPaye = this.choosedDette.historique_payments.reduce((total, objet) => total + parseInt(objet.somme.replace(/\s/g, '')), 0)
            console.log(`totalDejaPaye: ${TotaleDejaPaye}`)
            console.log(`le prix de la dette a payer: ${this.choosedDette.prix}`)
            console.log(`La somme efftectue pour le paiement: ${this.formHistory.somme}`)
            let somme = this.formHistory.somme.replace(/\s/g, '')
            this.formHistory.dejaPaye = String((parseInt(TotaleDejaPaye) + parseInt(somme)))
            let prix = this.choosedDette.prix.replace(/\s/g, '')
            console.log(`prix ${prix}`)
            this.formHistory.reste = parseInt(prix - (parseInt(TotaleDejaPaye) + parseInt(somme)))
            if (this.formHistory.reste < 0) {
                this.formHistory.reste = '0'
            }
            this.formHistory.reste = this.formHistory.reste.toLocaleString('fr-FR');
            console.log(` reste dette: ${this.formHistory.reste}`);
            //this.formHistory.reste = '0'
            //console.log(`reste dette: ${this.formHistory.reste}`)
            // const newhist = this.formHistory
            
            try {
                axios.post(`http://localhost:3100/ajouterPaiement/${this.userInfo.num_ip}/${this.choosedDette.id}`, this.formHistory, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(() => {
                    console.log('Ajout de paiement réussie !');
                    this.succesPay = true
                    if(this.succesPay === true) {
                        setTimeout(() => {
                            this.succesPay = false;
                        }, 2000);
                        // setTimeout(function() {
                        //     location.reload();
                        // }, 1000);
                    }
                })
                .catch((err) => {
                    console.error(`On est tombe dans le catch.\nErreur: ${err}`);
                })
            } catch (error) {
                console.error('Erreur lors de la communication avec le serveur: (ajout de paiement)', error);
            }
            
            //this.choosedDette.historique_payments.push(newhist); //this.choosedDette.dejaPaye = TotaleDejaPaye + this.formHistory.somme
            // this.choosedDette.reste = this.choosedDette.prix - this.choosedDette.dejaPaye
            // let index = this.dettes.findIndex(dette => dette.id === this.choosedDette.id);
            //this.dettes[this.choosedDette.id] = this.choosedDette;
            this.succesPay = true
            setTimeout(() => {
                    this.succesPay = false;
            }, 2000);
        },
        addDetteOrRecouvr(form, list, errors, path) {
            console.log(`Before FormValid`)
            if(!this.isFormValid(form, errors)) return
            console.log(`After FormValid`)
            form.date = format(form.date, "dd/MM/yyyy HH:mm:ss");
            form.echeance = format(form.echeance, "dd/MM/yyyy HH:mm:ss");
            form.prix = form.prix.toLocaleString('fr-FR');
            form.reste = form.prix;
            if(list.length > 0) {
                form.id = list[list.length - 1].id + 1
            } else {
                form.id = 0
            }
            try {
                axios.post(`http://localhost:3100/${path}/${this.userInfo.num_ip}`, form, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(() => {
                    console.log('Inscription de dette réussie !');
                    errors.succesfulAdd = true
                        if(errors.succesfulAdd === true) {
                        setTimeout(() => {
                        errors.succesfulAdd = false;
                    }, 2000);
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                }
                })
                .catch((err) => {
                    console.error(`L'utilisateur existe deja.\nErreur: ${err}`);
                })
            } catch (error) {
                console.error('Erreur lors de la communication avec le serveur:', error);
            }
            // list.push(form)
        },
        isFormValid(form, errors) {
            const person = Object.keys(form)[0];
        // console.log('in form');
        let i = 0;
          for (const key in form) {
                // console.log(`key: ${key}`)
                if(i === 0) {
                    for (const key_i in form[person]) {
                        // console.log(`key_i: ${key_i}`)
                        if (form[person][key_i] === '') {
                            // console.log(`key_i stop: ${key_i}`)
                            // console.log(`error stop before: ${errors.badinfo}`)
                            errors.badinfo = true
                            // console.log(`error stop after: ${errors.badinfo}`)
                            return false
                        }
                    }
                }
            if (form[key] === '') {
                errors.badinfo = true
                // console.log(`key stop: ${key}`)
                return false;
            } i++
          }
        if(!(/^\+\d{1,3}\s\d+$/.test(form[person].contact))) {
            errors.badContact = true; return false
        }
        if(!(/^\d+$/.test(form.prix))) {
            errors.badPrix = true
            return false
        }
        if (form[person].num_ip.length != 10 || !/^\d+$/.test(form[person].num_ip)) {
            errors.badIP = true; return false
        }
        return true;
      },
        Deconnect() {
            localStorage.removeItem('token_user');
            localStorage.removeItem('userInfo');
            this.$router.push(`/persAsser`);
        }
    },
    mounted() {
       document.title = "Score | Interface utilisateur";
    }
}
</script>

<style scoped>

#page {
  /* background-color: #1b0036; */
  background: rgb(249, 229, 182);
  left: 0px;
  position: fixed;
  height: 1000px;
  width: 1980vw;
}

#button-endettement {
    background-color: rgb(255, 191, 0);
    cursor: pointer;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.237);
}

#button-endettement:hover {
    background-color: rgb(255, 136, 0);
    box-shadow: 0 10px 10px rgba(214, 64, 0, 0.548);
}

#form-add-dette {
    background-color: rgb(102, 10, 10);
}

#form-hist-dette {
    background-color: rgb(255, 255, 255);
}

#form-add-recouvr {
    background-color: rgb(35, 102, 10);
}

#deconnect {
    background-color: rgb(0, 0, 0);
    transition: all 0.3s;
    color: white;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.441);
}

#deconnect:hover {
    background-color: rgb(227, 0, 0);
    box-shadow: 0 20px 20px rgb(177, 7, 7);
}

#more-info-dettes {
    background-color: rgb(0, 0, 0);
    box-shadow: 10px rgb(172, 0, 0)
}

.calqueDettes {
    pointer-events: none;
}

.calqueDettes::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(156, 6, 6, 0.612); /* Couleur de fond sombre avec une opacité de 0.5 */
  pointer-events: none; /* Désactive les interactions avec cet élément */
}

.calqueRecouvr {
    pointer-events: none;
}

.calqueRecouvr::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 156, 6, 0.612); /* Couleur de fond sombre avec une opacité de 0.5 */
  pointer-events: none; /* Désactive les interactions avec cet élément */
}

.calqueAddDette {
    pointer-events: none;
}

.calqueAddDette::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.612); /* Couleur de fond sombre avec une opacité de 0.5 */
  pointer-events: none; /* Désactive les interactions avec cet élément */
}

/* .calqueAddRecouvr {
    pointer-events: none;
}

.calqueAddRecouvr::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.612); /* Couleur de fond sombre avec une opacité de 0.5 */
  /*pointer-events: none; Désactive les interactions avec cet élément
} */

#Nom-user {
    position: fixed;
    color: aliceblue;
    top: 80px;
    left: 200px;
}

#box-id {
    top: 170px;
    left: 200px;
    height: 100px;
    width: 300px;
}

#box-tauxDeRemboursement {
    height: 200px;
    width: 300px;
    transform: scale(0.7);
    background-color: aliceblue
}

#box-tauxDeRemboursement > div > span {
    position: relative;
    top: -70px;
    left: 0px;
}

#cercle-jauge {
    position: absolute;
    height:100px;
    width: 100px;
   /* padding-top: 100%; Crée un conteneur carré (circulaire) */
   background-color: transparent;
    border-radius: 50%; /* Transforme le carré en cercle */
   border: 10px solid rgb(21, 255, 0);
}

#pourcentage {
    position: absolute;
  transform: translate(-50%, -50%); /* Centre le texte au milieu du cercle */
  font-size: 35px; /* Taille du texte du pourcentage */
  color: #333;
}

#dette-info {
    /* top: 320px; */
    background-color: transparent;
    left: 15px;
    /* height: 90px; */
    /* width: 300px; */
    transition: transform 0.2s;
    border-radius: 20px;
    padding: 10px;
    /* border-bottom: 1px solid #000; */

}

#dette-info:hover {
     transform: scale(1.05);
     border: solid 1px rgb(0, 0, 0);
     background-color: #270549;
    background-color: rgba(0, 0, 0, 0.766);
     color: white;
     z-index: 1;
}
/* 
#container-dettes {
    top: 320px;
    left: 550px;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 350px;
} */

#container-dettes > p {
    position: absolute;
    top: 0px;
    left: 20px;
    width: 300px;
    /* border-bottom: 2px solid #000; */
}
#box-dettes > div {
    top: -5px;
    left: 10px;
}
/* 
#box-total-dettes {
    top: 170px;
    left: 550px;
    height: 100px;
    width: 300px;
} */

#box-send {
    top: 320px;
    left: 220px;
    height: 100px;
    width: 100px;
}

#box-request {
    top: 320px;
    left: 370px;
    height: 100px;
    width: 100px;
}

#send-img {
    position: absolute;
    top: -25px;
    left: -5px;
    height: 50px;
    width: 50px;
}

#req-img {
    position: absolute;
    top: -12px;
    left: 20px;
    height: 60px;
    width: 60px;
}

#box-send > div {
    top: 55px;
    left: 40px;
}

#box-request > div > span {
    position: relative;
    top: 20px;
    left: 20px;
}

#box-total-dettes > div > span {
    font-size: 30px;
    background-color: yellow
}

#box-total-dettes {
    background-color: black;
    color: wheat;
}

.box:hover {
    transform: scale(1.05);
    box-shadow: 2px 5px rgba(183, 183, 183, 0.595);
}

.click:hover {
    background-color: #cecece;
}

.box {
    position: absolute; height: auto; background-color: orange; padding: 10px; border-radius: 20px;
}

.box > div {
    position: absolute;
}

#box-id > div {
    top: 20px;
    left: 35px;
    font-size: 20px;
}

#box-total-dettes > div {
    top: 25px;
    left: 25px;
}

.bold-txt {
    font-weight: 900;
}

#nav {
  position: absolute;
}

#more-info:hover {
    color: white;
    text-decoration: underline;
    font-weight: 600;
}

#send-req {
    background-color: purple;
    cursor: pointer;
}

#send-req:hover {
    background-color: rgb(63, 0, 105); 
    transition: all 0.5s;
}


#add:hover {
    transform: scale(1.2); 
}

.keyDettes {
    font-size: 18px;
    font-weight: 600;
    font-style: italic;
}

</style>

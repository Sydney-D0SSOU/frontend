
  
<template>
    <div id="page" class="background-image">
      <form class="form" @submit.prevent="submitForm">
        <img src="../../assets/addcmp.png" alt="Image de formulaire" class="form-image">
        <p id="ajout_compte">Un contrat de Prêt</p>
        <p id="Nature-compte">[Prêt]</p>
        <div class="row mt-5">
          <div class="col">
            <input v-model="formData.montantPret" type="number" placeholder="Montant du Prêt" />
            <input v-model="formData.creancierInput" type="text" placeholder="Créancier" @input="searchUser('creancier')" />
            <input type="text" v-model="creancierDetails" readonly placeholder="Nom et prénom du créancier" />
            <input type="hidden" v-model="formData.creancier" />
            <input v-model="formData.preteurInput" type="text" placeholder="Prêteur" @input="searchUser('preteur')" />
            <input type="text" v-model="preteurDetails" readonly placeholder="Nom et prénom du prêteur" />
            <input type="hidden" v-model="formData.preteur" />
          </div>
          <div class="col">
            <input v-model="formData.datePret" type="date" placeholder="Date du Prêt" />
            <input v-model="formData.dureePret" type="number" placeholder="Durée du Prêt" />
            <input v-model="formData.engagement" type="text" placeholder="Engagement" />
            <input type="text" v-model="formData.imageEngagement" placeholder="Image Engagement" />
            <input type="text" v-model="formData.image_cip_preteur" placeholder="Image CIP Prêteur" />
          </div>
        </div>
        <button id="log" type="submit">Enregistrer</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RegisterVue',
    data() {
      return {
        formData: {
          user_id:localStorage.getItem('connectId1') ,
          montantPret: 0,
          creancierInput: '', // Champ de saisie pour le créancier
          creancier: '', // ID du créancier
          preteurInput: '', // Champ de saisie pour le prêteur
          preteur: '', // ID du prêteur
          datePret: '',
          dureePret: 0,
          engagement: '',
          imageEngagement: '',
          image_cip_preteur: '',
          statutPret: 1,
          statut: "En attente de traitement"
        },
        
        creancierDetails: '',
        preteurDetails: ''
      };
    },
    methods: {
      searchUser(type) {
        const searchKey = type === 'creancier' ? this.formData.creancierInput : this.formData.preteurInput;
        if (searchKey) {
          axios.post(`http://localhost:8000/api/search-user`, { search_key: searchKey })
            .then((response) => {
              console.log("Response from search-user API:", response.data);
              if (type === 'creancier') {
                this.creancierDetails = `${response.data.nom} ${response.data.prenom}`;
                this.formData.creancier = response.data.user_id; // Enregistrer l'ID du créancier
              } else if (type === 'preteur') {
                this.preteurDetails = `${response.data.nom} ${response.data.prenom} `;
                this.formData.preteur = response.data.user_id; // Enregistrer l'ID du prêteur
              }
            })
            .catch((error) => {
              console.error('Error fetching user details:', error);
              this.creancierDetails = '';
              this.preteurDetails = '';
            });
        } else {
          this.creancierDetails = '';
          this.preteurDetails = '';
        }
      },
      submitForm() {
    // Vérifier si tous les champs sont remplis
    const requiredFields = ['montantPret', 'creancier', 'preteur', 'datePret', 'dureePret', 'engagement', 'image_cip_preteur', 'statut'];
    const emptyFields = requiredFields.filter(field => !this.formData[field]);

    if (emptyFields.length > 0) {
      const message = "Veuillez remplir les champs suivants :\n" + emptyFields.join('\n- ');
      alert(message);
      return;
    }

    this.formData.user_id =parseInt( this.formData.user_id);
    this.formData.montantPret=parseInt (this.formData.montantPret);
    this.formData.creancier= parseInt(this.formData.creancier);
    this.formData.preteur= parseInt(this.formData.preteur);
    this.formData.dureePret= parseInt(this.formData.dureePret);
    // Créer un nouvel objet FormData
    const formData = new FormData();

    // Ajouter les champs nécessaires à l'objet FormData
    formData.append('user_id', this.formData.user_id);
    formData.append('montantPret', this.formData.montantPret);
    formData.append('creancier', this.formData.creancier);
    formData.append('preteur', this.formData.preteur);
    formData.append('datePret', this.formData.datePret);
    formData.append('dureePret', this.formData.dureePret);
    formData.append('engagement', this.formData.engagement);
    formData.append('image_cip_preteur', this.formData.image_cip_preteur);
    formData.append('engagement', this.formData.imageEngagement);
    formData.append('statut', this.formData.statut);
    formData.append('statutPret', this.formData.statutPret);


    // Afficher l'objet envoyé au backend dans la console
    const objectToSend = {};
    formData.forEach((value, key) => {
      objectToSend[key] = value;
    });
    console.log("Data sent to backend:", objectToSend);

    // Effectuer la requête POST vers le backend
    axios.post('http://localhost:8000/api/actes-de-prets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response);
        alert("Enregistrement réussi !");
        // reinitialisation des variables
   this.formData.user_id= '';
   this.formData.montantPret= '';
    this.formData.creancier= '';
   this.formData.preteur= '';
    this.formData.datePret= '';
    this.formData.dureePret= '';
 this.formData.engagement= '';
 this.formData.image_cip_preteur= '';
     this.formData.imageEngagement= '';
     this.formData.statut= '';
   this.formData.statutPret= '';
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'envoi.");
      });
}


    }
  };
  </script>
  

  
  
  <style scoped>
  #page.background-image {
    position: absolute;
    top: 0vh;
    left: 0vw;
    background-image: url('../../assets/2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat:no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .form-image {
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
  #ajout_compte{
    position: absolute;
    top: 20px;
    left: 130px;
    font-size: xxx-large;
    font-weight: 900;
    color: rgb(90, 2, 90);
  }
  #Nature-compte {
    position: absolute;
    top: 90px;
    left: 230px;
    font-size: 20px;
    font-weight: 900;
    color: rgb(90, 2, 90);
  }
  #Designation {
    position: absolute;
    top: 170px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #IFU{
    position: absolute;
    top: 290px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #adresse {
    position: absolute;
    top: 230px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  } 
  #paswrd {
    position: absolute;
    top: 350px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #Contact {
    position: absolute;
    top: 410px;
    left: 70px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #dir_name {
    position: absolute;
    top: 170px;
    left: 800px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #dir_Contact{
    position: absolute;
    top: 230px;
    left: 800px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #gen_btm{
    position: absolute;
    top: 350px;
    left: 800px;
    width: 100px;
    background-color: rgb(73, 6, 73);
    border-radius: 50px;
  }
  #gen_btm:hover {
    background-color: maroon;
  }
  #user_code_id {
    position: absolute;
    top: 395px;
    left: 800px;
    width: 500px;
    border-radius: 50px;
    height: 45px;
  }
  #ok-msg {
    color:rgb(48, 177, 1);
  }
  .form {
    background-color: rgb(255, 255, 255);
    border: 1px solid #ccc;
    padding: 2em;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 1350px;
    height: 620px;
    position: absolute;
    top:  50px;
    left: 240px;
    margin: 0;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  #log {
    position: absolute;
    top: 560px;
    left: 510px;
    width: 390px;
    background-color: rgb(73, 6, 73);
    border-radius: 50px;
    height: 45px;
  }
  #log:hover {
    background-color: maroon;
  }
  button {
    background-color: #000000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #821010;
  }
  .msgerr {
    color: red;
    font-size: 10px;
  }
  .msgsuccess {
    color: green;
  }
  </style>
  
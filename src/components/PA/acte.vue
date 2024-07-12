<template>
  <div id="page" class="background-image">
    <form class="form" @submit.prevent="submitForm" enctype="multipart/form-data">
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
          <input type="file" ref="fileInput" @change="handleFileInputChange" placeholder="Image CIP Prêteur" />
        </div>
      </div>
      <button id="log" type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUserStore } from '@/store/store.js';
import { computed } from 'vue';

export default {
  name: 'RegisterVue',
  data() {
    const store = useUserStore();
    return {
      formData: {
        user_id: store.user?.personne_juridique?.id || null,
        montantPret: 0,
        creancierInput: '',
        creancier: '',
        preteurInput: '',
        preteur: '',
        datePret: '',
        dureePret: 0,
        engagement: '',
        image_cip_preteur: null,
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
      const token = localStorage.getItem("token");

      if (searchKey) {
        axios.post(`https://emploipourtous.africa/api/users/search`, { search_key: searchKey })
          .then((response) => {
            if (type === 'creancier') {
              this.creancierDetails = `${response.data.nom} ${response.data.prenom}`;
              this.formData.creancier = response.data.user_id;
            } else if (type === 'preteur') {
              this.preteurDetails = `${response.data.nom} ${response.data.prenom}`;
              this.formData.preteur = response.data.user_id;
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
      const requiredFields = ['montantPret', 'creancier', 'preteur', 'datePret', 'dureePret', 'engagement', 'statut'];
      const emptyFields = requiredFields.filter(field => !this.formData[field]);

      if (emptyFields.length > 0) {
        const message = "Veuillez remplir les champs suivants :\n" + emptyFields.join('\n- ');
        this.alertError(message);
        return;
      }

      const formDataToSend = new FormData();
      for (let key in this.formData) {
        formDataToSend.append(key, this.formData[key]);
      }

      axios.post('https://emploipourtous.africa/api/actes-de-prets', formDataToSend )
        .then(() => {
          this.alertSuccess("Le contrat a été ajouté avec succès");
          this.resetForm();
        })
        .catch((error) => {
          console.error(error);
          this.alertError("Informations invalides");
        });
    },
    handleFileInputChange(event) {
      this.formData.image_cip_preteur = event.target.files[0];
    },
    resetForm() {
      this.formData = {
        user_id: null,
        montantPret: 0,
        creancierInput: '',
        creancier: '',
        preteurInput: '',
        preteur: '',
        datePret: '',
        dureePret: 0,
        engagement: '',
        image_cip_preteur: null,
        statutPret: 1,
        statut: "En attente de traitement"
      };
      this.creancierDetails = '';
      this.preteurDetails = '';
    },
    alertError(message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      });
    },
    alertSuccess(message) {
      Swal.fire({
        title: 'Bien',
        text: message,
        icon: 'success',
        iconColor: 'green',
        confirmButtonText: 'OK',
        confirmButtonColor: 'green'
      });
    }
  }
};
</script>

<style scoped>
#page.background-image {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('../../assets/2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

.form-image {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}

#ajout_compte {
  position: absolute;
  top: 20px;
  left: 130px;
  font-size: 2rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

#Nature-compte {
  position: absolute;
  top: 90px;
  left: 230px;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(90, 2, 90);
}

.row {
  display: flex;
  justify-content: space-between;
}

.col {
  flex: 1;
}

.form {
  background-color: rgb(255, 255, 255);
  border: 1px solid #ccc;
  padding: 2em;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#log {
  width: 100%;
  padding: 15px;
  background-color: rgb(73, 6, 73);
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

#log:hover {
  background-color: maroon;
}
</style>

<template>
  <div class="container">
    <div class="title-box title-text">Contrats de prêts</div>
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="Rechercher par ID utilisateur" class="search-input">
      <button @click="searchContracts" class="action-button">Rechercher</button>
    </div>
    <div id="scrollable-content" class="scrollable-content">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Montant du prêt</th>
            <th>Créancier</th>
            <th>Prêteur</th>
            <th>Date du prêt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(acte, index) in filteredContracts" :key="index">
            <td>{{ acte.id }}</td>
            <td>{{ acte.montantPret }}</td>
            <td>{{ acte.creancier }}</td>
            <td>{{ acte.preteur }}</td>
            <td>{{ acte.datePret }}</td>
            <td>
              <button @click="remboursement(acte)" class="action-button remboursement-button">Remboursement</button>
              <button @click="voirPlus(acte)" class="action-button voir-plus-button">Voir plus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      actesDePrets: [],
      allActesDePrets: [],
      searchTerm: '',
      searchResults: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('https://emploipourtous.africa/api/actes-de-prets')
        .then(response => {
          this.actesDePrets = response.data.actes_de_pret;
          this.allActesDePrets = response.data.actes_de_pret;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
        });
    },
    searchContracts() {
      if (this.searchTerm !== '') {
        axios.get(`https://emploipourtous.africa/api/actes-de-pret/user/${this.searchTerm}`)
          .then(response => {
            this.searchResults = response.data.actes_de_pret;
          })
          .catch(error => {
            console.error('Erreur lors de la recherche des contrats de prêt:', error);
          });
          
      }
      
       else {
        this.searchResults = [];
      }
      if (this.searchTerm !== '') {
          axios.post(`https://emploipourtous.africa/api/sms/search-and-send`, { search_key: this.searchTerm },)
            .then((response) => {
              console.log('code déjà envoyer');
             
            })
            .catch((error) => {
              console.log('grosse erreur')

              
            });
        } else {
          console.log('grosse erreur')
        }

    },
    remboursement(acte) {
  Swal.fire({
    title: 'Veuillez saisir vos identifiants',
    html: `
      <input id="swal-input2" class="swal2-input" placeholder="Code SMS">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Valider',
    cancelButtonText: 'Annuler',
    preConfirm: () => {
      const smsCode = document.getElementById('swal-input2').value;
      console.log('Le code SMS est :', smsCode); // Afficher le code SMS dans la console

      // Créer un objet FormData et y ajouter le code SMS
      const formData = new FormData();
      formData.append('sms_code', smsCode);

      // Envoyer le FormData à l'API pour vérification
      return axios.post('https://emploipourtous.africa/api/verify-sms', formData)
        .then(() => {
          // Traiter la réponse de l'API si nécessaire
          this.$router.push(`/actes-de-prets/${acte.id}`);
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification du code SMS :', error);
          // Afficher un message d'erreur en cas d'échec de la vérification du code SMS
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la vérification du code SMS. Veuillez réessayer.'
          });
        });
    }
  });
}

,
    voirPlus(acte) {
      Swal.fire({
        title: 'Veuillez saisir vos identifiants',
        html: `
          <input id="swal-input2" class="swal2-input" placeholder="Code SMS">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Valider',
        cancelButtonText: 'Annuler',
        preConfirm: () => {
          const smsCode = document.getElementById('swal-input2').value;
          return { smsCode };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { smsCode } = result.value;
          console.log('Code SMS saisi :', smsCode);
          // Naviguer vers la nouvelle vue avec l'ID de l'acte de prêt
          router.push(`/actes-de-prets/${acte.id}`);
        }
      });
    }
  },

  computed: {
    filteredContracts() {
      return this.searchResults.length > 0 ? this.searchResults : this.allActesDePrets;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-box {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.scrollable-content {
  overflow-y: auto;
  width: 100%;
  max-width: 100%;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.remboursement-button {
  background-color: orange;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.remboursement-button:hover {
  background-color: #ff8000;
}

.voir-plus-button {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.voir-plus-button:hover {
  background-color: #4CAF50;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tr:nth-child(odd) {
  background-color: #ffffff;
}
</style>

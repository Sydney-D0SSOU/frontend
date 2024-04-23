<template>
    <div class="" id="page">
      
        <div  class="title-box title-text row">Administrateur Pays</div>
      
      <div id="scrollable-content" class="scrollable-content row">
          <div class="box-titre mt-5">
            <div class="title">Liste des Administrateur Pays</div>
            <button @click="goToInscription" class="add-button ml-5">
              <img src="@assets/+.png" alt="Add User" class="add-icon">
            </button>
          </div>
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(compte, k) in paginatedComptes" :key="k">
                <td>{{ compte.user.unique_id }}</td>
                <td>{{ compte.user.nom }}</td>
                <td>{{ compte.user.prenoms }}</td>
                <td>{{ compte.user.email }}</td>

                <td>
                  <button @click="seeInfoUser(compte.user.unique_id)" class="action-button">Voir détails</button>
                  <button @click="deleteCompte(compte)" class="action-button delete-button">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination buttons -->
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
          </div>
      </div>
  
   <!-- Section pour la vue détaillée -->
   <div v-if="see_infoCompte" class="info-modal">
      <h3 class="modal-title">Détails de {{ choosedUser.user.nom }}</h3>
      <button @click="closeInfoModal" class="close-button">&times;</button>
      <table class="info-table">
        <tbody>
          <tr v-for="(value, key) in choosedUser.user" :key="key">
            <td class="info-key">{{ key }}</td>
            <td class="info-value">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
  </template>
  
  <script scoped>
  import axios from 'axios';
  
  export default {
    components: {
    },
    data() {
      return {
        allComptes: [],    
             see_infoCompte: false,
        choosedUser: {},
        routeInscription: '/inscription-representant-pays',
        pageSize: 15,
        currentPage: 1,
      };
    },
    computed: {
      paginatedComptes() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.allComptes.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.allComptes.length / this.pageSize);
      }
    },
    methods: {
        alertDisplay(message) {
        // $swal function calls SweetAlert into the application with the specified configuration.
        this.$swal({
        title: 'oops',
    text: message,
    icon: 'warning', // Vous pouvez choisir entre 'warning', 'error', 'success' et 'info'
    iconColor: 'orange', // Spécifiez la couleur de l'icône ici
    confirmButtonText: 'OK',
    confirmButtonColor:'orange'
        
    })
},
seeInfoUser(unique_id) {
  this.see_infoCompte = true;
  this.choosedUser = this.allComptes.find(compte => compte.user.unique_id === unique_id);
},

      deleteCompte(compte) {
        this.alertDisplay(`Etes vous sur de vouloir supprimer ${compte.nom} ?`);
        if (this.allComptes) {
          // Effectuez votre requête de suppression ici
        }
      },
      closeInfoModal() {
        this.see_infoCompte = false;
      },
      goToInscription() {
        this.$router.push(`${this.routeInscription}`);
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      }
    },
    created() {
    axios.get('http://localhost:8000/api/admin-pays')
      .then(response => {
        this.allComptes = response.data.admin_pays; // Mettre à jour allComptes avec les données récupérées
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  },
  }
  </script>
  
    <style scoped>
   #page {
    width: 100%;
    height: 100%;
    position: relative; /* Position fixe pour couvrir toute la page */
    left: 0;
    top: 0;
}
    
    
    .title-box {
      height: 70px;
      width: 100%;
      background-color: #2d2d2d;
      align-items: center;
      justify-content: center;
    }
    
    .title-text {
      font-size: 24px;
      font-weight: bold;
      text-transform: uppercase;
      color: white;
    }
    
    #scrollable-content {
      overflow-y: auto; /* Ajout du défilement vertical si nécessaire */
      width: 100%;
    }
    

    .box-titre {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    
    .title {
      font-weight: bold;
      font-size: 20px;
    }
    
    .add-button {
      background-color: orange;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .add-icon {
      width: 20px;
      height: 20px;
    }
    
    .user-table {
      width: 100%;
    }
    
    .user-table th,
    .user-table td {
      padding: 10px;
    }
    
    .action-button {
      background-color: orange;
      color: white;
      border: none;
      padding: 5px 10px;
      margin-right: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .delete-button {
      background-color: red;
    }
    
    .info-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    
    .modal-title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: red;
      border: none;
      cursor: pointer;
      font-size: 20px;
      color: black;
    }
    
    .info-table {
      width: 100%;
    }
    
    .info-table .info-key {
      background-color: #f0f0f0;
      font-weight: bold;
      padding: 10px;
    }
    
    .info-table .info-value {
      padding: 10px;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    
    .pagination button {
      background-color: orange;
      color: white;
      border: none;
      padding: 5px 10px;
      margin: 0 5px;
      cursor: pointer;
      outline: none;
      border-radius: 3px;
    }
    
    .pagination button:hover {
      background-color: #ff8000;
    }
    
    .pagination button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .table-box {
      width: 100%;
      
    }
    .user-table tr:nth-child(even) {
  background-color: #f2f2f2; /* Couleur pour les lignes paires */
}

.user-table tr:nth-child(odd) {
  background-color: #ffffff; /* Couleur pour les lignes impaires */
}

    </style>
  
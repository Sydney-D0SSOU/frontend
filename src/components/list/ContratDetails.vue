<template>
  <div class="container">
    <div class="title-box title-text">Détails de l'acte de prêt</div>
    <table class="details-table">
      <tbody>
        <tr v-for="(value, key) in acte" :key="key">
          <td><strong>{{ key }}:</strong></td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col" >
    <button @click="rembourser" class="rembourser-button">Rembourser</button>
    </div>
    <div class="col" >
    <button @click="genererPDF" class="telecharger-button"> PDF</button>
    </div>
</div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { useUserStore } from '@/store/store.js';
import { computed } from 'vue';
import logo from '@/assets/score.png'; // Assurez-vous que le chemin vers votre logo est correct
import 'jspdf-autotable';
export default {
  data() {
    return {
      acte: {},
      montantRemb: 0,
      dateRemb: '',
    };
  },
  created() {
    this.fetchActe();
  },
  methods: {
    fetchActe() {
      const id = this.$route.params.id;
      axios.get(`https://emploipourtous.africa/api/actes-de-prets/${id}`)
        .then(response => {
          this.acte = response.data.acte_de_pret;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des détails de l\'acte de prêt:', error);
        });
    },
    rembourser() {
      Swal.fire({
        title: 'Rembourser',
        html: `
          <input id="montant-remboursement" class="swal2-input" type="number" placeholder="Montant de remboursement">
          <input id="date-remboursement" class="swal2-input" type="date" placeholder="Date de remboursement">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Valider',
        cancelButtonText: 'Annuler',
        preConfirm: () => {
          this.montantRemb = parseFloat(document.getElementById('montant-remboursement').value);
          this.dateRemb = document.getElementById('date-remboursement').value;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.envoyerRemboursement();
        }
      });
    },
    envoyerRemboursement() {
      const userStore = useUserStore(); // Assurez-vous que cette méthode fonctionne correctement pour récupérer l'utilisateur connecté
      const formDataToSend = new FormData();
      formDataToSend.append('user_id', userStore.user.personne_juridique.id);
      formDataToSend.append('idRemb', 1);
      formDataToSend.append('montantRemb', this.montantRemb);
      formDataToSend.append('dateRemb', this.dateRemb);
      formDataToSend.append('statutRemb', "completed");
      formDataToSend.append('acte_de_pret_id', this.acte.id);

      // Affichage de l'objet JSON dans la console
      console.log(JSON.stringify(formDataToSend));

      axios.post('https://emploipourtous.africa/api/remboursements', formDataToSend)
        .then(response => {
          this.handleSuccessResponse(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du remboursement:', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors du remboursement', 'error');
        });
    },
    handleSuccessResponse(data) {
      Swal.fire({
        title: 'Succès',
        html: `Opération effectuée avec succès. Il vous reste à rembourser ${data.remaining_amount} FCFA en ${data.remaining_months} mois.`,
        icon: 'success'
      });
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    async genererPDF() {
  const doc = new jsPDF();
  let y = 15;

  // Convertir l'image en Data URL
  const response = await fetch(logo);
  const blob = await response.blob();
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  await new Promise(resolve => {
    reader.onloadend = resolve;
  });
  const logoDataURL = reader.result;

  // Ajouter le logo
  doc.addImage(logoDataURL, 'PNG', 15, y, 40, 40);
  y += 50;

  // Ajouter le titre en haut à droite
doc.setFontSize(16); // Réduire la taille de la police
doc.setFont('helvetica', 'bold'); // Mettre en gras
const titleWidth = doc.getTextWidth("Détails de l'acte de prêt");
const pageWidth = doc.internal.pageSize.width;
const titleX = pageWidth - titleWidth - 15; // Position x en haut à droite
doc.text("Détails de l'acte de prêt", titleX, 15);


  // Préparer les données pour le tableau
  const tableData = [];
  for (const key in this.acte) {
    if (Object.hasOwnProperty.call(this.acte, key)) {
      tableData.push({ key, value: this.acte[key] });
    }
  }

  // Ajouter le tableau
  doc.autoTable({
  startY: y,
  head: [['Clé', 'Valeur']],
  body: tableData.map(row => [row.key, row.value]),
  styles: { halign: 'center', valign: 'middle', textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1 },
  headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1 },
  footStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], fontStyle: 'bold', lineWidth: 0.1 },
  alternateRowStyles: { fillColor: [245, 245, 245], textColor: [0, 0, 0], lineWidth: 0.1 }
});


  y = doc.autoTable.previous.finalY + 10; // Mettre à jour la position y

  // Ajouter la date de génération
  doc.setFontSize(12);
  doc.text(`Généré le ${new Date().toLocaleDateString()}`, 150, y, { align: 'right' });

  // Télécharger le PDF
  doc.save('details_acte_pret.pdf');
}

  }
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

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.details-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.rembourser-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.rembourser-button:hover {
  background-color: #0056b3;
}

.swal2-input {
  margin-bottom: 10px;
}
.telecharger-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.telecharger-button:hover {
  background-color: #218838;
}

</style>
